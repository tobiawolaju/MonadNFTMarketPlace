const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const pinataSDK = require('@pinata/sdk');
const multer = require('multer');
const path = require('path');
const { Readable } = require('stream');
require('dotenv').config({ path: '../.env' });

// Initialize Firebase Admin SDK for RTDB
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});
const db = admin.database();

// Initialize Pinata
const pinata = new pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_API_KEY);

// Express setup
const app = express();
app.use(cors());
app.use(express.json());

// Multer for file uploads (in memory)
const upload = multer({ storage: multer.memoryStorage() });

// ---------- Pinata Upload Helpers ----------

// Upload image to Pinata
async function uploadImageToPinata(file) {
  try {
    const options = {
      pinataMetadata: { name: file.originalname }
    };
    const readableStreamForFile = Readable.from(file.buffer);
    readableStreamForFile.name = file.originalname; // Pinata SDK expects a name property
    const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
    return `ipfs://${result.IpfsHash}`;
  } catch (err) {
    console.error('Pinata image upload failed:', err);
    throw err;
  }
}

// Upload metadata to Pinata
async function uploadJsonToPinata(json) {
  try {
    const result = await pinata.pinJSONToIPFS(json, {
      pinataMetadata: { name: json.name || 'nft-metadata' }
    });
    return `ipfs://${result.IpfsHash}`;
  } catch (err) {
    console.error('Pinata JSON upload failed:', err);
    throw err;
  }
}

// ---------- API Routes ----------

// GET all collections and NFTs
app.get('/collections', async (req, res) => {
  try {
    const snapshot = await db.ref('collections').once('value');
    const data = snapshot.val();
    if (!data) return res.json([]);

    const all = [];

    for (const [creatorWallet, collections] of Object.entries(data)) {
      for (const [collectionName, nfts] of Object.entries(collections)) {
        all.push({
          creatorWallet,
          collectionName,
          nfts: Object.entries(nfts).map(([nftId, nft]) => ({
            id: nftId,
            ...nft
          }))
        });
      }
    }

    res.json(all);
  } catch (err) {
    console.error('Error fetching collections:', err);
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
});

// GET a creator’s collections
app.get('/collections/:creatorWallet', async (req, res) => {
  try {
    const { creatorWallet } = req.params;
    const snapshot = await db.ref(`collections/${creatorWallet}`).once('value');
    const data = snapshot.val();
    if (!data) return res.json([]);

    const all = [];

    for (const [collectionName, nfts] of Object.entries(data)) {
      all.push({
        collectionName,
        nfts: Object.entries(nfts).map(([nftId, nft]) => ({
          id: nftId,
          ...nft
        }))
      });
    }

    res.json(all);
  } catch (err) {
    console.error('Error fetching creator collections:', err);
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
});

// POST /upload-nft (image + metadata)
app.post('/upload-nft', upload.single('image'), async (req, res) => {
  try {
    console.log('Received /upload-nft request.');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    const { name, description, creatorWallet, collectionName = 'Untitled Collection' } = req.body;
    const imageFile = req.file;

    if (!imageFile || !creatorWallet || !name || !description) {
      console.log('Missing required fields or image file.');
      return res.status(400).json({ error: 'Missing required fields or image file.' });
    }

    console.log('Uploading image to Pinata...');
    const imageUri = await uploadImageToPinata(imageFile);
    console.log('Image uploaded to Pinata. URI:', imageUri);

    const metadata = {
      name,
      description,
      image: imageUri,
      creator: creatorWallet,
      collection: collectionName
    };

    console.log('Uploading metadata to Pinata...');
    const metadataUri = await uploadJsonToPinata(metadata);
    console.log('Metadata uploaded to Pinata. URI:', metadataUri);

    const nftId = `nft_${Date.now()}`;
    const newNft = {
      ...metadata,
      metadata_uri: metadataUri,
      timestamp: Date.now(),
      minted: false
    };

    console.log('Saving NFT to Firebase...');
    await db.ref(`collections/${creatorWallet}/${collectionName}/${nftId}`).set(newNft);
    console.log('NFT saved to Firebase.');

    res.json({ success: true, metadataUri, nft: { id: nftId, ...newNft } });
  } catch (err) {
    console.error('Upload failed:', err);
    res.status(500).json({ error: 'Failed to upload NFT' });
  }
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
