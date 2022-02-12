import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Employee} from "./employee";

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    TimeIn: string;

    @Column()
    TimeOut: string;

    @ManyToOne(() => Employee, employee => employee.Attendances)
    Employee: Employee;
}