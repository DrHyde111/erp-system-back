import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Employee} from "./employee";
import {Attendance} from "./attendance";

@Entity()
export class Remarks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Title: string;

    @Column()
    Content: string;

    @Column()
    CreationDate: string;

    @ManyToOne(() => Employee, employee => employee.CreatedRemarks, {eager: true, onDelete: "CASCADE"})
    Creator: Employee;

    @ManyToOne(() => Attendance, attendance => attendance.Remarks)
    Attendance: Attendance;

}