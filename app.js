require('dotenv').config()
const express=require('express')
const { chatgptGet } = require('./controller/chatgpt.controller')
const app=express()
const cors = require('cors');

//? Configura CORS para permitir solicitudes desde el fronted localhost:8081 (colocar aqui el puerto del front)
const corsOptions = {
  origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

app.use(express.static('public'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})
app.get('/api/chatgpt',chatgptGet)

console.log(`backend corriendo en el puerto: ${process.env.PORT_API}`)
app.listen(process.env.PORT_API)
// const Server = require('./models/server')

// const servidor= new Server()
// servidor.listen()

