import {Router} from "express";
import employeeController from "../controllers/employee.controller";

const employeeRouter = Router()

// Create new employee
employeeRouter.post("/create", employeeController.create)
//
// // Find employee by id
// employeeRouter.get("/:id", employeeController.getById)
//
// // Find employee by email
// employeeRouter.post("/", employeeController.getByEmail)
//
// // Find all employees
// employeeRouter.get("/", employeeController.getAll)
//
// // Update employee by id
// employeeRouter.post("/:id", employeeController.update)
//
// // Delete employee by id
// employeeRouter.delete("/:id", employeeController.delete)
//
// // Delete employee by id
// employeeRouter.post("/delete-employees", employeeController.deleteMultiple)

export default employeeRouter;