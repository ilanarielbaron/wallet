import { combineReducers } from "redux";

import walletReducer from "./wallet/reducer";

const rootReducer = combineReducers({
  wallet: walletReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
