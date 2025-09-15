import { useState } from "react";
import Job from "./Job";
// import jobs from "./jobs.json";

import useJobs from "./API";

import { Link } from "react-router-dom";

import Spinner from "./spinner";

// AOS imports
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS for animations
function Jobs() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration (in ms)
      once: true,     // whether animation should happen only once
    });
  }, []);

  const { jobs, loading } = useJobs();



  // const [jobs, setJobs] = useState([]); // jobs to display
  // const [loading, setLoading] = useState(true); // loading state

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       const res = await fetch('http://localhost:5000/jobs');
  //       const data = await res.json();
  //       setJobs(data);
  //     } catch (error) {
  //       console.error('Error fetching jobs:', error);
  //     } finally {
  //       setLoading(false);
  //     }  
  //   }
  //   fetchJobs();
  // }, []);

  const [visible, setVisible] = useState(6); // how many jobs to show initially

  const recent = jobs.slice(0, visible); // initial jobs to display

  function handleClick() {
    setVisible(prev => prev + 6); // show 6 more each click
  }

  return (
    <>
    <div className="toggle p-4">
      <h2 data-aos="fade-up" data-aos-duration="800" className="text-2xl font-bold text-center my-5 dark:text-white">Available <span className="text-indigo-600">Jobs</span></h2>
        {loading ? (
        <Spinner loading={loading} />) :
        (<div className="container mx-auto p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((job) => (
          <Job key={job.id} job={job} />
        ))}</div>
      )   }

      {/* Show button only if more jobs exist */}
      {visible < jobs.length && (
        <div className="flex justify-center">
          <button 
            onClick={handleClick} 
            className="mybtn m-5 md:w-[20%]" 
            type="button"
          >
            Load More
          </button>
           <Link className="mybtn m-5 btn btn-primary md:w-[20%] text-center" to="/AllJobs">
            <button>View All</button>
           </Link>
        </div>
        )}
        {!loading && !jobs.length && <p className="text-center pb-2">No jobs available.</p>}
      </div>
    </>
  );
}
export default Jobs;
