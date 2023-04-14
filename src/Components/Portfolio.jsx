import React from 'react';
import arrayDestruct from '../Image/Image_more/arrayDestruct.jpg'
import installNode from '../Image/Image_more/installNode.jpg';
import NavBar from '../Image/Image_more/navbar.jpg';
import reactSmooth from '../Image/Image_more/reactSmooth.jpg';
import reactWeather from '../Image/Image_more/reactWeather.jpg';
import usestate from '../Image/Image_more/usestate.jpg';

const Portfolio = () => {
  const portfolio=[{
    id:1,
    src:arrayDestruct
  },{
    id:2,
    src:installNode,
  },{
    id:3,
    src:NavBar,
  },
  {
    id:5,
    src:reactSmooth,
  },
  {
    id:6,
    src:usestate,
  },
  {
    id:8,
    src:reactWeather,
  }
]



  return (
    <div name='portfolio'
    className='bg-gradient-to-b from-black to-gray-800 w-full text-white md:h-screen'>
       <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
        <div className='pd-8'>
          <p className = " text-4xl font-bold inline border-b-4 border-gray-500">Portfolio</p>
          <p className="py-12 font-bold">Check out some of my work right here </p>
        </div>

        <div className='grid sm-grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0'>
        {portfolio.map(({id,src})=>(
          <div  key={id}className='shadow-md shadow-gray-600 rounded-lg'>
            <img src={src} alt="" className='rounded-md duration-200 hover:scale-105 '/>
            <div className='flex items-center justify-center '>
              <button className="w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105 ">Demo</button>
              <button className= " w-1/2 px-6 py-3 m-4 duration-200 hover:scale-105 ">Code</button>
            </div>
          </div>
     ))}
     </div>
       </div>
    </div>
  );
}
export default Portfolio;
