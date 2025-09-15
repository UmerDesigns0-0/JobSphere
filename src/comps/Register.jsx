import { Link } from "react-router-dom";

import { auth, provider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useState, useRef } from "react";
import { toast } from "react-hot-toast";

function Register({ onClose, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [checkboxError, setCheckboxError] = useState("");

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const checkboxRef = useRef(null);

  const classes = {
    input:"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white",
    errorInput:"bg-gray-50 border border-red-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white focus:ring-red-500",
  }

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

  const handleConfirmPasswordChange = (e) => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked; 
    setCheckbox(e.target.checked);
    if (isChecked) {
      setCheckboxError("");
    }
  };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  //   if (!validateEmail(e.target.value)) {
  //     setEmailError('Please enter a valid email address.');
  //   } else {
  //     setEmailError('');
  //   }
  // };

  const handleEmailRegister = async (e) => {
    e.preventDefault();

    
  let valid = true;

  // Reset errors first
  setEmailError("");
  setPasswordError("");
  setConfirmPasswordError("");
  setCheckboxError("");

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

  // CONFIRM PASSWORD
  if (confirmPassword !== password) {
    setConfirmPasswordError("Passwords do not match.");
    confirmPasswordRef.current?.focus();
    valid = false;
  }

  // CHECKBOX
  if (!checkbox) {
    setCheckboxError("You must accept the Terms and Conditions.");
    checkboxRef.current?.focus();
    valid = false;
  }

  // Stop here if invalid
  if (!valid) return;


    // if (!validateEmail(email)) {
    //   setEmailError("Please enter a valid email address.");
    //   emailRef.current?.focus();
    //   return;
    // }

    // if (confirmPassword !== password) {
    //   setConfirmPasswordError("Passwords do not match.");
    //   confirmPasswordRef.current?.focus();
    //   return;
    // } else {
    //   setConfirmPasswordError("");
    // }

    // if (checkbox === false) {
    //   setCheckboxError("You must accept the Terms and Conditions.");
    //   checkboxRef.current?.focus();
    //   return;
    // } else {
    //   setCheckboxError("");
    // }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      toast.success(`Welcome ${user.email}! Your account has been created.`);
      onClose();
    } catch (error) {
      console.log("Firebase error:", error.code, error.message);

      switch (error.code) {
        // EMAIL ERRORS
        case "auth/email-already-in-use":
          setEmailError("This email is already registered.");
          toast.error(
            "This email is already registered. Please sign in instead."
          );
          emailRef.current?.focus();
          break;

        case "auth/invalid-email":
          setEmailError("Please enter a valid email address.");
          emailRef.current?.focus();
          break;

        // PASSWORD ERRORS
        case "auth/weak-password":
          setPasswordError("Password should be at least 6 characters long.");
          passwordRef.current?.focus();
          break;

        case "auth/missing-password":
          setPasswordError("Please enter a password.");
          passwordRef.current?.focus();
          break;

        // NETWORK/OTHER ERRORS
        case "auth/network-request-failed":
          toast.error(
            "Network error. Please check your connection and try again."
          );
          break;

        case "auth/too-many-requests":
          toast.error("Too many attempts. Please try again later.");
          break;

        default:
          toast.error("Registration failed. Please try again.");
          console.error("Unhandled auth error:", error);
      }
    }
  };
  const googleRegister = async (e) => {
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
          `Welcome back, ${user.displayName}! You were already registered.`
        );
      }
      onClose();
    } catch (error) {
      toast.error("Failed to register. Please try again.");
      console.error(error);
    }
  };

  return (
    <div
      id="register-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50"
      onClick={onClose} // close when clicking outside
    >
      <div
        className="relative w-85 md:w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <div className="bg-white rounded-lg shadow dark:bg-gray-800 dark:border dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
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
            <form
              onSubmit={handleEmailRegister}
              noValidate
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  ref={emailRef}
                  value={email}
                  onChange={handleEmailChange}
                  className={emailError ? classes.errorInput : classes.input}
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
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className={passwordError ? classes.errorInput : classes.input}
                  ref={passwordRef}
                  value={password}
                  onChange={handlePasswordChange}
                />
                {passwordError && (
                  <p className="mt-2 px-2 text-sm text-red-600 dark:text-red-500">
                    {passwordError}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  ref={confirmPasswordRef}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  type="password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className={confirmPasswordError ? classes.errorInput : classes.input}
                />
                {confirmPasswordError && (
                  <p className="mt-2 px-2 text-sm text-red-600 dark:text-red-500">
                    {confirmPasswordError}
                  </p>
                )}
              </div>
              <div className="grid wrap-normal items-start">
                <div className="flex items-start">
                  <input
                    ref={checkboxRef}
                    checked={checkbox}
                    onChange={handleCheckboxChange}
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 text-sm text-gray-500 font-medium"
                  >
                    I accept the{" "}
                    <Link
                      to="/TCs"
                      onClick={onClose}
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      Terms and Conditions
                    </Link>
                  </label>
                </div>{" "}
                {
                  <p className="mt-1 px-2 text-sm text-red-600 dark:text-red-500">
                    {checkboxError}
                  </p>
                }
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5 text-sm"
              >
                Create an account
              </button>
              <p className="text-sm text-gray-500 font-medium">
                Already have an account?{" "}
                <button
                  onClick={onSwitch}
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Login here
                </button>
                <div class="pt-4 flex items-center justify-center ">
                  <button
                    onClick={googleRegister}
                    class="w-full px-4 py-2 border flex justify-center gap-2 border-slate-200 dark:border-slate-500 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-300 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
                  >
                    <img
                      class="w-6 h-6"
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      loading="lazy"
                      alt="google logo"
                    />
                    <span>Register with Google</span>
                  </button>
                </div>
              </p>{" "}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
