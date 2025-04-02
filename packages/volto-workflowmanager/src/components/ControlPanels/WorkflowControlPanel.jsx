import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Container,
  Segment,
  List,
  Header,
  Loader,
  Message,
  Button,
} from 'semantic-ui-react';
import { getWorkflows, addWorkflow } from '../../actions';
import CreateWorkflowModal from '../Workflow/CreateWorkflowModal';
import WorkflowView from '../Workflow/WorkflowView';

const plone_shipped_workflows = [
  'folder_workflow',
  'intranet_folder_workflow',
  'intranet_workflow',
  'one_state_workflow',
  'plone_workflow',
  'simple_publication_workflow',
  'comment_review_workflow',
  'comment_one_state_workflow',
];

const WorkflowsList = ({ workflows, handleWorkflowClick }) => {
  return (
    <List divided relaxed>
      {workflows.map((workflow) => (
        <List.Item
          key={workflow.id}
          onClick={() => handleWorkflowClick(workflow.id)}
          style={{ cursor: 'pointer' }}
        >
          <List.Icon name="exchange" size="large" verticalAlign="middle" />
          <List.Content>
            <List.Header>{workflow.title || workflow.id}</List.Header>
            <List.Description>
              {workflow.description || 'No description available'}
              {workflow.assigned_types?.length > 0 && (
                <div>
                  <strong>Assigned to: </strong>
                  {workflow.assigned_types.join(', ')}
                </div>
              )}
            </List.Description>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};
const WorkflowControlPanel = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedWorkflow = searchParams.get('workflow');

  const {
    items: workflows,
    loading,
    error,
  } = useSelector((state) => state.workflow.workflows);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getWorkflows());
  }, [dispatch]);

  const handleCreateWorkflow = async (cloneFromWorkflow, workflowName) => {
    const result = await dispatch(addWorkflow(cloneFromWorkflow, workflowName));
    if (result?.workflow_id) {
      await dispatch(getWorkflows());
      history.push(
        `/controlpanel/workflowmanager-controlpanel?workflow=${result.workflow_id}`,
      );
    }
    setModalOpen(false);
  };

  const handleWorkflowClick = (workflowId) => {
    history.push(
      `/controlpanel/workflowmanager-controlpanel?workflow=${workflowId}`,
    );
  };

  if (selectedWorkflow) {
    return <WorkflowView workflowId={selectedWorkflow} />;
  }

  return (
    <Container>
      <Segment.Group>
        <Segment>
          <Header as="h1">Workflow Manager</Header>
        </Segment>

        <Segment>
          <Button primary onClick={() => setModalOpen(true)}>
            Create New Workflow
          </Button>

          {loading && <Loader active>Loading Workflows...</Loader>}
          {error && <Message negative content={error.message} />}

          {!loading && workflows?.length > 0 && (
            <>
              <Header as="h2">Plone shipped workflows</Header>
              <WorkflowsList
                workflows={workflows.filter((workflow) =>
                  plone_shipped_workflows.includes(workflow.id),
                )}
                handleWorkflowClick={handleWorkflowClick}
              />
              <Header as="h2">Custom workflows</Header>
              <WorkflowsList
                workflows={workflows.filter(
                  (workflow) => !plone_shipped_workflows.includes(workflow.id),
                )}
                handleWorkflowClick={handleWorkflowClick}
              />
            </>
          )}
        </Segment>
      </Segment.Group>

      <CreateWorkflowModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        workflows={workflows || []}
        onCreate={handleCreateWorkflow}
      />
    </Container>
  );
};

export default WorkflowControlPanel;
