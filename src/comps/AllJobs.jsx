// import Jobs from "../jobs.json";
import { useState } from "react";

import { Link } from "react-router-dom";

import useJobs from "./API";

import Spinner from "./spinner";

// AOS imports
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { FaMapMarkerAlt, FaDollarSign } from "react-icons/fa";

function AllJobs() {
      useEffect(() => {
      AOS.init({
        duration: 1000, // animation duration (in ms)
        once: true,     // whether animation should happen only once
      });
    }, []);


    const { jobs, loading } = useJobs();
  




  const [jobId, setJobId] = useState(null);

  function toggleDesc(id) {
    setJobId(id===jobId ? null : id); // toggle the expanded state
  }
  return (
    <>
      <div className="bg-gray-200 dark:bg-gray-900 text-gray-400 body-font min-h-[75vh]">
        <div className="container px-5 py-14 mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            All <span className="text-indigo-600">Jobs</span>
          </h1>
          {/* Grid wrapper: 1 col mobile, 2 cols tablet, 3 cols desktop */}
            {loading && <Spinner loading={loading} />}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => {
              const isExpanded = jobId === job.id; // check if the current job is expanded
              const des = isExpanded ? job.desc : job.desc.substring(0, 90) + "...";

              return (
                <div
                data-aos="fade-up"
                  key={job.id}
                  className="p-4 bg-white text-dark-gray-900 dark:text-white dark:bg-gray-800 rounded-lg shadow-md text-center"
                >
                  <p className="text-sm text-gray-500">{job.type}</p>
                  <h2 className="dark:text-white font-medium title-font tracking-wider text-sm">
                    {job.title}
                  </h2>
                  <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-4"></span>
                  <p className="leading-relaxed text-gray-500 mb-4">{des}</p>
                  <button onClick={() => toggleDesc(job.id)} className="more">{isExpanded ? 'Show Less' : 'Show More'}</button>

                  <div className="mt-6 flex justify-center items-center gap-8 text-xs">
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <FaDollarSign className="hidden md:block text-indigo-700" />
                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Salary</p>
                        <p className="font-medium">{job.salary}</p>
                      </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <FaMapMarkerAlt className="hidden md:block text-indigo-700" />
                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Location</p>
                        <p className="font-medium">{job.location}</p>
                      </div>
                    </div>
                  </div>
                  <Link to={`/jobs/${job.id}`}>
                    <button className='text-sm text-indigo-700 hover:text-indigo-500 hover:underline mt-4'>Learn More</button>
                  </Link>
                </div>
              );
            })}
          </div>
          {!loading && !jobs.length && <p className="text-center p-4">No jobs available.</p>}
        </div>
      </div>
    </>
  );
}

export default AllJobs;
