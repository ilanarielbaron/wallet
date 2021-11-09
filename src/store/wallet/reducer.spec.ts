import {
  fetchWalletFailure,
  fetchWalletSuccess,
  fetchTransferFailure,
  fetchWalletRequest,
  fetchTransferRequest,
} from "./actions";
import { initialState } from "./reducer";
import reducer from "./reducer";
import { IWallet } from "./types";

const wallet = {
  isConnected: true,
  address: "1",
  balance: 20,
  symbol: "DUMMY",
} as IWallet;

const errorMsg = "Error message";

describe(`Reducing the fetch wallet action`, () => {
  it("Must return pending state", () => {
    const initialStateTest = {
      ...initialState,
      pending: false,
    };

    expect(reducer(initialStateTest, fetchWalletRequest())).toEqual({
      ...initialState,
      pending: true,
    });
  });
});

const failureActions = [
  {
    request: fetchWalletRequest(),
    failure: fetchWalletFailure({ error: errorMsg }),
  },
  {
    request: fetchTransferRequest({
      transfer: { amount: 1, address: "2" },
      wallet,
    }),
    failure: fetchTransferFailure({ error: errorMsg }),
  },
];

failureActions.forEach((action) => {
  describe(`Reducing failure action`, () => {
    it("Must return the error message", () => {
      const state = reducer(initialState, action.request);

      expect(reducer(state, action.failure)).toEqual({
        ...state,
        error: errorMsg,
        pending: false,
      });
    });
  });
});

describe("Reducing successfully actions", () => {
  const requestAction = fetchWalletRequest();
  const successAction = fetchWalletSuccess({ wallet });

  const state = reducer(initialState, requestAction);

  it("Must return the wallet fetched", () => {
    expect(reducer(state, successAction)).toEqual({
      ...state,
      pending: false,
      wallet: { ...state.wallet, ...wallet },
    });
  });
});
