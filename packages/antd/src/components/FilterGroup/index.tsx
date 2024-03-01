import { Button, Space } from 'antd';

import { useFilterFieldName } from '@/hooks';
import type { DefaultValueType, FilterPath, FilterProps, SelectOption } from '@/types';

import Filter from '../Filter';
import Connector from './Connector';
import FilterGroupWrapper from './GroupWrapper';

import './index.css';

export interface FilterGroupProps<VT extends object> extends FilterProps<VT> {
  path?: FilterPath;
  operators: SelectOption[];
  connectors: SelectOption[];
  value: VT;
  onAddFilter: (path: FilterPath) => void;
  onAddFilterGroup: (path: FilterPath) => void;
  onChangeConnector: (value: any, path: FilterPath) => void;
  onChangeFilter: (value: Record<string, any>, path: FilterPath) => void;
  onCopy: (path: FilterPath) => void;
  onDelete: (path: FilterPath) => void;
}

const FilterGroup = <VT extends object = DefaultValueType>({
  path = [],
  value,
  onAddFilter,
  onAddFilterGroup,
  onChangeConnector,
  onChangeFilter,
  onCopy,
  onDelete,
  connectors,
  operators,
}: FilterGroupProps<VT>) => {
  const { connector: connectorFieldName, filters: filterGroupFieldName } = useFilterFieldName();

  const filterGroupPath = path.concat(filterGroupFieldName);
  const filterGroup: Record<string, any>[] = value[filterGroupFieldName] || [];
  const showConnector = filterGroup.length > 1;

  return (
    <div className="react-filter-group">
      {showConnector && (
        <Connector
          connectors={connectors}
          value={value[connectorFieldName]}
          onChange={newConnector => {
            onChangeConnector(newConnector, filterGroupPath);
          }}
        />
      )}
      <div className="react-filter-group-list">
        {filterGroup.map((filterItemValue, i) => {
          const isFilterGroup = Array.isArray(filterItemValue[filterGroupFieldName]);
          const childPath = [...filterGroupPath, String(i)];
          const key = childPath.join('-');

          if (isFilterGroup) {
            return (
              <FilterGroupWrapper
                key={key}
                path={childPath}
                value={filterItemValue}
                onDelete={() => {
                  onDelete(childPath);
                }}
                onCopy={() => {
                  onCopy(childPath);
                }}
                connectors={connectors}
              >
                <FilterGroup
                  path={childPath}
                  value={filterItemValue}
                  onAddFilter={onAddFilter}
                  onAddFilterGroup={onAddFilterGroup}
                  onChangeConnector={onChangeConnector}
                  onChangeFilter={onChangeFilter}
                  onDelete={onDelete}
                  onCopy={onCopy}
                  connectors={connectors}
                  operators={operators}
                />
              </FilterGroupWrapper>
            );
          }

          return (
            <Filter
              key={key}
              path={childPath}
              operators={operators}
              value={filterItemValue}
              onChange={newFilter => {
                onChangeFilter(newFilter, childPath);
              }}
              onCopy={() => {
                onCopy(childPath);
              }}
              onDelete={() => {
                onDelete(childPath);
              }}
            />
          );
        })}
        <Space size={8}>
          <Button
            type="primary"
            onClick={() => {
              onAddFilter(filterGroupPath);
            }}
          >
            添加条件
          </Button>
          <Button
            onClick={() => {
              onAddFilterGroup(filterGroupPath);
            }}
          >
            添加条件组
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default FilterGroup;
