import React from 'react';
import { Segment, Message, Loader } from 'semantic-ui-react';

const ValidationMessage = ({ validation }) => {
  if (validation.loading) {
    return <Loader active>Validating workflow...</Loader>;
  }

  if (validation.errors) {
    return (
      <Segment>
        <Message
          warning={validation.errors.state_errors.length > 0}
          header="Validation Results"
          list={validation.errors.state_errors.map((err) => err.error)}
        />
      </Segment>
    );
  }

  return null;
};

export default ValidationMessage;
