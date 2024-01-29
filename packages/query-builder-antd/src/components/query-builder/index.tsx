import React from 'react';
import { useQueryBuilder } from '@rc-querybuilder/core';
import ConditionDetail from './detail';
import DndConditionExpression from './dnd';
import type { QueryConditionExpressionProps } from './types';
import ExpressionGroup from './query-expression-group';

/**
 * 条件表达式
 */
const QueryBuilder: React.FC<QueryConditionExpressionProps> = ({
  defaultValue,
  value: propsValue,
  onChange: propsOnChange,
  operators,
  logics,
  leftOperand,
  rightOperand,
  readonly,
  draggable,
  disabled,
  className,
  style,
}) => {
  const { value, onChange } = useQueryBuilder({
    defaultValue,
    value: propsValue,
    onChange: propsOnChange,
    logics,
  });

  if (readonly) {
    return <ConditionDetail value={value} />;
  }

  if (draggable) {
    return <DndConditionExpression value={value} {...props} />;
  }

  return <ExpressionGroup value={value} {...props} />;
};

export default QueryBuilder;
