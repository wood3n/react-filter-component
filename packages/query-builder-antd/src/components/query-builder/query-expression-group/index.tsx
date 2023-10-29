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
  leftOperand,
  rightOperand,
  path = ['filters'],
  disabled,
  value = { logic: DefaultLogicValue.And, filters: [] },
  onChange,
  onDrop,
}) => {
  const filtersLength = value.filters?.length ?? 0;
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
        {value.filters?.map(({ logic, expression, filters }, i) => {
          const itemPath = [...path, String(i)];
          const key = itemPath.join('_');

          if (expression) {
            return (
              <Expression
                key={key}
                path={[...itemPath, 'expression']}
                leftOperand={leftOperand}
                rightOperand={rightOperand}
                disabled={disabled}
                value={expression}
                onChange={newExpression => {
                  const newValue = produce(value, draft => {
                    draft.filters![i].expression = newExpression;
                  });

                  onChange?.(newValue);
                }}
                onCopy={() => {
                  const newValue = produce(value, draft => {
                    draft.filters?.splice(i + 1, 0, { expression });
                  });

                  onChange?.(newValue);
                }}
                onDelete={() => {
                  const newValue = produce(value, draft => {
                    draft.filters!.splice(i, 1);
                  });

                  onChange?.(newValue);
                }}
                onDrop={onDrop}
              />
            );
          }

          return (
            <GroupWrapper
              key={key}
              value={{
                logic,
                filters,
              }}
              disabled={disabled}
              leftOperand={leftOperand}
              rightOperand={rightOperand}
              path={[...itemPath, 'filters']}
              onChange={newGroupValue => {
                const newValue = produce(value, draft => {
                  draft.filters![i].logic = newGroupValue?.logic;
                  draft.filters![i].filters = newGroupValue?.filters;
                });

                onChange?.(newValue);
              }}
              onCopy={() => {
                const newValue = produce(value, draft => {
                  draft.filters?.splice(i + 1, 0, { logic, filters });
                });

                onChange?.(newValue);
              }}
              onDelete={() => {
                const newValue = produce(value, draft => {
                  draft.filters!.splice(i, 1);
                });

                onChange?.(newValue);
              }}
              onDrop={onDrop}
            />
          );
        })}
        <Space>
          <Button
            type="primary"
            size="small"
            disabled={disabled}
            onClick={() => {
              const newValue = produce(value, draft => {
                draft.logic ??= DefaultLogicValue.And;
                draft.filters ??= [];
                draft.filters.push({
                  expression: {},
                });
              });

              onChange?.(newValue);
            }}
          >
            添加条件
          </Button>
          <Button
            disabled={disabled}
            size="small"
            onClick={() => {
              const newValue = produce(value, draft => {
                draft.logic ??= DefaultLogicValue.And;
                draft.filters ??= [];
                draft.filters.push({
                  logic: 'AND',
                  filters: [
                    {
                      expression: {},
                    },
                  ],
                });
              });

              onChange?.(newValue);
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
