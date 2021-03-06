const { authJwt } = require("../middleware");

module.exports= app=>{
    const cliente=require("../controllers/cliente.controller");
    var router =require("express").Router();

    router.post("/", cliente.create);
    router.get("/", cliente.findAll); 
    router.get("/:id", cliente.findOne);
    router.put("/:id", cliente.update);
    router.delete("/:id", cliente.delete);
   
    app.use('/api/cliente', router);
};