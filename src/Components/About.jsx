import React from 'react';

const About = () => {
  return (
    <div name="about" className='w-full h-screen bg-gradient-to-b from-gray-800 to-black text-white'>
      <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
            <p className='text-4xl font-bold inline border-b-4 border-gray-500'>About</p>
        </div>
        <p className='text-xl mt-20'>
        I am Kumkum Rathour, to express my interest in the software developer position
        at your esteemed firm. I will be graduating in May 2023 with a degree in Electronics
        and Communications Engineering from the University Institute of Technology RGPV Bhopal,
        one of the leading engineering institutes in India. As a final-year undergraduate,
        I have worked as a Front End Developer at rapidops for three month as an intern, where
        I developed and maintained their website, and created a website to support daily job and 
        internship updates in their day-to-day operations. My work helped the firm grow rapidly.
        I have also completed several relevant online courses and read books that have furthered
        my skills as a web developer.
        </p>
        <br />
        <p className='text-xl'>
        I have experience in developing websites for different purposes using a range of coding languages 
        such as HTML, CSS, JavaScript, ReactJS and Java. Additionally, I have developed a React-JS website
        for a project and an food-order Item website . I am confident in my ability to work independently 
        and take responsibility for the development of complex systems. I am looking for an opportunity to
        work with your firm to gain exposure to a different facet of the industry and its challenges. 
        </p>
      </div>
    </div>
  );
}

export default About;
