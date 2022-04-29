import {Employee} from "../entity/employee";
import jwt from "jsonwebtoken";
import config from "../config/config";

function generateToken(employee: Employee) {
    const payload = {id: employee.id, Email: employee.Email, Name: employee.Name, Role: employee.Role}
    return jwt.sign(payload, config.tokenSecret, {expiresIn: '24h'})
}

function verifyToken(token: string) {
    try {
        const decrypted = jwt.verify(token, config.tokenSecret)
        return decrypted
    } catch (error) {
        return false
    }
}

const authServices = {
    generateToken,
    verifyToken
}

export default authServices;