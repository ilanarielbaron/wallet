import { createSelector } from "reselect";
import { AppState } from "../rootReducer";

// @ts-ignore
export const getPending = (state: AppState) => state.wallet.pending;

// @ts-ignore
export const getWallet = (state: AppState) => state.wallet.wallet;

// @ts-ignore
export const getError = (state: AppState) => state.wallet.error;

// @ts-ignore
export const getTransferSuccess = (state: AppState) =>
  state.wallet.transferSuccess;

export const getWalletSelector = createSelector(getWallet, (wallet) => wallet);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);

export const getTransferSuccessSelector = createSelector(
  getTransferSuccess,
  (error) => error
);
