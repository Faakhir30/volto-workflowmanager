import React from 'react';
import { getBezierPath, EdgeText } from 'reactflow';

const HIGHLIGHT_COLOR = '#ff6b6b';

const WorkflowEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    curvature: data?.isBidirectional ? 0.5 : 0.2,
  });

  // Adjust label position to avoid overlap in bidirectional cases
  const adjustedLabelX =
    labelX + (data?.isBidirectional ? (data.isReverse ? -20 : 20) : 0);
  const adjustedLabelY =
    labelY + (data?.isBidirectional ? (data.isReverse ? -10 : 10) : 0);

  return (
    <>
      <path
        id={id}
        style={{
          ...style,
          strokeWidth: data?.isHighlighted ? 3 : 2,
          stroke: data?.isHighlighted
            ? HIGHLIGHT_COLOR
            : data?.isBidirectional
              ? '#666'
              : '#999',
          transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
        }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      {label && (
        <EdgeText
          x={adjustedLabelX}
          y={adjustedLabelY}
          label={label}
          labelStyle={{
            fill: data?.isHighlighted ? HIGHLIGHT_COLOR : '#666',
            fontSize: '12px',
            fontWeight:
              data?.isBidirectional || data?.isHighlighted ? '600' : 'normal',
            transition: 'fill 0.3s ease',
          }}
          labelBgStyle={{
            fill: 'white',
            fillOpacity: 0.9,
          }}
          labelBgPadding={[4, 6]}
          labelBgBorderRadius={4}
        />
      )}
    </>
  );
};

export default WorkflowEdge;
