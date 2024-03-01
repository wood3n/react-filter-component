import { Flex, Select } from 'antd';
import cls from 'classnames';

import { SelectOption } from '@/types';

import './index.css';

interface Props {
  disabled?: boolean;
  value: any;
  onChange: (value: any) => void;
  connectors?: SelectOption[];
}

const Connector = ({ connectors, value, onChange, disabled }: Props) => {
  return (
    <Flex vertical justify="stretch" align="flex-end" className="react-filter-group-connector">
      <div className={cls('curly-brace', 'curly-brace-start')} />
      <Select
        size="small"
        popupMatchSelectWidth={false}
        disabled={disabled}
        options={connectors}
        value={value}
        onChange={onChange}
        style={{ width: 52, marginRight: 8 }}
      />
      <div className={cls('curly-brace', 'curly-brace-end')} />
    </Flex>
  );
};

export default Connector;
