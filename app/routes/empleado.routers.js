const { authJwt } = require("../middleware");

module.exports= app=>{
    const empleado=require("../controllers/empleado.controller");
    var router =require("express").Router();

    router.post("/", empleado.create);
    router.get("/", empleado.findAll); 
    router.get("/:id", empleado.findOne);
    router.put("/:id", empleado.update);
    router.delete("/:id", empleado.delete);
   
    app.use('/api/empleado', router);
};