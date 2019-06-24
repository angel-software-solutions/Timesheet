import { Entity, Column, Double, PrimaryColumn } from "typeorm";

@Entity()
export class Geographies {
  @Column()
  @PrimaryColumn()
  Guid: string;

  @Column()
  Name: string;

  @Column()
  GeographyGuid: string;

  @Column()
  CreatedDate: Date;
}
