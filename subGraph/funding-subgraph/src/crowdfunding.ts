import {
  CampaignEnded as CampaignEndedEvent,
  ContributionMade as ContributionMadeEvent,
  FundsReleased as FundsReleasedEvent,
  FundsRequested as FundsRequestedEvent,
  Initialized as InitializedEvent,
  RefundIssued as RefundIssuedEvent,
  VoteCasted as VoteCastedEvent
} from "../generated/Crowdfunding/Crowdfunding"
import {
  CampaignEnded,
  ContributionMade,
  FundsReleased,
  FundsRequested,
  Initialized,
  RefundIssued,
  VoteCasted
} from "../generated/schema"

export function handleCampaignEnded(event: CampaignEndedEvent): void {
  let entity = new CampaignEnded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.successful = event.params.successful

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleContributionMade(event: ContributionMadeEvent): void {
  let entity = new ContributionMade(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.contributor = event.params.contributor
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFundsReleased(event: FundsReleasedEvent): void {
  let entity = new FundsReleased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.milestoneIndex = event.params.milestoneIndex
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFundsRequested(event: FundsRequestedEvent): void {
  let entity = new FundsRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.milestoneIndex = event.params.milestoneIndex

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRefundIssued(event: RefundIssuedEvent): void {
  let entity = new RefundIssued(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.contributor = event.params.contributor
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteCasted(event: VoteCastedEvent): void {
  let entity = new VoteCasted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.voter = event.params.voter
  entity.milestoneIndex = event.params.milestoneIndex
  entity.votes = event.params.votes

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
