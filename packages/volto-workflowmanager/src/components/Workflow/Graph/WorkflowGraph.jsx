import React, { useMemo, useState, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  Panel,
  useReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import WorkflowEdge from './WorkflowEdge';
import 'reactflow/dist/style.css';

// Define edge types
const edgeTypes = {
  workflow: WorkflowEdge,
};

const HIGHLIGHT_DURATION = 300; // Duration of each pulse in ms
const HIGHLIGHT_PULSES = 3; // Number of pulses
const HIGHLIGHT_COLOR = '#ff6b6b'; // Highlight color

// Inner component that uses ReactFlow hooks
const WorkflowGraphInner = ({
  workflow,
  highlightedState,
  highlightedTransition,
}) => {
  const [highlightPulse, setHighlightPulse] = useState(0);
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Create nodes from states
  useEffect(() => {
    setNodes(
      workflow.states.map((state, index) => ({
        id: state.id,
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
        draggable: true,
      })),
    );
  }, [workflow, setNodes]);

  // Handle highlight animation
  useEffect(() => {
    if (highlightedState || highlightedTransition) {
      let pulseCount = 0;
      const interval = setInterval(() => {
        pulseCount++;
        setHighlightPulse((count) => (count + 1) % 2);

        if (pulseCount >= HIGHLIGHT_PULSES * 2) {
          clearInterval(interval);
          setHighlightPulse(0);
        }
      }, HIGHLIGHT_DURATION);

      return () => clearInterval(interval);
    }
  }, [highlightedState, highlightedTransition]);

  // Process edges and add highlighting
  const processedEdges = useMemo(() => {
    const edgeMap = new Map();

    // Create edges based on state transitions
    workflow.states.forEach((state) => {
      state.transitions.forEach((transitionId) => {
        const transition = workflow.transitions.find(
          (t) => t.id === transitionId,
        );
        if (transition) {
          const edge = {
            id: transition.id,
            source: state.id,
            target: transition.new_state,
            label: transition.title,
            animated: false,
            type: 'workflow',
            style: { stroke: '#999' },
            data: {
              transitionId: transition.id,
              description: transition.description,
            },
          };

          const forwardKey = `${edge.source}-${edge.target}`;
          const reverseKey = `${edge.target}-${edge.source}`;

          if (edgeMap.has(reverseKey)) {
            // This is a bidirectional edge
            const existingEdge = edgeMap.get(reverseKey);
            existingEdge.data = { ...existingEdge.data, isBidirectional: true };
            edge.data = {
              ...edge.data,
              isBidirectional: true,
              isReverse: true,
            };
          }

          edgeMap.set(forwardKey, edge);
        }
      });
    });

    return Array.from(edgeMap.values()).map((edge) => ({
      ...edge,
      data: {
        ...edge.data,
        isHighlighted:
          highlightedTransition === edge.data.transitionId &&
          highlightPulse === 1,
      },
    }));
  }, [workflow, highlightedTransition, highlightPulse]);

  // Process nodes and add highlighting
  const processedNodes = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      style: {
        ...node.style,
        background:
          highlightedState === node.id && highlightPulse === 1
            ? HIGHLIGHT_COLOR
            : node.style.background,
      },
    }));
  }, [nodes, highlightedState, highlightPulse]);

  useEffect(() => {
    if (nodes.length > 0) {
      setTimeout(() => {
        fitView({ padding: 0.2 });
      }, 100);
    }
  }, [nodes, fitView]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={processedNodes}
        edges={processedEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
        <Panel position="top-right">
          <div
            style={{ background: 'white', padding: '8px', borderRadius: '4px' }}
          >
            {highlightedState && 'Highlighting state...'}
            {highlightedTransition && 'Highlighting transition...'}
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

// Wrapper component that provides ReactFlow context
const WorkflowGraph = (props) => {
  return (
    <ReactFlowProvider>
      <WorkflowGraphInner {...props} />
    </ReactFlowProvider>
  );
};

export default WorkflowGraph;
