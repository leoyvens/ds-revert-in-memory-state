import {
  ethereum,
  DataSourceContext,
  dataSource,
  Address,
} from "@graphprotocol/graph-ts";
import { NewGravatar, UpdatedGravatar } from "../generated/Gravity/Gravity";
import { Gravatar } from "../generated/schema";
import { Template } from "../generated/templates";

export function handleBlock(block: ethereum.Block): void {
  let context = new DataSourceContext();
  context.setBigInt("number", block.number);
  context.setBytes("hash", block.hash);
  Template.createWithContext(
    Address.fromHexString(
      "0x2E645469f354BB4F5c8a05B3b30A929361cf77eC"
    ) as Address,
    context
  );
}

export function handleBlockTemplate(block: ethereum.Block): void {
  let ctx = dataSource.context();
  let number = ctx.getBigInt("number");
  if (block.number == number) {
    assert(block.hash == ctx.getBytes("hash"));
  }
}
