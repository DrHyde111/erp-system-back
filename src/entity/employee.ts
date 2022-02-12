import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Attendance} from "./attendance";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    Email: string;

    @Column()
    Name: string;

    @Column()
    Surname: string;

    @Column()
    Address: string;

    @Column()
    City: string;

    @Column()
    BirthDate: string;

    @Column()
    EmployedDate: string;

    @Column()
    Password: string;

    @OneToMany(()=>Attendance, attendance=>attendance.Employee)
    Attendances: Attendance[];
}