import React from 'react';
import image from '../Image/image.jpg';
import {MdOutlineKeyboardDoubleArrowRight}  from 'react-icons/md';
import { Link } from 'react-scroll';
const Home = () => {
  return (
    <div name='home'  className="h-screen w-full bg-gradient-to-b from-black via-black to-gray-800 ">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center h-full px-4 md:flex-row">
        <div className="flex flex-col justify-center h-full">
          <h2 className="text-4xl sm:text-7xl font-bold text-white ">
           Building things...
          </h2>
          <p className="text-gray-300 py-4 max-w-md">
            I'm a builder with a passion for developing softwares.I have proficiency in programming languages such as <span className='font-bold'>Python</span> and <span className='font-bold'>Dart</span>, and expertise in technologies such as <span className='font-bold'>Flutter</span> (Mobile app developement), <span className='font-bold'>Django</span> (Backend), and Azure. I have developed and maintaining mobile apps with lacs of downloads on Play store and also run a Youtube channel related to the technologies I work with.
          </p>
          <div>
            <Link to="portfolio" smooth duration={500} className='group text-white w-fit px-6 py-3 my-2 flex item-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer'>
              Portfolio
              <span className='group-hover:rotate-90 duration-300'>
                 <MdOutlineKeyboardDoubleArrowRight size={25} className="ml-1"/>
              </span>
            </Link>
          </div>
        </div>
        <div>
        <img src={image} alt="my profile" className="rounded-2xl mx-auto w-2/3 "/>
        </div>
      </div>
    </div>
  );
}

export default Home;
