import { ethers } from "ethers"

//Convert Bytes32 to String
export const bytesToStrings = (bytes32) => {
    return ethers.utils.parseBytes32String(bytes32)
}

//Convert Ether to Wei
export const toWei = (ether) => {
    return ethers.utils.parseEther(ether)
}

//Convert Wei to Ether
export const toEther = (wei) => {
    return ethers.utils.formatEther(wei)
}