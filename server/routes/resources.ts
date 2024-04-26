import * as express from 'express';
import  {Request, Response } from 'express'
import path = require('path');
import puppeteer, { HTTPResponse } from 'puppeteer';
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


router.get('/addResource', async (req: Request, res: Response) => {
//    const { type, url } = req.body.data

   const browser = await puppeteer.launch();

   const page = await browser.newPage();

   await page.goto(
    'https://www.lifebanc.org/resources/for-families/online-grief-resources/'
    );



    // const resources = await page.evaluate(() => document.body.innerText)
    // console.log(resources)

    const resourceTitles = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.panel-right .bg-powderblue h3'), (e) => (e.innerHTML))
    })
    console.log(resourceTitles)

    const resourceLinks = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.panel-right .bg-powderblue p a'), (e: HTMLAnchorElement) => (e.href))
    })
    console.log(resourceLinks)



    await browser.close()
    // prisma.Resource.create({
    //     data: {
    //         type,
    //         url
    //     }   
    // })
    // .then(() => {
    //     console.log('Resource successfully added')
    //     res.sendStatus(200)
    // })
    // .catch((err: string) => {
    //     console.error(err)
    //     res.sendStatus(500)
    // })
})

module.exports = router;