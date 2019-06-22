import { Entity, Column, Double, PrimaryColumn, Long } from "typeorm";

@Entity()
export class Employees {
  @Column()
  @PrimaryColumn()
  Guid: string;

  @Column()
  FirstName: string;

  @Column()
  LastName: string;

  @Column()
  EmailAddress: string;

  @Column()
  PhoneNumber: string;

  @Column({type: "decimal",name: "RatePerHour",nullable: true,precision: 18,scale: 2})
  RatePerHour: Double;

  @Column()
  RoleGuid: string;

  @Column({type: "decimal",name: "StandardRate",nullable: true,precision: 18,scale: 2})
  StandardRate: Double;

  @Column()
  TimesheetApprovedBy: string;

  @Column()
  CreatedDate: Date;

  @Column()
  JoiningDate: Date;

  @Column()
  EndDate: Date;

  @Column()
  UserName: string;

  @Column()
  Password: string;

  @Column()
  IsActive: boolean;

  @Column()
  IsFilterFavouriteProjects: boolean;

  @Column()
  UserRoleGuid: string;

  @Column()
  QBEmployeeId: string;

  @Column()
  ZenDeskUserId: string;

  @Column()
  LicenseTypeGuid: string;
}