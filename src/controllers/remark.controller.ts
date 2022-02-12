import {Request, Response} from "express";
import {getConnection} from "typeorm";
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
        remark.Creator = await employeeRepository.findOne({id: parseInt(req.params.employeeId, 10)})
        remark.CreationDate = dateServices.formatDate(new Date())
        remark.Content = req.body.Content;

        const result = await remarkRepository.save(remark);

        return res.status(200).send(result);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}


const remarkController = {
    create,
}

export default remarkController;
