import { createSharedState } from './createSharedState';

/**
 * @deprecated
 * Prefer using createSharedState, as this function does not create a trully global state, but a shared one.
 */
export const createGlobalState = createSharedState;
export default createGlobalState;
