import { useEffect, useState } from "react";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    // check saved preference on first load
    const saved = localStorage.getItem("darkMode");
    return saved === "true"; // convert string back to boolean
  });

  useEffect(() => {
  // Remove the "transition-disabled" class after mount
  document.documentElement.classList.remove("transition-disabled");
}, []);


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(p => !p)}
      className="togglebtn !transition-colors !ease-in !duration-200"
    >
      {darkMode ? "Light 🌞" : "Dark 🌙"}
    </button>
  );
}

export default DarkModeToggle;
