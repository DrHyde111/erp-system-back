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

const warehouseController = {
    create,
    getById,
    getAll,
    update,
    deleteById

}

export default warehouseController;
