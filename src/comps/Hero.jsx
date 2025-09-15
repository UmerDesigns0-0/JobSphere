import { Link } from "react-router-dom";

// AOS imports
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


function Hero() {

  // Initialize AOS for animations
    useEffect(() => {
      AOS.init({
        duration: 1000, // animation duration (in ms)
        once: true,     // whether animation should happen only once
      });
    }, []);


  return (
    <>
      <section className="toggle lg:grid lg:h-[500px] lg:place-content-center dark:bg-bg-dark dark:border-0">
  <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
    <div className="mx-auto max-w-prose text-center">
      <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
        Find Your
        <strong data-aos="zoom-out-right" data-aos-duration="1500" className="text-blue-600"> Next </strong>
        Opportunity
      </h1>

      <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed dark:text-gray-200">
        Search thousands of jobs, connect with top employers, and take the next step in your career.
      </p>

      <div className="mt-4 flex justify-center gap-4 sm:mt-6">
        <Link
          data-aos="fade-up-left"
          className="jobs-btn"
          to="/AllJobs"
        >
          Find Jobs
        </Link>

        <Link
          data-aos="fade-up-right"
          className="more-btn"
          to="/About"
        >
          Learn More
        </Link>
      </div>
    </div>
  </div>
</section>
    </>
  );
}

export default Hero;