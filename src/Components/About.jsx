import React from 'react';

const About = () => {
  return (
    <div name="about" className='w-full  bg-gradient-to-b from-gray-800 to-black text-white'>
      <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
            <p className='text-4xl font-bold inline border-b-4 border-gray-500'>About</p>
        </div>
        <p className='text-xl mt-5 text-slate-200'>
        Apoorv Pandey is a skilled and motivated software developer with experience in data science, mobile app development, and web development. With a Bachelor's degree in Information Technology from the University Institute of Technology RGPV, Bhopal, Apoorv has demonstrated his proficiency in programming languages such as Python and Dart. 
        He has also gained expertise in technologies such as Flutter, Django, and Azure, and has earned certifications in Azure Fundamentals, Azure AI Fundamentals, and Blockchain Specialization by Coursera. 
        </p>
        <br />
        <p className='text-xl text-slate-200'>
        Apoorv has proven his ability to work efficiently on diverse projects, from developing and maintaining mobile applications with over 100,000 downloads to handling backend deployments on AWS. His dedication and commitment to his work have been recognized in his achievements, such as helping save 100+ hours of work time with automation during his internship at Bajaj Finserv Health. Apoorv is an enthusiastic learner and an excellent team player who enjoys sharing his knowledge through workshops and courses.
        </p>
      </div>
    </div>
  );
}

export default About;
