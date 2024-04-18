import * as express from 'express';
import  {Request, Response } from 'express'
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/allLocationRequests', (req: Request, res: Response) => {
    prisma.LocationRequest.findMany()
    .then((results: any) => {
        res.send(results).status(200)
    })
    .catch((err: string) => {
        console.error(err)
        res.sendStatus(500)
    })
})

router.post('/sendLocationRequest', (req: Request, res: Response) => {
    prisma.LocationRequest.create(req.body)
    .then(() => {
        console.log('Location Request successfully sent')
        res.sendStatus(200)
    })
    .catch((err: string) => {
        console.error(err)
        res.sendStatus(500)
    })
})

module.exports = router;