import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Segment,
  Grid,
  Header,
  Button,
  Checkbox,
  Loader,
  Message,
  Container,
} from 'semantic-ui-react';
import StateTransitionPanel from '../Workflow/StateTransitionPanel/StateTransitionPanel';
import WorkflowGraph from '../Workflow/Graph/WorkflowGraph';
import 'reactflow/dist/style.css';
import { deleteWorkflow, getWorkflows, validateWorkflow } from '../../actions';
import { useHistory } from 'react-router-dom';

const WorkflowView = ({ workflowId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [highlightedState, setHighlightedState] = useState(null);
  const [highlightedTransition, setHighlightedTransition] = useState(null);

  const workflow = useSelector((state) =>
    state.workflow.workflows.items.find((w) => w.id === workflowId),
  );
  const validation = useSelector((state) => state.workflow.validation);
  const handleHighlightState = (stateId) => {
    setHighlightedState(stateId);
    // Clear highlight after animation
    setTimeout(() => setHighlightedState(null), 4000);
  };

  const handleHighlightTransition = (transitionId) => {
    setHighlightedTransition(transitionId);
    // Clear highlight after animation
    setTimeout(() => setHighlightedTransition(null), 4000);
  };

  const handleDeleteWorkflow = async () => {
    const result = await dispatch(deleteWorkflow(workflowId));
    if (result?.status === 'success') {
      await dispatch(getWorkflows());
      history.push(`/controlpanel/workflowmanager-controlpanel`);
    }
  };
  if (!workflow) {
    return <Loader active>Loading workflow...</Loader>;
  }
  return (
    <Container>
      <Segment>
        <Header as="h2">
          {workflow.title}
          <Header.Subheader>
            You are currently working on "{workflow.id}" workflow
          </Header.Subheader>
        </Header>
        <textarea
          defaultValue={workflow.description || ''}
          placeholder="Enter workflow description..."
          style={{
            width: '100%',
            minHeight: '60px',
            marginTop: '1em',
            padding: '0.5em',
            border: 'none',
            borderRadius: '4px',
          }}
        />
      </Segment>

      <Segment>
        <Grid columns={3}>
          <Grid.Column width={10}>
            <Button.Group>
              <Button primary>Add state</Button>
              <Button>Add transition</Button>
              <Button onClick={() => dispatch(validateWorkflow(workflowId))}>
                Sanity check
              </Button>
              <Button>Assign</Button>
              <Button>Update security</Button>
              <Button negative onClick={handleDeleteWorkflow}>
                Delete
              </Button>
            </Button.Group>
          </Grid.Column>
          <Grid.Column width={1} textAlign="right">
            <Checkbox label="Advanced mode" toggle />
          </Grid.Column>
        </Grid>
      </Segment>

      {validation.loading && <Loader active>Validating workflow...</Loader>}
      {validation.errors && (
        <Segment>
          <Message
            warning={validation.errors.state_errors.length > 0}
            header="Validation Results"
            list={validation.errors.state_errors.map((err) => err.error)}
          />
        </Segment>
      )}

      <Segment>
        <Grid columns={3}>
          <Grid.Column width={3}>
            <StateTransitionPanel
              workflow={workflow}
              onHighlightState={handleHighlightState}
              onHighlightTransition={handleHighlightTransition}
            />
          </Grid.Column>
          {workflow ? (
            <Grid.Column width={9} style={{ height: '500px' }}>
              <WorkflowGraph
                workflow={workflow}
                highlightedState={highlightedState}
                highlightedTransition={highlightedTransition}
              />
            </Grid.Column>
          ) : (
            <Grid.Column width={9} style={{ height: '500px' }}>
              <Loader active>Loading workflow graph...</Loader>
            </Grid.Column>
          )}
        </Grid>
      </Segment>
    </Container>
  );
};

export default WorkflowView;
