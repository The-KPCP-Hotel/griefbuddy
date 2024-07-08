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
    console.log('hitting addResource')
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
            // resourceTitles.forEach((title) => {
            //     if()
            // })
            const allElements = Array.from(document.querySelector('.panel-right .bg-powderblue').children)
            type ResourceLink = {
                name: string;
                url: string;
                description?: string
            }
            type ResourceObj = {
                title?: string;
                resources?: ResourceLink []
            }
            const resourceObjects: ResourceObj[] = []
            let currObj: ResourceObj = {}
            let currLink = {} as ResourceLink
            //when we reach an h3, start a new obj
            allElements.map((e: HTMLElement) => {
                console.log(e.tagName)
                if(e.tagName === 'H2'){
                    return
                }
                if(e.tagName === 'H3'){
                   
                        resourceObjects.push(currObj)
                        currObj = {
                            title: e.innerText,
                            resources: []
                        }
                    
                    return 
                }
                if(!currObj.resources){
                    return
                }
                const link = e.querySelector('a')                
                if(link){
                    if(Object.keys(currLink).length){
                        currObj.resources.push(currLink)
                        currLink = {} as typeof currLink
                    }
                    currLink.url = link.href
                    currLink.name = link.innerText
                    return
                }
                if(!currLink.description && e.innerText){
                    currLink.description = e.innerText
                    currObj.resources.push(currLink)
                    currLink = {} as typeof currLink
                    
                }
                return e.outerHTML
            })
            if(Object.keys(currLink).length){
                currObj.resources.push(currLink)
            }
            if(Object.keys(currObj).length){
                resourceObjects.push(currObj)
            }
            return resourceObjects
            // return Array.from(document.querySelectorAll('.panel-right .bg-powderblue'), (e: HTMLElement) => (e.innerHTML))
        })
        // const allResources: any = await page.evaluate(() => {
        //     return Array.from(document.querySelectorAll('.panel-right .bg-powderblue'), (e: HTMLElement) => (e.innerHTML))
        // })
        res.send(allResources)
        return
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