'npx hardhat clean' running (wd: /work/EVM/Ryan/zoombies-vip-nft)
'npx hardhat clean --global' running (wd: /work/EVM/Ryan/zoombies-vip-nft)
'npx hardhat compile --force' running
Downloading compiler 0.8.17
Generating typings for: 23 artifacts in dir: typechain-types for target: ethers-v5
Successfully generated 56 typings!
Compiled 24 Solidity files successfully

(node:314242) ExperimentalWarning: stream/web is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
Warning: Unreachable code.
   --> @openzeppelin/contracts/token/ERC721/ERC721.sol:210:9:
    |
210 |         require(_checkOnERC721Received(from, to, tokenId, data), "ERC721: transfer to non ERC721Receiver implementer");
    |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
  --> contracts/ZoombiesVip.sol:78:24:
   |
78 |     function _transfer(address from, address to, uint256 tokenId) internal override(ERC721) {
   |                        ^^^^^^^^^^^^


Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
  --> contracts/ZoombiesVip.sol:78:38:
   |
78 |     function _transfer(address from, address to, uint256 tokenId) internal override(ERC721) {
   |                                      ^^^^^^^^^^


Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
  --> contracts/ZoombiesVip.sol:78:50:
   |
78 |     function _transfer(address from, address to, uint256 tokenId) internal override(ERC721) {
   |                                                  ^^^^^^^^^^^^^^^


Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
  --> contracts/ZoombiesVip.sol:82:28:
   |
82 |     function _safeTransfer(address from, address to, uint256 tokenId, bytes memory data) internal virtual override(ERC721) {
   |                            ^^^^^^^^^^^^


Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
  --> contracts/ZoombiesVip.sol:82:42:
   |
82 |     function _safeTransfer(address from, address to, uint256 tokenId, bytes memory data) internal virtual override(ERC721) {
   |                                          ^^^^^^^^^^


Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
  --> contracts/ZoombiesVip.sol:82:54:
   |
82 |     function _safeTransfer(address from, address to, uint256 tokenId, bytes memory data) internal virtual override(ERC721) {
   |                                                      ^^^^^^^^^^^^^^^


Warning: Unused function parameter. Remove or comment out the variable name to silence this warning.
  --> contracts/ZoombiesVip.sol:82:71:
   |
82 |     function _safeTransfer(address from, address to, uint256 tokenId, bytes memory data) internal virtual override(ERC721) {
   |                                                                       ^^^^^^^^^^^^^^^^^


Warning: Unused local variable.
   --> contracts/ZoombiesVip.sol:124:9:
    |
124 |         address owner = _ownerOf(tokenId);
    |         ^^^^^^^^^^^^^


Warning: Function state mutability can be restricted to pure
  --> contracts/ZoombiesVip.sol:78:5:
   |
78 |     function _transfer(address from, address to, uint256 tokenId) internal override(ERC721) {
   |     ^ (Relevant source part starts here and spans across multiple lines).



[93m
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) performs a multiplication on the result of a division:
	- denominator = denominator / twos (node_modules/@openzeppelin/contracts/utils/math/Math.sol#102)
	- inverse = (3 * denominator) ^ 2 (node_modules/@openzeppelin/contracts/utils/math/Math.sol#117)
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) performs a multiplication on the result of a division:
	- denominator = denominator / twos (node_modules/@openzeppelin/contracts/utils/math/Math.sol#102)
	- inverse *= 2 - denominator * inverse (node_modules/@openzeppelin/contracts/utils/math/Math.sol#121)
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) performs a multiplication on the result of a division:
	- denominator = denominator / twos (node_modules/@openzeppelin/contracts/utils/math/Math.sol#102)
	- inverse *= 2 - denominator * inverse (node_modules/@openzeppelin/contracts/utils/math/Math.sol#122)
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) performs a multiplication on the result of a division:
	- denominator = denominator / twos (node_modules/@openzeppelin/contracts/utils/math/Math.sol#102)
	- inverse *= 2 - denominator * inverse (node_modules/@openzeppelin/contracts/utils/math/Math.sol#123)
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) performs a multiplication on the result of a division:
	- denominator = denominator / twos (node_modules/@openzeppelin/contracts/utils/math/Math.sol#102)
	- inverse *= 2 - denominator * inverse (node_modules/@openzeppelin/contracts/utils/math/Math.sol#124)
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) performs a multiplication on the result of a division:
	- denominator = denominator / twos (node_modules/@openzeppelin/contracts/utils/math/Math.sol#102)
	- inverse *= 2 - denominator * inverse (node_modules/@openzeppelin/contracts/utils/math/Math.sol#125)
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) performs a multiplication on the result of a division:
	- denominator = denominator / twos (node_modules/@openzeppelin/contracts/utils/math/Math.sol#102)
	- inverse *= 2 - denominator * inverse (node_modules/@openzeppelin/contracts/utils/math/Math.sol#126)
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) performs a multiplication on the result of a division:
	- prod0 = prod0 / twos (node_modules/@openzeppelin/contracts/utils/math/Math.sol#105)
	- result = prod0 * inverse (node_modules/@openzeppelin/contracts/utils/math/Math.sol#132)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#divide-before-multiply[0m
[93m
Checkpoints._insert(Checkpoints.Checkpoint[],uint32,uint224) (node_modules/@openzeppelin/contracts/utils/Checkpoints.sol#136-161) uses a dangerous strict equality:
	- last._blockNumber == key (node_modules/@openzeppelin/contracts/utils/Checkpoints.sol#151)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities[0m
[93m
Votes._moveDelegateVotes(address,address,uint256).oldValue_scope_0 (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#167) is a local variable never initialized
Votes._moveDelegateVotes(address,address,uint256).newValue_scope_1 (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#167) is a local variable never initialized
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#uninitialized-local-variables[0m
[93m
Votes._transferVotingUnits(address,address,uint256) (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#139-151) ignores return value by _totalCheckpoints.push(_add,amount) (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#145)
Votes._transferVotingUnits(address,address,uint256) (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#139-151) ignores return value by _totalCheckpoints.push(_subtract,amount) (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#148)
ERC721._checkOnERC721Received(address,address,uint256,bytes) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#429-451) ignores return value by IERC721Receiver(to).onERC721Received(_msgSender(),from,tokenId,data) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#436-447)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#unused-return[0m
[92m
ZoombiesVIP.getVipStatus(address).owner (contracts/ZoombiesVip.sol#109) shadows:
	- Ownable.owner() (node_modules/@openzeppelin/contracts/access/Ownable.sol#43-45) (function)
ZoombiesVIP.getTokenByOwner(address).owner (contracts/ZoombiesVip.sol#113) shadows:
	- Ownable.owner() (node_modules/@openzeppelin/contracts/access/Ownable.sol#43-45) (function)
ZoombiesVIP.unlock(uint256).owner (contracts/ZoombiesVip.sol#124) shadows:
	- Ownable.owner() (node_modules/@openzeppelin/contracts/access/Ownable.sol#43-45) (function)
ZoombiesVIP.upgrade(address).owner (contracts/ZoombiesVip.sol#146) shadows:
	- Ownable.owner() (node_modules/@openzeppelin/contracts/access/Ownable.sol#43-45) (function)
ZoombiesVIP.revoke(address).owner (contracts/ZoombiesVip.sol#183) shadows:
	- Ownable.owner() (node_modules/@openzeppelin/contracts/access/Ownable.sol#43-45) (function)
ZoombiesVIP.isRevoked(address).owner (contracts/ZoombiesVip.sol#213) shadows:
	- Ownable.owner() (node_modules/@openzeppelin/contracts/access/Ownable.sol#43-45) (function)
ZoombiesVIP.isUpgraded(address).owner (contracts/ZoombiesVip.sol#218) shadows:
	- Ownable.owner() (node_modules/@openzeppelin/contracts/access/Ownable.sol#43-45) (function)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#local-variable-shadowing[0m
[92m
Variable 'Votes._moveDelegateVotes(address,address,uint256).oldValue (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#163)' in Votes._moveDelegateVotes(address,address,uint256) (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#156-171) potentially used before declaration: (oldValue,newValue) = _delegateCheckpoints[to].push(_add,amount) (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#167)
Variable 'Votes._moveDelegateVotes(address,address,uint256).newValue (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#163)' in Votes._moveDelegateVotes(address,address,uint256) (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#156-171) potentially used before declaration: (oldValue,newValue) = _delegateCheckpoints[to].push(_add,amount) (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#167)
Variable 'ERC721._checkOnERC721Received(address,address,uint256,bytes).retval (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#436)' in ERC721._checkOnERC721Received(address,address,uint256,bytes) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#429-451) potentially used before declaration: retval == IERC721Receiver.onERC721Received.selector (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#437)
Variable 'ERC721._checkOnERC721Received(address,address,uint256,bytes).reason (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#438)' in ERC721._checkOnERC721Received(address,address,uint256,bytes) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#429-451) potentially used before declaration: reason.length == 0 (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#439)
Variable 'ERC721._checkOnERC721Received(address,address,uint256,bytes).reason (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#438)' in ERC721._checkOnERC721Received(address,address,uint256,bytes) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#429-451) potentially used before declaration: revert(uint256,uint256)(32 + reason,mload(uint256)(reason)) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#444)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#pre-declaration-usage-of-local-variables[0m
[92m
Reentrancy in ZoombiesVIP.award(address,ZoombiesVIP.viptypes) (contracts/ZoombiesVip.sol#172-181):
	External calls:
	- tokenId = safeMint(recipient,SET this ryan) (contracts/ZoombiesVip.sol#176)
		- IERC721Receiver(to).onERC721Received(_msgSender(),from,tokenId,data) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#436-447)
	State variables written after the call(s):
	- lock(tokenId) (contracts/ZoombiesVip.sol#180)
		- _tokenLocked[tokenId] = true (contracts/ZoombiesVip.sol#118)
	- _tokenOwned[recipient] = tokenId (contracts/ZoombiesVip.sol#177)
	- _vipStatusToOwner[recipient] = _tokenType (contracts/ZoombiesVip.sol#178)
Reentrancy in ZoombiesVIP.buy(address,ZoombiesVIP.viptypes) (contracts/ZoombiesVip.sol#128-144):
	External calls:
	- tokenId = safeMint(recipient,SET this Ryan) (contracts/ZoombiesVip.sol#139)
		- IERC721Receiver(to).onERC721Received(_msgSender(),from,tokenId,data) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#436-447)
	State variables written after the call(s):
	- lock(tokenId) (contracts/ZoombiesVip.sol#143)
		- _tokenLocked[tokenId] = true (contracts/ZoombiesVip.sol#118)
	- _tokenOwned[recipient] = tokenId (contracts/ZoombiesVip.sol#140)
	- _vipStatusToOwner[recipient] = _tokenType (contracts/ZoombiesVip.sol#141)
Reentrancy in ZoombiesVIP.safeMint(address,string) (contracts/ZoombiesVip.sol#42-48):
	External calls:
	- _safeMint(to,tokenId) (contracts/ZoombiesVip.sol#45)
		- IERC721Receiver(to).onERC721Received(_msgSender(),from,tokenId,data) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#436-447)
	State variables written after the call(s):
	- _setTokenURI(tokenId,uri) (contracts/ZoombiesVip.sol#46)
		- _tokenURIs[tokenId] = _tokenURI (node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol#47)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-2[0m
[92m
Reentrancy in ZoombiesVIP.award(address,ZoombiesVIP.viptypes) (contracts/ZoombiesVip.sol#172-181):
	External calls:
	- tokenId = safeMint(recipient,SET this ryan) (contracts/ZoombiesVip.sol#176)
		- IERC721Receiver(to).onERC721Received(_msgSender(),from,tokenId,data) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#436-447)
	Event emitted after the call(s):
	- Awarded(recipient,tokenId,uint8(_tokenType)) (contracts/ZoombiesVip.sol#179)
	- Locked(tokenId) (contracts/ZoombiesVip.sol#119)
		- lock(tokenId) (contracts/ZoombiesVip.sol#180)
Reentrancy in ZoombiesVIP.buy(address,ZoombiesVIP.viptypes) (contracts/ZoombiesVip.sol#128-144):
	External calls:
	- tokenId = safeMint(recipient,SET this Ryan) (contracts/ZoombiesVip.sol#139)
		- IERC721Receiver(to).onERC721Received(_msgSender(),from,tokenId,data) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#436-447)
	Event emitted after the call(s):
	- Buy(recipient,tokenId,uint8(_tokenType)) (contracts/ZoombiesVip.sol#142)
	- Locked(tokenId) (contracts/ZoombiesVip.sol#119)
		- lock(tokenId) (contracts/ZoombiesVip.sol#143)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities-3[0m
[92m
Votes.delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32) (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#103-120) uses timestamp for comparisons
	Dangerous comparisons:
	- require(bool,string)(block.timestamp <= expiry,Votes: signature expired) (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#111)
Lock.constructor(uint256) (contracts/Lock.sol#13-21) uses timestamp for comparisons
	Dangerous comparisons:
	- require(bool,string)(block.timestamp < _unlockTime,Unlock time should be in the future) (contracts/Lock.sol#14-17)
Lock.withdraw() (contracts/Lock.sol#23-33) uses timestamp for comparisons
	Dangerous comparisons:
	- require(bool,string)(block.timestamp >= unlockTime,You can't withdraw yet) (contracts/Lock.sol#27)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#block-timestamp[0m
[92m
ERC721._checkOnERC721Received(address,address,uint256,bytes) (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#429-451) uses assembly
	- INLINE ASM (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#443-445)
Address._revert(bytes,string) (node_modules/@openzeppelin/contracts/utils/Address.sol#231-243) uses assembly
	- INLINE ASM (node_modules/@openzeppelin/contracts/utils/Address.sol#236-239)
Checkpoints._unsafeAccess(Checkpoints.Checkpoint[],uint256) (node_modules/@openzeppelin/contracts/utils/Checkpoints.sol#212-217) uses assembly
	- INLINE ASM (node_modules/@openzeppelin/contracts/utils/Checkpoints.sol#213-216)
Checkpoints._unsafeAccess(Checkpoints.Checkpoint224[],uint256) (node_modules/@openzeppelin/contracts/utils/Checkpoints.sol#376-385) uses assembly
	- INLINE ASM (node_modules/@openzeppelin/contracts/utils/Checkpoints.sol#381-384)
Checkpoints._unsafeAccess(Checkpoints.Checkpoint160[],uint256) (node_modules/@openzeppelin/contracts/utils/Checkpoints.sol#544-553) uses assembly
	- INLINE ASM (node_modules/@openzeppelin/contracts/utils/Checkpoints.sol#549-552)
Strings.toString(uint256) (node_modules/@openzeppelin/contracts/utils/Strings.sol#18-38) uses assembly
	- INLINE ASM (node_modules/@openzeppelin/contracts/utils/Strings.sol#24-26)
	- INLINE ASM (node_modules/@openzeppelin/contracts/utils/Strings.sol#30-32)
ECDSA.tryRecover(bytes32,bytes) (node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#55-72) uses assembly
	- INLINE ASM (node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#63-67)
Math.mulDiv(uint256,uint256,uint256) (node_modules/@openzeppelin/contracts/utils/math/Math.sol#55-135) uses assembly
	- INLINE ASM (node_modules/@openzeppelin/contracts/utils/math/Math.sol#66-70)
	- INLINE ASM (node_modules/@openzeppelin/contracts/utils/math/Math.sol#86-93)
	- INLINE ASM (node_modules/@openzeppelin/contracts/utils/math/Math.sol#100-109)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#assembly-usage[0m
[92m
Different versions of Solidity are used:
	- Version used: ['^0.8.0', '^0.8.1', '^0.8.9']
	- ^0.8.0 (node_modules/@openzeppelin/contracts/access/Ownable.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/governance/utils/IVotes.sol#3)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#3)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/utils/Checkpoints.sol#5)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/utils/Context.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/utils/Counters.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/utils/Strings.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/utils/cryptography/EIP712.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/utils/math/Math.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol#5)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol#4)
	- ^0.8.0 (node_modules/@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol#4)
	- ^0.8.1 (node_modules/@openzeppelin/contracts/utils/Address.sol#4)
	- ^0.8.9 (contracts/Lock.sol#2)
	- ^0.8.9 (contracts/ZoombiesVip.sol#2)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#different-pragma-directives-are-used[0m
[92m
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/access/Ownable.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/governance/utils/IVotes.sol#3) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#3) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Votes.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol#4) allows old versions
Pragma version^0.8.1 (node_modules/@openzeppelin/contracts/utils/Address.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/Checkpoints.sol#5) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/Context.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/Counters.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/Strings.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/cryptography/EIP712.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/math/Math.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol#5) allows old versions
Pragma version^0.8.9 (contracts/Lock.sol#2) allows old versions
Pragma version^0.8.9 (contracts/ZoombiesVip.sol#2) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol#4) allows old versions
Pragma version^0.8.0 (node_modules/@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol#4) allows old versions
solc-0.8.17 is not recommended for deployment
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-versions-of-solidity[0m
[92m
Low level call in Address.sendValue(address,uint256) (node_modules/@openzeppelin/contracts/utils/Address.sol#60-65):
	- (success) = recipient.call{value: amount}() (node_modules/@openzeppelin/contracts/utils/Address.sol#63)
Low level call in Address.functionCallWithValue(address,bytes,uint256,string) (node_modules/@openzeppelin/contracts/utils/Address.sol#128-137):
	- (success,returndata) = target.call{value: value}(data) (node_modules/@openzeppelin/contracts/utils/Address.sol#135)
Low level call in Address.functionStaticCall(address,bytes,string) (node_modules/@openzeppelin/contracts/utils/Address.sol#155-162):
	- (success,returndata) = target.staticcall(data) (node_modules/@openzeppelin/contracts/utils/Address.sol#160)
Low level call in Address.functionDelegateCall(address,bytes,string) (node_modules/@openzeppelin/contracts/utils/Address.sol#180-187):
	- (success,returndata) = target.delegatecall(data) (node_modules/@openzeppelin/contracts/utils/Address.sol#185)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#low-level-calls[0m
[92m
Function Votes.DOMAIN_SEPARATOR() (node_modules/@openzeppelin/contracts/governance/utils/Votes.sol#203-205) is not in mixedCase
Variable EIP712._CACHED_DOMAIN_SEPARATOR (node_modules/@openzeppelin/contracts/utils/cryptography/EIP712.sol#31) is not in mixedCase
Variable EIP712._CACHED_CHAIN_ID (node_modules/@openzeppelin/contracts/utils/cryptography/EIP712.sol#32) is not in mixedCase
Variable EIP712._CACHED_THIS (node_modules/@openzeppelin/contracts/utils/cryptography/EIP712.sol#33) is not in mixedCase
Variable EIP712._HASHED_NAME (node_modules/@openzeppelin/contracts/utils/cryptography/EIP712.sol#35) is not in mixedCase
Variable EIP712._HASHED_VERSION (node_modules/@openzeppelin/contracts/utils/cryptography/EIP712.sol#36) is not in mixedCase
Variable EIP712._TYPE_HASH (node_modules/@openzeppelin/contracts/utils/cryptography/EIP712.sol#37) is not in mixedCase
Parameter ZoombiesVIP.buy(address,ZoombiesVIP.viptypes)._tokenType (contracts/ZoombiesVip.sol#128) is not in mixedCase
Parameter ZoombiesVIP.award(address,ZoombiesVIP.viptypes)._tokenType (contracts/ZoombiesVip.sol#172) is not in mixedCase
Enum ZoombiesVIP.viptypes (contracts/ZoombiesVip.sol#88) is not in CapWords
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#conformance-to-solidity-naming-conventions[0m
[92m
Lock.owner (contracts/Lock.sol#9) should be immutable 
Lock.unlockTime (contracts/Lock.sol#8) should be immutable 
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#state-variables-that-could-be-declared-immutable[0m
. analyzed (23 contracts with 84 detectors), 84 result(s) found
