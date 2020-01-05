import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Actions Creators */

const { Types, Creators } = createActions({
  signInRequest: ['email', 'password'],
  signInSuccess: ['token'],
  signOut: null,
  signUpRequest: ['name', 'email', 'password'],
});

export const AuthTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  signedIn: !!localStorage.getItem('@Mobile:token'),
  token: localStorage.getItem('@Mobile:token') || null,
});

/* Reducers */

export const success = (state, { token }) =>
  state.merge({ signedIn: true, token });

export const logout = state => state.merge({ signedIn: false, token: null });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_SUCCESS]: success,
  [Types.SIGN_OUT]: logout,
});
