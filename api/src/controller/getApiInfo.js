const axios = require('axios');
const {API_KEY}= process.env;
const getApiInfo = async() =>{
   try {
    //const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiInfo = await apiUrl.data.map(el =>{

        return {
            id:el.id,
            name: el.name,
            height: el.height.imperial,
            weight:el.weight.imperial, 
            life_span:el.life_span,
            image:el.image.url,
            temperament: el.temperament
        }
    })
    return apiInfo;
   } catch (error) {
    console.log(error)
   }
    
}

module.exports =getApiInfo;