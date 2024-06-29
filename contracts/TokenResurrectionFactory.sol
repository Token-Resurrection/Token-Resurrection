
pragma solidity ^0.8.0;

import "./TokenResurrectionAttester.sol";

contract TokenResurrectionFactory {
    
    mapping (address => address[])  public deployedContracts; 

    event ContractDeployed(address indexed contractAddress, IEAS eas, bytes32 merkleRoot);

    function deploy(IEAS _eas, bytes32 _merkleRoot) external {
        TokenResurrectionAttester newContract = new TokenResurrectionAttester(_eas, _merkleRoot);
        deployedContracts[msg.sender].push(address(newContract));
        emit ContractDeployed(address(newContract), _eas, _merkleRoot);
    }

    function getDeployedContracts() external view returns (address[] memory) {
        return deployedContracts[msg.sender];
    }
}