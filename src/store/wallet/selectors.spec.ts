import { initialState } from "./reducer";
import {
  getWallet,
  getError,
  getPending,
  getTransferSuccess,
} from "./selectors";
import { WalletState } from "./types";

const state: Record<string, WalletState> = {
  wallet: {
    ...initialState,
    error: "Error",
    transferSuccess: true,
  },
};

describe("Get the wallet from state", () => {
  it("Must return the wallet", () => {
    expect(getWallet(state as any)).toEqual(state.wallet.wallet);
  });
});

describe("Get the error from state", () => {
  it("Must return the error", () => {
    expect(getError(state as any)).toEqual(state.wallet.error);
  });
});

describe("Get if is pending from state", () => {
  it("Must return a boolean", () => {
    expect(getPending(state as any)).toEqual(state.wallet.pending);
  });
});

describe("Get if the transfer is successfully from state", () => {
  it("Must return a boolean", () => {
    expect(getTransferSuccess(state as any)).toEqual(
      state.wallet.transferSuccess
    );
  });
});
