import React from 'react';

import html from '../Image/html.png';
import css from '../Image/css.png';
import JavaScript from '../Image/javascript.png';
import react from '../Image/react.png';
import vite from '../Image/vite.png';
import tailwind from '../Image/tailwind.png';
import github from '../Image/github.png';
import nextjs from '../Image/nextjs.png';
import java from '../Image/java.png';

const getShuffledArr = arr => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
};

const Experience = () => {
    const  techs = getShuffledArr( [
        {
            id:1,
            src:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
            title:'Flutter',
            style:'shadow-orange-500'
        },{
            id:2,
            src:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain-wordmark.svg",
            title:'Django',
            style:'shadow-blue-500'
        },{
            id:3,
            src:JavaScript,
            title:'JavaScript',
            style:'shadow-yellow-500'
        },{
            id:4,
            src:react,
            title:'React.js',
            style:'shadow-blue-600'
        },{
            id:5,
            src:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
            title:'Python',
            style:'shadow-white'
        },{
            id:6,
            src:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
            title:'Dart',
            style:'shadow-blue-400'
        },{
            id:7,
            src:tailwind,
            title:'TailWind',
            style:'shadow-sky-400'
        },
        {
            id:8,
            src:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
            title:'Pandas',
            style:'shadow-gray-400'
        },
        {
            id:9,
            src:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
            title:'Selenium',
            style:'shadow-red-400'
        }
    ])


  return ( 
    <div 
       name="experience" 
       className='bg-gradient-to-b from-gray-800 to-black w-full '>
        <div className='max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white'>
            <div>
                <p className='text-4xl font-bold border-b-4 border-gray-500 p-2 inline'>Experience</p>
                <p className='py-6'>These are the Technologies I've worked with</p>
            </div>

        <div className='w-full grid grid-cols-2 sm:grid-cols-3  gap-8 text-center py-8 px-12 sm:px-0'>
            {techs.map(({id,src,title,style})=>(
            <div key={id} className={`shadow-md hover:scale-105 duration-500 py-2 rounded-lg ${style}`}>
                <img src={src} alt="" className='w-40 mx-auto'/>
                <p className='mt-6'>{title}</p>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Experience;
