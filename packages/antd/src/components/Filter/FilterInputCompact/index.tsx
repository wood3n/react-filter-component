import { Input, Select } from 'antd';

import { useFilterFieldName } from '@/hooks';
import type { SelectOption } from '@/types';

import './index.css';

interface Props {
  value: Record<string, any>;
  onChange?: (value: Record<string, any>) => void;
  operators?: SelectOption[];
}

const FilterInputCompact = ({ value, onChange, operators }: Props) => {
  const { left: leftFieldName, operator: operatorFieldName, value: valueFieldName } = useFilterFieldName();

  const handleChange = (newFilter: Record<string, any>) => {
    onChange?.({
      ...value,
      ...newFilter,
    });
  };

  return (
    <div className="react-filter-input-compact">
      <div className="react-filter-input-content">
        <Input
          allowClear
          placeholder="请输入"
          value={value[leftFieldName]}
          onChange={e => {
            handleChange({
              [leftFieldName]: e.target.value,
            });
          }}
        />
      </div>
      <div className="react-filter-input-operator">
        <Select
          options={operators}
          placeholder="请选择"
          popupMatchSelectWidth={false}
          value={value[operatorFieldName]}
          onChange={v => {
            handleChange({
              [operatorFieldName]: v,
            });
          }}
          style={{
            width: '100%',
          }}
        />
      </div>
      <div className="react-filter-input-content">
        <Input
          allowClear
          placeholder="请输入"
          value={value[valueFieldName]}
          onChange={e => {
            handleChange({
              [valueFieldName]: e.target.value,
            });
          }}
        />
      </div>
    </div>
  );
};

export default FilterInputCompact;
