import {Request, Response} from "express";
import {getConnection} from "typeorm";
import {Attendance} from "../entity/attendance";
import dateServices from "../services/date.services";
import {Employee} from "../entity/employee";

async function attendanceControl(req: Request, res: Response) {
    try {
        const connection = await getConnection();
        const attendanceRepository = connection.getRepository(Attendance);
        const employeeRepository = connection.getRepository(Employee)
        const employee = await employeeRepository.findOne({id: parseInt(req.params.employeeId, 10)})

        if (employee === undefined) {
            return res.status(404).send({message: "Emploee doesnt exist"})
        }

        const lastAttendance = await attendanceRepository.findOne(
            {
                where: {Employee: parseInt(req.params.employeeId, 10)},
                order: {id: 'DESC'}
            }
        );

        let attendance;
        let result;
        if (lastAttendance === undefined || lastAttendance.TimeOut !== null) {
            attendance = await attendanceRepository.create()
            attendance.TimeIn = dateServices.formatDate(new Date());
            attendance.Employee = employee;
            result = await attendanceRepository.save(attendance);
            return res.status(200).send({message: "Work began", Attendance: result});

        } else {
            lastAttendance.TimeOut = dateServices.formatDate(new Date());
            result = await attendanceRepository.save(lastAttendance);
            return res.status(200).send({message: "Work has ended", Attendance: result});
        }
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function getAllByEmployeeId(req: Request, res: Response) {
    try {
        if (req.params.employeeId === undefined) {
            return res.status(403).send({message: "Employee id is required"})
        }
        const connection = await getConnection()
        const attendanceRepository = connection.getRepository(Attendance)
        const employeeRepository = connection.getRepository(Employee)
        const employee = await employeeRepository.findOne({id: parseInt(req.params.employeeId, 10)})

        const result = await attendanceRepository.find({Employee: employee})
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send({message: "Error"});
    }
}

async function getEmployeeSpecificAttendance(req: Request, res: Response) {
    try {
        if (req.params.employeeId === undefined) {
            return res.status(403).send({message: "Employee id is required"})
        }
        const connection = await getConnection()
        const attendanceRepository = connection.getRepository(Attendance)
        const employeeRepository = connection.getRepository(Employee)
        const employee = await employeeRepository.findOne({id: parseInt(req.params.employeeId, 10)})
        const result = await attendanceRepository.find({Employee: employee, id: parseInt(req.params.attendanceId, 10)})
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send({message: "Error"});
    }
}

async function getAll(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const attendanceRepository = connection.getRepository(Attendance)
        const result = await attendanceRepository.find()
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send({message: "Error"});
    }
}

async function getLatest(req: Request, res: Response) {
    try {
        const connection = await getConnection();
        const attendanceRepository = connection.getRepository(Attendance);
        const employeeRepository = connection.getRepository(Employee)
        const employee = await employeeRepository.findOne({id: parseInt(req.params.employeeId, 10)})

        if (employee === undefined) {
            return res.status(404).send({message: "Emploee doesnt exist"})
        }

        const lastAttendance = await attendanceRepository.findOne(
            {
                where: {Employee: parseInt(req.params.employeeId, 10)},
                order: {id: 'DESC'}
            }
        );
        return res.status(200).send(lastAttendance)
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

const attendanceController = {
    attendanceControl,
    getAllByEmployeeId,
    getEmployeeSpecificAttendance,
    getAll,
    getLatest
}

export default attendanceController;