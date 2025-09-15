import { useState } from "react";
import { MoreVertical } from "lucide-react"; // 3-dot menu icon
import UserJobs from "./UserJobs";
import Spinner from "./spinner";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import {auth, db} from "../config/firebase";
import { ref, remove } from "firebase/database";


export default function MyJobs() {
  const [openMenu, setOpenMenu] = useState(null);
  const { jobs, loading } = UserJobs();

  const navigate = useNavigate();
  // const { id } = useParams();

  

  // const jobs = [
  //   {
  //     id: 1,
  //     title: "Frontend Developer",
  //     createdAt: "Sep 10, 2025",
  //     createdBy: "John Doe",
  //   },
  //   {
  //     id: 2,
  //     title: "Backend Engineer",
  //     createdAt: "Sep 8, 2025",
  //     createdBy: "Jane Smith",
  //   },
  //   {
  //     id: 3,
  //     title: "UI/UX Designer",
  //     createdAt: "Sep 5, 2025",
  //     createdBy: "Alice Johnson",
  //   },
  // ];

  const Dlt = async (id) => {
  try {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;

    if (!auth.currentUser) {
      toast.error("You must be logged in to delete a job");
      return;
    }
    if (jobs.userId && jobs.userId !== auth.currentUser.uid) {
      toast.error("You can only delete your own jobs");
      return;
    }

    const res = await remove(ref(db, "jobs/" + id));
    console.log(res);
    // if (!res.ok) {
    //   throw new Error("Failed to delete the job");
    // }

    toast.success("Job deleted successfully!");

    } catch (error) {
      toast.error("An error occurred while deleting the job");
      // toast.error(error.message || "An error occurred while deleting the job");
      console.error(error); // optional, good for debugging
    }
    }

  return (
    <div onClick={() => setOpenMenu(null)} className="toggle py-8 min-h-[70vh]">
      <h2 className="text-center text-3xl font-semibold text-gray-900 dark:text-white">
        My <span className="text-indigo-400">Jobs</span>
      </h2>

      <div className="mx-6 md:mx-24 my-6 max-w-2xl px-6 lg:max-w-7xl lg:px-8 rounded-lg bg-gray-200 dark:bg-gray-800 shadow">
        {loading && (
          <div className="p-4">
            <Spinner loading={loading} />
          </div>
        )}
        {jobs &&
          jobs.length > 0 &&
          jobs.map((job, index) => (
            <div
              key={job.id}
              className={`flex items-center justify-between gap-x-1 p-4 py-5 ${
                index !== jobs.length - 1
                  ? "border-b border-gray-300 dark:border-gray-700"
                  : ""
              }`}
            >
              {/* Left side */}
              <div>
                <h5 className="text-md font-semibold">{job.title}</h5>
                <p className="text-[12px] text-gray-500">
                  {job.createdAt} · Created by {job.createdBy}
                </p>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-2 relative">
                <Link to={`/jobs/${job.id}`}>
                  <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-600 hover:text-gray-100 dark:text-white text-sm rounded-md hover:bg-gray-400 dark:hover:bg-gray-600">
                    Open
                  </button>
                </Link>

                {/* Menu */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenu(openMenu === job.id ? null : job.id);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full"
                  >
                    <MoreVertical size={18} />
                  </button>

                  {openMenu === job.id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-0 mt-2 w-28 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-md z-10"
                    >
                      <button 
                      onClick={() => navigate(`/EditJob/${job.id}`)}
                      className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-200 dark:hover:bg-gray-600">
                        Edit
                      </button>
                      <button 
                      onClick={() => Dlt(`${job.id}`)}
                      className="block w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-gray-200 dark:hover:bg-gray-600">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        {!loading && jobs && jobs.length === 0 && (
          <div className="flex items-center justify-center p-4">
            <p className="text-sm text-gray-500">No jobs found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
