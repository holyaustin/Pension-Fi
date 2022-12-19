import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

function MoralisLogin() {
  const navigate = useNavigate();
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user!.get("ethAddress"));
          navigate("/stake");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  return (
    <div className="w-2/3">
            {!isAuthenticated 
            ? <button
            type="button"
            onClick={login}
            className="w-full flex flex-row justify-center items-center my-5 mb-12 bg-red-700 p-5 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white"
          >

            <p className="text-white text-2xl font-semibold py-1 px-6 mx-14 hover:text-red-700">
              Launch DApp
            </p>
          </button>   
            :   

          <button 
      onClick={logOut}
      className="w-full flex flex-row justify-center items-center my-5 mb-12 bg-red-700 p-5 rounded-full cursor-pointer hover:bg-blue-700 hover:text-white" 
      disabled={isAuthenticating}>
      <p className="text-white text-2xl font-semibold py-1 px-6 mx-14 hover:text-red-700">
      Logout
            </p>
        </button>   
 }
 

        <div className="p-3 flex justify-end items-start flex-col rounded-xl h-80 sm:w-120  my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-20 h-20 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={61} color="#000" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <div className="text-white font-light text-xl">
                  <div className="App">
                    <div>Wallet Address: <br /> {account}</div>
                  </div>
                  
                </div>
                <br />
                <p className="text-white font-semibold text-2xl mt-1">
                  Wallet Address of PensionFi User
                </p>

              </div>
            </div>
          
          </div>

    </div>
  );
}

export default MoralisLogin;
