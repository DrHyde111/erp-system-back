import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {Employee} from "./employee";
import {Remarks} from "./remarks";

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    TimeIn: string;

    @Column({nullable: true})
    TimeOut: string;

    @ManyToOne(() => Employee, employee => employee.Attendances,{eager: true,onDelete: "CASCADE"})
    Employee: Employee;

    @OneToMany(() => Remarks, remarks => remarks.Attendance)
    Remarks: Promise<Remarks[]>
}