import express from 'express';
import employeeRouter from "./routes/employee.routes";

const app = express();
const port = 8080; // default port to listen

app.use(express.json())

app.use('/api/employee', employeeRouter)

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});

