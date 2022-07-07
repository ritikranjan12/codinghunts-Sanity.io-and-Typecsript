import Link from 'next/link';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';

function Navbar() {
    
    return (
        <header className=' bg-grey-50 flex justify-between p-5 max-w-7xl md:mx-6  lg:mx-12'>
            <div className='flex items-center md:space-x-1 my-2'>
                <img className="shadow-md rounded-lg object-contain h-8" src="/logo.jpeg" alt="" />
                <Link href="/">
                    <span className='font-bold p-1 text-xl cursor-pointer'>Coder Hunts</span> 
                </Link> 
                
                <div className='font-semibold hidden md:inline-flex items-center md:space-x-5 px-2'>
                <Link href="/contact"><h3 className='cursor-pointer'>Contact</h3></Link>
                <Link href="https://www.linkedin.com/in/coder-hunts-5b7732208"><h3  className='text-white bg-green-600 px-4 shadow-md rounded-full py-1 cursor-pointer hover:bg-green-800'>Follow</h3></Link>
            </div>
            </div>
            
            <div className='flex items-center space-x-2  md:space-x-4 text-green-600'>
            <h3 className="cursor-pointer hover:text-green-800 hover:underline" onClick={() => {
                    toast.promise(Router.push('/api/auth/login'),{
                        pending: "Loading...",
                        success : "Opening the page",
                        error: "Error while Logging In"
    
                    })
                }}>Sign{" "}In</h3>
                <Link href="/account"><h3 className='cursor-pointer' onClick={() => {
                   toast.promise(Router.push('/account'),{
                    pending: "Loading...",
                    success : "Opening the page",
                    error: "Error while Redirecting"

                })
                }}>Profile</h3></Link>
               
               
            
                {/* {!user ? (<Link href="/contact"><h3 className='cursor-pointer md:hidden' onClick={() => {
                   toast.promise(Router.push('/contact'),{
                    pending: "Loading...",
                    success : "Opening the page",
                    error: "Error while Redirecting"

                })
                }}>Contact</h3></Link>) : (<Link href="/account"><img className="shadow-md rounded-lg object-contain h-8 cursor-pointer" src={user.picture || '/p1.png'} alt="" /></Link>)} */}
            </div>
            
        </header>
    );
}

export default Navbar;