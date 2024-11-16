// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Crowdfunding {
    struct Milestone {
        string description;
        uint256 votes; // Total voting power for this milestone
        bool completed; // Tracks if the milestone has been funded
        bool withdrawalRequested; // Flag to track if the fundraiser has requested a withdrawal for the milestone
    }

    string public name; // Name of the campaign
    string public description; // Description of the campaign
    uint256 public target; // Target amount in wei
    uint256 public deadline; // Campaign end time (timestamp)
    uint256 public withdrawalLimit; // Maximum amount withdrawable at a time
    uint256 public amountRaised; // Total amount raised
    Milestone[] public milestones; // Array of milestones for this campaign
    uint256 public totalContributions;

    mapping(address => uint256) public contributions; // Tracks contributions per address
    address[] private contributorList; // Maintains a list of contributors
    address public fundraiser; // Address of the fundraiser
    bool public campaignEnded; // Flag to check if the campaign has ended

    uint256 public majority; // Majority threshold for milestone votes (calculated dynamically)

    modifier onlyFundraiser() {
        require(
            msg.sender == fundraiser,
            "Only fundraiser can perform this action"
        );
        _;
    }

    modifier campaignActive() {
        require(block.timestamp < deadline, "Campaign has ended");
        require(!campaignEnded, "Campaign has been closed");
        _;
    }

    modifier milestoneExists(uint256 index) {
        require(index < milestones.length, "Milestone does not exist");
        _;
    }

    event ContributionMade(address indexed contributor, uint256 amount);
    event VoteCasted(
        address indexed voter,
        uint256 milestoneIndex,
        uint256 votes
    );
    event FundsReleased(uint256 milestoneIndex, uint256 amount);
    event CampaignEnded(bool successful);
    event RefundIssued(address indexed contributor, uint256 amount);
    event FundsRequested(uint256 milestoneIndex);

    constructor(
        string memory _name,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        uint256 _withdrawalLimit,
        string[] memory milestoneDescriptions
    ) {
        require(_deadline > block.timestamp, "Deadline must be in the future");
        require(_target > 0, "Target amount must be greater than zero");
        require(
            _withdrawalLimit > 0,
            "Withdrawal limit must be greater than zero"
        );

        name = _name;
        description = _description;
        target = _target;
        deadline = _deadline;
        withdrawalLimit = _withdrawalLimit;
        fundraiser = msg.sender;

        // Add milestones
        for (uint256 i = 0; i < milestoneDescriptions.length; i++) {
            milestones.push(
                Milestone({
                    description: milestoneDescriptions[i],
                    votes: 0,
                    completed: false,
                    withdrawalRequested: false // Initially, withdrawal is not requested
                })
            );
        }
    }

    // Function to contribute to the campaign
    function contribute() external payable campaignActive {
        require(msg.value > 0, "Contribution must be greater than zero");

        if (contributions[msg.sender] == 0) {
            contributorList.push(msg.sender);
        }

        contributions[msg.sender] += msg.value;
        totalContributions++;
        amountRaised += msg.value;

        // Recalculate majority threshold
        majority = (amountRaised * 51) / 100;

        emit ContributionMade(msg.sender, msg.value);
    }

    // Function to request withdrawal for a milestone (by the fundraiser)
    function requestWithdrawalForMilestone(
        uint256 index
    ) external onlyFundraiser milestoneExists(index) {
        require(!milestones[index].completed, "Milestone already completed");

        milestones[index].withdrawalRequested = true; // Set the withdrawalRequested flag
        emit FundsRequested(index);
    }

    // Function to vote on a milestone (contributors can vote only after the withdrawal request)
    function voteOnMilestone(uint256 index) external milestoneExists(index) {
        require(contributions[msg.sender] > 0, "Only contributors can vote");
        require(!milestones[index].completed, "Milestone already completed");
        require(
            milestones[index].withdrawalRequested,
            "Withdrawal must be requested before voting"
        );

        milestones[index].votes += contributions[msg.sender];
        emit VoteCasted(msg.sender, index, contributions[msg.sender]);
    }

    // Function to release funds for a milestone
    function releaseFunds(
        uint256 index
    ) external onlyFundraiser milestoneExists(index) {
        require(!milestones[index].completed, "Milestone already completed");
        require(
            milestones[index].votes >= majority,
            "Majority approval not reached"
        );
        require(
            address(this).balance >= withdrawalLimit,
            "Not enough funds available"
        );

        milestones[index].completed = true;
        payable(fundraiser).transfer(withdrawalLimit);

        emit FundsReleased(index, withdrawalLimit);
    }

    // Function to end the campaign
    function endCampaign() external onlyFundraiser {
        require(
            block.timestamp >= deadline || amountRaised >= target,
            "Cannot end campaign yet"
        );
        campaignEnded = true;

        emit CampaignEnded(amountRaised >= target);
    }

    // Function for contributors to request refunds if the campaign fails
    function requestRefund() external {
        require(campaignEnded, "Campaign must be ended to request a refund");
        require(
            amountRaised < target,
            "Refunds not available for successful campaigns"
        );

        uint256 contributedAmount = contributions[msg.sender];
        require(contributedAmount > 0, "No contributions to refund");

        contributions[msg.sender] = 0; // Prevent double refunds
        payable(msg.sender).transfer(contributedAmount);

        emit RefundIssued(msg.sender, contributedAmount);
    }

    // Function to distribute remaining funds to all contributors
    function withdrawRemainingFunds() external {
        require(campaignEnded, "Campaign must be ended to withdraw funds");
        require(
            amountRaised < target,
            "Funds are not refundable for successful campaigns"
        );

        uint256 contributedAmount = contributions[msg.sender];
        require(contributedAmount > 0, "No contributions to withdraw");

        uint256 refundAmount = (contributedAmount * address(this).balance) /
            amountRaised;
        contributions[msg.sender] = 0; // Avoid double withdrawals

        payable(msg.sender).transfer(refundAmount);

        emit RefundIssued(msg.sender, refundAmount);
    }

    // Getter for total milestones
    function getMilestones() external view returns (Milestone[] memory) {
        return milestones;
    }

    // Getter for contributor list
    function getContributors() external view returns (address[] memory) {
        return contributorList;
    }
}
