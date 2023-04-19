const { Router } = require('express');

const { Dog } = require('../../db')

const router = Router();

router.post('/dogsCreate', async (req, res) => {
  const { name, image, height, weight, temperament, life_span, } = req.body; // destructurin de las propiedades 
  if (!name || !image || !height || !weight || !temperament || !life_span) // valido para crear si falta un dato no permite crear 
    return res.status(400).json({ msg: "Faltan datos" });


  // try {
  // const dogCreate = {name,image,height,weight,temperament,life_span}

  //const nuevoDog= await Dog.create(dogCreate) 

  const createDog = await Dog.create({
    name: name,
    height: height,
    weight: weight,
    life_span: life_span,
    image: image,
    temperament: temperament,

  });

  if (createDog) {
    res.status(200).json(createDog);
  } else {
    res.status(500).send('uncreated dog')
  }
});
module.exports = router;






















//   // console.log("Modelo",Dog.__proto__)
//   // console.log("entidad",nuevoDog.__proto__)
//   const temperamentDb = await Temperament.findAll({
//     where: {name : temperament}

//   })
//   nuevoDog.addTemperament(temperamentDb);


//   res.send(nuevoDog);
//   console.log(nuevoDog)



// } catch (error) {
//   console.log(error)
// 
//}


