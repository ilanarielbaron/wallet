import { createSelector } from "reselect";
import { AppState } from "../rootReducer";

const getPending = (state: AppState) => state.wallet.pending;

const getWallet = (state: AppState) => state.wallet.wallet;

const getError = (state: AppState) => state.wallet.error;

export const getWalletSelector = createSelector(getWallet, (wallet) => wallet);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);
