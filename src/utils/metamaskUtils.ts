/** Get from Metamask the current account address */
export const getCurrentAddress = async () => {
  try {
    const [address] = await window.ethereum?.request({
      method: "eth_requestAccounts",
    });
    return address;
  } catch (e) {
    console.log(e);
    throw new Error("Please connect to your metamask account");
  }
};

/** Service to listen if the chain is changed on Metamask */
window.ethereum?.on("chainChanged", () => {
  window.location.reload();
});
