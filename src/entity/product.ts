import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

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
}