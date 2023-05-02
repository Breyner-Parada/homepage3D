import { Ball } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";

const Tech = (): JSX.Element => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>MY KNOWLEDGE</p>
        <h2 className={styles.sectionHeadText}>Skills</h2>
      </motion.div>
      <div className="flex flex-row flex-wrap justify-center gap-10 mt-2">
        {technologies.map((tech, index) => (
          <Ball key={index} index={index} imgUrl={tech.icon} title={tech.name} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
