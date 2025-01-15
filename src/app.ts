import express, { Request, Response } from 'express';

import connectDB from './db/connection';
const app = express();

import adminRoutes from "./router/adminRoutes";
import aboutRoutes from "./router/aboutRoutes";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
//Middleware
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    const data = {
        title: 'Welcome to EJS with TypeScript!',
        message: 'This is a dynamic message passed to the EJS view.'
    };

    res.render('index', data); // Pass data to EJS cxzd
});


app.use('/api',adminRoutes);
app.use('/api',aboutRoutes);

export default app;