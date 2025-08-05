import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {  NavLink } from 'react-router-dom';
import { FaSchool, FaUsers, FaChartLine, FaFileAlt, FaSearch, FaMapMarkedAlt, FaEnvelope, FaMoneyBill, FaInfo, FaUserTie, FaChartPie, FaStar } from 'react-icons/fa';
import { setUser } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
const Navbar = () => {
    const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success("Logout successful");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  const user = useSelector((state) => state.auth.user);

  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                            {/* Menu Icon SVG */}
                            <img  src={<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
<path d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 Z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 Z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 Z"></path>
</svg>}alt="menu">
                            </img>
                        </button>
            {/* <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button> */}
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              {
                user ? (
                  user.role === "SuperAdmin" ? (
                    <div className="flex items-center">
                    <Link to="/super-admin/dashboard" className="text-1.5xl font-bold">
                      <span className="text-yellow-500">EduStruct</span> <span className="text-white">Admin</span>
                    </Link>
                  </div>
                  ) : user.role === "OfficerAdmin" ?   (
                    <Link to="/officer-admin/dashboard" className="text-1.5xl font-bold">
                      <span className="text-yellow-500">EduStruct</span> <span className="text-white">Officer Admin</span>
                    </Link>
                  ) : user.role === "PrivateSchoolAdmin" ? (
                    <Link to="/school-admin/dashboard" className="text-1.5xl font-bold">
                      <span className="text-yellow-500">EduStruct</span> <span className="text-white">School Admin</span>
                    </Link>
                  ) : (
                    <Link to="/">
                      <h1 className="text-2xl font-bold text-white">EduStruct</h1>
                    </Link>
                  )
                ):
                (
                  <Link to="/">
                    <h1 className="text-2xl font-bold text-white">EduStruct</h1>
                  </Link>
                )
              }
             
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* Navbar links based on user role */}
                {user ? (
                  <>
                    {/* Common Links */}
                   

                    {/* Role-Based Links */}
                    {user.role === "SuperAdmin" && (
                      <>
                       
                       <div className="flex space-x-6">
            <NavLink
              to="/super-admin/schools"
              activeClassName="bg-gray-700"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <FaSchool className="inline-block mr-2" /> Manage Schools
            </NavLink>

            <NavLink
              to="/super-admin/view-schools"
              activeClassName="bg-gray-700"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <FaFileAlt className="inline-block mr-2" /> View Schools
            </NavLink>
            <NavLink
              to="/super-admin/users"
              activeClassName="bg-gray-700"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <FaUsers className="inline-block mr-2" /> Manage Users
            </NavLink>
            <Link
                 to="/super-admin/reviews"
                 className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
               >
                 <FaStar className="inline-block mr-2 mb-1" />
                  Manage Reviews
               </Link>
            <NavLink
              to="/super-admin/reports"
              activeClassName="bg-gray-700"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <FaChartLine className="inline-block mr-2" /> Reports
            </NavLink>

          </div>
                       
                      </>
                    )}

                    {user.role === "OfficerAdmin" && (
                      <>
                       
                       <Link
                          to="/officer-admin/classification-form"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaFileAlt className="inline-block mr-2" />
                          Classification Form
                        </Link>
                        <Link
                          to="/officer-admin/improvement-tracker"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaChartLine className="inline-block mr-2" />
                          Improvement Tracker
                        </Link>
                        <Link
                          to="/officer-admin/ai-analysis"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaChartLine className="inline-block mr-2" />
                          Ai Analysis
                        </Link>
                        <Link
                          to="/officer-admin/schools-map"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaMapMarkedAlt className="inline-block mr-2" />
                          View Map
                        </Link>
                        <Link
                          to="/officer-admin/contact"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaEnvelope className="inline-block mr-2" />
                          Contact Us
                        </Link>
                       
                       
                      </>
                    )}

                    {user.role === "PrivateSchoolAdmin" && (
                      <>
                      
                        <Link
                          to="/school-admin/school-information"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaSchool className="inline-block mr-2" />
                          School Information
                        </Link>
                        <Link
                          to="/school-admin/view-school"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaSchool className="inline-block mr-2" />
                          View School
                        </Link>
                        <Link
                          to="/school-admin/review-classification"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaFileAlt className="inline-block mr-2" />
                          Review Classification
                        </Link>
                        <Link
                          to="/school-admin/contact"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaEnvelope className="inline-block mr-2" />
                          Contact Us
                        </Link>
                      </>
                    )}

                    {user.role === "GeneralPublic" && (
                      <>
                    <Link
                      to="/compare"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <FaChartLine className="inline-block mr-2" />
                      Compare Schools
                    </Link>
                    <Link
                      to="/view-schools"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <FaSchool className="inline-block mr-2" />
                      View Schools
                    </Link>
                    <Link
              to="/solution"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
            >
              <FaChartLine className="inline-block mr-2" />
              Solution
            </Link>
                    <Link
              to="/contact"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
            >
              <FaEnvelope className="inline-block mr-2" />
              Contact Us
            </Link>
           
            <Link
              to="/instructor"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
            >
              <FaUserTie className="inline-block mr-2" />
              EduStruct Instructor
            </Link>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {/* Links for non-logged-in users */}
                    <Link
                      to="/impact"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <FaInfo className="inline-block mb-1 mr-1" />
                      About Us
                    </Link>
                   
                    <Link
                      to="/compare"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <FaChartLine className="inline-block mr-2" />
                      Compare Schools
                    </Link>
                    <Link
                      to="/view-schools"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <FaSchool className="inline-block mr-2" />
                      View Schools
                    </Link>
                   
                    <Link
                      to="/solution"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <FaChartLine className="inline-block mr-2" />
                      Solution
                    </Link>
                    <Link
                      to="/contact"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <FaEnvelope className="inline-block mr-2" />
                      Contact Us
                    </Link>
                    <Link
                      to="/ai"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <FaChartPie className="inline-block mr-2" />
                      EduStruct Instructor
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center justify-center gap-2">
                <p className="text-red-500 font-bold">👋 {user.fullname}</p>
                <button className="border-2 border-red-500 rounded-full p-1 text-xl">
                  <FiLogOut
                    className="text-white cursor-pointer"
                    onClick={logoutHandler}
                  />
                </button>
              </div>
            ) : (
              <>
                <a href="/login">
                  <button
                    variant="outline"
                    className="hover:text-[#a63030] text-white cursor-pointer border-1 border-white px-2 py-1 bg-transparent rounded-md hover:scale-105 transition-all duration-300"
                  >
                    Login
                  </button>
                </a>
                <a href="/signup">
                  <button className="hover:text-[#a63030] text-white cursor-pointer border-1 border-white py-1 px-1 rounded-md bg-transparent hover:scale-105 transition-all duration-300">
                    Signup
                  </button>
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {user ? (
            <>
              {/* Same links for mobile */}
            

              {user.role === "SuperAdmin" && (
               <>
                       
               <Link
                 to="/super-admin/schools"
                 className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
               >
                 <FaSchool className="inline-block mr-2" />
                 Manage Schools
               </Link>
               <Link
                          to="/super-admin/view-schools"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaFileAlt className="inline-block mr-2" />
                          View Schools
                        </Link>
               <Link
                 to="/super-admin/users"
                 className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
               >
                 <FaUsers className="inline-block mr-2" />
                  Manage Users
               </Link>
               <Link
                 to="/super-admin/reviews"
                 className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
               >
                 <FaStar className="inline-block mr-2" />
                  Manage Reviews
               </Link>
               <Link
                 to="/super-admin/reports"
                 className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
               >
                 <FaChartLine className="inline-block mr-2" />
                  Reports
               </Link>
              
             </>
              )}

                {user.role === "OfficerAdmin" && (
             <>
            <Link
                          to="/officer-admin/classification-form"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaFileAlt className="inline-block mr-2" />
                          Classification Form
                        </Link>
                        <Link
                          to="/officer-admin/improvement-tracker"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaChartLine className="inline-block mr-2" />
                          Improvement Tracker
                        </Link>
                        <Link
                          to="/officer-admin/ai-analysis"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaChartLine className="inline-block mr-2" />
                          Ai Analysis
                        </Link>
                        <Link
                          to="/officer-admin/schools-map"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaMapMarkedAlt className="inline-block mr-2" />
                          View Map
                        </Link>
                        <Link
                          to="/officer-admin/contact"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaEnvelope className="inline-block mr-2" />
                          Contact Us
                        </Link>
                       
           </>
              )}

              {user.role === "PrivateSchoolAdmin" && (
             <>
                      
                      <Link
                          to="/school-admin/school-information"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaSchool className="inline-block mr-2" />
                          School Information
                        </Link>
                        <Link
                          to="/school-admin/view-school"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaSchool className="inline-block mr-2" />
                          View School
                        </Link>
                        <Link
                          to="/school-admin/review-classification"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaFileAlt className="inline-block mr-2" />
                          Review Classification
                        </Link>
                        <Link
                          to="/school-admin/contact"
                          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                        >
                          <FaEnvelope className="inline-block mr-2" />
                          Contact Us
                        </Link>
           </>
              )}

              {user.role === "GeneralPublic" && (
                <>
            <Link
              to="/compare"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
            >
              <FaChartLine className="inline-block mr-2" />
              Compare Schools
            </Link>
            <Link
              to="/view-schools"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
            >
              <FaSchool className="inline-block mr-2" />
              View Schools
            </Link>
           
    <Link
      to="/solution"
      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
    >
      <FaChartLine className="inline-block mr-2" />
      Solution
    </Link>
    <Link
      to="/contact"
      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
    >
      <FaEnvelope className="inline-block mr-2" />
      Contact Us
    </Link>
    <Link
      to="/instructor"
      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
    >
      <FaUserTie className="inline-block mr-2" />
      EduStruct Instructor
    </Link>
              </>
              )}
            </>
          ) : (
            <>
                    {/* Links for non-logged-in users */}
                    <Link
                      to="/impact"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <FaInfo className="inline-block mr-1" />
                      About Us
                    </Link>
                   
                    <Link
                      to="/compare"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <FaChartLine className="inline-block mr-2" />
                      Compare Schools
                    </Link>
                    <Link
                      to="/view-schools"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <FaSchool className="inline-block mr-2" />
                      View Schools
                    </Link>
                   
                    <Link
                      to="/solution"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <FaChartLine className="inline-block mr-2" />
                      Solution
                    </Link>
                    <Link
                      to="/contact"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <FaEnvelope className="inline-block mr-2" />
                      Contact Us
                    </Link>
                    <Link
                      to="/ai"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105 transition-all duration-300"
                    >
                      <FaChartPie className="inline-block mr-2" />
                      EduStruct Instructor
                    </Link>
                  </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;