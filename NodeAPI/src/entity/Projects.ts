import { Entity, Column, Double, PrimaryColumn } from "typeorm";

@Entity()
export class Projects {
  @Column()
  @PrimaryColumn()
  Guid: string;

  @Column()
  Number: string;

  @Column()
  Description: string;

  @Column()
  StatusGuid: string;

  @Column()
  TagGuid: string;

  @Column()
  IncludeInMasterBCT: Boolean;

  @Column()
  ServiceReportRequired: Boolean;

  @Column()
  CustomerContactGuid: string;

  @Column()
  CustomerProjectManagerGuid: string;

  @Column()
  ProjectManagerGuid: string;

  @Column()
  TeamLeadGuid: string;

  @Column()
  TypeGuid: string;

  @Column()
  PurchaseOrderNumber: string;

  @Column()
  StreetAddress: string;

  @Column()
  DefaultBudgetView: string;

  @Column({
    type: "decimal",
    name: "TaxRate",
    nullable: true,
    precision: 18,
    scale: 2
  })
  TaxRate: Double;

  @Column()
  FacilityName: string;

  @Column()
  StateProvince: string;

  @Column()
  WorkOrderNumber: string;

  @Column()
  ShortDescription: string;

  @Column()
  WorkOrderContact: string;

  @Column()
  CreatedDate: Date;

  @Column()
  QBCustomerId: string;

  @Column()
  ShowLegalNameToInvoice: Boolean;

  @Column()
  CurrencyGuid: string;

  @Column({
    type: "decimal",
    name: "Tax1Rate",
    nullable: true,
    precision: 18,
    scale: 2
  })
  Tax1Rate: Double;

  @Column()
  Tax1Label: string;

  @Column()
  Tax1Enabled: Boolean;

  @Column({
    type: "decimal",
    name: "Tax2Rate",
    nullable: true,
    precision: 18,
    scale: 2
  })
  Tax2Rate: Double;

  @Column()
  Tax2Label: string;

  @Column()
  Tax2Enabled: string;

  @Column()
  CustomerGuid: string;

  @Column()
  IndustryGuid: string;

  @Column()
  ScopeGuid: string;

  @Column({
    type: "decimal",
    name: "OTMultiplier",
    nullable: true,
    precision: 18,
    scale: 2
  })
  OTMultiplier: Double;

  @Column({
    type: "decimal",
    name: "DTMultiplier",
    nullable: true,
    precision: 18,
    scale: 2
  })
  DTMultiplier: Double;

  //   @Column({ type: "float", name: "SortOrder", nullable: false })
  //   SortOrder: Double;
}
