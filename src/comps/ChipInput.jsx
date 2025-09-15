import { useState, forwardRef } from "react";

const ChipInput = forwardRef(function ChipInput({ label, placeholder, values, onAdd, onRemove }, ref) {
  const [inp, setInp] = useState(""); // current input value
  const add = () => {
    const trimmed = inp.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setInp("");
  };
  const onkeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      add();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          ref={ref}
          value={inp}
          onKeyDown={onkeydown}
          onChange={(e) => setInp(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
        />
        <button
          onClick={add}
          type="button"
          className="rounded-lg px-3 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700"
        >
          Add
        </button>
      </div>

      {!!values.length && (
        <ul className="flex flex-wrap gap-2">
          {values.map((v, i) => (
            <li key={i} className="flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1 text-sm text-gray-800 dark:text-gray-100">
              <span>{v}</span>
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 p-1 leading-none"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default ChipInput;
