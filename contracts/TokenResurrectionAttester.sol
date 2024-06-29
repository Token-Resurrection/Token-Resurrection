// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@ethereum-attestation-service/eas-contracts/contracts/IEAS.sol";
import "@ethereum-attestation-service/eas-contracts/contracts/resolver/SchemaResolver.sol";


contract TokenResurrectionAttester is SchemaResolver {
    bytes32 private immutable _merkleRoot;
    
    event AttestationEvent(bytes);
  struct ExtraData 
    {
        address lockedContractAddress;
         string aggrement;
         address recovertokenAddress ;
         string tokenSymbol;
         bytes proof;
    }

    mapping(address => bool) private _attested;


    constructor(IEAS eas, bytes32 merkleRoot) SchemaResolver(eas) {
        _merkleRoot = merkleRoot;
    }

    function verifyProof(
        bytes32[] calldata proof,
        bytes32 leaf
    ) external view returns (bool) {
        return MerkleProof.verify(proof, _merkleRoot, leaf);
    }


function onAttest(Attestation calldata attestation, uint256 /*value*/) internal override returns (bool) {
    require(!_attested[attestation.attester], "User has already attested");
    ExtraData memory AttestedData;
    bytes32[] memory finalProof;
    
        
       bytes32 leaf = keccak256(abi.encodePacked(attestation.attester));

       bytes memory verifiableData = convertData(attestation.data);
       AttestedData = abi.decode(verifiableData, (ExtraData));
       (finalProof) = abi.decode(AttestedData.proof,(bytes32[]));


    require(MerkleProof.verify(finalProof, _merkleRoot, leaf), "Invalid proof");

    emit AttestationEvent(attestation.data);

        _attested[attestation.attester] = true;
        return true;
}

function convertData(bytes memory input) public pure returns (bytes memory) {
    // Create output bytes, 32 bytes longer than input
    bytes memory output = new bytes(input.length + 32);

    // Set first 32 bytes to 0x20
    assembly {
        mstore(add(output, 32), 0x20)
    }

    // Copy the input data after the first 32 bytes
    for (uint i = 0; i < input.length; i++) {
        output[i + 32] = input[i];
    }

    return output;
}


    function onRevoke(Attestation calldata /*attestation*/, uint256 /*value*/) internal pure override returns (bool) {
        return true;
    }

    
}