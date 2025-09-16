import { useState, useRef, useEffect } from "react";
import ChipInput from "./ChipInput";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-hot-toast";

import { db } from "../config/firebase";
import { get, set, ref } from "firebase/database";

export default function EditJob() {
//   const { jobs, loading } = useJobs();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);

  const { id } = useParams();
  console.log(id);
  // const job = useLoaderData();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        toast.error("You must be logged in to edit a job");
        navigate(`/jobs/${id}`);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const snapshot = await get(ref(db, `jobs/${id}`));
        if (snapshot.exists()) {
          setJob(snapshot.val());
        } else {
          toast.error("Job not found");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } 
    };
    fetchJob();
  }, []);

  // useEffect(() => {
  //   const fetchJob = async () => {
  //     // if (!auth.currentUser) {
  //     //   toast.error("You must be logged in to edit a job");
  //     //   navigate("/");
  //     //   return;
  //     // }
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

  const classes = {
    input:
      "mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500",
    error:
      "mt-2 w-full rounded-lg border border-red-500 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-red-500",
  };
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    desc: "",
    fullDesc: "",
  });

useEffect(() => {
  if (job) {
    setForm({
      title: job.title || "",
      company: job.company || "",
      location: job.location || "",
      desc: job.desc || "",
      fullDesc: job.fullDesc || "",
    });
    setType(job.type || "Full-Time");
    setSalary(job.salary || "");
    setResp(job.resp || []);
    setBen(job.ben || []);
    setReq(job.req || []);
  }
}, [job]);

const [type, setType] = useState("Full-Time"); // fallback
const [salary, setSalary] = useState("");
const [resp, setResp] = useState([]);
const [ben, setBen] = useState([]);
const [req, setReq] = useState([]);


  // Refs
const titleRef = useRef(null);
const companyRef = useRef(null);
const locationRef = useRef(null);
const descRef = useRef(null);
const fullDescRef = useRef(null);

  const [error, setError] = useState({});
//   const firstRef = useRef(null);
  const respRef = useRef(null);
  const benRef = useRef(null);
  const reqRef = useRef(null);

  // useEffect(() => {
  //   if (firstRef.current) {
  //     firstRef.current.focus();
  //     firstRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  //   }
  // }, [error]);

  const validate = () => {
    const errs = {};

    if (!form.title.trim()) {
      errs.title = "Title is required";
    } else if (form.title.trim().length < 4) {
      errs.title = "Title must be at least 4 characters long";
    }
    if (!form.company.trim()) {
      errs.company = "Company is required";
    }
    if (!form.location.trim()) {
      errs.location = "Location is required";
    }
    if (!form.desc.trim()) {
      errs.desc = "Description is required";
    } else if (form.desc.trim().length < 10) {
      errs.desc = "Description must be at least 10 characters long";
    }
    if (!form.fullDesc.trim()) {
      errs.fullDesc = "Full Description is required";
    } else if (form.fullDesc.trim().length < 30) {
      errs.fullDesc = "Full Description must be at least 30 characters long";
    }
    setError(errs);
    return errs;
    }



  
//   const [type, setType] = useState(job.type);
//   // const [title, setTitle] = useState("");
//   // const [company, setCompany] = useState("");
//   // const [location, setLocation] = useState("");
//   // const [desc, setDesc] = useState("");
//   // const [fullDesc, setFullDesc] = useState("");
//   const [salary, setSalary] = useState("");

//   const [resp, setResp] = useState([]);
//   const [ben, setBen] = useState([]);
//   const [req, setReq] = useState([]);

  const add = (setter) => (item) => setter((arr) => [...arr, item]);
  const remove = (setter) => (idx) =>
    setter((arr) => arr.filter((_, i) => i !== idx));


  // const handleChange = (e) => {
  // const value = e.target.value;
  // setTitle(value);

  // live validation
