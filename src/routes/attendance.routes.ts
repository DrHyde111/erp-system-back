import {Router} from "express";
import attendanceController from "../controllers/attendance.controller";

const attendanceRouter = Router()

// Find all attendances
attendanceRouter.get("/", attendanceController.getAll)

export default attendanceRouter;