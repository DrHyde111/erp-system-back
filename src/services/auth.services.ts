import {Employee} from "../entity/employee";
import jwt from "jsonwebtoken";
import config from "../config/config";

function generateToken(employee: Employee) {
    const payload = {id: employee.id, Email: employee.Email, Name: employee.Name}
    return jwt.sign(payload, config.tokenSecret, {expiresIn: '24h'})
}

const authServices = {
    generateToken
}

export default authServices;