import { ContributionMade, MilestoneCreated } from "../generated/Crowdfunding/Crowdfunding";
import { Contribution, Milestone } from "../generated/schema";

export function handleContributionMade(event: ContributionMade): void {
    let entity = new Contribution(event.transaction.hash.concatI32(event.logIndex.toI32()));
    entity.contributor = event.params.contributor;
    entity.amount = event.params.amount;
    entity.campaignAddress = event.address;
    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;
    entity.save();
}

export function handleMilestoneCreated(event: MilestoneCreated): void {
    let entity = new Milestone(event.transaction.hash.concatI32(event.logIndex.toI32()));
    entity.milestoneId = event.params.milestoneId;
    entity.campaignAddress = event.address;
    entity.amount = event.params.amount;
    entity.reached = event.params.reached;
    entity.blockNumber = event.block.number;
    entity.blockTimestamp = event.block.timestamp;
    entity.transactionHash = event.transaction.hash;
    entity.save();
}
