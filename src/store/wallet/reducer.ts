import {
  FETCH_WALLET_REQUEST,
  FETCH_WALLET_SUCCESS,
  FETCH_WALLET_FAILURE,
  FETCH_TRANSFER_REQUEST,
  FETCH_TRANSFER_SUCCESS,
  FETCH_TRANSFER_FAILURE,
} from "./actionTypes";

import { WalletActions, WalletState } from "./types";

export const initialState: WalletState = {
  pending: false,
  wallet: { isConnected: false, balance: 0 },
  error: null,
  transferSuccess: false,
};

const reducer = (state = initialState, action: WalletActions) => {
  switch (action.type) {
    case FETCH_WALLET_REQUEST:
      return {
        ...state,
        pending: true,
        transferSuccess: false,
      };
    case FETCH_WALLET_SUCCESS:
      return {
        ...state,
        pending: false,
        wallet: action.payload.wallet,
        error: null,
        transferSuccess: false,
      };
    case FETCH_WALLET_FAILURE:
      return {
        ...state,
        pending: false,
        wallet: { isConnected: false },
        error: action.payload.error,
        transferSuccess: false,
      };
    case FETCH_TRANSFER_REQUEST:
      return {
        ...state,
        pending: true,
        transferSuccess: false,
      };
    case FETCH_TRANSFER_SUCCESS:
      const newBalance = state.wallet.balance - action.payload.amount;
      return {
        ...state,
        pending: false,
        wallet: { ...state.wallet, balance: newBalance },
        error: null,
        transferSuccess: true,
      };
    case FETCH_TRANSFER_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
        transferSuccess: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
