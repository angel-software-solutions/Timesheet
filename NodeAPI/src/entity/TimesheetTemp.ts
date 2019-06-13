import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  Double,
  PrimaryColumn
} from "typeorm";
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";
//import { Guid } from "guid-typescript";

@Entity()
export class TimesheetTemp {
  //@Column({ type: "uniqueidentifier", name: "Guid" })
  @Column()
  @PrimaryGeneratedColumn("uuid")
  Guid: string;

  @Column()
  Date: Date;

  @Column()
  FeatureGuid: string;

  @Column()
  EmployeeGuid: string;

  @Column()
  ProjectRoleGuid: string;

  @Column()
  SRNotes: string;

  @Column({ type: "decimal", name: "RegularHr" })
  RegularHr: Double;

  @Column({ type: "decimal", name: "OTHr" })
  OTHr: Double;

  @Column({ type: "decimal", name: "BOTHr" })
  BOTHr: Double;

  @Column()
  IsApproved: Boolean;

  @Column()
  ApprovedByGuid: string;

  @Column()
  ApprovedDate: Date;

  @Column({ type: "decimal", name: "PerformanceIndex" })
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

  @Column({ type: "decimal", name: "OTMultiplier" })
  OTMultiplier: Double;

  @Column({ type: "decimal", name: "DTMultiplier" })
  DTMultiplier: Double;

  @Column({ type: "decimal", name: "DTHr" })
  DTHr: Double;

  @Column()
  EmployeeRateGuid: string;

  @Column({ type: "decimal", name: "EmployeeRate" })
  EmployeeRate: Double;

  @Column()
  State: string;

  EmployeeName: string;
}
