import express, {Request, Response } from 'express'
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

    puppeteer.launch().then(async function(browser) {
        const page = await browser.newPage();
        await page.goto('https://www.lifebanc.org/resources/for-families/online-grief-resources/');

        
        const resourceTitles = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.panel-right .bg-powderblue h3'), (e) => (e.innerHTML))
        })
    
        const resourceLinks = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.panel-right .bg-powderblue p a'), (e: HTMLAnchorElement) => (e.href))
        })
    
        const resourceDescriptions = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.panel-right .bg-powderblue p'), (e: HTMLParagraphElement) => (e.firstChild.nodeValue))
        })

        const allResources: any = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.panel-right .bg-powderblue'), (e: HTMLElement) => (e.innerHTML))
        })

        const resourcesSplit = allResources[0].replace('\n', '').trim().split('<h3>')
        const resourceStorage: String[] = [] 
        resourcesSplit.forEach((resource: any) => {
            let h3 = '<h3>'
            resourceStorage.push(h3.concat(resource)) 
        });
        await browser.close();

        res.status(200).send({
            titles: resourceTitles,
            links: resourceLinks,
            descriptions: resourceDescriptions,
            allResources,
            resourceStorage: resourceStorage
        });
    });

})

export default router;