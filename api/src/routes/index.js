const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs= require('./Dogs/dogs')
const temperament = require('./Temperam/temperam')
const createDog = require('./crearDog/createDog')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/',dogs);
router.use('/',temperament);
router.use('/',createDog);


module.exports = router;
