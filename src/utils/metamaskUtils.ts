export const getCurrentAddress = async () => {
  try {
    const [address] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    return address;
  } catch (e) {
    console.log(e);
    throw new Error("Please connect your metamask account");
  }
};

window.ethereum.on("message", (e: any) => {
  console.log("message", e);
});

window.ethereum.on("connect", (e: any) => {
  console.log("connect", e);
});

window.ethereum.on("chainChanged", (e: any) => {
  console.log("chainChanged", e);
});
