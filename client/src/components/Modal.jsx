import React from 'react'

const Modal = ({setShowStakeModal, stakingLength, stakingPercent, amount, setAmount, stakeEther}) => {

    const handleOnClose = (e) => {
        if(e.target.id === 'outerSpace') {
            setShowStakeModal(false)
        }
    }

    const handleStakeEther = () => {
        stakeEther()
        setShowStakeModal(false)
    }

  return (
    <div>
        <div id="outerSpace" onClick={handleOnClose} className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-md flex items-center justify-center">
        <div className="relative px-4 py-4 w-full max-w-md h-full md:h-auto">
                    <div className="relative bg-blue-800 opacity-95 rounded-lg shadow border-4 border-purple-700">
                        <button onClick={() => setShowStakeModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
                            <div className="text-2xl font-semibold text-fuchsia-200">Stake MATIC</div>
                            <div className="mt-6">
                            <p className="text-xl text-blue-300">Enter the amount to Stake in MATIC:</p>
                            <div className="mt-6 flex space-x-4 justify-center">
                                <label className="text-lg text-fuchsia-200" htmlFor="staker">MATIC</label>
                                <input className="px-1" id="staker" name="staker" value={amount} onChange={e => setAmount(e.target.value)} />
                            </div>
                            </div>
                            <div className="mt-2 text-lg text-fuchsia-200">
                            <span>Duration: <span className="text-gray-100 font-semibold">{stakingLength} days</span>    |   </span>
                            <span>Interest: <span className="text-gray-100 font-semibold">{stakingPercent} APY</span></span>
                            </div>
                            <button onClick={handleStakeEther} data-modal-toggle="popup-modal" type="button" className="mt-6 bg-purple-200 opacity-75 py-1 px-4 text-lg text-gray-900 font-semibold hover:font-bold hover:outline-2 transition-all duration-200 border-4 rounded-full w-full hover:bg-yellow-400">
                                Stake
                            </button>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default Modal