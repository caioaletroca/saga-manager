export * from './createAsyncAction';
export * from './createSaga';
export * from './createStateReducer';

/**
 * Stores the instance of the storage
 */
export let store = {};

export function registerStorage(param) {
    store = param;
}
