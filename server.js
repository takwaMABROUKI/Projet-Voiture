const express= require("express")
const connectDB= require('./config/db')
const app = express()

//connect database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }));


app.get('/',(req,res)=>res.send('API running'))

// Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/voitures', require('./routes/api/voitures'));



const PORT=process.env.PORT || 5000




app.listen(PORT,()=> console.log(`server is starting on port ${PORT}`))