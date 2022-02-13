import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Warehouse} from "./warehouse";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    Name: string;

    @Column()
    Description: string

    @Column()
    Quantity: string

    @Column()
    Unit: string

    @Column()
    PricePerUnit: number

    @ManyToOne(() => Warehouse, warehouse => warehouse.Has,{eager: true})
    Warehouse: Warehouse;
}