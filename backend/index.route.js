const express = require('express')
const router = express.Router()

router.get('/health-check',(req,res) =>{res.send({message:"ok"})})

// router.use('/summary',require('./server/summary/summary.route'))
// router.use('/reviews',require('./server/reviews/reviews.route'))

module.exports = router;