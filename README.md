# NadGarden NFT Marketplace Architecture

This document outlines the architecture of the NadGarden NFT Marketplace, a full-stack decentralized application.

## 1. System Overview

The NadGarden platform is composed of three main components:

1.  **Frontend**: A React-based web application for user interaction.
2.  **Backend**: An Express.js server that handles metadata and image uploads.
3.  **Smart Contracts**: Solidity contracts deployed on the Monad blockchain for handling NFT minting, ownership, and marketplace transactions.

## 2. Smart Contracts

The core logic of the NFT marketplace is encapsulated in two smart contracts:

### `NadNFT.sol`

*   **Functionality**: This contract manages the creation and ownership of NFTs.
*   **Standards**: It implements the `ERC721` standard for non-fungible tokens and `ERC721URIStorage` for storing metadata.
*   **Key Features**:
    *   `mint()`: Allows users to create new NFTs by paying a fee.
    *   `transferWithRoyalty()`: A custom function to handle NFT transfers with a royalty fee.
    *   **Ownership**: The contract is `Ownable`, meaning it has an owner with special privileges.

### `NadMarketplace.sol`

*   **Functionality**: This contract facilitates the buying and selling of NFTs.
*   **Key Features**:
    *   `listNFT()`: Allows NFT owners to list their tokens for sale.
    *   `buyNFT()`: Enables users to purchase listed NFTs.
    *   `cancelListing()`: Allows sellers to remove their listings.
    *   **Ownership**: This contract is also `Ownable`.

## 3. Frontend

The frontend is a single-page application (SPA) built with **React**.

*   **Framework**: [Vite](https://vitejs.dev/) is used as the build tool for a fast development experience.
*   **Routing**: `react-router-dom` is used for client-side routing, enabling navigation between different pages (`/`, `/create`, `/nft/:id`, `/about`).
*   **Wallet Integration**:
    *   **Ethers.js**: Used to interact with the Ethereum blockchain (and Monad testnet).
    *   **Phantom Wallet**: The primary wallet for connecting to the application.
*   **State Management**: React Hooks (`useState`, `useEffect`) are used for managing component state.
*   **Key Components**:
    *   `App.jsx`: The main component that handles routing, wallet connection, and fetching NFT data.
    *   `TopNavbar.jsx`: The navigation bar.
    *   `HomePage.jsx`: Displays all available NFTs.
    *   `CreateNFTPage.jsx`: A form for creating new NFTs.
    *   `NFTDetailPage.jsx`: Shows the details of a single NFT.
*   **Styling**: CSS files are provided for each component.

## 4. Backend

The backend is a Node.js application using the **Express.js** framework.

*   **Functionality**: Its primary role is to handle off-chain operations, specifically uploading NFT images and metadata to IPFS via the Pinata service.
*   **Database**: **Firebase Realtime Database** is used to store and retrieve information about NFT collections.
*   **API Endpoints**:
    *   `GET /collections`: Retrieves all NFT collections.
    *   `GET /collections/:creatorWallet`: Retrieves collections for a specific creator.
    *   `POST /upload-nft`: Handles the upload of an NFT's image and metadata. It uses `multer` for file handling.
*   **Environment Variables**: The application uses a `.env` file to store sensitive information like API keys and database URLs.

## 5. Workflow

### Minting an NFT

1.  A user fills out the form on the `CreateNFTPage` and selects an image.
2.  The frontend sends the image and metadata to the backend's `/upload-nft` endpoint.
3.  The backend uploads the image to **Pinata** (IPFS).
4.  The backend then uploads a JSON metadata file (containing the image's IPFS URI) to **Pinata**.
5.  The backend saves the new NFT's information to the **Firebase Realtime Database**.
6.  The frontend receives the metadata's IPFS URI from the backend.
7.  The user's wallet is prompted to sign a transaction to call the `mint()` function on the `NadNFT` smart contract, passing the metadata URI.
8.  The `NadNFT` contract mints the new token and assigns it to the user.

### Buying an NFT

1.  A user clicks the "Buy" button on an NFT displayed on the `HomePage`.
2.  The frontend calls the `buyNFT()` function on the `NadMarketplace` contract.
3.  The user's wallet is prompted to approve the transaction, which includes the payment for the NFT.
4.  The `NadMarketplace` contract transfers the NFT to the buyer and the funds to the seller.

## 6. Technologies Used

*   **Frontend**: React, Vite, Ethers.js, `react-router-dom`
*   **Backend**: Node.js, Express.js, Firebase Realtime Database, Pinata
*   **Smart Contracts**: Solidity, OpenZeppelin, Hardhat
*   **Blockchain**: Monad Testnet
