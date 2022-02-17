import {Employee} from "../entity/employee";
import jwt from "jsonwebtoken";
import config from "../config/config";

function generateToken(employee: Employee) {
    const payload = {id: employee.id, Email: employee.Email, Name: employee.Name}
    return jwt.sign(payload, config.tokenSecret, {expiresIn: '24h'})
}

function verifyToken(token: string) {
    try {
        jwt.verify(token, config.tokenSecret)
        return true
    } catch (error) {
        return false
    }
}

const authServices = {
    generateToken,
    verifyToken
}

export default authServices;