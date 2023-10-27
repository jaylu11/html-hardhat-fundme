/*
 * @Author: jaylu11 lushuyuan1@hotmail.com
 * @Date: 2023-10-25 14:38:12
 * @LastEditors: jaylu11 lushuyuan1@hotmail.com
 * @LastEditTime: 2023-10-27 14:59:37
 * @FilePath: /html-fund-me/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ethers } from "./ethers-6.7.0.esm.min.js"
import { abi, contractAddress } from "./constants.js"

const connectButtom = document.getElementById("connectButtom")
const fundButtom = document.getElementById("fundButtom")
const balanceButtom = document.getElementById("balanceButtom")
const withdrawButtom = document.getElementById("withdrawButtom")
connectButtom.onclick = connect
fundButtom.onclick = fund
balanceButtom.onclick = getBalance
withdrawButtom.onclick = withdraw
async function connect() {
    if (typeof window.ethereum !== "undefined") {
        await ethereum.request({ method: "eth_requestAccounts" })
        console.log("I see a metamask")
        connectButtom.innerHTML = "connected"
    } else {
        connectButtom.innerHTML = "please install metamask"
        console.log("No metamask")
    }
}
async function getBalance() {
    if (typeof window.ethereum != "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        console.log(ethers.formatEther(balance))
    }
}

async function fund() {
    const ethAmount = document.getElementById("ethAmount").value
    console.log(`Funding with ${ethAmount}....`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        console.log(signer)
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.fund({
                value: ethers.parseEther(ethAmount),
            })
            await listenForTransactionMine(transactionResponse, provider)
            console.log(`done`)
        } catch (err) {
            console.log(err)
        }
    }
}

function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining${transactionResponse.hash}...`)
    //return new Promise()
    //listen for this transaction finish
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                `Complete with ${transactionReceipt.confirmations} confirmations`
            )
            resolve()
        })
    })
}

async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(contractAddress, abi, signer)
        try {
            const transactionResponse = await contract.withdraw()
            await listenForTransactionMine(transactionResponse, provider)
        } catch (err) {
            console.log(err)
        }
    }
}
