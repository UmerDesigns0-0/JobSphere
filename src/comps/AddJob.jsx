import { useState, useRef, useEffect } from "react";
import ChipInput from "./ChipInput";
import { useNavigate } from "react-router-dom";

import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { ref, push, serverTimestamp } from "firebase/database";
import { toast } from "react-hot-toast";

export default function AddJobForm() {
  const navigate = useNavigate();


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

  // Refs
const titleRef = useRef(null);
const companyRef = useRef(null);
const locationRef = useRef(null);
const descRef = useRef(null);
const fullDescRef = useRef(null);

  const [error, setError] = useState({});
  // const firstRef = useRef(null);
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



  
  const [type, setType] = useState("Full-Time");
  // const [title, setTitle] = useState("");
  // const [company, setCompany] = useState("");
  // const [location, setLocation] = useState("");
  // const [desc, setDesc] = useState("");
  // const [fullDesc, setFullDesc] = useState("");
  const [salary, setSalary] = useState("");

  const [resp, setResp] = useState([]);
  const [ben, setBen] = useState([]);
  const [req, setReq] = useState([]);


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

    const newJob = {
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
    if (newJob.resp.length < 3) {
      respRef.current?.focus();
      respRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast.error("Each list must have at least 3 items");
      return;
    }
    if (newJob.ben.length < 3) {
      benRef.current?.focus();
      benRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast.error("Each list must have at least 3 items");
      return;
    }
    if (newJob.req.length < 3) {
      reqRef.current?.focus();
      reqRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      toast.error("Each list must have at least 3 items");
      return;
    }
    if (!salary) {
      toast.error("Salary range is required");
      return;
    }

    if(!auth.currentUser) {
      toast.error("You must be logged in to create a job");
      return;
    }

    try {
      
      // const res = await fetch("http://localhost:5000/jobs", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(newJob),
      // });
      // if (!res.ok) throw new Error("Failed to create job");
      const res = await push(ref(db, "jobs"), {
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
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser.displayName || auth.currentUser.email || "UnKnown User",
      })
      console.log(res);
      toast.success("Job created successfully!");
      navigate("/AllJobs");
    } catch (err) {
      console.error(err);
      if (err) {
        toast.error("An error occurred while creating the job");
      }
    }
  };

  return (
    <div className="toggle py-10 px-4 md:px-0">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/5 p-6 md:p-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Add a Job
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
              Create Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
