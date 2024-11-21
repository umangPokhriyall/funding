import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CampaignEnded,
  ContributionMade,
  FundsReleased,
  FundsRequested,
  Initialized,
  RefundIssued,
  VoteCasted
} from "../generated/Crowdfunding/Crowdfunding"

export function createCampaignEndedEvent(successful: boolean): CampaignEnded {
  let campaignEndedEvent = changetype<CampaignEnded>(newMockEvent())

  campaignEndedEvent.parameters = new Array()

  campaignEndedEvent.parameters.push(
    new ethereum.EventParam(
      "successful",
      ethereum.Value.fromBoolean(successful)
    )
  )

  return campaignEndedEvent
}

export function createContributionMadeEvent(
  contributor: Address,
  amount: BigInt
): ContributionMade {
  let contributionMadeEvent = changetype<ContributionMade>(newMockEvent())

  contributionMadeEvent.parameters = new Array()

  contributionMadeEvent.parameters.push(
    new ethereum.EventParam(
      "contributor",
      ethereum.Value.fromAddress(contributor)
    )
  )
  contributionMadeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return contributionMadeEvent
}

export function createFundsReleasedEvent(
  milestoneIndex: BigInt,
  amount: BigInt
): FundsReleased {
  let fundsReleasedEvent = changetype<FundsReleased>(newMockEvent())

  fundsReleasedEvent.parameters = new Array()

  fundsReleasedEvent.parameters.push(
    new ethereum.EventParam(
      "milestoneIndex",
      ethereum.Value.fromUnsignedBigInt(milestoneIndex)
    )
  )
  fundsReleasedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return fundsReleasedEvent
}

export function createFundsRequestedEvent(
  milestoneIndex: BigInt
): FundsRequested {
  let fundsRequestedEvent = changetype<FundsRequested>(newMockEvent())

  fundsRequestedEvent.parameters = new Array()

  fundsRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "milestoneIndex",
      ethereum.Value.fromUnsignedBigInt(milestoneIndex)
    )
  )

  return fundsRequestedEvent
}

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}

export function createRefundIssuedEvent(
  contributor: Address,
  amount: BigInt
): RefundIssued {
  let refundIssuedEvent = changetype<RefundIssued>(newMockEvent())

  refundIssuedEvent.parameters = new Array()

  refundIssuedEvent.parameters.push(
    new ethereum.EventParam(
      "contributor",
      ethereum.Value.fromAddress(contributor)
    )
  )
  refundIssuedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return refundIssuedEvent
}

export function createVoteCastedEvent(
  voter: Address,
  milestoneIndex: BigInt,
  votes: BigInt
): VoteCasted {
  let voteCastedEvent = changetype<VoteCasted>(newMockEvent())

  voteCastedEvent.parameters = new Array()

  voteCastedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  voteCastedEvent.parameters.push(
    new ethereum.EventParam(
      "milestoneIndex",
      ethereum.Value.fromUnsignedBigInt(milestoneIndex)
    )
  )
  voteCastedEvent.parameters.push(
    new ethereum.EventParam("votes", ethereum.Value.fromUnsignedBigInt(votes))
  )

  return voteCastedEvent
}
