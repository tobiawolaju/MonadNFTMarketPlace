// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NadMarketplace is Ownable {
    struct Listing {
        address nftContract;
        uint256 tokenId;
        uint256 price;
        address seller;
        bool active;
    }

    mapping(address => mapping(uint256 => Listing)) public listings;
    uint256 public listingCount;

    event ItemListed(address indexed nftContract, uint256 indexed tokenId, uint256 price, address indexed seller);
    event ItemSold(address indexed nftContract, uint256 indexed tokenId, uint256 price, address indexed seller, address buyer);
    event ItemCanceled(address indexed nftContract, uint256 indexed tokenId, address indexed seller);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function listNFT(
        address _nftContract,
        uint256 _tokenId,
        uint256 _price
    ) public {
        require(_price > 0, "Price must be greater than 0");
        require(listings[_nftContract][_tokenId].seller == address(0), "NFT already listed");

        IERC721 nftContract = IERC721(_nftContract);
        require(nftContract.ownerOf(_tokenId) == msg.sender, "You don't own this NFT");
        require(nftContract.getApproved(_tokenId) == address(this), "Marketplace not approved to transfer NFT");

        listingCount++;
        listings[_nftContract][_tokenId] = Listing(
            _nftContract,
            _tokenId,
            _price,
            msg.sender,
            true
        );

        emit ItemListed(_nftContract, _tokenId, _price, msg.sender);
    }

    function buyNFT(
        address _nftContract,
        uint256 _tokenId
    ) public payable {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.active, "NFT not active for sale");
        require(msg.value == listing.price, "Incorrect price");
        require(listing.seller != msg.sender, "Cannot buy your own NFT");

        // Transfer NFT from seller to buyer
        IERC721(listing.nftContract).safeTransferFrom(listing.seller, msg.sender, listing.tokenId);

        // Transfer payment to seller
        (bool success, ) = payable(listing.seller).call{value: msg.value}("");
        require(success, "Failed to transfer funds to seller");

        listing.active = false;
        emit ItemSold(_nftContract, _tokenId, listing.price, listing.seller, msg.sender);
    }

    function cancelListing(
        address _nftContract,
        uint256 _tokenId
    ) public {
        Listing storage listing = listings[_nftContract][_tokenId];
        require(listing.active, "Listing is not active");
        require(listing.seller == msg.sender, "You are not the seller of this NFT");

        listing.active = false;
        emit ItemCanceled(_nftContract, _tokenId, msg.sender);
    }

    // Function to allow the owner to withdraw accidentally sent ERC721 tokens
    function withdrawERC721(address _nftContract, uint256 _tokenId) public onlyOwner {
        IERC721 nftContract = IERC721(_nftContract);
        require(nftContract.ownerOf(_tokenId) == address(this), "Marketplace does not own this NFT");
        nftContract.transferFrom(address(this), owner(), _tokenId);
    }

    // Function to allow the owner to withdraw accidentally sent Ether
    function withdrawEther() public onlyOwner {
        (bool success, ) = owner().call{value: address(this).balance}("");
        require(success, "Failed to withdraw Ether");
    }
}
