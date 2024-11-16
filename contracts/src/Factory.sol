// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./Crowdfunding.sol";

contract CrowdfundingFactory {
    event CampaignCreated(
        address indexed fundraiser,
        address indexed campaignAddress,
        string name,
        string description,
        uint256 target,
        uint256 deadline
    );

    // Function to create a new Crowdfunding campaign
    function createCampaign(
        string memory _name,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        uint256 _withdrawalLimit,
        string[] memory milestoneDescriptions
    ) external {
        require(_target > 0, "Target amount must be greater than zero");
        require(_deadline > block.timestamp, "Deadline must be in the future");

        // Deploy a new Crowdfunding contract
        Crowdfunding newCampaign = new Crowdfunding(
            _name,
            _description,
            _target,
            _deadline,
            _withdrawalLimit,
            milestoneDescriptions
        );

        // Emit event to log the campaign creation
        emit CampaignCreated(
            msg.sender,
            address(newCampaign),
            _name,
            _description,
            _target,
            _deadline
        );
    }
}
