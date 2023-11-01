import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Select, Button } from 'antd';
import { objToSelectOptions } from '@/utils';
import { DeleteOutlined, CopyOutlined, DragOutlined } from '@ant-design/icons';
import { DefaultOperatorDesc } from '../constants';
import {
  DndHandler,
  DragElementType,
  DragItemType,
  ExpressionValueType,
  QueryConditionExpressionProps,
} from '../types';
import OperandComponent from '../query-operand';

import './index.less';

interface Props {
  path: string[];
  leftOperand?: QueryConditionExpressionProps['leftOperand'];
  rightOperand?: QueryConditionExpressionProps['rightOperand'];
  operators?: QueryConditionExpressionProps['operators'];
  disabled?: boolean;
  value?: ExpressionValueType;
  onChange: (value: ExpressionValueType) => void;
  onDelete: VoidFunction;
  onCopy: VoidFunction;
  onDrop?: DndHandler;
}

const Expression: React.FC<Props> = ({
  path,
  value,
  onChange,
  onDelete,
  onCopy,
  onDrop,
  leftOperand,
  rightOperand,
  operators = DefaultOperatorDesc,
  disabled,
}) => {
  const leftOperandProps = typeof leftOperand === 'function' ? leftOperand(value) : leftOperand;
  const rightOperandProps = typeof rightOperand === 'function' ? rightOperand(value) : rightOperand;

  const [{ opacity, isDragging }, drag, dragPreview] = useDrag(() => ({
    type: DragElementType.Expression,
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
      drop(dragItem: DragItemType, monitor) {
        onDrop?.({
          dragType: monitor.getItemType() as DragElementType,
          dragPath: dragItem.path,
          dropType: DragElementType.Expression,
          dropPath: path,
        });
      },
      collect: monitor => ({
        isOver: !isDragging && monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop]
  );

  const triggerChange = (newExpression: ExpressionValueType) => {
    onChange(
      value
        ? {
            ...value,
            ...newExpression,
          }
        : newExpression
    );
  };

  return (
    <div
      ref={el => {
        dragPreview(el);
        drop(el);
      }}
      style={{ borderBottom: canDrop && isOver ? 'dashed #1966FF 2px' : undefined, opacity }}
      className="expression"
    >
      <div className="expression-left-operand">
        <OperandComponent
          disabled={disabled}
          value={value?.left}
          onChange={v => {
            triggerChange({ left: v });
          }}
          {...leftOperandProps}
        />
      </div>
      <Select
        disabled={disabled}
        value={value?.operator}
        onChange={operator => {
          triggerChange({ operator });
        }}
        // @ts-expect-error 类型错误
        options={typeof operators === 'function' ? operators(value?.left) : objToSelectOptions(DefaultOperatorDesc)}
        placeholder="请选择"
        popupMatchSelectWidth={false}
        style={{
          width: 100,
        }}
      />
      <div className="expression-right-operand">
        <OperandComponent
          disabled={disabled}
          value={value?.value}
          onChange={v => {
            triggerChange({ value: v });
          }}
          {...rightOperandProps}
        />
      </div>
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

export default Expression;
