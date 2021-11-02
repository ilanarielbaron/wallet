import {
  FETCH_WALLET_REQUEST,
  FETCH_WALLET_FAILURE,
  FETCH_WALLET_SUCCESS,
} from "./actionTypes";
import {
  FetchWalletRequest,
  FetchWalletSuccess,
  FetchWalletSuccessPayload,
  FetchWalletFailure,
  FetchWalletFailurePayload,
} from "./types";

export const fetchWalletRequest = (): FetchWalletRequest => ({
  type: FETCH_WALLET_REQUEST,
});

export const fetchWalletSuccess = (
  payload: FetchWalletSuccessPayload
): FetchWalletSuccess => ({
  type: FETCH_WALLET_SUCCESS,
  payload,
});

export const fetchWalletFailure = (
  payload: FetchWalletFailurePayload
): FetchWalletFailure => ({
  type: FETCH_WALLET_FAILURE,
  payload,
});
