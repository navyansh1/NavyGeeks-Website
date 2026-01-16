import React from "react";
import { AiFillLinkedin, AiFillGithub, AiOutlineMail } from "react-icons/ai";  // Import email icon
import { motion } from "framer-motion";
import Reveal from "./Reveal";

const Contact = () => {
  return (
    <div className="px-6 max-w-[1000px] mx-auto md:my-12" id="contact">
      <Reveal>
        <div className="grid md:grid-cols-2 place-items-center">
          <div>
            <div className="text-gray-300 my-3">
              <h3 className="text-4xl text-yellow-400 font-bold mb-5">About Me 👨‍💻:</h3>
              <p className="text-justify leading-7 w-11/12 mx-auto">
                I am a tech enthusiast, certified Cloud Developer, Data Engineer, Backend Developer. Through my YouTube channel, NavyGeeks, I create content to explain tech concepts and share practical tutorials that empower viewers to engage with tech. I approach tasks with a balance of technical skill, creativity and with a learners mindset.
              </p>

              <br />
              <p className="text-justify leading-7 w-11/12 mx-auto">
                When I’m not coding or creating content, I’m likely exploring the latest in the automotive world. My enthusiasm for cars keeps me happy and i also love gardening, capturing videos, photos and making memories as my life is a movie. 
              </p>
            </div>
          </div>

          <form
            action="https://getform.io/f/bvrrrxwb"
            method="POST"
            className="max-w-6xl p-5 md:p-12"
            id="form"
          >
            <p className="text-yellow-400 font-bold text-4xl mb-5">
              Let’s Talk! 🤝
            </p>
            <input
              type="text"
              id="name"
              placeholder="Your Name ..."
              name="name"
              className="mb-2 w-full rounded-md border-4 border-yellow-600 py-2 pl-2 pr-4"
            />
            <input
              type="email"
              id="email"
              placeholder="Your Email ..."
              name="email"
              className="mb-7 w-full rounded-md border-4 border-yellow-600 py-2 pl-2 pr-4"
            />
            <textarea
              name="textarea"
              id="textarea"
              cols="30"
              rows="4"
              placeholder="Your Message ..."
              className="mb-1 w-full rounded-md border-4 border-yellow-600 py-2 pl-2 pr-4"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-md text-gray-100 font-semibold text-xl bg-green-600"
            >
              Send Message ✉️
            </button>

            <p className="text-center text-gray-100 mt-4">or</p>

            <div className="flex items-center justify-center mt-1">
              <AiOutlineMail className="text-yellow-400 text-2xl mr-2" />  {/* Email icon */}
              <p className="text-gray-100">
                <a href="mailto:navycodes@gmail.com" className="underline">navycodes@gmail.com</a>
              </p>
            </div>

          </form>
        </div>
      </Reveal>
    </div>
  );
}

export default Contact;
