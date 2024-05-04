import React from "react";
import { FaHome, FaBars, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiTwotoneFileExclamation } from "react-icons/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import Modal from "./Modal";

function SideNav() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function toggle() {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    setActiveNavItem(0);
  }, []);
  const navLinks = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      path: "/users",
      name: "Users",
      icon: <FaUser />,
    },
    {
      path: "/messages",
      name: "Messages",
      icon: <MdMessage />,
    },
    {
      path: "/analytics",
      name: "Analytics",
      icon: <BiAnalyse />,
    },
    {
      path: "/file-manager",
      name: "File Manager",
      icon: <AiTwotoneFileExclamation />,
      subRoutes: [
        {
          path: "/settings/profile",
          name: "Profile ",
          icon: <FaUser />,
        },
        {
          path: "/settings/2fa",
          name: "2FA",
          icon: <FaLock />,
        },
        {
          path: "/settings/billing",
          name: "Billing",
          icon: <FaMoneyBill />,
        },
      ],
    },
    {
      path: "/settings",
      name: "Settings",
      icon: <BiCog />,
      exact: true,
      subRoutes: [
        {
          path: "/settings/profile",
          name: "Profile ",
          icon: <FaUser />,
        },
        {
          path: "/settings/2fa",
          name: "2FA",
          icon: <FaLock />,
        },
        {
          path: "/settings/billing",
          name: "Billing",
          icon: <FaMoneyBill />,
        },
      ],
    },
  ];

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };
  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
  };
  return (
    <div className="h-screen rounded-sm hidden sm:block">
      <motion.div
        animate={{ width: isOpen ? "200px" : "38px" }}
        className="text-white h-screen bg-[#283238] py-3 transition-width duration-150"
      >
        <div className="flex items-center justify-between mt-3 mb-6 mx-3">
          {isOpen && (
            <div>
              <h1 className="font-bold shadow-md">Hi, Altworld</h1>
            </div>
          )}

          <div>
            <FaBars onClick={toggle} className="text-[18px] cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center justify-between h-[10px] my-4 p-[10px]">
          <div className="text-xl">
            <BiSearch />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.input
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={inputAnimation}
                type="text"
                placeholder="Search..."
                className="ml-[2px] px-1 py-1 border-none rounded-md text-[#283238]"
              />
            )}
          </AnimatePresence>
        </div>
        <section>
          {navLinks.map((item, index) => (
            <div
              key={index}
              onClick={() => handleNavItemClick(index)}
              className={`flex cursor-pointer border-r-transparent gap-[10px] items-center py-2 px-3 hover:bg-[rgb(69,71,85)] hover:border-r-4 hover:border-solid hover:border-white hover:transition duration-200 ease-in-out ${
                activeNavItem === index
                  ? "text-[#4FD1C5] font-semibold"
                  : " text-gray-500"
              }`}
            >
              <div>{item.icon}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="whitespace-nowrap"
                  >
                    {item.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </section>
        {isOpen && (
          <div className="mt-[80px] border rounded-[15px] p-2 m-1 bg-[#4FD1C5] flex flex-col gap-2">
            <p className="text-2xl p-1 border rounded-[10px] w-[35px] bg-white text-[#494949] font-bold flex items-center justify-center">
              <FaPlus />
            </p>
            <p className="text-[15px] font-semibold">New Assignment?</p>
            <p className="text-xs">
              Select from pre-defined questions to have a quick turnaround.
            </p>
            <button
              onClick={openModal}
              className="border text-sm px-2 py-1 bg-white text-black font-semibold rounded-lg duration-150 hover:text-[#30756e]"
            >
              Create new Assignment
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default SideNav;
