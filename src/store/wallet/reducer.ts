import {
  FETCH_WALLET_REQUEST,
  FETCH_WALLET_SUCCESS,
  FETCH_WALLET_FAILURE,
} from "./actionTypes";

import { WalletActions, WalletState } from "./types";

const initialState: WalletState = {
  pending: false,
  wallet: { isConnected: false },
  error: null,
};

const reducer = (state = initialState, action: WalletActions) => {
  switch (action.type) {
    case FETCH_WALLET_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case FETCH_WALLET_SUCCESS:
      return {
        ...state,
        pending: false,
        wallet: action.payload.wallet,
        error: null,
      };
    case FETCH_WALLET_FAILURE:
      return {
        ...state,
        pending: false,
        wallet: { isConnected: false },
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;