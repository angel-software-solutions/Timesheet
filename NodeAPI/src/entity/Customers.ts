import { Entity, Column, Double, PrimaryColumn } from "typeorm";

@Entity()
export class Customers{
    @Column()
    @PrimaryColumn()
    Guid: string;

    @Column()
    ClientName: string;

    @Column()
    PaymentTerms: string;

    @Column()
    StreetAddress: string;

    @Column()
    City: string;

    @Column()
    StateProvince: string;

    @Column()
    ZipPostalCode: string;

    @Column()
    Country:string;

    
}
