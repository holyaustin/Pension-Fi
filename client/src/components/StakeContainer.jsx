import React from 'react'

const StakeContainer = ({openStakingModal}) => {
  return (
    <div className="mt-9 flex justify-center">
          <div className="relative group w-2/3 xl:w-3/5 px-16 py-6 bg-neutral-900 rounded-lg border-4 ">
            <div className="absolute rounded-lg blur opacity-60  transition duration-200"></div>
            <div className="flex flex-wrap lg:flex-nowrap gap-x-4 2xl:gap-x-0 gap-y-4 lg:space-y-0 justify-center lg:justify-between">

              <div className="px-3 py-4 xl:px-4 xl:py-6 bg-yellow-700  rounded-lg shadow-lg">
                <div className="flex flex-col justify-center text-fuchsia-200 text-center">
                  <div className="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-8 xl:w-14 xl:h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                  </div>
                  <div className="xl:text-lg leading-none mt-3">
                    Staking Period: 1 Year (365 Days)
                  </div>
                  <div className="xl:text-lg leading-none mt-3">
                    Interest: 12% APY
                  </div>
                  <div>
                    <button onClick={() => openStakingModal(365, '12%')} className="mt-3 xl:mt-4 bg-fuchsia-200 opacity-75 py-1 px-4 xl:text-lg text-gray-900 font-semibold hover:font-bold hover:outline-2 transition-all duration-200 border-4 rounded-full w-full hover:bg-yellow-400">Stake</button>
                  </div>
                </div>
              </div>
              
              <div className="px-3 py-4 xl:px-4 xl:py-6 bg-blue-800 rounded-lg shadow-lg">
                <div className="flex flex-col justify-center text-fuchsia-200 text-center">
                  <div className="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-8 xl:w-14 xl:h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                  </div>
                  <div className="xl:text-lg leading-none mt-3">
                    Staking Period: 2 Years (730 Days)
                  </div>
                  <div className="xl:text-lg leading-none mt-3">
                    Interest: 25% APY
                  </div>
                  <div>
                    <button onClick={() => openStakingModal(730, '25%')} className="mt-3 xl:mt-4 bg-fuchsia-200 opacity-75 py-1 px-4 xl:text-lg text-gray-900 font-semibold hover:font-bold hover:outline-2 transition-all duration-200 border-4 rounded-full w-full hover:bg-yellow-400">Stake</button>
                  </div>
                </div>
                </div>

                <div className="px-3 py-4 xl:px-4 xl:py-6 bg-purple-700 rounded-lg shadow-lg">
                <div className="flex flex-col justify-center text-fuchsia-200 text-center">
                  <div className="flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-8 xl:w-14 xl:h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                  </div>
                  <div className="xl:text-lg leading-none mt-3">
                    Staking Period: 5 Years (1825 Days)
                  </div>
                  <div className="xl:text-lg leading-none mt-3">
                    Interest: 75% APY
                  </div>
                  <div>
                    <button onClick={() => openStakingModal(1825, '75%')} className="mt-3 xl:mt-4 bg-fuchsia-200 opacity-75 py-1 px-4 xl:text-lg text-gray-900 font-semibold hover:font-bold hover:outline-2 transition-all duration-200 border-4 rounded-full w-full hover:bg-yellow-400">Stake</button>
                  </div>
                </div>
                </div>

            </div>
          </div>
        </div>
  )
}

export default StakeContainer