import Head from 'next/head';
import Navbar from '../components/Navbar';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';

function Contact () {
    const {user,error,isLoading} = useUser();

    if(!user) toast.warning("Please Login First....")
        return(
            <div className="flex min-h-screen flex-col md:px-2  max-w-7xl mx-auto">
            <Head>
            <meta charSet='UTF-8' />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="coder hunts, coding, codewithharry, python, websites, blogging, seo, nextjs, reactjs, typescript, nodejs, codechef, leetcode" />
                <title>Profile - {user?.name}</title>
                <link className="rounded-md" rel="icon" href="/logo.jpeg" />
            </Head>
            <Navbar />
            <div className='shadow-lg shadow-green-700 rounded-lg'>
            <img className='w-32 h-32 object-cover mx-auto py-2 my-10 border-4 border-green-600 rounded-full bg-black mb-8 ' src={user?.picture || '/p1.png'} alt="" />

            <div className='flex flex-col text-xl justify-center items-center my-4 '>
                <p className='mb-4 text-2xl '>Name : <span className='text-green-600 font-bold' >{user?.nickname} {user?.email_verified===true ? (<span>✅</span>): <span>❌</span>}</span></p>
                <p className='mb-4 text-2xl '>Email : <span className='text-green-600 font-bold' >{user?.email}</span></p>
                <p className='mb-4 text-2xl '>Last Login : <span className='text-green-600 font-bold' >{new Date(user?.updated_at || "Login Required").toLocaleString()}</span></p>
                <button className='my-12 border-4 h-12 w-24 rounded-md bg-green-800 text-white hover:bg-red-600 ' onClick={() => {
                    toast.promise(Router.push('/api/auth/logout'),{
                        pending: "Logging Out",
                        success : "Logged Out",
                        error: "Error while Logging Out"
    
                    })
                }}>Log Out</button>
            </div>

            
            </div>
            
        </div>
        )
}

export default Contact;