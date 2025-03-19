import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaCalendarTimes, FaBan, FaRegClock, FaChartLine, FaHistory, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdBadge, faFolder, faFileAlt, faUsers, faUser, faCreditCard, faEnvelope, faList, faSatelliteDish, faExchangeAlt, faClipboard, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const routes = [
  {
    path: "/mes-donnees-individuelles",
    name: "Mes données individuelles",
    icon: <FontAwesomeIcon icon={faInfoCircle} />, 
    subRoutes: [
      { path: "/donnees-administratives", name: "Données administratives", icon: <FontAwesomeIcon icon={faFileAlt} /> },
      { path: "/demande-d-attestation", name: "Demande d'attestation", icon: <FontAwesomeIcon icon={faFolder} /> },
      /*{ path: "/settings/demande-de-badge", name: "Demande de badge", icon: <FontAwesomeIcon icon={faIdBadge} /> },*/
      
      { path: "/synthese", name: "Synthèse", icon: <FontAwesomeIcon icon={faUsers} /> },
      { path: "/mes-coordonnees", name: "Mes coordonnées", icon: <FontAwesomeIcon icon={faUser} /> },
      /*{ path: "/settings/mes-coordonnees-bancaires", name: "Mes coordonnées bancaires", icon: <FontAwesomeIcon icon={faCreditCard} /> },
      { path: "/settings/mon-etat-civil", name: "Mon état civil", icon: <FontAwesomeIcon icon={faUser} /> },
      { path: "/settings/personnes-a-contacter", name: "Personnes à contacter", icon: <FontAwesomeIcon icon={faEnvelope} /> },*/
    ],
  },
  {
    path: "/mes-absences",
    name: "Mes absences",
    icon: <FaCalendarTimes />,
    subRoutes: [
      
      { path: "/demande-absence", name: "Demande d'absence", icon: <FaRegClock /> },
      { path: "/annulation-d-absence", name: "Annulation d'absence", icon: <FaBan /> },
     /* { path: "/settings/mon-planning-d-absences", name: "Mon planning d'absences", icon: <FaChartLine /> },
      { path: "/settings/historique-des-absences", name: "Historique des absences", icon: <FaHistory /> },
      { path: "/settings/planning-d-equipe", name: "Planning d'équipe", icon: <FaCalendarAlt /> },*/
      { path: "/consultation-des-soldes", name: "Consultation des soldes", icon: <FaDollarSign /> },
    ],
  },
  { path: "/mes-competences", name: "Mes compétences", icon: <FontAwesomeIcon icon={faList} /> },
  { path: "/ma-formation", name: "Ma formation", icon: <FontAwesomeIcon icon={faSatelliteDish} /> },
  { path: "/settings", name: "Settings", icon: <FaLock size={16} /> },
  /*{ path: "/mon-evaluation", name: "Mon évaluation", icon: <FontAwesomeIcon icon={faClipboard} /> },*/
];

const SideBar = ({ children }) => {
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
          {routes.map((route, index) => (
            route.subRoutes ? (
              <SidebarMenu
                key={index}
                setIsOpen={setIsOpen}
                route={route}
                showAnimation={showAnimation}
                isOpen={isOpen}
              />
            ) : (
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
            )
          ))}
        </section>
      </motion.div>
      <main>{children}</main>
    </div>
  );
};

export default SideBar;