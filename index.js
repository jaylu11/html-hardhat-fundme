/*
 * @Author: jaylu11 lushuyuan1@hotmail.com
 * @Date: 2023-10-25 14:38:12
 * @LastEditors: jaylu11 lushuyuan1@hotmail.com
 * @LastEditTime: 2023-10-25 15:13:53
 * @FilePath: /html-fund-me/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ethers } from "./ethers-6.7.0.esm.min.js"

const connectButtom = document.getElementById("connectButtom")
const fundButtom = document.getElementById("fundButtom")
connectButtom.onclick = connect
fundButtom.onclick = fund
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

async function fund(ethAmount) {
    console.log(`Funding with ${ethAmount}....`)
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = provider.getSigner()
        console.log(signer)
    }
}