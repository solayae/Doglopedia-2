const { Router } = require('express');
const getAllDogs = require('../../controller/getAllDogs');
//const Dog = require('../../models/Dog');
const {Dog} = require('../../db')


const router = Router();


router.get('/dogs',async(req,res)=>{
    try {
        const name =req.query.name
        let dogsTotal= await getAllDogs();
    if(name){
        let dogName = await dogsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ?
        res.status(200).send(dogName):
        res.status(404).send('No existe esa Raza de Perros')
    }else{
        res.status(200).send(dogsTotal)
    }
    } catch (error) {
        console.log(error.message)
    }
    
});



router.get("/dogs/:id", async(req,res)=>{
  const id = req.params.id;
  const allDogs = await getAllDogs();
  if(id){
    const dogId= await allDogs.filter((el) =>el.id == id);
    dogId.length ?
    res.status(200).send(dogId):
    res.status(404).send('No existe un perro con ese id')
  }
});

// router.delete('/:id', async (req,res)=>{
//     const { id } = req.params
//     try {

//         if (id) {
//             Dog.destroy({ where: { id: id } })
//         }
//         res.send('Perro Eliminado')

//     } catch (error) {
//         console.log('Deleted')
//     }
// })
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
      if (id) {
        const deleteDog = await Dog.findOne({
          where: {id: id}
        })
        if (deleteDog) {
          await deleteDog.destroy()
          res.status(200).send('Perro Eliminado')
        }
        else res.status(404).status('Id de perro no existe')
      } else res.status(400).send('Algo salio mal')
    } catch (e) {
      res.status(400).send('El ID del perro está mal escrito')
    }
  })




module.exports = router;
