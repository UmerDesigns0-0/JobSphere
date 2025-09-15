import { Link } from "react-router-dom";

// AOS imports
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration (in ms)
      once: true, // whether animation should happen only once
    });
  }, []);
  return (
    <>
      {/* HERO SECTION */}
      <section className="toggle body-font">
        <div className="container mx-auto flex px-5 py-14 md:flex-row flex-col items-center">
          <div data-aos="fade-right" className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium">
              Find Your Career at &nbsp; 
              <br className="hidden lg:inline-block" />
              Job<span className="text-indigo-600">Sphere</span>
            </h1>
            <p className="mb-8 text-gray-500 leading-relaxed">
              Explore exciting career opportunities where your skills, passion, 
              and growth truly matter. Join a team that values innovation and 
              excellence.
            </p>
            <div className="flex justify-center">
              <Link to="/AllJobs"><button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg cursor-pointer">
                Explore Careers
              </button></Link>
              <a href="#contact">
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg cursor-pointer">
                Get in Touch
              </button></a>
            </div>
          </div>
          <div data-aos="fade-left" className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded select-none"
              draggable="false"
              alt="hero"
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="toggle body-font">
        <div className="container px-5 py-12 mx-auto">
          <div data-aos="fade-up" className="text-center mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium text-center title-font mb-4">
              Why Join Our Team
            </h1>
            <p className="text-gray-500 text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
              We believe in building more than just careers — we create opportunities for growth, 
              collaboration, and making an impact. Here’s what you’ll enjoy when working with us:
            </p>
          </div>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 mx-2">
            <div className="p-2 sm:w-1/2 w-full">
              <div data-aos="fade-right" data-aos-duration="500" className="bg-gray-200 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">
                  Career Growth
                </span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div data-aos="fade-left" data-aos-duration="1000" className="bg-gray-200 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">
                  Collaborative Culture
                </span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div data-aos="fade-right" data-aos-duration="1500" className="bg-gray-200 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">
                  Work-Life Balance
                </span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div data-aos="fade-left" data-aos-duration="2000" className="bg-gray-200 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">
                  Innovative Projects
                </span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div data-aos="fade-right" data-aos-duration="2500" className="bg-gray-200 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">Recognition & Rewards</span>
              </div>
            </div>
            <div className="p-2 sm:w-1/2 w-full">
              <div data-aos="fade-left" data-aos-duration="3000" className="bg-gray-200 rounded flex p-4 h-full items-center">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                  <path d="M22 4L12 14.01l-3-3"></path>
                </svg>
                <span className="title-font font-medium">
                  Global Exposure
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="toggle body-font">
        <div className="container px-5 py-14 mx-auto">
          <div data-aos="fade-up" className="flex flex-wrap w-full mb-14 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4">
              Connecting Talent with Opportunity
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              We’re more than a job board — we’re a bridge between ambitious professionals and forward-thinking companies. 
              Our platform makes finding the right job (or the right candidate) easier, faster, and smarter.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div data-aos="flip-up" className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 dark:text-indigo-300 dark:bg-gray-600  mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 3H8v4h8V3z" />
                  </svg>
                </div>
                <h2 className="text-lg font-medium title-font mb-2">
                  Wide Job Network
                </h2>
                <p className="text-gray-500 leading-relaxed text-base">
                  Access thousands of opportunities across industries and regions.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div data-aos="flip-up" className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 dark:text-indigo-300 dark:bg-gray-600 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h2 className="text-lg font-medium title-font mb-2">
                  Smart Matching
                </h2>
                <p className="text-gray-500 leading-relaxed text-base">
                  AI-driven tools to connect candidates with the most relevant roles.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div data-aos="flip-up" className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 dark:text-indigo-300 dark:bg-gray-600 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h2 className="text-lg font-medium title-font mb-2">
                  Verified Employers
                </h2>
                <p className="text-gray-500 leading-relaxed text-base">
                  Partner with trusted companies to ensure safe and reliable hiring.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div data-aos="flip-up" className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 dark:text-indigo-300 dark:bg-gray-600 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </div>
                <h2 className="text-lg font-medium title-font mb-2">
                  Easy Applications
                </h2>
                <p className="text-gray-500 leading-relaxed text-base">
                  Apply to jobs with a few clicks using a streamlined process.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div data-aos="flip-up" className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 dark:text-indigo-300 dark:bg-gray-600 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z" />
                    <path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <h2 className="text-lg font-medium title-font mb-2">
                  Career Resources
                </h2>
                <p className="text-gray-500 leading-relaxed text-base">
                  Guides, tips, and insights to help you grow in your career.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div data-aos="flip-up" className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 dark:text-indigo-300 dark:bg-gray-600 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h2 className="text-lg font-medium title-font mb-2">
                  Global Reach
                </h2>
                <p className="text-gray-500 leading-relaxed text-base">
                  Opportunities that connect you with companies worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      {/* <section id="contact" className="toggle body-font">
        <div className="container px-5 py-14 mx-auto flex flex-wrap items-center">
          <div data-aos="fade-right" className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl">
              Create Your Free Account
            </h1>
            <p className="text-gray-500 leading-relaxed mt-4">
              Get instant access to the latest jobs and connect with top employers today.
            </p>
          </div>
          <div data-aos="flip-right" className="lg:w-2/6 md:w-1/2 bg-gray-100 dark:bg-gray-300 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Sign Up
            </h2>
            <div className="relative mb-4">
              <label for="full-name" className="leading-7 text-sm text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label for="email" className="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Sign Up
            </button>
            <p className="text-xs text-gray-500 mt-3">
              Sign Up & stay updated!
            </p>
          </div>
        </div>
      </section> */}
    </>
  );
}

export default About;
