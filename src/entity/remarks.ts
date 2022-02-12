import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Employee} from "./employee";
import {Attendance} from "./attendance";

@Entity()
export class Remarks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Content: string;

    @Column({nullable: true})
    TimeOut: string;

    @ManyToOne(() => Employee, employee => employee.CreatedRemarks,{eager: true})
    Creator: Employee;

    @ManyToOne(() => Attendance, attendance => attendance.Remarks,{eager: true})
    Attendance: Attendance;

}