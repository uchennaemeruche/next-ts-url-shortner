import { prisma } from '../../db/client';
import { NextApiRequest, NextApiResponse } from "next";


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const slug = req.query["slug"]
    if (!slug || typeof slug !== "string") 
        return res.status(404).send(JSON.stringify({ message: "Please you need to pass a slug" }))
        
    const data = await prisma.shortLink.findFirst({
        where: {
            slug: {
                equals: slug
            }
        }
    })
    if (!data) return res.status(404).send(JSON.stringify({ message: "Invalid slug" }))
    
    return res.redirect(data.url)
    
   
}