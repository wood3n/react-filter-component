import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { produce } from 'immer';
import get from 'lodash-es/get';
import ExpressionGroup from '../query-expression-group';
import { DefaultLogicValue } from '../constants';
import { DndHandlerProps, QueryConditionExpressionProps, QueryConditionExprssionValueType } from '../types';

/**
 * 条件表达式
 */
const DndConditionExpression: React.FC<QueryConditionExpressionProps> = ({ value, onChange, ...props }) => {
  const defaultConditionValue = {
    logic: 'AND',
    filters: [
      {
        expression: {},
      },
    ],
  };
  const defaultConditionGroupValue = {
    logic: 'AND',
    filters: [defaultConditionValue],
  };

  /** 添加条件 */
  const handleAddCondition = (path: string[]) => {
    if (!value) {
      onChange?.(defaultConditionValue);
    } else {
      const newValue = produce(value, draft => {
        // 初始值
        const currentFilters = get(draft, path) as QueryConditionExprssionValueType[];
        currentFilters.push({ expression: {} });
      });

      onChange?.(newValue);
    }
  };

  /* 添加条件组 */
  const handleAddConditionGroup = (path: string[]) => {
    if (!value) {
      onChange?.(defaultConditionGroupValue);
    } else {
      const newValue = produce(value, draft => {
        // 初始值
        const currentFilters = get(draft, path) as QueryConditionExprssionValueType[];
        currentFilters.push(defaultConditionValue);
      });

      onChange?.(newValue);
    }
  };

  const handleCopy = (path: string[], index: number) => {
    const newValue = produce(value, draft => {
      const currentFilters = get(draft, path) as QueryConditionExprssionValueType[];
      const item = currentFilters[index];
      currentFilters.splice(index + 1, 0, { ...item });
    });

    onChange?.(newValue);
  };

  /** 删除值 */
  const handleDelete = (path: string[], index: number) => {
    const newValue = produce(value, draft => {
      const currentFilters = get(draft, path) as QueryConditionExprssionValueType[];
      currentFilters.splice(index, 1);
    });

    onChange?.(newValue);
  };

  /** 拖拽 */
  const handleDrop = ({ dragPath, dropPath }: DndHandlerProps) => {
    const newValue = produce(value!, draft => {
      const dragItem = get(draft, dragPath.slice(0, -1)) as QueryConditionExprssionValueType;
      const dropToArr = get(draft, dropPath.slice(0, -2)) as QueryConditionExprssionValueType[];
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

      traverse(draft.filters);
    });

    onChange?.(newValue);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ExpressionGroup
        value={value}
        onChange={onChange}
        onAddCondition={handleAddCondition}
        onAddConditionGroup={handleAddConditionGroup}
        onCopy={handleCopy}
        onDelete={handleDelete}
        onDrop={handleDrop}
        {...props}
      />
    </DndProvider>
  );
};

export default DndConditionExpression;
