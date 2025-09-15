import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./spinner";

import JobTemplate from "./JobTemplate";

import { db } from "../config/firebase";
import { get, ref } from "firebase/database";

function JobPage() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  // const job = useLoaderData();


    useEffect(() => {
    const fetchJob = async () => {
      try {
        const snapshot = await get(ref(db, "jobs/" + id + "/"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setJob(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, []);

  // useEffect(() => {
  //   const fetchJob = async () => {
  //     try {
  //       const res = await fetch(`http://localhost:5000/jobs/${id}`);
  //       const data = await res.json();
  //       setJob(data);
  //     } catch (error) {
  //       console.error("Error fetching jobs:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchJob();
  // }, []);

  return (
    // <JobTemplate job={job} />
    <div>
      {loading && <div className="toggle p-4"><Spinner loading={loading} /></div>}

      {!loading && job && (
        <>
          <div>
            <JobTemplate job={job} />
          </div>
        </>
      )}

      {!loading && !job && <p className="toggle text-center p-8">Job not found.</p>}
    </div>
  );
}

// const jobLoader = async ({ params }) => {
//   const res = await fetch(`http://localhost:5000/jobs/${params.id}`);
//   const data = await res.json();
//   return data;
// }

// export { JobPage as default , jobLoader };

export default JobPage;
