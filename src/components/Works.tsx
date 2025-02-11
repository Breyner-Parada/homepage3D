import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import "swiper/css";
import "swiper/css/navigation";

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
      <div className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full h-[512px] mr-3">
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

      <Swiper
        style={{
          width: "100%",
          height: "auto",
          marginTop: "3rem",
          marginBottom: "3rem",
        }}
        grabCursor
        modules={[Pagination]}
        loop
        pagination={true}
        spaceBetween={5}
        slidesPerView={3}
        breakpoints={{
          375: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
        }}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <ProjectCard
              project={project}
              index={index}
              id={`project-${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SectionWrapper(Works, "");
