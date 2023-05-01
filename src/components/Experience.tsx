import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

interface ExperienceCardProps {
  index: number;
  experienceData: {
    title: string;
    company_name: string;
    icon: string;
    iconBg: string;
    date: string;
    points: string[];
  };
}

const ExperienceCard = ({ experienceData, index }: ExperienceCardProps) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ background: "#1d1836", color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experienceData.date}
      iconStyle={{ background: experienceData.iconBg, color: "#fff" }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img 
            src={experienceData.icon}
            alt={experienceData.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experienceData.title}</h3>
        <p className="text-secodary text-[16px] font-semibold" style={{margin: 0}}>{experienceData.company_name}</p>
      </div>
      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experienceData.points.map((point, index) => (
          <li key={`experience-point-${index}`} className="text-white-100 text-[14px] pl-1 tracking-wider">
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = (): JSX.Element => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>WHAT I HAVE DONE SO FAR</p>
        <h2 className={styles.sectionHeadText}>Work Experience</h2>
      </motion.div>
      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.title}
              index={index}
              experienceData={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
