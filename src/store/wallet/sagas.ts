import {
  all,
  call,
  put,
  takeLatest,
  take,
  fork,
  actionChannel,
  ActionChannelEffect,
} from "redux-saga/effects";
import { FetchTransferRequestPayload, ITransfer, IWallet } from "./types";
import { ethers } from "ethers";
import {
  fetchTransferFailure,
  fetchTransferSuccess,
  fetchWalletFailure,
  fetchWalletSuccess,
} from "./actions";
import { FETCH_TRANSFER_REQUEST, FETCH_WALLET_REQUEST } from "./actionTypes";
import { formatUnits } from "ethers/lib/utils";
import { dummyAbi } from "../../utils/dummyAbi";
import {
  getCurrentAddress,
  transferTimeControl,
} from "../../utils/metamaskUtils";
import { toast } from "react-toastify";

export const getWallet = async () => {
  const address = await getCurrentAddress();

  if (!address) {
    throw new Error("connectAccountError");
  }

  const dummyAddress = process.env.REACT_APP_DUMMY_ADDRESS;

  if (!dummyAddress) {
    throw new Error("genericError");
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
  } catch (e: any) {
    throw new Error(e.message ?? "genericError");
  }
};

export const transfer = async (payload: FetchTransferRequestPayload) => {
  const { wallet, transfer } = payload;
  const { amount, address: addressTo } = transfer;
  try {
    if (!wallet.contract) {
      throw new Error("noWalletConnected");
    }

    const result = await wallet.contract.transfer(addressTo, amount);

    if (!result.hash) {
      throw new Error("transferFailed");
    }

    return {
      amount: amount,
    };
  } catch (e: any) {
    throw new Error(e.message ?? "genericError");
  }
};

export function* fetchWalletSaga() {
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

function* countDown(secs: number) {
  // @ts-ignore
  const transferCountdown = yield call(transferTimeControl, secs);

  try {
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      // @ts-ignore
      let seconds = yield take(transferCountdown);
      toast.warning(`Remains ${seconds} seconds`)
    }
  } finally {
    yield put(
        fetchTransferFailure({
          error: 'countdown',
        })
    );
  }
}

export function* fetchTransferSaga(action: {
  payload: FetchTransferRequestPayload;
}) {
  try {
    yield fork(countDown, 11);
    const response: ITransfer = yield call(transfer, action.payload);
    toast.success("Transfer success");
    yield put(
      fetchTransferSuccess({
        amount: response.amount,
      })
    );
  } catch (e: any) {
    yield put(
      fetchTransferFailure({
        error: e.message,
      })
    );
  }
}

const logg = (address: string) => {
  console.log("Logger", address);
};

export function* fetchAddressChangedSaga() {
  try {
    const requestQueue: ActionChannelEffect = yield actionChannel(
      "FETCH_WALLET_REQUEST"
    );
    while (true) {
      const { payload } = yield take(requestQueue as any);
      yield call(logg, payload);
    }
  } catch (e: any) {
    console.log(e);
  }
}

function* rootSaga() {
  yield all([
    takeLatest(FETCH_WALLET_REQUEST, fetchWalletSaga),
    takeLatest(FETCH_TRANSFER_REQUEST as any, fetchTransferSaga),
    call(fetchAddressChangedSaga),
  ]);
}

export default rootSaga;
