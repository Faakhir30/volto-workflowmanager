import React from 'react';
import { Button, Grid, Checkbox } from 'semantic-ui-react';

const WorkflowControls = ({ onValidate, onDelete }) => {
  return (
    <Grid columns={3}>
      <Grid.Column width={10}>
        <Button.Group>
          <Button primary>Add state</Button>
          <Button>Add transition</Button>
          <Button onClick={onValidate}>Sanity check</Button>
          <Button>Assign</Button>
          <Button>Update security</Button>
          <Button negative onClick={onDelete}>
            Delete
          </Button>
        </Button.Group>
      </Grid.Column>
      <Grid.Column width={1} textAlign="right">
        <Checkbox label="Advanced mode" toggle />
      </Grid.Column>
    </Grid>
  );
};

export default WorkflowControls;
