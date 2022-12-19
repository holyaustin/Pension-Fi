import React from 'react'

const StakeTable = ({assets, withdraw}) => {
  return (
    <div className="mt-12 mb-12">
          <div className="flex justify-center font-extrabold text-transparent text-2xl md:text-3xl bg-clip-text bg-gradient-to-b from-gray-300 via-gray-300 to-purple-300 tracking-wide">
            Staked Assets
          </div>

          <div className="mt-8 mb-5 flex justify-center">

          
          <div className="overflow-x-auto relative rounded-lg border-2 border-purple-700">
              <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-lg text-center text-fuchsia-200 bg-neutral-900">
                      <tr>
                          <th scope="col" className="py-3 px-6">
                              Asset
                          </th>
                          <th scope="col" className="py-3 px-6">
                              Percent Interest
                          </th>
                          <th scope="col" className="py-3 px-6">
                              Staked
                          </th>
                          <th scope="col" className="py-3 px-6">
                              Interest
                          </th>
                          <th scope="col" className="py-3 px-6">
                              Days Remaining
                          </th>
                          <th scope="col" className="py-3 px-6">
                          </th>
                      </tr>
                  </thead>
                  <tbody className="text-lg text-gray-200 text-center">
                    {
                      assets.length > 0 && assets.map((asset) => {
                        return (
                          <tr className="bg-neutral-700 border-b border-neutral-400">
                            <td className="py-4 px-6">
                                FTM
                            </td>
                            <td className="py-4 px-6">
                                {asset.percentInterest}%
                            </td>
                            <td className="py-4 px-6">
                                {asset.etherStaked} FTM
                            </td>
                            <td className="py-4 px-6">
                                {asset.etherInterest} FTM
                            </td>
                            <td className="py-4 px-6">
                                {asset.daysRemaining} days
                            </td>
                            <td className="py-4 px-6">
                              {asset.open ? (
                                <button onClick={() => withdraw(asset.positionId)} className="mt-4 bg-fuchsia-200 opacity-75 py-1 px-4 text-lg text-white font-semibold hover:font-bold hover:outline-2 transition-all duration-200">Withdraw</button>
                              ) : (
                                <span>Closed</span>
                              )}
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
              </table>
          </div>

          </div>
        </div>
  )
}

export default StakeTable