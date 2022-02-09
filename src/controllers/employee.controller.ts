import {Employee} from "../entity/employee";
import {Request, Response} from "express";
import {createConnection, getRepository} from "typeorm";


async function create(req: Request, res: Response) {
    try {
        const connection = await createConnection()
        const employeeRepository = connection.getRepository(Employee)
        // tslint:disable-next-line:no-console
        console.log(req.body);
        const employee = employeeRepository.create(req.body);
        const results = await employeeRepository.save(employee);

        return res.status(200).send(results);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

const employeeController = {
    create,
}

export default employeeController;
