import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CampaignEnded } from "../generated/schema"
import { CampaignEnded as CampaignEndedEvent } from "../generated/Crowdfunding/Crowdfunding"
import { handleCampaignEnded } from "../src/crowdfunding"
import { createCampaignEndedEvent } from "./crowdfunding-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let successful = "boolean Not implemented"
    let newCampaignEndedEvent = createCampaignEndedEvent(successful)
    handleCampaignEnded(newCampaignEndedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CampaignEnded created and stored", () => {
    assert.entityCount("CampaignEnded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CampaignEnded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "successful",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