//   if (value.trim().length >= 4) {
//     setTitleError(""); // clear error once it reaches 4 chars
//   } else if (value.trim().length === 0) {
//     setTitleError("Title is required");
//   } else if (value.trim().length < 4) {
//     setTitleError("Title must be at least 4 characters long");
//   }
// };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isUnchanged =
      form.title === job.title &&
      form.company === job.company &&
      form.location === job.location &&
      form.desc === job.desc &&
      form.fullDesc === job.fullDesc &&
      type === job.type &&
      salary === job.salary &&
      JSON.stringify(resp) === JSON.stringify(job.resp) &&
      JSON.stringify(ben) === JSON.stringify(job.ben) &&
      JSON.stringify(req) === JSON.stringify(job.req);

    const errorMessages = [
      { text: "No changes detected.", icon: "👀" },
      { text: "Nothing new here...", icon: "⚠️" },
      { text: "Same as before, try updating something.", icon: "😴" },
      { text: "Still unchanged — add a tweak before saving!", icon: "🔄" },
    ];

    function showRandomErrorToast() {
      const random =
        errorMessages[Math.floor(Math.random() * errorMessages.length)];

      toast.error(random.text, { icon: random.icon });
    }

    if (isUnchanged) {
      showRandomErrorToast();
      return;
    }


    // if (
    //   UpdatedJob.type === "" ||
    //   UpdatedJob.title === "" ||
    //   UpdatedJob.company === "" ||
    //   UpdatedJob.location === "" ||
    //   UpdatedJob.desc === "" ||
    //   UpdatedJob.fullDesc === "" ||
    //   UpdatedJob.salary === "" ||
    //   UpdatedJob.resp.length === 0 ||
    //   UpdatedJob.ben.length === 0 ||
    //   UpdatedJob.req.length === 0
    // ) {
    //   toast.error("Please fill in all required fields.");
    // }

    const UpdatedJob = {
      id,
      type,
      title: form.title,
      company: form.company,
      location: form.location,
      desc: form.desc,
      fullDesc: form.fullDesc,
      salary,
      resp,
      ben,
      req,
      uid: auth.currentUser.uid,
    };

    // if (!title.trim()) {
    //   setTitleError("Title is required");
    //   titleRef.current?.focus();
    //   titleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    //   return;
    // } else if (title.trim().length < 4) {
    //   setTitleError("Title must be at least 4 characters long");
    //   titleRef.current?.focus();
    //   return;
    // } else {
    //   setTitleError("");
    // }
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      // focus first error field
      if (errs.title) titleRef.current?.focus();
      else if (errs.company) companyRef.current?.focus();
      else if (errs.location) locationRef.current?.focus();
      else if (errs.desc) descRef.current?.focus();
      else if (errs.fullDesc) fullDescRef.current?.focus();
      return;
    }
    if (UpdatedJob.resp.length < 3) {
      respRef.current?.focus();
      respRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast.error("Each list must have at least 3 items");
      return;
    }
    if (UpdatedJob.ben.length < 3) {
      benRef.current?.focus();
      benRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast.error("Each list must have at least 3 items");
      return;
    }
    if (UpdatedJob.req.length < 3) {
      reqRef.current?.focus();
      reqRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast.error("Each list must have at least 3 items");
      return;
    }
    if (!salary) {
      toast.error("Salary range is required");
      return;
    }
    try {
      // const res = await fetch(`http://localhost:5000/jobs/${id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(UpdatedJob),
      // });

      await set(ref(db, `jobs/${id}`), UpdatedJob);
      toast.success("Job updated successfully!");
      setJob(UpdatedJob);
      navigate(`/jobs/${id}`);
    } catch (err) {
      console.error(err);
      if (err) {
        toast.error("An error occurred while updating the job");
      }
    } 
  };

  return (
    <div className="toggle py-10 px-4 md:px-0">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 p-6 md:p-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Update Job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Job Type
              </label>
               <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
               >
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Contract</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>
              
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                ref={titleRef}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., Frontend Developer"
                className={error.title ? classes.error : classes.input}
              />
              {error.title && (
                <p className="text-sm text-red-500 pt-1">{error.title}</p>
              )}
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Company
              </label>
              <input
                name="company"
                ref={companyRef}
                className={error.company ? classes.error : classes.input}
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                placeholder="Company Inc."
              />
              {error.company && (
                <p className="text-sm text-red-500 pt-1">{error.company}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Location
              </label>
              <input
                name="location"
                ref={locationRef}
                className={error.location ? classes.error : classes.input}
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="City, State or Remote"
              />
              {error.location && (
                <p className="text-sm text-red-500 pt-1">{error.location}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Salary
              </label>
              <select
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Salary Range</option>
                <option>$1k – $50k</option>
                <option>$50k – $100k</option>
                <option>$100k – $150k</option>
                <option>$150k – $200k</option>
                <option>$200k – $300k</option>
                <option>$300k – $500k</option>
                <option>$500k – $1m</option>
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Short Description
            </label>
            <textarea
              name="desc"
              value={form.desc}
              className={error.desc ? classes.error : classes.input}
              ref={descRef}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              rows={3}
              placeholder="1–3 sentences summarizing the role"
            />
            {error.desc && (
                <p className="text-sm text-red-500 pt-1">{error.desc}</p>
              )}
          </div>

          {/* Lists */}
          <ChipInput
            ref={respRef}
            label="Responsibilities"
            placeholder="Add a responsibility and press Enter"
            values={resp}
            onAdd={add(setResp)}
            onRemove={remove(setResp)}
          />
          <ChipInput
            ref={benRef}
            label="Benefits"
            placeholder="Add a benefit and press Enter"
            values={ben}
            onAdd={add(setBen)}
            onRemove={remove(setBen)}
          />
          <ChipInput
            ref={reqRef}
            label="Requirements"
            placeholder="Add a requirement and press Enter"
            values={req}
            onAdd={add(setReq)}
            onRemove={remove(setReq)}
          />

          {/* Full Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Full Description
            </label>
            <textarea
              value={form.fullDesc}
              ref={fullDescRef}
              onChange={(e) => setForm({ ...form, fullDesc: e.target.value })}
              rows={8}
              placeholder="150-200 words detailed description..."
              className={error.fullDesc ? classes.error : classes.input}
            />
            {error.fullDesc && (
                <p className="text-sm text-red-500 pt-1">{error.fullDesc}</p>
              )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="reset"
              onClick={() => {
                setType("Full-Time");
                setForm({
                  title: "",
                  company: "",
                  location: "",
                  desc: "",
                  fullDesc: "",
                });
                setSalary("");
                setResp([]);
                setBen([]);
                setReq([]);
              }}
              className="rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Clear
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
