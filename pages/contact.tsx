import Head from 'next/head';
import Navbar from '../components/Navbar';
import Link from 'next/link';

function Contact () {
        return(
            <div className="flex min-h-screen flex-col md:px-2  max-w-7xl mx-auto">
            <Head>
            <meta charSet='UTF-8' />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="coder hunts, coding, codewithharry, python, websites, blogging, seo, nextjs, reactjs, typescript, nodejs, codechef, leetcode" />
                <title>Contact Us - Coder Hunt</title>
                <link className="rounded-md" rel="icon" href="/logo.jpeg" />
            </Head>
            <Navbar />
            <div className='flex flex-col justify-center items-center'>
               
               <div className='text-4xl my-4 py-4 '>
                    Contact Information
               </div>

               <hr className="my-5  border border-yellow-500" />

               <p className='text-lg mb-4  mx-auto md:text-3xl'><span className='font-bold'>Name: </span> Ritik Ranjan</p> 

               <p className='text-lg mb-4 mx-auto md:text-3xl'><span className='font-bold'>Phone Number: </span> +917564970990</p>

               <p className='text-lg mb-4 mx-auto md:text-3xl'><span className='font-bold'>Email: </span>ritik123453@gmail</p>

               <p className='text-lg mb-4 mx-auto md:text-3xl'><span className='font-bold'>Website: </span><Link href='https://www.coderhunts.com' ><span className="text-blue-500 cursor-pointer">
               www.coderhunts.com </span></Link></p>


            </div>
        </div>
        )
}

export default Contact;