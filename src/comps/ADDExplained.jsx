import { useState } from "react";

// A reusable chip input component for adding/removing list items
function ChipInput({ label, placeholder, values, onAdd, onRemove }) {
  const [inp, setInp] = useState(""); // current input value
  // Add item if input is non-empty after trimming
  const add = () => {
    const trimmed = inp.trim(); // trim whitespace
    if (!trimmed) return; // ignore empty input
    onAdd(trimmed); // call parent handler
    setInp(""); // clear input field
  };
  // Add item on Enter key press
  const onKeyDown = (e) => {
    if (e.key === "Enter") { 
      e.preventDefault(); // prevent form submission
      add(); // call add function
    }
  };

  // Render the chip input component
  return ( 
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          value={inp}
          onChange={(e) => setInp(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder} // input placeholder
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
        />
        <button
          type="button"
          onClick={add}
          className="rounded-lg px-3 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
      {!!values.length && (
        <ul className="flex flex-wrap gap-2">
          {values.map((v, i) => (
            <li
              key={`${v}-${i}`} 
              className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1 text-sm text-gray-800 dark:text-gray-100"
            >
              <span>{v}</span>
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 p-1 leading-none"
                aria-label="Remove"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AddJobForm() {
  const [type, setType] = useState("Full-Time");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [salary, setSalary] = useState("");

  const [resp, setResp] = useState([]);
  const [ben, setBen] = useState([]);
  const [req, setReq] = useState([]);

  const add = (setter) => (item) => setter((arr) => [...arr, item]); 
  const remove = (setter) => (idx) =>
    setter((arr) => arr.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJob = {
      type,
      title,
      company,
      location,
      desc,
      fullDesc,
      salary,
      resp,
      ben,
      req,
    };

    try {
      const res = await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) throw new Error("Failed to create job");
      alert("Job created!");
    } catch (err) {
      console.error(err);
      alert("Could not create job. Check console/logs.");
    }
  };

  return (
    <div className="toggle py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white dark:bg-gray-900 shadow-lg ring-1 ring-black/5 p-6 md:p-8">
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Frontend Developer"
                className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Company
              </label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company Inc."
                className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Location
              </label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State or Remote"
                className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
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
                <option value="1k-50k">$1,000 – $50,000</option>
                <option value="50k-100k">$50,000 – $100,000</option>
                <option value="100k-150k">$100,000 – $150,000</option>
                <option value="150k-200k">$150,000 – $200,000</option>
                <option value="200k-300k">$200,000 – $300,000</option>
                <option value="300k-500k">$300,000 – $500,000</option>
                <option value="500k-1m">$500,000 – $1,000,000</option>
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Short Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              placeholder="1–3 sentences summarizing the role"
              className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Lists */}
          <ChipInput
            label="Responsibilities"
            placeholder="Add a responsibility and press Enter"
            values={resp}
            onAdd={add(setResp)}
            onRemove={remove(setResp)}
          />
          <ChipInput
            label="Benefits"
            placeholder="Add a benefit and press Enter"
            values={ben}
            onAdd={add(setBen)}
            onRemove={remove(setBen)}
          />
          <ChipInput
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
              value={fullDesc}
              onChange={(e) => setFullDesc(e.target.value)}
              rows={8}
              placeholder="250–300 words detailed description..."
              className="mt-2 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="reset"
              onClick={() => {
                setType("Full-Time");
                setTitle("");
                setCompany("");
                setLocation("");
                setDesc("");
                setFullDesc("");
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
