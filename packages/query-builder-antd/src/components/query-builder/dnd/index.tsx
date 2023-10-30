import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { produce } from 'immer';
// https://rollupjs.org/troubleshooting/#tree-shaking-doesn-t-seem-to-be-working
import get from 'lodash-es/get';
import ExpressionGroup from '../query-expression-group';
import { DndHandlerProps, QueryConditionExpressionProps, QueryConditionExprssionValueType } from '../types';

/**
 * 条件表达式
 */
const DndConditionExpression: React.FC<QueryConditionExpressionProps> = ({ readonly, value, onChange, ...props }) => {
  const handleDrop = ({ dragPath, dropPath }: DndHandlerProps) => {
    const newValue = produce(value, draft => {
      const dragItem = get(draft, dragPath.slice(0, -1));
      const dropToArr = get(draft, dropPath.slice(0, -2));
      const dropIndex = Number(dropPath.at(-2)) + 1;
      dropToArr.splice(dropIndex, 0, { ...dragItem });

      const traverse = (treeNodes?: QueryConditionExprssionValueType[]) => {
        if (Array.isArray(treeNodes)) {
          for (const item of treeNodes) {
            if (dragItem === item) {
              treeNodes.splice(treeNodes.indexOf(item), 1);
              break;
            } else if (item.filters) {
              traverse(item.filters);
            }
          }
        }
      };

      traverse(draft?.filters);
    });
    onChange?.(newValue);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ExpressionGroup value={value} onChange={onChange} onDrop={handleDrop} {...props} />
    </DndProvider>
  );
};

export default DndConditionExpression;
