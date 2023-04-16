import React from 'react'
import { FaGithub , FaLinkedin } from 'react-icons/fa';
import {HiOutlineMailOpen} from  'react-icons/hi'
import {BsFillPersonLinesFill,BsYoutube} from 'react-icons/bs';
const links = [
    {
        id:1,
        child:(
            <>
            LinkedIn<FaLinkedin size={30}/>
            </>
        ),
        href:'https://www.linkedin.com/in/apoorv-pandey/',
        style:'rounded-tr-md'
    },
    {
        id:2,
        child:(
            <>
            Github<FaGithub size={30}/>
            </>
        ),
        href:'https://github.com/apoorvpandey0'
    },
    {
        id:3,
        child:(
            <>
            Mail<HiOutlineMailOpen size={30}/>
            </>
        ),
        href:'mailto: apoorvpandey0@gmail.com'
    },
    {
        id:4,
        child:(
            <>
           Resume <BsFillPersonLinesFill size={30}/>
            </>
        ),
        href:'RESUME 14 April 2023.pdf',
        download:true,
    },
    {
        id:5,
        child:(
            <>
           Youtube <BsYoutube size={30}/>
            </>
        ),
        href:'https://www.youtube.com/channel/UCqt-XHfPFjSZPV8WqWaTV8Q',
        style:'rounded-br-md',
    }
];
function Footer() {
  return (
    <>
    <div name='SocialLink' className=''>
    <ul className='flex flex-row justify-center'>
      {links.map(({id, child, href, style, download}) =>(
          <li key={id} className= {" flex justify-between items-center w-40 h-14 px-4 hover:bg-gray-700 bg-gray-500"}>
          <a href={href} 
          className="flex justify-between items-center w-full text-white"
          download={download}
          target='_blank' >
              {child}
          </a>
      </li>
      ))}
    </ul>
  </div>
    </>
  )
}

export default Footer