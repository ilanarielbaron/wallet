/** Get from Metamask the current account address */
import {eventChannel, END} from "redux-saga";

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

export const transferTimeControl = (secs: number) => {
  return eventChannel(emitter => {
        const counter = setInterval(() => {
          secs -= 1
            console.log(secs)
          if (secs > 0) {
              if((secs % 5 === 0 || secs < 6)) {
                emitter(secs)
              }
          } else {
            // this causes the channel to close
            emitter(END)
          }
        }, 1000);
        return () => {
          clearInterval(counter)
        }
      }
  )
}
