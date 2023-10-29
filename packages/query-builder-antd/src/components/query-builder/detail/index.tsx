import React from 'react';
import { Card, Tag, Typography } from 'antd';
import { DefaultOperatorDesc } from '../constants';
import LogicToggle from '../logic-toggle';
import type { InnerValueType } from '../types';
import './index.less';

interface Props {
  value: InnerValueType | undefined;
}

const ConditionDetail: React.FC<Props> = ({ value = { logic: 'AND', filters: [] } }) => {
  const filtersLength = value.filters?.length ?? 0;
  const showLogicSelect = filtersLength > 1;
  const { path: groupPath = [] } = value ?? ({} as InnerValueType);

  return (
    <div style={{ display: 'flex', alignItems: 'stretch' }}>
      {showLogicSelect && (
        <LogicToggle
          readonly
          value={value.logic as string}
          style={{
            marginRight: 8,
            flex: '0 0 auto',
          }}
        />
      )}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          rowGap: 8,
        }}
      >
        {value.filters?.map(({ logic, expression, filters }, i) => {
          const path = [...groupPath, i];
          const key = path.join('_');

          if (expression) {
            return (
              <div key={key} className="expression-item">
                <Typography.Text ellipsis={{ tooltip: expression.left }}>{expression.left}</Typography.Text>
                <Tag style={{ background: '#F7F8F9', color: '#585B60' }}>
                  {DefaultOperatorDesc[expression.operator!]}
                </Tag>
                <Typography.Text ellipsis={{ tooltip: String(expression.value) }}>
                  {String(expression.value)}
                </Typography.Text>
              </div>
            );
          }

          return (
            <div
              key={key}
              style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: 8,
                position: 'relative',
              }}
            >
              <Card bodyStyle={{ padding: 8 }} style={{ flex: 1 }}>
                <ConditionDetail
                  value={{
                    logic,
                    filters,
                    path,
                  }}
                />
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConditionDetail;
