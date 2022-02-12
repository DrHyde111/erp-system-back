import express from 'express';
import employeeRouter from "./routes/employee.routes";
import {createConnection} from "typeorm";
import attendanceRouter from "./routes/attendance.routes";

const app = express();
const port = 8080; // default port to listen
const connection = createConnection()
app.use(express.json())

app.use('/api/employee', employeeRouter)

app.use('/api/attendance', attendanceRouter)

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});

