import React, { useState } from 'react';
import { Button, Modal, Form, Dropdown } from 'semantic-ui-react';

const CreateWorkflowModal = ({ open, onClose, workflows, onCreate }) => {
  const [selectedWorkflow, setSelectedWorkflow] = useState('');
  const [workflowName, setWorkflowName] = useState('');

  const workflowOptions = workflows.map((workflow) => ({
    key: workflow.id,
    text: workflow.title,
    value: workflow.id,
  }));

  return (
    <Modal open={open} onClose={onClose} size="small">
      <Modal.Header>Create New Workflow</Modal.Header>
      <Modal.Content>
        <Form>
          <p>This will add a new transition to the workflow.</p>

          <Form.Field>
            <label>Clone from</label>
            <Dropdown
              placeholder="Select a workflow"
              fluid
              selection
              options={workflowOptions}
              onChange={(e, { value }) => setSelectedWorkflow(value)}
              value={selectedWorkflow}
            />
            <small>
              Select the workflow you'd like to use as the basis for the new
              workflow.
            </small>
          </Form.Field>

          <Form.Input
            label="Workflow Name (Required)"
            placeholder="Enter workflow name"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          primary
          disabled={!workflowName}
          onClick={() => onCreate(selectedWorkflow, workflowName)}
        >
          Create Workflow
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateWorkflowModal;
