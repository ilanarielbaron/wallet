import rootSaga, { getWallet, transfer } from "./sagas";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { select } from "redux-saga-test-plan/matchers";
import { ITransfer, IWallet } from "./types";
import {
  fetchTransferFailure,
  fetchTransferRequest,
  fetchTransferSuccess,
  fetchWalletFailure,
  fetchWalletRequest,
  fetchWalletSuccess,
} from "./actions";

const wallet: IWallet = {
  balance: 20,
  address: "1",
  isConnected: true,
};

const testError = new Error("Test error");
const testTransfer: ITransfer = {
  amount: 10,
  address: "2",
};

describe("Connecting to wallet", () => {
  describe("connecting to wallet successfully", () => {
    it("connecting to wallet successfully", () => {
      return expectSaga(rootSaga)
        .provide([[matchers.call.fn(getWallet), Promise.resolve(wallet)]])
        .put(fetchWalletSuccess({ wallet: wallet }))
        .dispatch(fetchWalletRequest())
        .run({ silenceTimeout: true });
    });
  });
  describe("connecting to wallet failed", () => {
    it("connecting to wallet failed", () => {
      return expectSaga(rootSaga)
        .provide([[matchers.call.fn(getWallet), Promise.reject(testError)]])
        .put(fetchWalletFailure({ error: testError.message }))
        .dispatch(fetchWalletRequest())
        .run({ silenceTimeout: true });
    });
  });
});

describe("Making a transfer", () => {
  describe("No wallet in the state", () => {
    it("No wallet in the state", () => {
      return expectSaga(rootSaga)
        .provide([[select(getWallet), { isConnected: false }]])
        .put(fetchTransferFailure({ error: "noWalletConnected" }))
        .dispatch(fetchTransferRequest({ transfer: testTransfer, wallet }))
        .run({ silenceTimeout: true });
    });
  });
  describe("Transaction failed - no hash in the response", () => {
    it("Transaction failed - no hash in the response", () => {
      return expectSaga(rootSaga)
        .provide([
          [select(getWallet), { isConnected: false }],
          [matchers.call.fn(transfer), Promise.reject(testError)],
        ])
        .put(fetchTransferFailure({ error: testError.message }))
        .dispatch(fetchTransferRequest({ transfer: testTransfer, wallet }))
        .run({ silenceTimeout: true });
    });
  });
  describe("Transaction Success", () => {
    it("Transaction Success", () => {
      return expectSaga(rootSaga)
        .provide([
          [select(getWallet), { isConnected: false }],
          [
            matchers.call.fn(transfer),
            Promise.resolve({ amount: testTransfer.amount }),
          ],
        ])
        .put(fetchTransferSuccess({ amount: testTransfer.amount }))
        .dispatch(fetchTransferRequest({ transfer: testTransfer, wallet }))
        .run({ silenceTimeout: true });
    });
  });
});
