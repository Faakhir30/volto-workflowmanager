import React, { useEffect, useCallback } from 'react';
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
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

const WorkflowView = ({ workflowId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { graph, validation, operation } = useSelector(
    (state) => state.workflow,
  );
  const workflow = useSelector((state) =>
    state.workflow.workflows.items.find((w) => w.id === workflowId),
  );

  // Initialize nodes and edges states
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Transform workflow data for ReactFlow
  useEffect(() => {
    if (!workflow) return;

    // Create nodes from states
    const flowNodes = workflow.states.map((state, index) => ({
      id: state.id,
      type: 'default',
      data: { label: state.title },
      position: {
        x:
          100 +
          Math.cos(index * ((2 * Math.PI) / workflow.states.length)) * 200,
        y:
          200 +
          Math.sin(index * ((2 * Math.PI) / workflow.states.length)) * 200,
      },
      style: {
        background: '#ffcc99',
        border: '1px solid #999',
        borderRadius: '3px',
        padding: '10px',
        width: 150,
      },
    }));

    // Create edges from transitions
    const flowEdges = workflow.transitions.map((transition) => ({
      id: transition.id,
      source: transition.id,
      target: transition.new_state_id || transition.id,
      label: transition.title,
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#999' },
    }));

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [workflow, setNodes, setEdges]);

  useEffect(() => {
    if (workflowId) {
      dispatch(getWorkflowGraph(workflowId));
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

            <Grid.Column width={9} style={{ height: '500px' }}>
              {graph.loading ? (
                <Loader active>Loading workflow graph...</Loader>
              ) : (
                <div style={{ width: '100%', height: '100%' }}>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                  >
                    <Background />
                    <Controls />
                    <MiniMap />
                  </ReactFlow>
                </div>
              )}
            </Grid.Column>
          </Grid>
        </Segment>

        <Segment></Segment>
      </Segment.Group>
    </Container>
  );
};

export default WorkflowView;
