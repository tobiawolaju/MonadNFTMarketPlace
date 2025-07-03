const admin = require("firebase-admin");
const path = require("path");
require('dotenv').config({ path: '../.env' });

// ✅ Load Firebase Admin with service account
const serviceAccount = require('./serviceAccountKey.json'); // Adjust path if needed

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db = admin.database();

const dummyData = {
  "0xCreatorWallet1": {
    "Cool Collection": {
      "nft_001": {
        name: "Neon Pharaoh",
        description: "A luminous pharaoh glowing under city lights.",
        image: "ipfs://QmExampleImageHash1",
        metadata_uri: "ipfs://QmExampleMetadataHash1",
        collection: "Cool Collection",
        creator: "0xCreatorWallet1",
        timestamp: 1720000010000,
        minted: false
      },
      "nft_002": {
        name: "Quantum Cat",
        description: "A multidimensional feline who purrs in binary.",
        image: "ipfs://QmExampleImageHash2",
        metadata_uri: "ipfs://QmExampleMetadataHash2",
        collection: "Cool Collection",
        creator: "0xCreatorWallet1",
        timestamp: 1720000110000,
        minted: true,
        tokenId: 17,
        owner: "0xBuyerAddressABC123"
      }
    },
    "Dark Pixels": {
      "nft_001": {
        name: "Pixel Doom",
        description: "The last 16-bit boss you’ll ever fight.",
        image: "ipfs://QmExampleImageHash3",
        metadata_uri: "ipfs://QmExampleMetadataHash3",
        collection: "Dark Pixels",
        creator: "0xCreatorWallet1",
        timestamp: 1720000210000,
        minted: false
      }
    }
  },
  "0xCreatorWallet2": {
    "Sky Legends": {
      "nft_001": {
        name: "Cloud Serpent",
        description: "Guardian of the sky kingdom.",
        image: "ipfs://QmExampleImageHash4",
        metadata_uri: "ipfs://QmExampleMetadataHash4",
        collection: "Sky Legends",
        creator: "0xCreatorWallet2",
        timestamp: 1720000310000,
        minted: true,
        tokenId: 31,
        owner: "0xBuyerAddressXYZ789"
      },
      "nft_002": {
        name: "Storm Titan",
        description: "Harnesses the fury of the heavens.",
        image: "ipfs://QmExampleImageHash5",
        metadata_uri: "ipfs://QmExampleMetadataHash5",
        collection: "Sky Legends",
        creator: "0xCreatorWallet2",
        timestamp: 1720000410000,
        minted: false
      }
    }
  }
};

(async () => {
  try {
    await db.ref("collections").set(dummyData);
    console.log("✅ Dummy NFT data uploaded to Firebase Realtime Database.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error uploading data:", err);
    process.exit(1);
  }
})();
