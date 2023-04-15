import React from 'react';
import { FaGithub , FaLinkedin } from 'react-icons/fa';
import {HiOutlineMailOpen} from  'react-icons/hi'
import {BsFillPersonLinesFill,BsYoutube} from 'react-icons/bs';
const SocialLinks = () => {
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
            style:'rounded-br-md',
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
  return (
    <div name='SocialLink' className='flex flex-col top-[35%] left-0 fixed'>
      <ul>
        {links.map(({id, child, href, style, download}) =>(
            <li key={id} className= {" flex justify-between items-center w-40 h-14 px-4 ml-[-100px] hover:ml-[-10px] hover:rounded-md duration-300 bg-gray-500" +" "+ style}>
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
  );
}

export default SocialLinks;
