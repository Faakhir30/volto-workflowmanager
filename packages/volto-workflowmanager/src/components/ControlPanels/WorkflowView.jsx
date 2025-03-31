import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Segment,
  Header,
  Button,
  Dropdown,
  Grid,
  Message,
  Loader,
  Checkbox,
} from 'semantic-ui-react';
import {
  getWorkflowGraph,
  validateWorkflow,
  deleteWorkflow,
  getWorkflows,
} from '../../actions';
import { useHistory } from 'react-router-dom';
const WorkflowView = ({ workflowId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { graph, validation, operation } = useSelector(
    (state) => state.workflow,
  );
  const workflow = useSelector((state) =>
    state.workflow.workflows.items.find((w) => w.id === workflowId),
  );

  useEffect(() => {
    if (workflowId) {
      dispatch(getWorkflowGraph(workflowId));
      // dispatch(validateWorkflow(workflowId));
    }
  }, [dispatch, workflowId]);

  if (!workflow) {
    return <Message error>Workflow not found</Message>;
  }

  const handleDeleteWorkflow = async () => {
    const result = await dispatch(deleteWorkflow(workflowId));
    if (result?.status === 'success') {
      await dispatch(getWorkflows());
      history.push(`/controlpanel/workflowmanager-controlpanel`);
    }
  };

  return (
    <Container>
      <Segment.Group>
        <Segment>
          <Header as="h2">
            {workflow.title}
            <Header.Subheader>
              You are currently working on "{workflow.id}" workflow
            </Header.Subheader>
          </Header>
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
          <Grid columns={2}>
            <Grid.Column>
              <Header as="h3">States</Header>
              <Dropdown
                placeholder="Select state"
                fluid
                selection
                options={workflow.states.map((state) => ({
                  key: state.id,
                  text: state.title,
                  value: state.id,
                }))}
              />
              <Button.Group size="tiny" style={{ marginTop: '1em' }}>
                <Button>Edit</Button>
                <Button>Find</Button>
                <Button>Clear</Button>
              </Button.Group>
            </Grid.Column>

            <Grid.Column>
              <Header as="h3">Transitions</Header>
              <Dropdown
                placeholder="Select transition"
                fluid
                selection
                options={workflow.transitions.map((trans) => ({
                  key: trans.id,
                  text: trans.title,
                  value: trans.id,
                }))}
              />
              <Button.Group size="tiny" style={{ marginTop: '1em' }}>
                <Button>Edit</Button>
                <Button>Find</Button>
                <Button>Clear</Button>
              </Button.Group>
            </Grid.Column>
          </Grid>
        </Segment>

        <Segment>
          {graph.loading ? (
            <Loader active>Loading workflow graph...</Loader>
          ) : (
            graph.data && (
              <img
                src={`data:image/gif;base64,${graph.data.data}`}
                alt="Workflow graph"
              />
            )
          )}
        </Segment>
      </Segment.Group>
    </Container>
  );
};

export default WorkflowView;
