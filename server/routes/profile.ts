const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/profile/user', (req, res) => {
    

})





module.exports = router;
