const express = require('express')
const router = express.Router()

const {
    postLogin } = require('./auth.controllers')


router.post('/', postLogin)


module.exports = router