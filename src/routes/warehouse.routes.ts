import {Router} from "express";
import warehouseController from "../controllers/warehouse.controller";
import employeeController from "../controllers/employee.controller";

const warehouseRouter = Router()

// create warehouse
warehouseRouter.post("/create", warehouseController.create)

// retrive warehouse
warehouseRouter.get("/:warehouseId", warehouseController.getById)

// Retrive all warehouses
warehouseRouter.get("/", warehouseController.getAll)

// Update warehouse by id
warehouseRouter.post("/:warehouseId", warehouseController.update)

// Delete warehouse by id
warehouseRouter.delete("/:warehouseId", warehouseController.deleteById)

// Assign overseer to warehouse
warehouseRouter.post("/:warehouseId/overseers/:employeeId/assign", warehouseController.assignOverseer)

// Retrieve overseers assigned to warehouse
warehouseRouter.get("/:warehouseId/overseers/", warehouseController.getOverseers)

// Retrieve overseer assigned to warehouseby id
warehouseRouter.get("/:warehouseId/overseers/:employeeId", employeeController.getById)

export default warehouseRouter;