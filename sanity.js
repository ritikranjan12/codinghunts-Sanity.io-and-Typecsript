import {
    createCurrentUserHook,
    createClient
} from "next-sanity";
import createImageUrlBuilder from '@sanity/image-url'

export const config = {
    dataset : process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId : process.env.NEXT_PUBLIC_SANITY_PROJECTID,
    apiVersion: '2021-08-31',
    useCdn: true,
}

export const client = createClient(config);


export const urlFor = (source) => createImageUrlBuilder(config).image(source);
     