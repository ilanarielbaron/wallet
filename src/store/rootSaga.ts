import { all, fork } from "redux-saga/effects";

import walletSaga from "./wallet/sagas";

export function* rootSaga() {
  yield all([fork(walletSaga)]);
}
