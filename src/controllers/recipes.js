const axios = require('axios')
const {apidata} = require('../utils/apiData')


const {URL_SPOONOCULAR, API_KEY} = process.env

const {Recipe, Diet} = require('../db')


async function getRecipesByName(name){
const allRecipes = await getAllRecipes()

if(name){
    const recipesResult = allRecipes.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()))

    if(!recipesResult.length){
        return 'Recipe not found'
    }
        return recipesResult
    }else{
         return allRecipes
    }
}

async function getRecipesByApi(){

//    const apiInfo = (await axios(`${URL_SPOONOCULAR}complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)).data.results

const apiInfo = apidata.results

const result = await apiInfo?.map((recipe) =>{
    return{
        id: recipe.id,
        name: recipe.title,
        summary: recipe.summary,
        healthScore: recipe.healthScore,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        steps: recipe.analyzedInstructions[0]?.steps.map( (s) => {
            return {
                number: s.number,
                step: s.step
            }
        }),
        diets: recipe.diets,
        dish: recipe.dishTypes,
        create: false
    }
})   
    return result
}

async function getByApiId(id){
    id = parseInt(id)

    const recipeApi = await axios.get(`${URL_SPOONOCULAR}/${id}/information?apiKey=${API_KEY}`)
    
    const recipeData = {
        id: recipeApi.data.id,
        name: recipeApi.data.title,
        summary: recipeApi.data.summary,
        healthScore: recipeApi.data.healthScore,
        image: recipeApi.data.image,
        readyInMinutes: recipeApi.data.readyInMinutes,
        steps: recipeApi.data.analyzedInstructions[0]?.steps.map( (s) => {
            return {
                number: s.number,
                step: s.step
            }
        }),
        diets: recipeApi.data.diets,
        dish: recipeApi.data.dishTypes,
        create: false
    }
    return recipeData
}


async function getDataBaseById(id){
    return await Recipe.findByPk( id, {
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

async function getAllRecipes(){

const recipesByApi = await getRecipesByApi()

let recipesByDb = await Recipe.findAll({
    include: {
        model: Diet,
        attributes: ['name'],
        through: {
            attributes: []
        }
    }
})
    const allRecipes = [...recipesByApi, ...recipesByDb]
    return allRecipes
}

async function createRecipe(name, summary, healthScore, steps, diets, image, dish, readyInMinutes){

    let recipeCreate = await Recipe.create({
        name, summary, healthScore, steps, image, dish, readyInMinutes
    })
    
    let recipeDB = await Diet.findAll({where: {name: diets}})

    recipeCreate.addDiets(recipeDB)

    return 'Recipe Created'
}

module.exports = {
    getRecipesByName,
    getByApiId,
    getDataBaseById,
    getAllRecipes,
    createRecipe
}