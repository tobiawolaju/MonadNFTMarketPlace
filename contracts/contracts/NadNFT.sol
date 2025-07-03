// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NadNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    address private _marketplaceAddress;

    constructor(address initialOwner) ERC721("NadNFT", "NNFT") Ownable(initialOwner) {
        _marketplaceAddress = 0x1234567890AbcdEF1234567890aBcdef12345678;
    }

    function mint(address to, string memory uri) public payable {
        require(msg.value >= 0.05 ether, "Minting fee is 0.05 ether");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        (bool success, ) = _marketplaceAddress.call{value: msg.value * 5 / 100}("");
        require(success, "Failed to send royalty");
    }

    function transferWithRoyalty(address to, uint256 tokenId) public payable {
        require(msg.value >= 0.05 ether, "Transfer fee is 0.05 ether");
        (bool success, ) = _marketplaceAddress.call{value: msg.value * 5 / 100}("");
        require(success, "Failed to send royalty");

        safeTransferFrom(msg.sender, to, tokenId);
    }

    // The following functions are overrides required by Solidity.
    function _update(address to, uint256 tokenId, address auth) internal override(ERC721) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721) {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
