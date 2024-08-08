import express from'express';
import {dbConnect}  from './dbConnect.js'
import AppError from './handleErrors/appError.js';
import globalErrorHandler from './handleErrors/globalError.js';
import multer from 'multer'
 import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
 import authRoutes from './routes/authRoutes.js'
 import ratingRoutes from './routes/ratingRoutes.js'
import productRoutes from './routes/productRoutes.js'
/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
const upload = multer({ dest: 'uploads/' })*/
const app = express()

app.use(express.json());
app.use(cors()) 
// app.use(cors()); // Use cors middleware
dbConnect()
// app.use('/api/users',userRoutes);
//test middleware
app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString()
    next()
})
 app.use('/api/v1/react/auth',authRoutes);
 app.use('/api/v1/react/users',userRoutes);
 app.use('/api/v1/react/rates',ratingRoutes);
 app.use('/api/v1/react/products',productRoutes);


 app.all('*', (req, res, next) => {
    return next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));//update here by return//class AppError extends Error
  });
//exports.ErrorRequestHandler if next function is error
app.use(globalErrorHandler)

export default app;