import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Employee} from "./employee";

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TimeIn: string;

    @Column({nullable: true})
    TimeOut: string;

    @ManyToOne(() => Employee, employee => employee.Attendances,{eager: true})
    Employee: Employee;
}