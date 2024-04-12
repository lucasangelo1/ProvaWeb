const express = require("express");
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const Food=require('./Model/Food')
app.use(express.json());
app.use(express.urlencoded({extended: true}))


//Conectar ao Banco de Dados - usar URL fornecida pelo Atlas
mongoose.connect(process.env.DB_CONNECTION).then(() => {
    console.log('Connected to DataBase');
    app.listen(3000, ()=>{console.log("Server is running")});
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });


//Rotas
app.post("/api/foods", async (req,res)=>{
    console.log(req.body) 
    const food =new Food({
        Name:req.body.Name,
        Id:req.body.Id,
        Category:req.body.Category,
        Quantity:req.body.Quantity,
        ExpirationDate:req.body.ExpirationDate,
        Price:req.body.Price
    });

    await food.save()
    .then(data=>{
        res.json(data);
    })
    .catch(err =>{
        res.json({message: err});
        console.log(err)
    });
});


//Retorna uma lista de todos os alimentos no banco de dados
app.get("/api/foods", async(req,res)=>{
    const foods = await Food.find();
    res.json(foods);
});


//Retorna os detalhes de um alimento com base no ID fornecido
app.get("/api/foods/:Id", async(req,res)=>{
    const foods = await Food.findById(req.params.Id);
    res.json(foods);
});



//Atualiza preço da comida 
app.patch("/api/foods/:Id",async(req,res)=>{
    const updatefoods = await Food.updateOne(
        {_Id:req.body.Id},
        {$set:{Name:req.body.Price}});

    res.json(updatefoods);

});


//Deleta Comida
app.delete("/api/foods/:Id",async(req,res)=>{
    const removeFood= await Food.remove({_Id:req.params.Id});
    res.json(removeFood);

});









//Servidor
app.listen(3030, ()=>{console.log("Server is running")});