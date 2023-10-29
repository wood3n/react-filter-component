import React from 'react';
import ConditionDetail from './detail';
import DndConditionExpression from './dnd';
import type { QueryConditionExpressionProps } from './types';
import ExpressionGroup from './query-expression-group';

/**
 * 条件表达式
 */
const QueryBuilder: React.FC<QueryConditionExpressionProps> = ({
  readonly,
  draggable,
  value,
  ...props
}) => {
  if (readonly) {
    return <ConditionDetail value={value} />;
  }

  if (draggable) {
    return <DndConditionExpression value={value} {...props} />;
  }

  return <ExpressionGroup value={value} {...props} />;
};

export default QueryBuilder;
