const axios =require('axios')
const {Dog, Temperament}= require('../db')
//const Dog = require("../models/Dog")


const getDbInfo =async ()=>{
  return await Dog.findAll({
    include:{
        model: Temperament,
        attributes:['name'],
        through:{
            attributes:[],
        }
    }
  })  
}


module.exports = getDbInfo;