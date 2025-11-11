import React from "react";
import { BrowserRouter } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { SnackbarProvider } from "notistack";
import ChatBot from "./components/ChatBot";

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";

function App(): JSX.Element {
  emailjs.init(import.meta.env.VITE_PUBLIC_KEY);

  return (
    <BrowserRouter>
      <SnackbarProvider>
        <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>
          <About />
          <Experience />
          <Tech />
          <Works />
          <Feedbacks />
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
        </div>
      </SnackbarProvider>
      <ChatBot />
    </BrowserRouter>
  );
}

export default App;
