import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc';

interface ServiceCardProps {
  index: number;
  title: string;
  icon: string;
}

const ServiceCard: React.FunctionComponent<ServiceCardProps> = ({index, title, icon} ) => {
  return (
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div variants={fadeIn('right', 'spring', 0.5 * index, 0.75)} className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'>
        <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
          <img src={icon} alt={title} className='w-16 h-16 object-contain' />
          <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = (): JSX.Element => {
  return (
    <>
      <motion.div variants={textVariant()}> 
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview</h2>
      </motion.div>
      <motion.p variants={fadeIn('', '', 0.1, 1)} className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'>
        I'm a <span className='text-[#915eff]'>Metallurgical Engineer</span> from <span className='text-[#915eff]'>Colombia</span> and <span className='text-[#915eff]'>Full Stack Developer</span> who is passionate about making open-source more accessible, creating technology to elevate people, and building community. Some technologies I enjoy working with include ReactJS, TypeScript, NodeJS, NextJS, Tailwind, ThreeJs, React Native and much more.
      </motion.p>
      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service}/>
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, 'about');