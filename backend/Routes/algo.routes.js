const router=require("express").Router();
const controller=require("../Controllers/algo.controller");

router.post("/sort/:type",controller.sortAlgorithm);

module.exports=router;