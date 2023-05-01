import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    threejs,
    self_employed,
    utd,
    appxcale,
    quepar,
    api,
    materialui,
    next,
    postgresql,
    sass,
    todo,
    chatapp,
    dashboard,
    flashback,
    movieapp,
    toctoc,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "React Native Developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "MERN Stack Developer",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "docker",
      icon: docker,
    },
    {
      name: 'api rest',
      icon: api,
    },
    {
      name: 'material ui',
      icon: materialui,
    },
    {
      name: 'next js',
      icon: next,
    },
    {
      name: 'postgresql',
      icon: postgresql,
    },
    {
      name: 'sass',
      icon: sass,
    },

  ];
  
  const experiences = [
    {
      title: "Freelancer",
      company_name: "Self-employed",
      icon: self_employed,
      iconBg: "#383E56",
      date: "Oct 2021 - Sep 2022",
      points: [
        "Doing research and identifying new opportunities and potential new markets.",
        "Learning and making use of new technologies",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "In continuous learning and improvement of my skills and knowledge in the area of ​​web development and mobile development.",
      ],
    },
    {
      title: "Backend Developer",
      company_name: "Un Toque Digital",
      icon: utd,
      iconBg: "#E6DEDD",
      date: "Sep 2022 - Oct 2022",
      points: [
        "Connect the application with the database through the API and WebSockets.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
        "Build reusable code and libraries for future use.",
        "Build and maintain high performance, reusable, and reliable code.",
        "Build microservices using Node.js and Express.js."
      ],
    },
    {
      title: "Web Developer and Mobile Developer",
      company_name: "appXcale",
      icon: appxcale,
      iconBg: "#383E56",
      date: "Oct 2022 - Mar 2023",
      points: [
        "Developing and maintaining web applications and mobile apps using NextJs, React Native and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
        "Participating in code reviews and providing constructive feedback to other developers.",
        "Build and maintain high performance, reusable, and reliable code.",
      ],
    },
    {
      title: "Frontend Developer",
      company_name: "QuePar Solutions",
      icon: quepar,
      iconBg: "#E6DEDD",
      date: "Mar 2023 - Present",
      points: [
        "Developing and maintaining web applications using React.js, NextJs and other related technologies.",
        "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
        "Implementing responsive design and ensuring cross-browser compatibility.",
        "Participating in code reviews and providing constructive feedback to other developers.",
        "Build and maintain high performance, reusable, and reliable code.",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "Support Breyner in his programming career was really easy, He understood everything I taught him.",
      name: "Andrés Quintero",
      designation: "Data Scientist",
      company: "NatGeo",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "Working with Breyner was a pleasure, he is a very responsible person and he is always willing to learn new things.",
      name: "Rafael Quiroga",
      designation: "Full Stack Developer",
      company: "appXcale",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
  ];
  
  const projects = [
    {
      name: "TODO App",
      description:
        "Make your tasks easier, add tasks, check them and when the tasks are done if you want, just delete them and make more.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
      ],
      image: todo,
      source_code_link: "https://github.com/Breyner-Parada/reactjs",
      live_link: 'https://breyner-parada.github.io/reactjs'
    },
    {
      name: "Movie App",
      description:
        "Find information of your favorite movies, see and search what movies are trending daily, make with The MovieDB API.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
      ],
      image: movieapp,
      source_code_link: "https://github.com/Breyner-Parada/movieapp",
      live_link: 'https://breyner-parada.github.io/movieapp'
    },
    {
      name: "Chat App",
      description:
        "Create a room and start chatting with your friends in this simple web chat app",
      tags: [
        {
          name: "reactjs",
          color: "blue-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: chatapp,
      source_code_link: "https://github.com/Breyner-Parada/chatapp",
      live_link: 'https://youwannatalk.netlify.app'
    },
    {
      name: "FlashBack App",
      description:
        "Create, edit, delete, share, like and comment your own memories and comment, like others memories in this mini social media.",
      tags: [
        {
          name: "reactjs",
          color: "blue-text-gradient",
        },
        {
          name:'mongodb',
          color:'green-text-gradient'
        },
        {
          name: "sass",
          color: "pink-text-gradient",
        },
        {
          name: "materialui",
          color: "blue-text-gradient",
        },
      ],
      image: flashback,
      source_code_link: "https://github.com/Breyner-Parada/flashback",
      live_link: 'https://breyner-parada.github.io/flashback'
    },
    {
      name: "Toc Toc App",
      description:
        "Social media TikTok clone sign up and share, comment, search and like videos from others",
      tags: [
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
        {
          name: "sanity",
          color: "green-text-gradient",
        },
        {
          name: "tailwindcss",
          color: "pink-text-gradient",
        },
      ],
      image: toctoc,
      source_code_link: "https://github.com/Breyner-Parada/toctoc",
      live_link: 'https://toctoc-ten.vercel.app/'
    },
    {
      name: "Dashboard App",
      description:
        "A template admin dashboard using syncfusion as main charts components",
      tags: [
        {
          name: "reactjs",
          color: "blue-text-gradient",
        },
        {
          name: "syncfusion",
          color: "green-text-gradient",
        },
        {
          name: "tailwindcss",
          color: "pink-text-gradient",
        },
      ],
      image: dashboard,
      source_code_link: "https://github.com/Breyner-Parada/dashboard",
      live_link: 'https://my-tablero.netlify.app/'
    },
  ];
  
  export { services, technologies, experiences, testimonials, projects };