import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Warehouse} from "./warehouse";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Name: string;

    @Column()
    Description: string

    @Column()
    Quantity: number

    @Column()
    Unit: string

    @Column()
    PricePerUnit: number

    @ManyToOne(() => Warehouse, warehouse => warehouse.Products,{eager: true})
    Warehouse: Warehouse;
}