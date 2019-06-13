import { Entity, Column, Double, PrimaryColumn } from "typeorm";
//import { Guid } from "guid-typescript";

@Entity()
export class Timesheets {
  @Column()
  @PrimaryColumn()
  Guid: string;

  @Column("datetime")
  Date: string;

  @Column()
  FeatureGuid: string;

  @Column()
  EmployeeGuid: string;

  @Column()
  ProjectRoleGuid: string;

  @Column()
  SRNotes: string;

  @Column({
    type: "decimal",
    name: "RegularHr",
    nullable: true,
    precision: 18,
    scale: 2
  })
  RegularHr: Double;

  @Column({
    type: "decimal",
    name: "OTHr",
    nullable: true,
    precision: 18,
    scale: 2
  })
  OTHr: Double;

  @Column({
    type: "decimal",
    name: "BOTHr",
    nullable: true,
    precision: 18,
    scale: 2
  })
  BOTHr: Double;

  @Column()
  IsApproved: Boolean;

  @Column()
  ApprovedByGuid: string;

  @Column()
  ApprovedDate: Date;

  @Column({
    type: "decimal",
    name: "PerformanceIndex",
    nullable: true,
    precision: 18,
    scale: 2
  })
  PerformanceIndex: Double;

  @Column()
  Comments: string;

  @Column()
  IncludeInSR: Boolean;

  @Column()
  CreatedDate: Date;

  @Column()
  UpdatedDate: Date;

  @Column()
  ExportedDate: Date;

  @Column()
  QBTimeTrackerId: string;

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

  @Column({
    type: "decimal",
    name: "DTHr",
    nullable: true,
    precision: 18,
    scale: 2
  })
  DTHr: Double;

  // @Column()
  // EmployeeRateGuid: string;

  @Column({ type: "decimal", name: "EmployeeRate", precision: 18, scale: 2 })
  EmployeeRate: Double;

  @Column()
  State: string;

  EmployeeName: string;
  ProjectGuid: string;
  ProjectDescription: string;
  Project: string;
  Task: string;
  ProjectRole: string;
}
