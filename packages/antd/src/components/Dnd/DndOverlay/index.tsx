import React from 'react';

import { Card } from 'antd';
import { DragOverlay } from '@dnd-kit/core';

interface Props {
  isDragging?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const DndOverlay = ({ isDragging, children, style }: Props) => {
  return (
    <DragOverlay dropAnimation={null} style={{ cursor: 'move', width: 600, height: 48 }}>
      {isDragging ? <Card bodyStyle={{ padding: 8, ...style }}>{children}</Card> : null}
    </DragOverlay>
  );
};

export default DndOverlay;
