import * as express from 'express';
import  {Request, Response } from 'express'
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


router.get('/allResources', (req: Request, res: Response) => {
    prisma.Resource.findMany()
    .then((results: any) => {
        res.send(results).status(200)
    })
    .catch((err: string) => {
        console.error(err)
        res.sendStatus(500)
    })
})


router.post('/addResource', (req: Request, res: Response) => {
    const { type, url } = req.body.data
    prisma.Resource.create({
        data: {
            type,
            url
        }   
    })
    .then(() => {
        console.log('Resource successfully added')
        res.sendStatus(200)
    })
    .catch((err: string) => {
        console.error(err)
        res.sendStatus(500)
    })
})

module.exports = router;