import {Request, Response} from "express";
import {getConnection} from "typeorm";
import {Warehouse} from "../entity/warehouse";
import {Employee} from "../entity/employee";

async function create(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const warehouseRepository = connection.getRepository(Warehouse)
        // tslint:disable-next-line:no-console
        console.log(req.body);
        const warehouse = warehouseRepository.create(req.body);
        const results = await warehouseRepository.save(warehouse);
        return res.status(200).send(results);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function getById(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const warehouseRepository = connection.getRepository(Warehouse)

        const warehouse = await warehouseRepository.findOne({id: parseInt(req.params.warehouseId, 10)})

        return res.status(200).send(warehouse);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function getAll(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const warehouseRepository = connection.getRepository(Warehouse)

        const warehouse = await warehouseRepository.find()

        return res.status(200).send(warehouse);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function update(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const warehouseRepository = connection.getRepository(Warehouse)
        const results = await warehouseRepository.update({id: parseInt(req.params.warehouseId, 10)}, req.body);
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
        const warehouseRepository = connection.getRepository(Warehouse)
        const results = await warehouseRepository.delete({id: parseInt(req.params.warehouseId, 10)},);
        return res.status(200).send(results);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function assignOverseer(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const employeeRepository = connection.getRepository(Employee)
        const warehouseRepository = connection.getRepository(Warehouse)
        const employee = await employeeRepository.findOne({id: parseInt(req.params.employeeId, 10)})
        if (employee === undefined) {
            return res.status(404).send({message: "Employee not found"})
        }
        const warehouse = await warehouseRepository.findOne({id: parseInt(req.params.warehouseId, 10)})
        if (warehouse === undefined) {
            return res.status(404).send({message: "Warehouse not found"})
        }
        warehouse.Overseers = [...warehouse.Overseers, employee]
        const result = await warehouseRepository.save(warehouse);
        return res.status(200).send({message: "Overseer: " + employee.Email + " assigned.", result})
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
        return res.status(500).send({message: "Error"})
    }
}

async function getOverseers(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const warehoseRepository = connection.getRepository(Warehouse)
        const warehouse = await warehoseRepository.findOne({id: parseInt(req.params.warehouseId, 10)})
        return res.status(200).send(warehouse.Overseers)
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
        return res.status(500).send({message: "Error"})
    }
}

async function unasssignOverseer(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const warehouseRepository = connection.getRepository(Warehouse)
        const warehouse = await warehouseRepository.findOne({id: parseInt(req.params.warehouseId, 10)})

        warehouse.Overseers = warehouse.Overseers.filter(overseer => {
            return overseer.id !== parseInt(req.params.employeeId, 10)
        })

        const result = await warehouseRepository.save(warehouse);

        return res.status(200).send({message: "Overseer removed"})
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.log(error);
        return res.status(500).send({message: "Error"})
    }
}


const warehouseController = {
    create,
    getById,
    getAll,
    update,
    deleteById,
    assignOverseer,
    getOverseers,
    unasssignOverseer

}

export default warehouseController;
