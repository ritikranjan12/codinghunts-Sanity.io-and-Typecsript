import Head from 'next/head';
import Navbar from "../components/Navbar";
import CookieConsent from 'react-cookie-consent';
import { client, urlFor } from "../sanity";
import { Post } from "../typings";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import Link from 'next/link'
import Popup from '../components/popup';

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  let array = ["#5d8aa8", "#e52b50", "#00ffff", "#ff2052", "#007fff", "	#21abcd", "#cc0000", "#fb607f", "#cc5500", "#5f9ea0"];
  let color = Math.floor(Math.random() * 10)
  const bcolor = array[color];

  return (
    <div>
      <div className="flex min-h-screen flex-col md:px-2  max-w-7xl mx-auto">
        <Head>
          <meta charSet='UTF-8' />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="coder hunts, coding, codewithharry, python, websites, blogging, seo, nextjs, reactjs, typescript, nodejs, codechef, leetcode" />
          <title>Home - Ritik Ranjan </title>
          <link className="rounded-md" rel="icon" href="/logo.jpeg" />
        </Head>
        <Navbar />
        <div className='justify-center items-center shadow-lg shadow-red-800' style={{ backgroundColor: `${bcolor}` }}>
          <div>
            <img className='w-32 h-32 object-cover mx-auto py-2 my-10 border-4 border-green-600 rounded-full bg-black' src="/logo.jpeg" alt="" />
          </div>
          <div className='flex justify-center items-center'>
            <h2 className='text-2xl font-bold underline  md:text-3xl lg:text-4xl my-3 text-white '>Hi👋, I am  <span className='text-blue-400'><Link href='https://ritik-ranjan.netlify.app/'>Ritik Ranjan!</Link> </span> </h2>
          </div>

          <div className='flex flex-col md:flex-row  justify-center items-center'>
            <div className=' md:text-xl lg:text-3xl font-semibold md:w-1/3 mb-2 flex justify-center items-center  md:mb-8 md:mt-4  '>Web Developer</div>
            <div className='md:text-xl lg:text-3xl font-semibold md:w-1/3 mb-2 flex justify-center items-center md:mb-8 md:mt-4  '>Machine Learning</div>
            <div className='md:text-xl lg:text-3xl font-semibold md:w-1/3 mb-2 flex justify-center items-center md:mb-8 md:mt-4  '>Competetive Programmer</div>
          </div>
        </div>      
        <Popup />
      <div className="flex min-h-screen flex-col my-4 md:my-6  lg:my-8 md:px-2  max-w-7xl mx-auto">


        <div className='border-y border-black py-10 lg:py-0 '>

          <div className='px-10 space-y-5 py-2'>
            <h1 className='text-3xl md:text-5xl lg:text-7xl max-w-4xl font-serif'><span className='underline decoration-black decoration-4'>Coder Hunts</span> is a Place to Read, Connect and Grow.</h1>
            <h3 className=''>It is easy to connect with us and grow your development cycle like a Rocket!</h3>
          </div>
        </div>
        <div className="text-4xl my-4 py-4 justify-center items-center flex  font-bold bg-yellow-500 ">
          Blogs
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6'>
          {posts.map(post => (
            <div key={post._id} onClick={() => {
              toast.promise(Router.push(`/post/${post.slug.current}`), {
                pending: "Loading...",
                success: "Opening the page",
                error: "Error while Redirecting"

              })
            }} className='border rounded-lg cursor-pointer group overflow-hidden'>
              <img className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out" src={urlFor(post.mainImage).url()!} alt="" />
              <div className='flex justify-between p-5 bg-white' >
                <div>
                  <p className='underline font-bold text-lg'>{post.title}</p>
                  <p className='text-sm'>{post.description} by {post.author.name}</p>
                </div>
                <img className='h-12 w-12 rounded-full shadow-lg ' src={urlFor(post.author.image).url()!} alt="" />
              </div>
            </div>
          ))}
        </div>



      </div>
      </div>
    </div>
  )
}

export const getServerSideProps =  async()  => {
  
  const query = `*[_type == "post"] | order(date desc, _createdAt desc){
    _id,
    title,
    author-> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  const posts = await client.fetch(query);
  return {
    props : {
      posts,
    },
  }
}




