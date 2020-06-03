const mongoose =require('mongoose');
const express=require('express')
const config=require('config')
const app=express() ;
const morgan =require('morgan')


//Body parser middleware
app.use(express.json())
app.use(morgan('dev'))



//DB config
const db = config.get('mongouri');

//connect to mongo DB
mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology:true ,useCreateIndex:true})
        .then(()=>console.log('mongo connected..'))
        .catch(err=>{console.log(err)})

app.use('/api',require('./routes/shaastra'));

const port=process.env.PORT || 5000 ;

app.listen(port,()=>console.log(`server started on port ${port}`))