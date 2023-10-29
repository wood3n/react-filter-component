import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Button, Card } from 'antd';
import { DeleteOutlined, CopyOutlined, DragOutlined } from '@ant-design/icons';
import { DndHandler, DragElementType, DragItemType, QueryConditionExpressionProps } from '../../types';
import ExpressionGroup from '..';

import './index.less';

interface Props extends QueryConditionExpressionProps {
  path: string[];
  onDelete?: () => void;
  onCopy?: () => void;
  onDrop?: DndHandler;
}

const GroupWrapper = ({ path, disabled, onCopy, onDelete, onDrop, ...props }: Props) => {
  const [{ opacity, isDragging }, drag, dragPreview] = useDrag(() => ({
    type: DragElementType.ExpressionGroup,
    item: {
      path,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  }));

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: [DragElementType.Expression, DragElementType.ExpressionGroup],
      drop: (dragItem: DragItemType, monitor) => {
        if (monitor.didDrop()) {
          return;
        }
        onDrop?.({
          dragType: monitor.getItemType() as DragElementType,
          dragPath: dragItem.path,
          dropType: DragElementType.ExpressionGroup,
          dropPath: path,
        });
      },
      collect: monitor => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: !monitor.didDrop(),
      }),
    }),
    [onDrop]
  );

  return (
    <div
      ref={el => {
        dragPreview(el);
        drop(el);
      }}
      style={{ opacity, borderBottom: canDrop && isOver ? 'dashed #1966FF 2px' : undefined }}
      className="expression-group-wrapper"
    >
      <Card bodyStyle={{ padding: 16 }} style={{ flex: 1 }}>
        <ExpressionGroup path={path} disabled={disabled} onDrop={onDrop} {...props} />
      </Card>
      <Button disabled={disabled} onClick={onCopy}>
        <CopyOutlined />
      </Button>
      <Button disabled={disabled} onClick={onDelete}>
        <DeleteOutlined />
      </Button>
      <Button ref={drag} disabled={disabled}>
        <DragOutlined />
      </Button>
    </div>
  );
};

export default GroupWrapper;
