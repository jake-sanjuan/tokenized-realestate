import { BigInt } from "@graphprotocol/graph-ts"
import {
  Tokenizer,
  AgentApproved,
  AgentApprovedProperty,
  Approval,
  ApprovalForAll,
  ChainlinkCancelled,
  ChainlinkFulfilled,
  ChainlinkRequested,
  LicenseRevoked,
  OwnerApproved,
  OwnerChanged,
  PaymentRecieved,
  PropertyPriceChanged,
  PropertyRegistered,
  SaleApproved,
  Transfer
} from "../generated/Tokenizer/Tokenizer"
import { Property, Owner, Agent } from "../generated/schema"



export function handlePropertyRegistered(event: PropertyRegistered): void {
  let entityProperty = Property.load(event.transaction.from.toHex())
  let entityOwner = Owner.load(event.params.registeringAddress.toHex())
  if (entityProperty == null) {
    entityProperty = new Property(event.transaction.from.toHex())
    entityProperty.approved = false
  }

  entityProperty.propertyOwner = entityOwner as string
  entityProperty.currentPrice = event.params.originalPrice
  entityOwner.ownedProperties.push(entityProperty as string)

  entityOwner.save()
  entityProperty.save()
}

export function handleAgentApprovedProperty(
  event: AgentApprovedProperty
): void {
  let entityProperty = Property.load(event.transaction.from.toHex())
  let entityAgent = Agent.load(event.params.agent.toHex())

  entityProperty.agent = entityAgent as string
  entityProperty.approved = true
  entityProperty.save()
}

export function handleOwnerApproved(event: OwnerApproved): void {
  let entity = new Owner(event.transaction.from.toHex())
  entity.ownedProperties = []
  entity.save()
}

export function handleAgentApproved(event: AgentApproved): void {
  let entity = new Agent(event.transaction.from.toHex())
  entity.save()
}

export function handleOwnerChanged(event: OwnerChanged): void {
  let entityProperty = Property.load(event.params.tokenId.toHex())
  let entityNewOwner = Owner.load(event.params.newOwner.toHex()) //as Owner
  let entityOldOwner = entityProperty.propertyOwner as Owner

  // Add new owner
  entityProperty.propertyOwner = entityNewOwner as string

  // Remove property from previous owner owned list
  let idx = entityOldOwner.ownedProperties.indexOf(entityProperty as string)
  if(idx>-1)
    entityOldOwner.ownedProperties.splice(idx, 1)

  // add property to new owner owned list
  entityNewOwner.ownedProperties.push(entityProperty as string)

  entityProperty.save()
  entityOldOwner.save()
  entityNewOwner.save()
}

export function handlePropertyPriceChanged(event: PropertyPriceChanged): void {
  let entityProperty = Property.load(event.params.tokenId.toHex())
  entityProperty.currentPrice = event.params.newPrice
  entityProperty.save()
}

export function handleApproval(event: Approval): void {
  // let entity = Property.load(event.transaction.from.toHex())

  // entity.propertyOwner = event.params.owner
  // entity.approvedAddress = event.params.approved

  // entity.save()
}

export function handleApprovalForAll(event: ApprovalForAll): void {
  // let entity = Property.load(event.transaction.from.toHex())
  // entity.propertyOwner = event.params.owner
  // entity.operator = event.params.operator
  // entity.approved = event.params.approved
  // entity.save()
}

export function handleChainlinkCancelled(event: ChainlinkCancelled): void {
  // let entity = Chainlink.load(event.transaction.from.toHex())
  // entity.cancelled = true
  // entity.save()
}

export function handleChainlinkFulfilled(event: ChainlinkFulfilled): void {
  // let entity = Chainlink.load(event.transaction.from.toHex())
  // entity.approved = true
  // entity.save()
}

export function handleChainlinkRequested(event: ChainlinkRequested): void {
  // let entity = Chainlink.load(event.transaction.from.toHex())
  // if (entity == null) {
  //   entity = new Chainlink(event.transaction.from.toHex())
  //   entity.approved = false
  //   entity.cancelled = false
  //   entity.requested = false
  // }
  // entity.requested = true
  // entity.save()
}

export function handleLicenseRevoked(event: LicenseRevoked): void {}

export function handlePaymentRecieved(event: PaymentRecieved): void {}

export function handleSaleApproved(event: SaleApproved): void {
  // let entity = Property.load(event.transaction.from.toHex())
  // entity.saleApproved = true
}

export function handleTransfer(event: Transfer): void {

}
