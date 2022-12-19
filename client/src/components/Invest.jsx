import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">
        {subtitle}
      </p>
    </div>
  </div>
);

const Invest = () => (
  <div className="flex w-full justify-center items-center gradient-bg-services">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-3xl sm:text-5xl py-2 ">
          Invest with us
          <br /><br />
          Regular contribution for
          <br />
          Pension without Tension
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          We have various investment portfolio. The best choice for contributing towards your retirement. Choose any portfolio and create and account for you to start earning from you funds and retire with benefits.
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
      <ServiceCard
          color="bg-[#F84550]"
          title="Aave"
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Variable Asset Investment."
        />
        <ServiceCard
          color="bg-[#2952E3]"
          title="Yearn Finance"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Investment agrregator. "
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Compound "
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle="Algorithic interest Rate."
        />

        <ServiceCard
          color="bg-[#F84550]"
          title="BadgerDAO"
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Bitcoin Yield Farming."
        />
      </div>
    </div>
  </div>
);

export default Invest;
