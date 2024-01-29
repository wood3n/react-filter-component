import React from 'react';
import { Button, Space } from 'antd';
import { produce } from 'immer';
import { DefaultLogicValue } from '../constants';
import Expression from '../query-expression';
import LogicToggle from '../logic-toggle';
import type { DndHandler, QueryConditionExpressionProps } from '../types';
import GroupWrapper from './wrapper';
import './index.less';

interface Props extends QueryConditionExpressionProps {
  path?: string[];
  onDrop?: DndHandler;
}

const ExpressionGroup: React.FC<Props> = ({
  value,
  onChange,
  onAddCondition,
  onAddConditionGroup,
  onCopy,
  onDelete,
  onDrop,
  leftOperand,
  rightOperand,
  path = ['filters'],
  disabled,
}) => {
  const filtersLength = value?.conditions?.length ?? 0;
  const showLogicSelect = filtersLength > 1;

  return (
    <div className="expression-group">
      {showLogicSelect && (
        <LogicToggle
          disabled={disabled}
          value={value.logic as string}
          onChange={newLogic => {
            const newValue = produce(value, draft => {
              draft.logic = newLogic;
            });

            onChange?.(newValue);
          }}
        />
      )}
      <div className="expression-group-list">
        {value?.conditions?.map(({ logic, conditions, left, operator, value }, i) => {
          const itemPath = [...path, String(i)];
          const key = itemPath.join('_');

          if (conditions) {
            return (
              <GroupWrapper
                key={key}
                value={{
                  logic,
                  conditions,
                }}
                disabled={disabled}
                leftOperand={leftOperand}
                rightOperand={rightOperand}
                path={[...itemPath, 'filters']}
                onChange={newGroupValue => {
                  const newValue = produce(value, draft => {
                    /*
                     * draft.filters![i].logic = newGroupValue?.logic;
                     * draft.filters![i].filters = newGroupValue?.filters;
                     */
                    draft.conditions[i] = { ...newGroupValue };
                  });

                  onChange?.(newValue);
                }}
                onCopy={() => onCopy(path, i)}
                onDelete={() => {
                  onDelete(path, i);
                }}
                onDrop={onDrop}
              />
            );
          }

          return (
            <Expression
              key={key}
              path={[...itemPath, 'expression']}
              leftOperand={leftOperand}
              rightOperand={rightOperand}
              disabled={disabled}
              value={{
                left,
                operator,
                value,
              }}
              onChange={newExpression => {
                const newValue = produce(value, draft => {
                  draft.conditions![i] = { ...newExpression };
                });

                onChange?.(newValue);
              }}
              onCopy={() => onCopy(path, i)}
              onDelete={() => {
                onDelete(path, i);
              }}
              onDrop={onDrop}
            />
          );
        })}
        <Space>
          <Button
            type="primary"
            disabled={disabled}
            onClick={() => {
              onAddCondition(path);
            }}
          >
            添加条件
          </Button>
          <Button
            disabled={disabled}
            onClick={() => {
              onAddConditionGroup(path);
            }}
          >
            添加条件组
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default ExpressionGroup;
