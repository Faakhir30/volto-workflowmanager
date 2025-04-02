import React, { useState } from 'react';
import { Header, Dropdown, Button } from 'semantic-ui-react';

const StateTransitionPanel = ({
  workflow,
  onHighlightState,
  onHighlightTransition,
}) => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedTransition, setSelectedTransition] = useState(null);

  const handleFindState = () => {
    if (selectedState) {
      onHighlightState(selectedState);
    }
  };

  const handleFindTransition = () => {
    if (selectedTransition) {
      onHighlightTransition(selectedTransition);
    }
  };
  if (!workflow) {
    return null;
  }
  return (
    <>
      <Header as="h3">States</Header>
      <Dropdown
        placeholder="Select state"
        fluid
        selection
        value={selectedState}
        onChange={(_, data) =>
          setSelectedState(workflow.states.find((s) => s.id === data.value)?.id)
        }
        options={workflow.states.map((state) => ({
          key: state.id,
          text: state.title,
          value: state.id,
        }))}
      />
      <Button.Group size="tiny" style={{ marginTop: '1em' }}>
        <Button>Edit</Button>
        <Button onClick={handleFindState} disabled={!selectedState} primary>
          Find
        </Button>
        <Button onClick={() => setSelectedState(null)}>Clear</Button>
      </Button.Group>

      <Header as="h3">Transitions</Header>
      <Dropdown
        placeholder="Select transition"
        fluid
        selection
        value={selectedTransition}
        onChange={(_, data) =>
          setSelectedTransition(
            workflow.transitions.find((t) => t.id === data.value)?.id,
          )
        }
        options={workflow.transitions.map((trans) => ({
          key: trans.id,
          text: trans.title,
          value: trans.id,
        }))}
      />
      <Button.Group size="tiny" style={{ marginTop: '1em' }}>
        <Button>Edit</Button>
        <Button
          onClick={handleFindTransition}
          disabled={!selectedTransition}
          primary
        >
          Find
        </Button>
        <Button onClick={() => setSelectedTransition(null)}>Clear</Button>
      </Button.Group>
    </>
  );
};

export default StateTransitionPanel;
