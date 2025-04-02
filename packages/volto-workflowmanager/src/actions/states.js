const ADD_STATE = 'ADD_STATE';

/**
 * Add a new state to a workflow.
 * @param {string} workflowId - The ID of the workflow.
 * @param {Object} state - The new state to add.
 * @returns {Object} The action object.
 */
export function addState(workflowId, state) {
  return {
    type: ADD_STATE,
    workflowId,
    state,
  };
}
