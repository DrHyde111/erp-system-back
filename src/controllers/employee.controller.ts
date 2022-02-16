import {Employee} from "../entity/employee";
import {Request, Response} from "express";
import {createConnection, getConnection, getRepository} from "typeorm";
import bcrypt from "bcrypt";


async function create(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const employeeRepository = connection.getRepository(Employee)
        // tslint:disable-next-line:no-console
        console.log(req.body);
        req.body.Password = await bcrypt.hash(req.body.Password, 10)
        const employee = employeeRepository.create(req.body);
        const results = await employeeRepository.save(employee);
        return res.status(200).send(results);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function getById(req: Request, res: Response) {
    try {
        if (req.params.employeeId === undefined) {
            return res.status(403).send({message: "Employee id is required"})
        }
        const connection = await getConnection()
        const employeeRepository = connection.getRepository(Employee)
        const results = await employeeRepository.findOne({id: parseInt(req.params.employeeId, 10)});
        return res.status(200).send(results);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function getByEmail(req: Request, res: Response) {
    try {
        if (req.body.Email === undefined) {
            return res.status(403).send({message: "Employee email is required"})
        }
        const connection = await getConnection()
        const employeeRepository = connection.getRepository(Employee)
        const results = await employeeRepository.findOne({Email: req.body.Email});
        return res.status(200).send(results);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function getAll(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const employeeRepository = connection.getRepository(Employee)
        const results = await employeeRepository.find();
        return res.status(200).send(results);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);


        return res.status(500).send({message: "Error"})
    }
}

async function update(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const employeeRepository = connection.getRepository(Employee)
        const results = await employeeRepository.update({id: parseInt(req.params.employeeId, 10)}, req.body);
        return res.status(200).send(results);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function deleteById(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const employeeRepository = connection.getRepository(Employee)
        const results = await employeeRepository.delete({id: parseInt(req.params.employeeId, 10)},);
        return res.status(200).send(results);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

const employeeController = {
    create,
    getById,
    getByEmail,
    getAll,
    update,
    deleteById,
}

export default employeeController;
