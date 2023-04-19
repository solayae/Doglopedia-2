const { Router } = require('express');
// Importar todos los routers;
const {API_KEY}= process.env;
const {Temperament}= require('../../db')
const router = Router();
//const axios = require('axios')
const { default: axios } = require('axios');


router.get('/temperament', async (req, res)=>{
    const temperamentsInfo = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)// me traigo la info de la api
    //trae muchos arrelos
    const temperamentsBd = temperamentsInfo.data.map(e => e.temperament)
    .toString()//Devuelve una cadena de caracteres (texto)
    .trim()// eliminar espacios en blanco y tablulaciones
    .split(/\s*,\s*/);//Esto imprime dos líneas; la primera línea imprime la cadena original, y la segunda línea imprime el array resultante.
    
    const filtrado = temperamentsBd.filter(e => e);// guardo por separado cada elemento
    const filtradoEach =[... new Set (filtrado)];// creo un nuevo array con los temperamentos q tenia guardados y los nuevos, si se repiten se quitan

   //  console.log(filtradoEach)
    filtradoEach.forEach(e =>{
       Temperament.findOrCreate({// se fija si esta y si no esta lo crea en la db         
          where: {name: e},
       })
    })
    const todosTemperaments =await Temperament.findAll(); 
    res.json(todosTemperaments);
  })


module.exports = router;
