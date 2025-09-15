import { useState } from 'react';
import {FaMapMarkerAlt, FaDollarSign} from 'react-icons/fa';
import { Link } from 'react-router-dom';

// AOS imports
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Job({job}) {
    useEffect(() => {
      AOS.init({
        duration: 1000, // animation duration (in ms)
        once: true,     // whether animation should happen only once
      });
    }, []);

  const [desc, setDesc] = useState(false);

  let des = job.desc
  if (!desc) {
    des = job.desc.substring(0,90) + '...';
  }

  return (
    <>
    <div data-aos="flip-down" className="block rounded-lg p-4 shadow-xs shadow-indigo-100 border-1 border-gray-900">
  <div className="mt-2">
    <dl>
      <div>
        <dt className="sr-only">Price</dt>

        <dd className="text-sm text-gray-500">{job.type}</dd>
      </div>

      <div>
        <dt className="sr-only">Address</dt>

        <dd className="font-medium">{job.title}</dd>
      </div>
    </dl>

    <p className="whitespace-pre-line break-all text-sm pt-2">{des}</p>
    <button onClick={() => setDesc(prev => !prev)} className="more">
      {desc ? 'less' : 'more'}
    </button>

    <div className="mt-6 flex items-center gap-8 text-xs">
      <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
        <FaDollarSign className='text-indigo-700'/>

        <div className="mt-1.5 sm:mt-0">
          <p className="text-gray-500">Salary</p>

          <p className="font-medium">{job.salary}</p>
        </div>
      </div>

      <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
        <FaMapMarkerAlt className='text-indigo-700'/>

        <div className="mt-1.5 sm:mt-0">
          <p className="text-gray-500">Location</p>

          <p className="font-medium">{job.location}</p>
        </div>
      </div>
    </div>
    <Link to={`/jobs/${job.id}`}>
      <button className='text-sm text-indigo-700 hover:text-indigo-500 hover:underline my-2'>Learn More</button>
    </Link>
  </div>
</div>
    </> 
    );
}

export default Job;