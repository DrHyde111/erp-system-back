import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany} from 'typeorm';
import {Product} from "./product";
import {Employee} from "./employee";

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

    @OneToMany(() => Product, product => product.Warehouse)
    Products: Product[]

    @ManyToMany(() => Employee, employee => employee.Oversees, {cascade: true, eager: true})
    @JoinTable()
    Overseers: Employee[]
}