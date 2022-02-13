import {Router} from "express";
import warehouseController from "../controllers/warehouse.controller";

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


export default warehouseRouter;