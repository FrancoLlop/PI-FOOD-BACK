const {Router} = require('express')
const {Diet} = require('../db')

const router = Router()

router.get('', async (req, res, next)=>{
    try {
        res.json(await Diet.findAll())
    } catch (error) {
        next(error)
    }
})

module.exports = router