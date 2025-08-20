import express from 'express';
import authRoutes from './routes/authRoutes'

const app = express();


//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//ROUTE MIDDLEWARES
app.use('/auth', authRoutes);
app.listen(6000, ()=>{
    console.log("server is running on 6000")
})