const { authJwt } = require("../middleware");

module.exports= app=>{
    const ingrediente=require("../controllers/ingrediente.controller");
    var router =require("express").Router();

    router.post("/", ingrediente.create);
    router.get("/", ingrediente.findAll); 
    router.get("/:id", ingrediente.findOne);
    router.put("/:id", ingrediente.update);
    router.delete("/:id", ingrediente.delete);
   
    app.use('/api/ingrediente', router);
};