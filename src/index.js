export * from './createAsyncAction';
export * from './createSaga';
export * from './createStateReducer';
export * from './sequentialRequest';
export * from './registerSagas';

/**
 * Holds the redux store instance
 */
export let store = {};

/**
 * Instantiate the redux store
 * @param {*} param 
 */
export function registerStorage(param) {
    store = param;
}
