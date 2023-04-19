const axios = require('axios')
const getApiInfo = require('./getApiInfo');
const getDbInfo = require('./getDbInfo');


const getAllDogs = async ()=>{
 const apiInfo = await getApiInfo();
 const dbInfo= await getDbInfo();
 const infoTotal = apiInfo.concat(dbInfo)
 return infoTotal;
}

module.exports = getAllDogs;