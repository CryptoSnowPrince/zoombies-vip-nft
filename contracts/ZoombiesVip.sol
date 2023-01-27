// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

interface IERC5192 {
  /// @notice Emitted when the locking status is changed to locked.
  /// @dev If a token is minted and the status is locked, this event should be emitted.
  /// @param tokenId The identifier for a token.
  event Locked(uint256 tokenId);

  /// @notice Emitted when the locking status is changed to unlocked.
  /// @dev If a token is minted and the status is unlocked, this event should be emitted.
  /// @param tokenId The identifier for a token.
  event Unlocked(uint256 tokenId);

  /// @notice Returns the locking status of an Soulbound Token
  /// @dev SBTs assigned to zero address are considered invalid, and queries
  /// about them do throw.
  /// @param tokenId The identifier for an SBT.
  function locked(uint256 tokenId) external view returns (bool);
}


/// @custom:security-contact contactus@zoombies.world
contract ZoombiesVIP is ERC721, ERC721URIStorage, Ownable, EIP712, ERC721Votes, IERC5192 {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Zoombies VIP", "ZVIP") EIP712("Zoombies VIP", "1") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://";
    }

    function safeMint(address to, string memory uri) public onlyOwner returns(uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        return tokenId;
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Votes)
    {
        super._afterTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /* our custom stuff */

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC5192).interfaceId || super.supportsInterface(interfaceId);
    }

    // Variables
    mapping (uint256 => bool) private _tokenLocked;
    mapping (address => bool) private _revoked; // keeps track of revoked NFTs
    mapping (address => uint256) private _upgraded; // keeps track of upgraded NFTs

    // Events
    event Buy(address indexed owner, uint256 indexed tokenId);
    event Revoked(address indexed owner, uint256 indexed tokenId);
    event Upgraded(address indexed owner, uint256 indexed tokenId);
    event Awarded(address indexed owner, uint256 indexed tokenId);

    // Functions
    function lock(uint256 tokenId) public onlyOwner {
        _tokenLocked[tokenId] = true;
        emit Locked(tokenId);
    }

    function unlock(uint256 tokenId) public onlyOwner {
        _tokenLocked[tokenId] = false;
        emit Unlocked(tokenId);
    }

    function buy(address recipient) public payable {
        // require sufficient funds
        require(msg.value >= price(), "Insufficient funds");

        // mint a new NFT and transfer to recipient
        uint256 tokenId = safeMint(recipient, "test");
        emit Buy(msg.sender, tokenId);
    }

    function upgrade(uint256 tokenId) public payable {
        // require ownership of NFT
        require(_isApprovedOrOwner(msg.sender, tokenId), "Sender does not own NFT");

        // require payment of upgrade fee
        require(msg.value >= upgradeFee(), "Insufficient funds for upgrade");

        // upgrade NFT
        _upgraded[msg.sender] = tokenId;
        emit Upgraded(msg.sender, tokenId);
    }

    function award(address recipient) public onlyOwner{
        // transfer NFT to recipient
        // mint a new NFT and transfer to recipient
        uint256 tokenId = safeMint(recipient, "test");
        emit Awarded(recipient, tokenId);
    }

    function revoke(uint256 tokenId) public onlyOwner {
        // get owner

        // revoke NFT
        _revoked[msg.sender] = true;
        emit Revoked(msg.sender, tokenId);
    }

    function locked(uint256 tokenId) public view returns (bool) {
        return _tokenLocked[tokenId];
    }

    function price() public pure returns (uint256) {
        // returns the price of buying a new NFT
        return 100 ether;
    }

    function upgradeFee() public pure returns (uint256) {
        // returns the upgrade fee for upgrading an NFT
        return 50 ether;
    }

    function isRevoked(uint256 tokenId) public view returns (bool) {
        // returns true if NFT is revoked, false otherwise
        return _revoked[_ownerOf(tokenId)];
    }

    function isUpgraded(uint256 tokenId) public view returns (bool) {
        // returns true if NFT is upgraded, false otherwise
        return _upgraded[_ownerOf(tokenId)] == tokenId;
    }

    function withdraw() external onlyOwner {
        payable(_msgSender()).transfer(address(this).balance);
    }

}