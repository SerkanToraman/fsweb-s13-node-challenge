
// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

//1 Imports
const express = require('express');
const server = express();


//2 Middlewares 
server.use(express.json());

//3 Routers
// //Check if server is running
// server.get('/',(req,res)=>{
//   res.json("server deneme - basarili")
// })




//4 Errors 



//5 Exports

module.exports = server;
