// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/CrowdfundingFactory.sol";

contract DeployFactory is Script {
    function run() external {
        // Load the deployer account
        vm.startBroadcast();

        // Deploy the CrowdfundingFactory contract
        CrowdfundingFactory factory = new CrowdfundingFactory();

        // Log the deployed factory address
        console.log("CrowdfundingFactory deployed to:", address(factory));

        vm.stopBroadcast();
    }
}
