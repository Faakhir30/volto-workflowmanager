/**
 * Workflow actions.
 * @module actions/workflow
 */

export const GET_WORKFLOWS = 'GET_WORKFLOWS';
export const ADD_WORKFLOW = 'ADD_WORKFLOW';
export const DELETE_WORKFLOW = 'DELETE_WORKFLOW';
export const UPDATE_WORKFLOW_SECURITY = 'UPDATE_WORKFLOW_SECURITY';
export const ASSIGN_WORKFLOW = 'ASSIGN_WORKFLOW';
export const VALIDATE_WORKFLOW = 'VALIDATE_WORKFLOW';

/**
 * Get workflows.
 * @function getWorkflows
 * @returns {Object} Get workflows action.
 */
export function getWorkflows() {
  return {
    type: GET_WORKFLOWS,
    request: {
      op: 'get',
      path: '/@workflows',
    },
  };
}

/**
 * Add workflow.
 * @function addWorkflow
 * @param {string} cloneFromWorkflow - ID of workflow to clone from
 * @param {string} workflowName - Name of new workflow
 * @returns {Object} Add workflow action.
 */
export function addWorkflow(cloneFromWorkflow, workflowName) {
  return {
    type: ADD_WORKFLOW,
    request: {
      op: 'post',
      path: '/@workflow-add',
      data: {
        'clone-from-workflow': cloneFromWorkflow,
        'workflow-name': workflowName,
        'form.actions.add': true,
      },
    },
  };
}

/**
 * Delete workflow.
 * @function deleteWorkflow
 * @param {string} workflowId - ID of workflow to delete
 * @returns {Object} Delete workflow action.
 */
export function deleteWorkflow(workflowId) {
  return {
    type: DELETE_WORKFLOW,
    request: {
      op: 'del',
      path: '/@workflow-delete',
      data: {
        'selected-workflow': workflowId,
      },
    },
  };
}

/**
 * Update workflow security.
 * @function updateWorkflowSecurity
 * @param {string} workflowId - ID of workflow to update
 * @returns {Object} Update workflow security action.
 */
export function updateWorkflowSecurity(workflowId) {
  return {
    type: UPDATE_WORKFLOW_SECURITY,
    request: {
      op: 'post',
      path: '/@workflow-security-update',
      data: {
        'selected-workflow': workflowId,
        'form.actions.confirm': true,
      },
    },
  };
}

/**
 * Assign workflow to content type.
 * @function assignWorkflow
 * @param {string} workflowId - ID of workflow
 * @param {string} contentType - Content type to assign workflow to
 * @returns {Object} Assign workflow action.
 */
export function assignWorkflow(workflowId, contentType) {
  return {
    type: ASSIGN_WORKFLOW,
    request: {
      op: 'post',
      path: '/@workflow-assign',
      data: {
        'selected-workflow': workflowId,
        type_id: contentType,
      },
    },
  };
}

/**
 * Validate workflow.
 * @function validateWorkflow
 * @param {string} workflowId - ID of workflow to validate
 * @returns {Object} Validate workflow action.
 */
export function validateWorkflow(workflowId) {
  return {
    type: VALIDATE_WORKFLOW,
    request: {
      op: 'get',
      path: '/@workflow-validate',
      params: {
        'selected-workflow': workflowId,
      },
    },
  };
}
