import { CampaignCreated as CampaignCreatedEvent } from "../generated/factory/factory"
import { CampaignCreated } from "../generated/schema"

export function handleCampaignCreated(event: CampaignCreatedEvent): void {
  let entity = new CampaignCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.fundraiser = event.params.fundraiser
  entity.campaignAddress = event.params.campaignAddress
  entity.name = event.params.name
  entity.description = event.params.description
  entity.target = event.params.target
  entity.deadline = event.params.deadline

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
