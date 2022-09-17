const express=require('express');
const path=require('path');
const app=express();
const clothRoute=require('./api/routes/cloth');
const userRoute=require('./api/routes/user');
const bodyParser=require('body-parser');
const multer=require('multer');
const mongoose=require('mongoose');
require('dotenv').config();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname);
    }
});
  
app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use(bodyParser.urlencoded({extended:false}));
  app.use(multer({ storage: fileStorage}).single('img'));
  app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('error',err=>{
    console.log('CONNECTION FALLIED!.....');
})
mongoose.connection.on('connected',connect=>{
    console.log('CONNECTED DATABASE SUCCESSFULLY!..........')
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/cloth',clothRoute);
app.use('/user',userRoute);

app.use((req,res,next)=>{
    res.status(404).json({
        error:'bad request',
    })
})
app.listen(process.env.PORT || 3000,()=>{
    console.log('connected!');
  });

module.exports =app;

