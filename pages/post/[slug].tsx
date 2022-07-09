import { client, urlFor } from "../../sanity";
import { Post } from "../../typings";
import Navbar from "../../components/Navbar";
import { GetStaticProps } from 'next';
import { useForm, SubmitHandler } from "react-hook-form";
import { useState , useEffect} from 'react';
import Head from 'next/head';
import Script from 'next/script'
import { useUser } from '@auth0/nextjs-auth0';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BlockContent from '@sanity/block-content-to-react'

interface Props {
  post: Post;
}

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}



function getDate(d:string ) {
  let day, month, year;

  let result = d.match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}");
  if (null != result) {
    let dateSplitted = result[0].split(result[1]);
    day = dateSplitted[0];
    month = dateSplitted[1];
    year = dateSplitted[2];
  }
  result = d.match("[0-9]{4}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}");
  if (null != result) {
    let dateSplitted = result[0].split(result[1]);
    day = dateSplitted[2];
    month = dateSplitted[1];
    year = dateSplitted[0];
  }

  if (Number(month) > 12) {
    let aux = day;
    day = month;
    month = aux;
  }

  return year + "/" + month + "/" + day;
}

function Post({ post }: Props) {
  const {user, error, isLoading} = useUser();
  const [submitted, setSubmitted] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  let date = getDate(post._createdAt);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    
    if(user){
      await fetch('/api/createComment', {
        method: 'POST',
        body: JSON.stringify(data),
      }).then(() => {
        toast.success("Comment Added")
        setSubmitted(true);
      }).catch(err => {
        toast.error("Failed to Add Comment")
        setSubmitted(false);
      })
    } else {
      toast.warning("Please Log In to Add Comment");
    }
    

  };
  
  return (

    <>
    <Head>
    <meta charSet='UTF-8' />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="coder hunts, coding, codewithharry, python, websites, blogging, seo, nextjs, reactjs, typescript, nodejs, codechef, leetcode" />
        <title>Post - {post.slug.current}</title>
        <link className="rounded-md" rel="icon" href="/logo.jpeg" />
        <link href="../../styles/prism.css" rel="stylesheet" />
        <Script src="prism.js"></Script>
    </Head>
      <Navbar />
      

              
      <img className="w-full rounded-lg shadow-md h-60 object-cover" src={urlFor(post.mainImage).url()!} alt="" />

      <div className="lg:flex">

        {/* Left Ads Columns */}
        <div className="flex-1 lg:w-1/4 mx-auto p-5">
          {/* Ads here  */}
        </div>

        <div>

          {/* Post data columns */}
          <article className="max-w-3xl mx-auto p-5 flex-1">
            <h1 className="text-3xl mt-10 mb-3 font-bold">{post.title}</h1>

            <h2 className="text-xl font-light text-gray-500 mb-2">{post.description}</h2>
            
            <div className="flex items-center space-x-2">
              
              <img className="rounded-full  shadow-md w-10 object-contain h-10" src={urlFor(post.author.image).url()!} alt="" />
              
              <p className="font-extralight text-sm">Blog post by <span className="text-green-600">{post.author.name}</span>  - Published at {" "} {date}</p>
              
              </div>
              

           

            <div className="mt-10">
              {/* <PortableText
                content={post.body}
                dataset="production"
                projectId="3vxz0pud"
                serializers={
                 {
                  h1: (props: any) => (
                    <h1 className="text-2xl font-bold my-5" {...props} />
                  ),
                  h2: (props: any) => (
                    <h2 className="text-xl font-bold my-5" {...props} />
                  ),
                  li: ({ children }: any) => (
                    <li className="ml-4 list-desc"> {children} </li>
                  ),
                  link: ({ href, children }: any) => (
                    <a href={href} className="text-blue-500 hover:underline">{children}</a>
                  ), 
                  code: ({node = {}}) => {
                    const { code, language } = node
                    if (!code) {
                      return null
                    }
                    return <SyntaxHighlighterProps 
                            language={language || "text"}  
                            lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}
                            wrapLines={true}>
                              {code}
                            </SyntaxHighlighterProps>
                  },                 
                }}
              /> */}
              <BlockContent
              dataset="production"
              projectId="3vxz0pud"
               blocks={post.body} serializers={serializers} />
            </div>

          </article>

          <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
          {submitted ? (
            <div className="flex flex-col py-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
              <h3 className="text-3xl font bold mx-2">
                Thank you for submitting your comment!
              </h3>
              <p className="mx-2">Once it has been approved , it will appear below!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 max-w-2xl mx-auto mb-12">

              <h3 className="text-sm text-yellow-500">Enjoyed this Article</h3>

              <h4 className="text-3xl font-bold">Leave Comment below</h4>

              <hr className="py-3 mt-2" />

              <input type="hidden" {...register("_id")} name="_id" value={post._id} />

              <label className="block mb-5 ">
                <span className="text-gray-700">Name</span>
                <input {...register("name", { required: true })} className="shadow border rounded px-3 py-2 form-input mt-3 block w-full focus:ring ring-yellow-500" type="text" placeholder="Enter Your Name" />
              </label>

              <label className="block mb-5 ">
                <span className="text-gray-700">Email</span>
                <input {...register("email", { required: true })} className="shadow border rounded px-3 py-2 form-input mt-3 block w-full focus:ring ring-yellow-500" type="email" placeholder="Enter Your Email" />
              </label>

              <label className="block mb-5 ">
                <span className="text-gray-700">Comment</span>
                <textarea {...register("comment", { required: true })} className="shadow border rounded px-3 py-2 form-input mt-3 block w-full focus:ring ring-yellow-500" rows={8} placeholder="Enter Your comment" />
              </label>

              <div className="flex flex-col p-5">
                {errors.name && (
                  <span className="text-red-500">- The Name Field is Required</span>
                )}
                {errors.email && (
                  <span className="text-red-500">- The Comment Field is Required</span>
                )}
                {errors.comment && (
                  <span className="text-red-500">- The Comment Field is Required</span>
                )}
              </div>
              <input className="bg-green-800 hover:bg-green-600 rounded-full shadow-md focus:shadow-outline text-white font-bold py-2 px-4 focus:outline-none ring" type="submit" value="Submit" />
            </form>

            
          )}

          <div className="mx-auto flex flex-col max-w-2xl p-10 my-10 shadow-lg shadow-green-800"> 
            {/* comment */}
            <h3 className="text-4xl">Comments</h3>
            <hr className="pb-2" />
            {post.comments.map((comment) => (
              <div key={comment._id}>
                <p>
                  <span className="text-yellow-500">{comment.name} : </span>{comment.comment}
                </p>
              </div>
            ))}
            
            
          </div>

        </div>

        {/* Right Ads Column */}
        <div className="flex-1 ">
          {/* Ads here */}
        </div>
        
      </div>

    </>
  );
}

