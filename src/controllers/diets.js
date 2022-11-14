const {diets} = require('../utils/dietData.js')
const {Diet} = require('../db')

async function getDiets(){
    const dietsObj = diets.map( e =>{
        return {name: e}
    })
    return await Diet.bulkCreate(dietsObj)
}

module.exports = {
    getDiets
}