import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const Ball = (props: any) => {
  return (
    <Tilt className='w-auto rounded-full'>
      <motion.div variants={fadeIn('right', 'spring', 0.5 * props.index, 0.75)} className='w-full green-pink-gradient p-[1px] rounded-full shadow-card'>
        <div className='bg-tertiary rounded-full py-5 px-5 flex justify-evenly items-center flex-col'>
          <img src={props.imgUrl} alt={props.title} className='w-16 h-16 object-contain' />
        </div>
      </motion.div>
    </Tilt>
  );
};

export default Ball;
