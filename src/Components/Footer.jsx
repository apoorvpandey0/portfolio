import React from 'react'
import { FaGithub , FaLinkedin } from 'react-icons/fa';
import {HiOutlineMailOpen} from  'react-icons/hi'
import {BsFillPersonLinesFill,BsYoutube} from 'react-icons/bs';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css';



const links = [
    {
        id:1,
        child:(
            <>
            <FaLinkedin size={30}/>
            </>
        ),
        tooltip:'Visit my Linkedin',
        href:'https://www.linkedin.com/in/apoorv-pandey/',
        style:'rounded-tr-md'
    },
    {
        id:2,
        child:(

            <FaGithub size={30}/>
        ),
        tooltip:'Visit my Linkedin Profile',
        href:'https://github.com/apoorvpandey0'
    },
    {
        id:3,
        child:(
            <>
            <HiOutlineMailOpen size={30}/>
            </>
        ),
        tooltip:'Send me a Mail',
        href:'mailto: apoorvpandey0@gmail.com'
    },
    {
        id:4,
        child:(
            <>
           <BsFillPersonLinesFill size={30}/>
            </>
        ),
        tooltip:'Download my Resume',
        href:'RESUME 14 April 2023.pdf',
        download:true,
    },
    {
        id:5,
        child:(
            <>
           <BsYoutube size={30}/>
            </>
        ),
        tooltip:'Visit my Youtube Channel',
        href:'https://www.youtube.com/channel/UCqt-XHfPFjSZPV8WqWaTV8Q',
        style:'rounded-br-md',
    }
];
function Footer() {
  return (
    <>
    <Tooltip id="my-tooltip" />
    <div name='SocialLink' className='bg-gray-500'>
    <ul className='flex flex-row justify-evenly'>
      {links.map(({id, child, href, style, download,tooltip}) =>(
          <li data-tooltip-id="my-tooltip" data-tooltip-content={tooltip} key={id} className= {" flex justify-between items-center h-14 px-4 hover:bg-gray-700 bg-gray-500"}>
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