import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import {Product} from "./product";

@Entity()
export class Warehouse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    Name: string;

    @Column()
    Address: string

    @Column()
    City: string

    @Column()
    Description: string

    @ManyToMany(() => Product)
    @JoinTable()
    Has: Product[]

}