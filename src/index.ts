import express from 'express';
import employeeRouter from "./routes/employee.routes";
import {createConnection} from "typeorm";
import attendanceRouter from "./routes/attendance.routes";
import warehouseRouter from "./routes/warehouse.routes";
import authRouter from "./routes/auth.routes";

const app = express();
const port = 8080; // default port to listen
const connection = createConnection()
app.use(express.json())

app.use('/api/auth', authRouter)

app.use('/api/employee', employeeRouter)

app.use('/api/attendance', attendanceRouter)

app.use('/api/warehouse', warehouseRouter)

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});

