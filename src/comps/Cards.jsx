import { Link } from "react-router-dom";

// AOS imports
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Cards() {

    // Initialize AOS for animations
      useEffect(() => {
        AOS.init({
          duration: 1000, // animation duration (in ms)
          once: true,     // whether animation should happen only once
        });
      }, []);

  return (
    <div className="toggle mx-auto grid md:grid-cols-12 gap-4 py-4 pt-6 px-6 border-0">
        <div data-aos="fade-up-right" className="border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 md:col-span-8 p-4  rounded-lg shadow-sm ">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Explore Thousands of Opportunities</h5>
            </a>
         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 py-2">Discover the perfect job that matches your skills and career goals. Browse through thousands of listings from top employers, filter by location, industry, or experience level, and find the role that’s right for you. Take the next step in your professional journey with ease and confidence.</p>
            <Link to="/AllJobs" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
               Browse Jobs
               <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
               </svg>
           </Link>
        </div>


        <div data-aos="fade-up-left" className="border-2 border-gray-200 md:col-span-4 p-4  rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Post Your Job Openings</h5>
            </a>
         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 py-2">Easily add your job listings and reach thousands of qualified candidates. Fill in the details, publish, and connect with the right talent quickly.</p>
            <Link to="/AddJob" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
               Add Job
               <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
               </svg>
           </Link>
        </div>
    </div>
  );
}

export default Cards;