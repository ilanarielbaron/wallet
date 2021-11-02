import {
  FETCH_WALLET_REQUEST,
  FETCH_WALLET_SUCCESS,
  FETCH_WALLET_FAILURE,
} from "./actionTypes";

export interface IWallet {
  address?: string;
  balance?: number;
  isConnected: boolean;
  completed?: boolean;
  symbol?: string;
}

export interface WalletState {
  pending: boolean;
  wallet: IWallet;
  error: string | null;
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

export type WalletActions =
  | FetchWalletRequest
  | FetchWalletSuccess
  | FetchWalletFailure;
