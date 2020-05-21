import { call, put } from "redux-saga/effects";
import { store } from './index';

/**
 * Generates a standard cycle of life Saga
 * @param  {[type]} actions           [description]
 * @param  {[type]} request           [description]
 * @param  {[type]} successCallback   [description]
 * @param  {[type]} errorCallback     [description]
 * @param  {[type]} loadingCondition  [description]
 * @return {[type]}                   [description]
 */
export function createSaga(
    actions,
    request,
    onSuccess,
    onError,
    onLoading = () => true,
    shouldStop = () => false
  ) {
    return function*(props) {
      // Check for new style
      if(actions && !request && !onSuccess && !onError) {
        request = actions.request,
        onSuccess = actions.onSuccess
        onError = actions.onError
        onLoading = actions.onLoading ? actions.onLoading : onLoading;
        shouldStop = actions.shouldStop;
        actions = actions.actions;
      }
  
      // TODO: Remove Legacy code
      try {
        if(yield call(shouldStop, props, store.getState()))
          return;
        if (yield call(onLoading, props, store.getState()))
          yield put(actions.loading(true));
        yield put(actions.failed({ failed: false, error: "" }));
        yield put(actions.success(false));
        const response = yield call(request, props);
        // Set data and states
        yield put(actions.data(response.data, props.meta));
        yield put(actions.loading(false));
        yield put(actions.success(true));
        if (onSuccess) {
          yield onSuccess(props, response);
        }
      } catch (error) {
        yield put(actions.loading(false));
        yield put(actions.failed({ failed: true, error: error }));
        yield put(actions.success(false));
        if (onError) {
          yield onError(props, error);
        }
      }
    };
  }