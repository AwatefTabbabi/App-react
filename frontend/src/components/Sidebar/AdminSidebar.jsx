import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBook, FaBell, FaUsers, FaEnvelope, FaCog } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { BiSearch } from "react-icons/bi";
const adminRoutes = [
  { path: "/admin/dashboard", name: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/catalogue", name: "Catalogue", icon: <FaBook /> },
  //{ path: "/admin/absence-notifications", name: "Absences", icon: <FaBell /> },
  { path: "/AdminDemandes", name: "Demandes", icon: <FaUsers /> },
  { path: "/AdminEmails", name: "Emails", icon: <FaEnvelope /> },
  { path: "/settings", name: "Paramètres", icon: <FaCog /> },
];

const AdminSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: { width: 0, padding: 0, transition: { duration: 0.2 } },
    show: { width: "140px", padding: "5px 15px", transition: { duration: 0.2 } },
  };
  const showAnimation = {
    hidden: { width: 0, opacity: 0, transition: { duration: 0.5 } },
    show: { opacity: 1, width: "auto", transition: { duration: 0.5 } },
  };

  return (
    <div className="main-container">
      <motion.div
        animate={{ width: isOpen ? "250px" : "60px", transition: { duration: 0.5, type: "spring", damping: 10 } }}
        className="sidebar"
      >
        <div className="top_section">
          <AnimatePresence>
            {isOpen && (
              <motion.h1 variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="logo">
                Admin
              </motion.h1>
            )}
          </AnimatePresence>
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div className="search">
                  <div className="search_icon"><BiSearch /></div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.input
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        variants={inputAnimation}
                        type="text"
                        placeholder="Search"
                      />
                    )}
                  </AnimatePresence>
                </div>
        <section className="routes">
          {adminRoutes.map((route, index) => (
            <NavLink to={route.path} key={index} className="link" activeClassName="active">
              <div className="icon">{route.icon}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div variants={showAnimation} initial="hidden" animate="show" exit="hidden" className="link_text">
                    {route.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          ))}
        </section>
      </motion.div>
      <main>{children}</main>
    </div>
  );
};

export default AdminSidebar;
