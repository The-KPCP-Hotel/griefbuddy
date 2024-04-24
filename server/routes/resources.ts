import * as express from 'express';
import  {Request, Response } from 'express'
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


router.get('/allResources', (req: Request, res: Response) => {
    
})


module.exports = router;