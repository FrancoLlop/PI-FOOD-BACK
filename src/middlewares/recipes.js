const {Router} = require('express')
const {Recipe} = require('../db')
const {getRecipesByName, getDataBaseById,getByApiId,createRecipe} = require('../controllers/recipes')

const router = Router()

router.get('', async (req, res, next)=>{
    const {name} = req.query
    try {
        if(name){
           return res.json(await getRecipesByName(name)) 
        }else{
            return res.json(await getRecipesByName())
        }
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next)=>{
    const {id} = req.params
    let validate = id.includes("-")
    try {
        if(validate){
            return res.json(await getDataBaseById(id))
        }else{
            return res.json(await getByApiId(id))
        }
    } catch (error) {
        next(error)
    }
})

router.post('', async (req, res, next)=>{
    const {name, summary, healthScore, steps, diets, image, dish, readyInMinutes} = req.body
    try {
        return res.json( await createRecipe(name, summary, healthScore, steps, diets, image, dish, readyInMinutes))
    } catch (error) {
        next(error)
    }
})

module.exports = router