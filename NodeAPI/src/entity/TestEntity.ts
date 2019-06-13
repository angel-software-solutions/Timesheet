import { Entity, Column, PrimaryColumn, Generated } from "typeorm";
//import { Guid } from "guid-typescript";

@Entity()
export class testentity {
  @Column()
  @PrimaryColumn()
  //@Generated("uuid")
  Guid: string;

  @Column()
  Name: string;

  @Column()
  FeatureGuid: string;
}
