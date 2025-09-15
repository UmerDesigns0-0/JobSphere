import { auth, provider } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
// for "Remember me" feature
import {
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";

const classes = {
  input: "w-full p-2.5 rounded-lg border text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white",
  inputError: "w-full p-2.5 rounded-lg border text-sm dark:bg-gray-600 dark:border-red-500 dark:text-white focus:ring-red-500 focus:border-red-500",
}

function SignIn({ onClose, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Replace the commented handleEmailChange function with this:
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Clear error if email becomes valid
    if (validateEmail(newEmail)) {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // Reset errors first
    setEmailError("");
    setPasswordError("");

    // EMAIL
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      emailRef.current?.focus();
      valid = false;
    }

    // PASSWORD
    if (!password) {
      setPasswordError("Please enter a password.");
      passwordRef.current?.focus();
      valid = false;
    } else if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters long.");
      passwordRef.current?.focus();
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
      toast.success(`${email} Logged in successfully!`);
    } catch (error) {
    switch (error.code) {
      case "auth/user-not-found":
        setEmailError("No account found with this email.");
        break;
        
      case "auth/wrong-password":
        setPasswordError("Incorrect password.");
        break;
        
      case "auth/user-disabled":
        toast.error("This account has been disabled.");
        break;
        
      case "auth/invalid-credential":
        toast.error("Invalid email or password.");
        break;
        
      // ... other cases
    }
  }
};

  const googleSignIn = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const additionalInfo = getAdditionalUserInfo(result);
      const user = result.user;
      if (additionalInfo.isNewUser) {
        toast.success(
          `Welcome ${user.displayName}! Your account has been created.`
        );
      } else {
        toast.success(
          `Welcome back ${user.displayName}! You have successfully signed in.`
        );
      }
      onClose();
    } catch (error) {
    switch (error.code) {
      case "auth/user-not-found":
        toast.error("No account found with this email.");
        break;

      case "auth/user-disabled":
        toast.error("This account has been disabled.");
        break;
        
      case "auth/invalid-credential":
        toast.error("Invalid email or password.");
        break;
        
      // ... other cases
    }
  }
};

const handleForgotPassword = async () => {
  if (!email) {
    toast.error("Please enter your email first.");
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset link sent! Check your inbox.");
  } catch (error) {
    switch (error.code) {
      case "auth/user-not-found":
        toast.error("No account found with this email.");
        break;
      case "auth/invalid-email":
        toast.error("Invalid email address.");
        break;
      default:
        toast.error("Something went wrong. Please try again.");
    }
  }
};

  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 bg-opacity-50 dark:bg-opacity-80"
      onClick={onClose} // close when clicking outside
    >
      <div
        className="relative p-4 w-full max-w-md max-h-full"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          <div className="p-4 md:p-5">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  ref={emailRef}
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  name="email"
                  id="email"
                  className={emailError? classes.inputError : classes.input}
                  placeholder="name@company.com"
                />
                {emailError && (
                  <p className="mt-2 px-2 text-sm text-red-600 dark:text-red-500">
                    {emailError}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  value={password}
                  onChange={handlePasswordChange}
                  ref={passwordRef}
                  type="password"
                  name="password"
                  id="password"
                  className={passwordError? classes.inputError : classes.input}
                  placeholder="••••••••"
                />
                {passwordError && (
                  <p className="mt-2 px-2 text-sm text-red-600 dark:text-red-500">
                    {passwordError}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center dark:text-white text-gray-900">
                <label className="flex items-center text-sm">
                  <input
                    onChange={(e) => setRemember(e.target.checked)}
                    type="checkbox"
                    id="remember"
                    className="mr-2"
                  />{" "}
                  Remember me
                </label>
                <a
                  href="#"
                  onClick={(e) => {e.preventDefault(); handleForgotPassword()}}
                  className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                >
                  Lost Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5 text-sm"
              >
                Login to your account
              </button>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <button
                  onClick={onSwitch}
                  className="text-blue-700 hover:underline dark:text-blue-500"
                >
                  Create account
                </button>
                <div className="pt-4 flex items-center justify-center">
                  <button
                    onClick={googleSignIn}
                    className="w-full px-4 py-2 border flex justify-center gap-2 border-slate-200 dark:border-slate-500 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-300 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
                  >
                    <img
                      className="w-6 h-6"
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      loading="lazy"
                      alt="google logo"
                    />
                    <span>Login with Google</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
