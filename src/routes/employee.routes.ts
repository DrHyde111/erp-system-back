import {Router} from "express";
import employeeController from "../controllers/employee.controller";
import attendanceController from "../controllers/attendance.controller";
import remarkController from "../controllers/remark.controller";

const employeeRouter = Router()

// Create new employee
employeeRouter.post("/create", employeeController.create)

// Find employee by id
employeeRouter.get("/:employeeId", employeeController.getById)

// Find employee by email
employeeRouter.post("/", employeeController.getByEmail)

// Find all employees
employeeRouter.get("/", employeeController.getAll)

// Update employee by id
employeeRouter.post("/:employeeId", employeeController.update)

// Delete employee by id
employeeRouter.delete("/:employeeId", employeeController.deleteById)

// Create attendance for user or log employee out of work if not closed attendance exist
employeeRouter.put("/:employeeId/attendance", attendanceController.attendanceControl)

// Get all employee attendances
employeeRouter.get("/:employeeId/attendance", attendanceController.getAllByEmployeeId)

// Get latest employee's attendance
employeeRouter.get("/:employeeId/attendance/latest", attendanceController.getLatest)

// Get specific employee's attendance
employeeRouter.get("/:employeeId/attendance/:attendanceId", attendanceController.getEmployeeSpecificAttendance)

// Create remark to specific employee's attendance
employeeRouter.post("/:employeeId/attendance/:attendanceId/remarks", remarkController.create)

// Create remark to specific employee's attendance
employeeRouter.get("/:employeeId/attendance/:attendanceId/remarks/:remarkId", remarkController.getById)

// Get all remarks for specific attendance
employeeRouter.get("/:employeeId/attendance/:attendanceId/remarks", remarkController.getAllByAttendanceId)

// Update specific remark
employeeRouter.post("/:employeeId/attendance/:attendanceId/remarks/:remarkId", remarkController.update)

// Delete specific remark
employeeRouter.delete("/:employeeId/attendance/:attendanceId/remarks/:remarkId", remarkController.deleteById)


export default employeeRouter;