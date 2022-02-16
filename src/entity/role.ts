import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Employee} from "./employee";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Name: string;

    @ManyToMany(() => Employee, employee => employee.Roles, )
    Employee: Employee[]
}