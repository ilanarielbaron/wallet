import { all, call, put, takeLatest } from "redux-saga/effects";
import { IWallet } from "./types";
import { ethers } from "ethers";
import { fetchWalletFailure, fetchWalletSuccess } from "./actions";
import { FETCH_WALLET_REQUEST } from "./actionTypes";
import { formatUnits } from "ethers/lib/utils";
import { dummyAbi } from "../../utils/dummyAbi";
import { getCurrentAddress } from "../../utils/metamaskUtils";
import { toast } from "react-toastify";

const getWallet = async () => {
  const address = await getCurrentAddress();

  if (!address) {
    throw new Error("Please connect your metamask account");
  }

  const dummyAddress = process.env.REACT_APP_DUMMY_ADDRESS;

  if (!dummyAddress) {
    throw new Error("There is an unexpected error");
  }

  try {
    const signer = new ethers.providers.Web3Provider(
      window.ethereum
    ).getSigner();
    const contract = new ethers.Contract(dummyAddress, dummyAbi, signer);
    const symbol = await contract.symbol();
    const balance = formatUnits(await contract.balanceOf(address), 0);

    return {
      isConnected: true,
      address: address,
      balance: balance,
      symbol: symbol,
      contract: contract,
    };
  } catch (e) {
    console.log(e);
    throw new Error("There is an unexpected error");
  }
};

function* fetchWalletSaga() {
  try {
    const response: IWallet = yield call(getWallet);
    yield put(
      fetchWalletSuccess({
        wallet: response,
      })
    );
  } catch (e: any) {
    yield put(
      fetchWalletFailure({
        error: e.message,
      })
    );
    toast.error(e.message);
  }
}

function* todoSaga() {
  yield all([takeLatest(FETCH_WALLET_REQUEST, fetchWalletSaga)]);
}

export default todoSaga;
