import React from 'react';
import arrayDestruct from '../Image/Image_more/arrayDestruct.jpg'
import installNode from '../Image/Image_more/installNode.jpg';
import NavBar from '../Image/Image_more/navbar.jpg';
import reactSmooth from '../Image/Image_more/reactSmooth.jpg';
import reactWeather from '../Image/Image_more/reactWeather.jpg';
import usestate from '../Image/Image_more/usestate.jpg';
import kisansamadhan from '../Image/Image_more/kisansamadhan.png';
import quizbanao from '../Image/Image_more/quizbanao.png';
import bazaarhaat from '../Image/Image_more/bazaarhaat.png';

const Portfolio = () => {
  const portfolio=[{
    id:1,
    name:"Kisan Samadhan",
    src:kisansamadhan,
    href:"https://play.google.com/store/apps/details?id=com.kisansamadhan.kisansamadhan&hl=en_IN&gl=US",
    desc:'This is a simple app that shows the weather of your city',
    links:[
      {
        lname:'Play Store',
        href:'https://play.google.com/store/apps/details?id=com.kisansamadhan.kisansamadhan&hl=en_IN&gl=US'
      },
    ]
  },
  {
    id:2,
    name:"Quiz Banao",
    desc:"Quizzing app designed to conduct LIVE quizzes",
    src:quizbanao,
    href:"https://play.google.com/store/apps/details?id=com.quizbanao.app",
    links:[
      {
        lname:'Play Store',
        href:'https://play.google.com/store/apps/details?id=com.kisansamadhan.kisansamadhan&hl=en_IN&gl=US'
      },
      {
        lname:'GitHub',
        href:'https://play.google.com/store/apps/details?id=com.kisansamadhan.kisansamadhan&hl=en_IN&gl=US'
      },
    ]
  },
  {
    id:3,
    name:"BazarHaat",
    desc:"Full stack Multi Vendor E-commerce application",
    src:bazaarhaat,
    href:"https://play.google.com/store/apps/details?id=com.kisansamadhan.kisansamadhan&hl=en_IN&gl=US",
    links:[
      {
        lname:'GitHub',
        href:'https://github.com/apoorvpandey0/BazaarHaat'
      },
    ]
  }
 
]



  return (
    <div name='portfolio'
    className='bg-gradient-to-b from-black to-gray-800 w-full text-white'>
       <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
        <div className='pd-8'>
          <p className = " text-4xl font-bold inline border-b-4 border-gray-500">Portfolio</p>
          <p className="py-12 font-bold">Check out some of my work right here </p>
        </div>
        <div className='grid sm-grid-cols-2 md:grid-cols-3 gap-8 px-12 sm:px-0'>
        {portfolio.map(({id,src,name,href,links,desc})=>(
            <div class="max-w-sm rounded-lg overflow-hidden shadow-md shadow-blue-400 ">
              <img class="w-full" src={src} alt="Sunset in the mountains" />
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{name}</div>
                <p class="text-gray-300">{desc}</p>
              </div>
              <div class="px-6 pt-4 pb-2">
                {links.map(({lname,href})=><a href={href} target='_blank' class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{lname}</a>)}

              
              </div>
            </div>
     ))}
     </div>
       </div>
    </div>
  );
}
export default Portfolio;
