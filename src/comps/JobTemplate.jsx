import { FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import img1 from "../assets/imgs/img1.png";
import { useNavigate } from "react-router-dom";

import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { ref, remove } from "firebase/database";
import { useParams } from "react-router-dom";



// AOS imports
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


// import { toast } from "react-toastify";
import { toast } from "react-hot-toast";

function JobTemplate({ job }) {
  const {id} = useParams();
const Dlt = async (id) => {
  try {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;

    if (!auth.currentUser) {
      toast.error("You must be logged in to delete a job");
      return;
    }
    if (job.userId && job.userId !== auth.currentUser.uid) {
      toast.error("You can only delete your own jobs");
      return;
    }

    // const res = await fetch(`http://localhost:5000/jobs/${id}`, {
    //   method: "DELETE",
    // });

    const res = await remove(ref(db, "jobs/" + id));
    console.log(res);
    // if (!res.ok) {
    //   throw new Error("Failed to delete the job");
    // }

    toast.success("Job deleted successfully!");
    navigate(-1);
  } catch (error) {
    toast.error("An error occurred while deleting the job");
    // toast.error(error.message || "An error occurred while deleting the job");
    console.error(error); // optional, good for debugging
  }
};




  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration (in ms)
      once: true, // whether animation should happen only once
    });
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <div className="toggle py-8">

        <div className="flex items-center justify-between px-8 pb-4">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white border border-indigo-500 hover:border-transparent rounded"
          >
            ⇚
          </button>

          {/* Edit + Delete buttons */}
          {auth.currentUser && job.uid === auth.currentUser.uid && (
          <div className="flex">
            <button
              onClick={() => navigate(`/EditJob/${id}`)}
              className="mx-2 px-4 py-2 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white border border-indigo-500 hover:border-transparent rounded"
            >
              Edit
            </button>
            <button
              onClick={() => Dlt(`${id}`)}
              className="mx-2 px-4 py-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white border border-red-500 hover:border-transparent rounded"
            >
              Delete
            </button>
          </div>
        )}
        </div>
      

        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-indigo-400">
            {job.type}
          </h2>
          <p className="mx-auto max-w-lg text-center text-2xl font-semibold tracking-tight text-balance dark:text-white">
            {job.title}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-8 lg:grid-cols-3 lg:grid-rows-2 items-stretch">
            <div data-aos="fade-right" className="relative lg:row-span-2">
              <div className="jobpage absolute inset-px rounded-l lg:rounded-l-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight dark:text-white max-lg:text-center">
                    Company
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-500 dark:text-gray-400 max-lg:text-center underline underline-offset-4">
                    {job.company}
                  </p>
                  <div className="mt-6 flex justify-center md:justify-start items-center gap-8 text-xs">
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <FaDollarSign className="text-indigo-700 text-lg" />

                      <div className="mt-1.5 sm:mt-0">
                        <p className="mt-2 text-lg font-medium tracking-tight dark:text-white max-lg:text-center">
                          Salary
                        </p>

                        <p className="text-gray-500 dark:text-gray-400">
                          {job.salary}
                        </p>
                      </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <FaMapMarkerAlt className="text-indigo-700 text-lg" />

                      <div className="mt-1.5 sm:mt-0">
                        <p className="mt-2 text-lg font-medium tracking-tight dark:text-white max-lg:text-center">
                          Location
                        </p>

                        <p className="text-gray-500 dark:text-gray-400">
                          {job.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-5 px-8 sm:px-10 ">
                  <p className="my-2 text-lg font-medium tracking-tight dark:text-white ">
                    Benefits
                  </p>
                  <ul className="list-disc list-inside text-sm/6 text-gray-500 dark:text-gray-400">
                    {job.ben.map((be, index) => (
                      <li key={index}>{be}</li>
                    ))}
                  </ul>
                </div>
                <div className="hidden md:block flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <img
                    alt=""
                    src={img1}
                    className="h-48 w-48 mx-auto max-lg:max-w-xs select-none"
                    draggable="false"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-l-4xl" />
            </div>
            <div data-aos="fade-down" className="relative max-lg:row-start-1">
              <div className="jobpage absolute inset-px rounded-lg max-lg:rounded-t-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight dark:text-white ">
                    Responsibillities
                  </p>
                  <ul className="mt-2 list-disc list-inside text-sm/6 text-gray-500 dark:text-gray-400">
                    {job.resp.map((res, index) => (
                      <li key={index}>{res}</li>
                    ))}
                  </ul>
                </div>
                {/* <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-performance.png"
                    className="w-full max-lg:max-w-xs"
                  />
                </div> */}
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl" />
            </div>
            <div
              data-aos="fade-up"
              className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2"
            >
              <div className="jobpage absolute inset-px rounded-lg" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight dark:text-white ">
                    Requirements
                  </p>
                  <ul className="mt-2 list-disc list-inside text-sm/6 text-gray-500 dark:text-gray-400">
                    {job.req.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                {/* <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                  <img
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-security.png"
                    className="h-[min(152px,40cqw)] object-cover"
                  />
                </div> */}
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15" />
            </div>
            <div data-aos="fade-left" className="relative lg:row-span-2">
              <div className="jobpage absolute inset-px rounded-lg max-lg:rounded-b-4xl lg:rounded-r-4xl" />
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                  <p className="mt-2 text-lg font-medium tracking-tight dark:text-white max-lg:text-center">
                    Description
                  </p>
                  <p className="whitespace-pre-line break-words mt-2 max-w-lg text-sm/5.5 text-gray-500 dark:text-gray-400 max-lg:text-center">
                    {job.fullDesc}
                  </p>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobTemplate;
