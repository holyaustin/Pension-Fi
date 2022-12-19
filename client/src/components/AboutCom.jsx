import React from "react";
// import { BsShieldFillCheck } from "react-icons/bs";
// import { BiSearchAlt } from "react-icons/bi";
// import { RiHeart2Fill } from "react-icons/ri";
import logo1 from "../assets/p3.webp";

const AboutCom = () => (
  <div className="flex w-full justify-center items-center gradient-bg-services">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-3xl sm:text-5xl py-2 ">
          PensionFi
          <br />  <br />
          Put your pension where it grows
          <br />
          and make more profit for you.
          <br />
          Retirement for a secured Future.
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          The best choice for contributing towards your retirement. Pensionfi offers users the ability to send their monthly, weekly or annaul earnings to our vault. You have the choice to invest on various investment plans.
        </p>
      </div>

      <div className="md:flex-[0.95] flex-initial justify-center items-center mt-10">
        <img src={logo1} alt="welcome" className="w-350 cursor-pointer mt-10 pt-20" />
      </div>
    </div>
  </div>
);

export default AboutCom;
