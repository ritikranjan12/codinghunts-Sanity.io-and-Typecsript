import type { NextApiRequest, NextApiResponse } from 'next'
import {
    createClient
} from "next-sanity";

const config = {
    dataset : process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId : process.env.NEXT_PUBLIC_SANITY_PROJECTID,
    apiVersion: '2021-10-21',  
    useCdn : true,  
    token: process.env.NEXT_SANITY_TOKEN
};

const client = createClient(config);

export default async function createComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const {_id, name, email, comment} = JSON.parse(req.body);
    try{
        await client.create({
           _type: 'comment',
           post: {
            _type:'reference',
            _ref:_id
           },
           name,
           email,
           comment
        });
        console.log("Comment Submitted");
        
    } catch(err) {
        return res.status(500).json({message : "Couldn't Submit comment",err});
    }
  return res.status(200).json({ name: 'Comment Submitted' })
}
