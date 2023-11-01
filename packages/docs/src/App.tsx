import React, { FC, useState } from 'react';

import ConditionExpression from '@rc-querybuilder/antd';

export const App: FC = () => {
  const [value, setValue] = useState<any>();

  return (
    <div style={{ margin: 24 }}>
      <ConditionExpression
        draggable
        value={value}
        onChange={v => {
          setValue(v);
        }}
      />
      <div style={{ padding: 24 }}>{value && <pre>{JSON.stringify(value, null, '\t')}</pre>}</div>
    </div>
  );
};

export default App;
