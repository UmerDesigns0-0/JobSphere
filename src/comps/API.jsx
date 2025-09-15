// //  useJobs.js (custom hook)
// import { useState, useEffect } from "react";

// function useJobs() {
//   const [jobs, setJobs] = useState([]); // jobs to display
//   const [loading, setLoading] = useState(true); // loading state

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/jobs");
//         const data = await res.json();
//         setJobs(data);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // ✅ return values so you can use them in other components
//   return { jobs, loading };
// }

// export default useJobs;











import { useState, useEffect } from "react";
import { db } from "../config/firebase"; 
import { ref, get } from "firebase/database"; // RTDB imports

function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // 🔹 reference to "jobs" node
        const snapshot = await get(ref(db, "jobs"));
        if (snapshot.exists()) {
          const data = snapshot.val();

          // Convert object into array
          const jobsArray = Object.entries(data).map(([id, job]) => ({
            id,
            ...job,
          }));

          setJobs(jobsArray);
        }
      } catch (error) {
        console.error("Error fetching jobs from RTDB:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, loading };
}

export default useJobs;