export default Post;

const serializers =  {
  types: {
    h1: (props: any) => (
      <h1 className="text-4xl font-bold my-5" {...props} />
    ),
    h2: (props: any) => (
      <h2 className="text-2xl font-bold my-5" {...props} />
    ),
    li: ({ children }: any) => (
      <li className="ml-4 list-desc"> {children} </li>
    ),
    link: ({ href, children }: any) => (
      <a href={href} className="text-blue-500 hover:underline">{children}</a>
    ), 
    code: (props:any) => (
      <pre className="whitespace-pre-wrap overflow-x-scroll  mx-auto border-2 border-black px-2 py-2 my-4 space-y-1 shadow-md">
        <code className={"language"+props.node.language}>{props.node.code}</code>
      </pre>
    ),    
  },
}

export const getStaticPaths = async () => {
  
  const query = `*[_type == "post"]{
      _id,
      slug{
        current
      }
    }`;

  const posts = await client.fetch(query);

  const paths = posts.map((post
    : Post) => ({
      params: {
        slug: post.slug.current

      }
    }));

  return {
    paths,
    fallback: "blocking",
  }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  

  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author->{
      name,
      image
    },
    'comments' : *[
      _type == "comment" && post._ref == ^._id && Approved == true],
      description,
      mainImage,
      slug,
      body
  }`;
  const post = await client.fetch(query, {
    slug: params?.slug,
  })
  if (!post) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      post, 
    },
    revalidate: 60
  }
}



