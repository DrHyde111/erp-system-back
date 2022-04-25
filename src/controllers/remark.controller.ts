import {Request, Response} from "express";
import {getConnection, getRepository} from "typeorm";
import {Employee} from "../entity/employee";
import {Remarks} from "../entity/remarks";
import {Attendance} from "../entity/attendance";
import dateServices from "../services/date.services";

async function create(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const remarkRepository = connection.getRepository(Remarks)
        const attendanceRepository = connection.getRepository(Attendance)
        const employeeRepository = connection.getRepository(Employee)
        const remark = remarkRepository.create();

        remark.Attendance = await attendanceRepository.findOne({id: parseInt(req.params.attendanceId, 10)})
        remark.Creator = await employeeRepository.findOne({id: parseInt(req.body.creatorId, 10)})
        remark.CreationDate = dateServices.formatDate(new Date())
        remark.Content = req.body.Content;
        remark.Title = req.body.Title

        if (remark.Creator == null) {
            return res.status(404).send({message: "Employee not found"})

        }

        const result = await remarkRepository.save(remark);

        return res.status(200).send(result);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function getById(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const remarksRepository = connection.getRepository(Remarks)
        const results = await remarksRepository.findOne({id: parseInt(req.params.remarkId, 10)});
        return res.status(200).send(results);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function getAllByAttendanceId(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const attendanceRepository = connection.getRepository(Attendance)
        const attendance = await attendanceRepository.findOne({id: parseInt(req.params.attendanceId, 10)})
        const remarks = await attendance.Remarks

        return res.status(200).send(remarks)
    } catch (e) {
        return res.status(500).send({message: "Error"})
    }

}

async function update(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const remarksRepository = connection.getRepository(Remarks)
        const result = await remarksRepository.update({id: parseInt(req.params.remarkId, 10)}, req.body);
        return res.status(200).send(result);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function deleteById(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const remarksRepository = connection.getRepository(Remarks)
        const results = await remarksRepository.delete({id: parseInt(req.params.remarkId, 10)},);
        return res.status(200).send(results);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

const remarkController = {
    create,
    getById,
    getAllByAttendanceId,
    update,
    deleteById
}

export default remarkController;
