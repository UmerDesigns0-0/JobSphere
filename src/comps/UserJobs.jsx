import { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import { onValue, ref } from "firebase/database";

function UserJobs() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatDate = (date) =>
      new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

    useEffect(() => {
        const jobRef = ref(db, "jobs");
        const jobListener = onValue(jobRef, (snapshot) => {
           if (snapshot.exists()) {
            const data = snapshot.val();
            const jobsArray = Object.entries(data)
            .map(([id, job]) => ({ id, ...job })) // Convert object into array
            .filter((job) => job.uid === auth.currentUser.uid); // Filter jobs by uid

            jobsArray.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

            // Convert createdAt timestamp to human-readable date
            jobsArray.forEach((job) => {
                job.createdAt = formatDate(job.createdAt);
            });

            setJobs(jobsArray);
         } else {
            setJobs([]);
         }
         setLoading(false);
        })
        return () => {
            jobListener();
        }
    },[])
    return {jobs, loading};
}

export default UserJobs;
