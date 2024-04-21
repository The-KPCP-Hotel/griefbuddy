import * as express from 'express';
import  {Request, Response } from 'express'
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


router.get('/allPosts', (req: Request, res: Response) => {
    prisma.Post.findMany()
    .then((results: any) => {
      res.send(results).status(200);
    })
    .catch((err: string) => {
      console.error(err);
      res.sendStatus(500);
    });
})

router.post('/addPost', (req: Request, res: Response) => {
    const { user, text } = req.body.data
    prisma.User.findUnique({
        where: {
            googleId: user
        }
    })
    .then((results: any) => {
        prisma.Post.create({
            data: {
                text: text,
                user: {
                    connect: {
                        name: results.name,
                        googleId: results.googleId
                    }
                }
            }
        })
        .then((results: any) => {
          res.sendStatus(200);
        })
        .catch((err: string) => {
          console.error(err);
          res.sendStatus(500);
        });
        
    })

})

// router.patch('/addComment', (req: Request, res: Response) => {
//     prisma.User.update
// })

module.exports = router