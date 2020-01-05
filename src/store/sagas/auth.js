import { call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';

import AuthActions from '../ducks/auth';

export function* signIn({ email, password }) {
  try {
    const response = yield call(api.post, 'sessions', { email, password });

    localStorage.setItem('@Mobile:token', response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));

    yield put(push('/'));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha',
        message: 'Verifique seu e-mail/senha!',
      })
    );
  }
}

export function* signUp({ name, email, password }) {
  try {
    const response = yield call(api.post, 'users', { name, email, password });

    console.log(response);
    localStorage.setItem('@Mobile:token', response.data.token);

    yield put(AuthActions.signInSuccess(response.data.token));

    yield put(push('/'));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha no cadastro',
        message: 'Você foi convidado para algum time?',
      })
    );
  }
}

export function* signOut() {
  localStorage.removeItem('@Mobile:token');
  localStorage.removeItem('@Mobile:team');

  yield put(push('/signin'));
}
