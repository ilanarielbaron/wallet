import {
  FETCH_WALLET_REQUEST,
  FETCH_WALLET_FAILURE,
  FETCH_WALLET_SUCCESS,
  FETCH_TRANSFER_SUCCESS,
  FETCH_TRANSFER_REQUEST,
  FETCH_TRANSFER_FAILURE,
} from "./actionTypes";
import {
  FetchWalletRequest,
  FetchWalletSuccess,
  FetchWalletSuccessPayload,
  FetchWalletFailure,
  FetchWalletFailurePayload,
  FetchTransferRequest,
  FetchTransferSuccessPayload,
  FetchTransferFailure,
  FetchTransferFailurePayload,
  FetchTransferSuccess,
  FetchTransferRequestPayload,
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

export const fetchTransferRequest = (
  payload: FetchTransferRequestPayload
): FetchTransferRequest => ({
  type: FETCH_TRANSFER_REQUEST,
  payload,
});

export const fetchTransferSuccess = (
  payload: FetchTransferSuccessPayload
): FetchTransferSuccess => ({
  type: FETCH_TRANSFER_SUCCESS,
  payload,
});

export const fetchTransferFailure = (
  payload: FetchTransferFailurePayload
): FetchTransferFailure => ({
  type: FETCH_TRANSFER_FAILURE,
  payload,
});
