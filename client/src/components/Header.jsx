import React from 'react'

const Header = ({isConnected, connect}) => {
  return (
    <>
    <div className="flex gap-x-8 items-center">
    <div className="text-white font-semibold lg:text-lg">
      Connect to Polygon Mumbai      
    </div>
    <div>
    {
        isConnected() ? (
            <button className="px-4 py-2 bg-purple-800 text-xs sm:text-sm lg:text-base text-gray-100 rounded-full shadow-md shadow-fuchsia-300 hover:bg-[#2546bd]">Connected</button>
        ) : (
            <button onClick={() => connect()} className="px-4 py-2 bg-blue-500 text-xs sm:text-sm lg:text-base text-gray-100 rounded-full shadow-md shadow-fuchsia-300 hover:shadow-fuchsia-600 hover:font-semibold transition-shadow duration-200 hover:bg-[#2546bd]">Connect Wallet</button>
        )
    }
    </div>
    </div>
    </>
  )
}

export default Header