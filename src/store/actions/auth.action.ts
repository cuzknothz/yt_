import firebase from "firebase/app";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db, GoogleProvider } from "@/helpers/firebase";

import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "@/store/reducers/auth.reducer";

import { Dispatch } from "redux";
export const login = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST.toString(),
    });
    const res = await signInWithPopup(auth, GoogleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(res);
    const accessToken = credential?.accessToken;
    const profile = {
      name: res.user.displayName,
      photoURL: res.user.photoURL,
    };
    dispatch({
      type: LOGIN_SUCCESS.toString(),
      payload: accessToken,
    });
    dispatch({
      type: LOAD_PROFILE.toString(),
      payload: profile,
    });
  } catch (error: any) {
    console.log(error.message);
    dispatch({
      type: LOGIN_FAIL.toString(),
      payload: error.message,
    });
  }
};
export const log_out = () => async (dispatch: Dispatch) => {
  await auth.signOut();
  dispatch({
    type: LOG_OUT.toString(),
  });
};
