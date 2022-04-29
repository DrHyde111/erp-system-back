import {Router} from "express";
import warehouseController from "../controllers/warehouse.controller";
import employeeController from "../controllers/employee.controller";
import productController from "../controllers/product.controller";

const warehouseRouter = Router()

// create warehouse
warehouseRouter.post("/create", warehouseController.create)

// retrive warehouse
warehouseRouter.get("/:warehouseId", warehouseController.getById)

// Retrive all warehouses
warehouseRouter.get("/", warehouseController.getAll)

// Retrive all warehouses
warehouseRouter.post("/overseer/:employeeId", warehouseController.getOverseed)

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

// Unassign employee from overseeing warehouse
warehouseRouter.delete("/:warehouseId/overseers/:employeeId", warehouseController.unasssignOverseer)

// Add product to warehouse
warehouseRouter.post("/:warehouseId/products/add", productController.addToWarehouse)

// Get products from warehouse
warehouseRouter.get("/:warehouseId/products", productController.getProducts)

// Get product from warehouse
warehouseRouter.get("/:warehouseId/products/:productId", productController.getProduct)

// Edit product from warehouse
warehouseRouter.post("/:warehouseId/products/:productId", productController.editProduct)

// Move product to another warehouse
warehouseRouter.post("/:warehouseId/products/:productId/move/:destinationId", productController.moveProduct)

// Delete product
warehouseRouter.delete("/:warehouseId/products/:productId", productController.deleteProduct)

export default warehouseRouter;