import * as express from 'express';
import  {Request, Response } from 'express'
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


router.get('/profile/user', (req: Request, res: Response) => {
    let userr = prisma.User.findMany()
    res.send(userr)
})

router.patch('/profile/user', (req: Request, res: Response) => {
    const { googleId, location, currMood } = req.body
    res.send({
        where: {
            googleId: googleId
        },
        data: {
            
        }
    })
})





module.exports = router;
