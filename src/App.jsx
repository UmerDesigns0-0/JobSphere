import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
// import { useLocation } from "react-router-dom"
import ScrollToTop from "./ScrollToTop"


import Header from "./comps/Header"
import Home from "./comps/Home"

// import Hero from "./comps/Hero"
// import Cards from "./comps/Cards"
import Jobs from "./comps/Jobs"

import Footer from "./comps/Footer"

import AllJobs from "./comps/AllJobs"
import AddJob from "./comps/AddJob"
import About from "./comps/About"
import JobPage from "./comps/JobPage"
import TCs from "./comps/T&Cs"
import EditJob from "./comps/EditJob"
import SignIn from "./comps/SignIn"
import MyJobs from "./comps/MyJobs"

import { Toaster } from "react-hot-toast"

import Error404 from "./comps/Error404"

// import { ToastContainer, Zoom } from "react-toastify"
// import { Toaster, toast } from "react-hot-toast"




function App() {

  return (
    <>
     <Toaster />
      <Router>
        <ScrollToTop />
        <Header />
        {/* <Toaster /> */}
        {/* <ToastContainer
          position="bottom-right"
          autoClose={3000}
          transition={Zoom}
          toastStyle={{ backgroundColor: "green", color: "white" }}
        /> */}
        <Routes>
          <Route path="/" element={<Home />} />

          
          <Route path="/Jobs" element={<Jobs />} />
          <Route path="/AllJobs" element={<AllJobs />} />
          <Route path="/AddJob" element={<AddJob />} />
          <Route path="/About" element={<About />} />
          <Route path="/Jobs/:id" element={<JobPage />} />
          <Route path="/TCs" element={<TCs />} />
          <Route path="/EditJob/:id" element={<EditJob />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/MyJobs" element={<MyJobs />} />

        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App
