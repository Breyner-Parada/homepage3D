import React, { useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

interface ProjectCardProps {
  project: {
    name: string;
    description: string;
    tags: {
      name: string;
      color: string;
    }[];
    image: string;
    source_code_link: string;
    live_link: string;
  };
  index: number;
  id: string;
}

const ProjectCard = ({ project, index, id }: ProjectCardProps) => {
  return (
    <div id={id}>
      <div className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-[300px] h-[512px] mr-3">
        <div
          className="relative w-full h-[230px] cursor-pointer"
          onClick={() => window.open(project.live_link, "_blank")}
        >
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(project.source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="github"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{project.name}</h3>
          <p className="mt-2 text-secondary text-[14px]">
            {project.description}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 p-6">
          {project.tags.map((tag) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const Works = (): JSX.Element => {

  useEffect(() => {
    const container = document.getElementById("container");
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    if (container) {
      container.addEventListener("mousedown", (e) => {
        isDown = true;
        container.classList.add("active");
        
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });
      container.addEventListener("mouseup", () => {
        isDown = false;
        container.classList.remove("active");
      });
      container.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = x - startX; //scroll-fast
        container.scrollLeft = scrollLeft - walk;
      });
    }
  }, []);

 

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>MY WORK</p>
        <h2 className={styles.sectionHeadText}>Projects</h2>
      </motion.div>
      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following are the projects I have worked on. Each project is briefly
          described with the technologies used and the link to the source code.
          It reflects my passion for learning new technologies, building cool
          stuff and also reflect my ability to solve complex problems.
        </motion.p>
      </div>
      <div
        id="container"
        className="flex overflow-x-scroll transition-all duration-500"
      >
        {projects.map((project, index) => (
          <ProjectCard
            id="card"
            key={`project-${index}`}
            index={index}
            project={project}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
