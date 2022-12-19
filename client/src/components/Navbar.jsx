import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import logo from "../assets/logoblack.png";

const NavBarItem = ({ title, classprops }) => (
  <li key="main1" className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="w-full text-xl flex md:justify-center bg-blue-700 justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden  items-center flex-initial">
        <Link to="/">Home</Link>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <Link to="/create">Create-Profile</Link>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <Link to="/stake">Stake-Fund</Link>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        {/**
        <Link to="/investments">Investments</Link>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <Link to="/about">About</Link>
         */}
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <li key="twitter" className="bg-blue-500 py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          <a href="https://twitter.com/holyaustin" target="_blank" rel="noreferrer">
            Follow us on Twitter
          </a>
        </li>
        <li key="multichain" className="bg-blue-500 py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          <a href="https://test.multichain.org/#/router" target="_blank" rel="noreferrer">
            Token Multichain Router
          </a>
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li key="mob1" className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Home", "Create-Profile", "Stake-Fund"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
