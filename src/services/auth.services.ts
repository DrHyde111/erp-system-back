import {Employee} from "../entity/employee";
import jwt from "jsonwebtoken";
import config from "../config/config";

function generateToken(employee: Employee) {
    return jwt.sign(employee, config.tokenSecret, {expiresIn: '24h'})
}

const authServices ={
    generateToken
}

export default authServices;