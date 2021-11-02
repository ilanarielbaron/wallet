import { all, call, put, takeLatest } from "redux-saga/effects";
import { IWallet } from "./types";
import { ethers } from "ethers";
import { fetchWalletFailure, fetchWalletSuccess } from "./actions";
import { FETCH_WALLET_REQUEST } from "./actionTypes";
import { formatUnits } from "ethers/lib/utils";
import { dummyAbi } from "../../utils/dummyAbi";
import { getCurrentAddress } from "../../utils/metamaskUtils";

const getWallet = async () => {
  const address = await getCurrentAddress();
  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  const contract = new ethers.Contract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    dummyAbi,
    signer
  );
  const symbol = await contract.symbol();
  const balance = formatUnits(await contract.balanceOf(address), 0);

  return {
    isConnected: true,
    address: address,
    balance: balance,
    symbol: symbol,
    contract: contract,
  };
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
  }
}

function* todoSaga() {
  yield all([takeLatest(FETCH_WALLET_REQUEST, fetchWalletSaga)]);
}

export default todoSaga;
