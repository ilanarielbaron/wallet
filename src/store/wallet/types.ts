import { Contract } from "ethers";
import {
  FETCH_WALLET_REQUEST,
  FETCH_WALLET_SUCCESS,
  FETCH_WALLET_FAILURE,
  FETCH_TRANSFER_FAILURE,
  FETCH_TRANSFER_SUCCESS,
  FETCH_TRANSFER_REQUEST,
} from "./actionTypes";

export interface IWallet {
  address?: string;
  balance: number;
  isConnected: boolean;
  completed?: boolean;
  symbol?: string;
  contract?: Contract;
}

export interface ITransfer {
  amount: number;
  address: string;
}

export interface WalletState {
  pending: boolean;
  wallet: IWallet;
  error: string | null;
  transferSuccess: boolean;
}

export interface FetchWalletSuccessPayload {
  wallet: IWallet;
}

export interface FetchWalletFailurePayload {
  error: string;
}

export interface FetchWalletRequest {
  type: typeof FETCH_WALLET_REQUEST;
}

export type FetchWalletSuccess = {
  type: typeof FETCH_WALLET_SUCCESS;
  payload: FetchWalletSuccessPayload;
};

export type FetchWalletFailure = {
  type: typeof FETCH_WALLET_FAILURE;
  payload: FetchWalletFailurePayload;
};

export interface FetchTransferRequestPayload {
  wallet: IWallet;
  transfer: ITransfer;
}

export interface FetchTransferSuccessPayload {
  amount: number;
}

export interface FetchTransferFailurePayload {
  error: string;
}

export interface FetchTransferRequest {
  type: typeof FETCH_TRANSFER_REQUEST;
  payload: FetchTransferRequestPayload;
}

export type FetchTransferSuccess = {
  type: typeof FETCH_TRANSFER_SUCCESS;
  payload: FetchTransferSuccessPayload;
};

export type FetchTransferFailure = {
  type: typeof FETCH_TRANSFER_FAILURE;
  payload: FetchTransferFailurePayload;
};

export type WalletActions =
  | FetchWalletRequest
  | FetchWalletSuccess
  | FetchWalletFailure
  | FetchTransferRequest
  | FetchTransferSuccess
  | FetchTransferFailure;
