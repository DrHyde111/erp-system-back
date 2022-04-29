import {Request, Response} from "express";
import {getConnection} from "typeorm";
import {Product} from "../entity/product";
import {Warehouse} from "../entity/warehouse";
import bcrypt from "bcrypt";
import {Employee} from "../entity/employee";

async function addToWarehouse(req: Request, res: Response) {
    try {
        const connection = await getConnection();
        const productRepository = connection.getRepository(Product)
        const warehouseRepository = connection.getRepository(Warehouse)

        const warehouse = await warehouseRepository.findOne({id: parseInt(req.params.warehouseId, 10)})

        if (warehouse === undefined) {
            return res.status(404).send({message: "Warehouse doesnt exist"})
        }
        let product;
        product = productRepository.create();
        product.Name = req.body.Name;
        product.Description = req.body.Description;
        product.Quantity = parseInt(req.body.Quantity, 10);
        product.Unit = req.body.Unit;
        product.PricePerUnit = parseInt(req.body.PricePerUnit, 10);
        product.Warehouse = warehouse

        const result = await productRepository.save(product)
        return res.status(200).send({message: "Product added to warehouse", Product: result});

    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function deleteProduct(req: Request, res: Response) {
    try {
        const connection = await getConnection();
        const productRepository = connection.getRepository(Product)
        const result = await productRepository.delete({id: parseInt(req.params.productId, 10)})

        return res.status(200).send(result)
    } catch (e) {
        return res.status(500).send({message: "Error"})
    }
}

async function getProducts(req: Request, res: Response) {
    try {
        const connection = await getConnection();
        const productRepository = connection.getRepository(Product)
        const warehouseRepository = connection.getRepository(Warehouse)

        const warehouse = await warehouseRepository.findOne({id: parseInt(req.params.warehouseId, 10)})

        if (warehouse === undefined) {
            return res.status(404).send({message: "Warehouse doesnt exist"})
        }

        const result = await productRepository.find({Warehouse: warehouse})
        if (result.length === 0) {
            return res.status(404).send({message: "Warehouse is empty"})
        }
        return res.status(200).send(result);

    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function getProduct(req: Request, res: Response) {
    try {
        const connection = await getConnection();
        const productRepository = connection.getRepository(Product)
        const warehouseRepository = connection.getRepository(Warehouse)

        const warehouse = await warehouseRepository.findOne({id: parseInt(req.params.warehouseId, 10)})

        if (warehouse === undefined) {
            return res.status(404).send({message: "Warehouse doesnt exist"})
        }

        const result = await productRepository.findOne({id: parseInt(req.params.productId, 10)})

        if (!result) {
            return res.status(404).send({message: "Product not found"})
        }
        return res.status(200).send(result);

    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function moveProduct(req: Request, res: Response) {
    try {
        const connection = await getConnection();
        const productRepository = connection.getRepository(Product)
        const warehouseRepository = connection.getRepository(Warehouse)

        const warehouse = await warehouseRepository.findOne({id: parseInt(req.params.destinationId, 10)})

        if (warehouse === undefined) {
            return res.status(404).send({message: "Warehouse doesnt exist"})
        }

        const product = await productRepository.findOne({id: parseInt(req.params.productId, 10)})

        const demandedQuantity = req.body.choosenQuantity

        if (demandedQuantity > product.Quantity) {
            return res.status(404).send({message: "Demanded quantity is greater then possible"})
        }

        if (demandedQuantity === product.Quantity) {
            product.Warehouse = warehouse
            await productRepository.save(product)
            return res.status(200).send({message: "Transfer completed"})
        }

        const newProduct = productRepository.create()
        newProduct.Name = product.Name
        newProduct.Description = product.Description
        newProduct.Quantity = demandedQuantity
        newProduct.Unit = product.Unit
        newProduct.PricePerUnit = product.PricePerUnit
        newProduct.Warehouse = warehouse

        product.Quantity = product.Quantity - demandedQuantity

        await productRepository.save(product)
        await productRepository.save(newProduct)

        return res.status(200).send({message: "Product was split. Transfer completed"})


    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}

async function editProduct(req: Request, res: Response) {
    try {
        const connection = await getConnection()
        const productRepository = connection.getRepository(Product)
        const results = await productRepository.update({id: parseInt(req.params.productId, 10)}, req.body);
        return res.status(200).send(results);
    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return res.status(500).send({message: "Error"})
    }
}


const productController = {
    addToWarehouse,
    deleteProduct,
    getProducts,
    getProduct,
    moveProduct,
    editProduct
}

export default productController