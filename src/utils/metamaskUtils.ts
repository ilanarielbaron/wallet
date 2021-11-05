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

window.ethereum?.on("chainChanged", () => {
  window.location.reload();
});
