const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const recipes = require('../middlewares/recipes.js')
const diets = require('../middlewares/diets')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipes)
router.use('/diets', diets)

module.exports = router;
