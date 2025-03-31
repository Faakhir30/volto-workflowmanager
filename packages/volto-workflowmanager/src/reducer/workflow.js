/**
 * Workflow reducer.
 * @module reducers/workflow
 */

import {
  GET_WORKFLOWS,
  ADD_WORKFLOW,
  DELETE_WORKFLOW,
  UPDATE_WORKFLOW_SECURITY,
  ASSIGN_WORKFLOW,
  GET_WORKFLOW_GRAPH,
  VALIDATE_WORKFLOW,
} from '../actions';

const initialState = {
  workflows: {
    error: null,
    items: [],
    loaded: false,
    loading: false,
  },
  graph: {
    data: null,
    error: null,
    loading: false,
  },
  validation: {
    errors: null,
    loading: false,
  },
  operation: {
    error: null,
    loading: false,
    result: null,
  },
};

/**
 * Workflow reducer.
 * @function workflow
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function workflow(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_WORKFLOWS}_PENDING`:
      return {
        ...state,
        workflows: {
          ...state.workflows,
          error: null,
          loading: true,
          loaded: false,
        },
      };
    case `${GET_WORKFLOWS}_SUCCESS`:
      return {
        ...state,
        workflows: {
          ...state.workflows,
          error: null,
          items: action.result.workflows || [],
          loaded: true,
          loading: false,
        },
      };
    case `${GET_WORKFLOWS}_FAIL`:
      return {
        ...state,
        workflows: {
          ...state.workflows,
          error: action.error,
          items: [],
          loading: false,
          loaded: false,
        },
      };

    // Add Workflow
    case `${ADD_WORKFLOW}_PENDING`:
    case `${DELETE_WORKFLOW}_PENDING`:
    case `${UPDATE_WORKFLOW_SECURITY}_PENDING`:
    case `${ASSIGN_WORKFLOW}_PENDING`:
      return {
        ...state,
        operation: {
          ...state.operation,
          loading: true,
          error: null,
          result: null,
        },
      };

    case `${ADD_WORKFLOW}_SUCCESS`:
    case `${DELETE_WORKFLOW}_SUCCESS`:
    case `${UPDATE_WORKFLOW_SECURITY}_SUCCESS`:
    case `${ASSIGN_WORKFLOW}_SUCCESS`:
      return {
        ...state,
        operation: {
          ...state.operation,
          loading: false,
          error: null,
          result: action.result,
        },
      };

    case `${ADD_WORKFLOW}_FAIL`:
    case `${DELETE_WORKFLOW}_FAIL`:
    case `${UPDATE_WORKFLOW_SECURITY}_FAIL`:
    case `${ASSIGN_WORKFLOW}_FAIL`:
      return {
        ...state,
        operation: {
          ...state.operation,
          loading: false,
          error: action.error,
          result: null,
        },
      };

    // Graph
    case `${GET_WORKFLOW_GRAPH}_PENDING`:
      return {
        ...state,
        graph: {
          ...state.graph,
          loading: true,
          error: null,
          data: null,
        },
      };

    case `${GET_WORKFLOW_GRAPH}_SUCCESS`:
      return {
        ...state,
        graph: {
          ...state.graph,
          loading: false,
          error: null,
          data: action.result.graph,
        },
      };

    case `${GET_WORKFLOW_GRAPH}_FAIL`:
      return {
        ...state,
        graph: {
          ...state.graph,
          loading: false,
          error: action.error,
          data: null,
        },
      };

    // Validation
    case `${VALIDATE_WORKFLOW}_PENDING`:
      return {
        ...state,
        validation: {
          ...state.validation,
          loading: true,
          errors: null,
        },
      };

    case `${VALIDATE_WORKFLOW}_SUCCESS`:
      return {
        ...state,
        validation: {
          ...state.validation,
          loading: false,
          errors: action.result.errors,
        },
      };

    case `${VALIDATE_WORKFLOW}_FAIL`:
      return {
        ...state,
        validation: {
          ...state.validation,
          loading: false,
          errors: action.error,
        },
      };

    default:
      return state;
  }
}
