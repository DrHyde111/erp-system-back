import {Request, Response} from "express";
import {getConnection} from "typeorm";
import {Employee} from "../entity/employee";
import bcrypt from "bcrypt";
import authServices from "../services/auth.services";


async function login(req: Request, res: Response) {
    try {
        const connection = await getConnection();
        const employeeRepository = connection.getRepository(Employee)
        const employee = await employeeRepository.findOne({Email: req.body.Email})
        if (!employee) {
            return res.status(403).send({message: "Bad credentials"})
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.Password, employee.Password);
        if (!isPasswordCorrect) {
            return res.status(403).send({message: "Bad credentials"})
        }
        const token = authServices.generateToken(employee);
        return res.status(200).send({message: "Login succesfull!", token});
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}


const authController = {
    login,
}

export default authController;