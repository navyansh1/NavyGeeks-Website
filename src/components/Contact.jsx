import React from "react";
import { Mail, UserCircle, MessageSquare, Send } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const Contact = () => {
  return (
    <div className="px-4 md:px-6 max-w-[1000px] mx-auto md:my-12 pt-8" id="contact">
      <Reveal>
        <div className="grid md:grid-cols-2 place-items-center gap-4 md:gap-0">
          {/* About Me */}
          <div className="w-full">
            <div className="text-gray-300 my-2 md:my-3">
              <h3 className="text-2xl md:text-4xl text-yellow-400 font-bold mb-3 md:mb-5 flex items-center gap-2">
                <UserCircle size={26} className="md:w-9 md:h-9 flex-shrink-0" /> About Me
              </h3>
              <p className="text-justify text-sm md:text-base leading-6 md:leading-7 w-full md:w-11/12 md:mx-auto px-2 md:px-0">
                I am a tech enthusiast, certified Cloud Developer, Data Scientist, Backend Developer, Mobile App Developer. Through my YouTube channel, NavyGeeks, I create content to explain tech concepts and share practical tutorials that help viewers to engage with tech better. I approach tasks with a balance of technical skill, creativity and with a learners mindset.
              </p>
              <br />
              <p className="text-justify text-sm md:text-base leading-6 md:leading-7 w-full md:w-11/12 md:mx-auto px-2 md:px-0">
                When I'm not coding or creating content, I'm likely exploring the latest in the automotive world. My enthusiasm for cars keeps me happy and i also love gardening, capturing videos, photos and making memories as my life is a movie.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            action="https://getform.io/f/bvrrrxwb"
            method="POST"
            className="w-full max-w-6xl p-4 md:p-12"
            id="form"
          >
            <p className="text-yellow-400 font-bold text-2xl md:text-4xl mb-3 md:mb-5 flex items-center gap-2">
              <MessageSquare size={26} className="md:w-9 md:h-9 flex-shrink-0" /> Let's Talk
            </p>
            <input
              type="text"
              id="name"
              placeholder="Your Name ..."
              name="name"
              className="mb-2 w-full rounded-md border border-yellow-600 md:border-2 py-1.5 md:py-2 pl-2 pr-4 text-sm md:text-base bg-transparent text-gray-100"
            />
            <input
              type="email"
              id="email"
              placeholder="Your Email ..."
              name="email"
              className="mb-3 md:mb-7 w-full rounded-md border border-yellow-600 md:border-2 py-1.5 md:py-2 pl-2 pr-4 text-sm md:text-base bg-transparent text-gray-100"
            />
            <textarea
              name="textarea"
              id="textarea"
              cols="30"
              rows="3"
              placeholder="Your Message ..."
              className="mb-1 w-full rounded-md border border-yellow-600 md:border-2 py-1.5 md:py-2 pl-2 pr-4 text-sm md:text-base bg-transparent text-gray-100"
            />
            <button
              type="submit"
              className="w-full py-2 md:py-3 rounded-md text-gray-100 font-semibold text-base md:text-xl bg-green-600 mt-1"
            >
              Send Message <Send size={18} className="inline ml-1" />
            </button>

            <p className="text-center text-gray-100 mt-3 text-sm">or</p>

            <div className="flex items-center justify-center mt-1">
              <Mail className="text-yellow-400 mr-2" size={18} />
              <p className="text-gray-100 text-sm md:text-base">
                <a href="mailto:navygeeks@gmail.com" className="underline">navygeeks@gmail.com</a>
              </p>
            </div>
          </form>
        </div>
      </Reveal>
    </div>
  );
}

export default Contact;
