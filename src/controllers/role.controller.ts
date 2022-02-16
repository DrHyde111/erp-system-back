import {Request, Response} from "express";
import {getConnection} from "typeorm";
import {Employee} from "../entity/employee";
import {Role} from "../entity/role";

async function addRole(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const employeeRepository = connection.getRepository(Employee);
        const roleRepository = connection.getRepository(Role);
        const employee = await employeeRepository.findOne({id: parseInt(req.params.employeeId, 10)})
        if (employee === undefined) {
            return res.status(404).send({message: "Employee not found"})
        }
        const role = await roleRepository.findOne({id: parseInt(req.params.roleId, 10)})
        if (role === undefined) {
            return res.status(404).send({message: "Warehouse not found"})
        }
        employee.Roles = [role]
        const result = await employeeRepository.save(employee);
        return res.status(200).send(result)
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function removeRole(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const employeeRepository = connection.getRepository(Employee);
        const employee = await employeeRepository.findOne({id: parseInt(req.params.employeeId, 10)})
        if (employee === undefined) {
            return res.status(404).send({message: "Employee not found"})
        }

        employee.Roles = employee.Roles.filter(role => {
            return role.id !== parseInt(req.params.roleId, 10)
        })

        const result = await employeeRepository.save(employee);
        return res.status(200).send(result)
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

const roleController = {
    addRole,
    removeRole
}

export default roleController;
