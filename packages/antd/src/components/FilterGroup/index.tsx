import { useFilterFieldName } from '@/hooks';
import type { DefaultValueType, FilterPath, SelectOption } from '@/types';

import Filter from '../Filter';
import FilterOperation from '../FilterOperation';
import Connector from './Connector';
import FilterGroupFooter from './GroupFooter';
import FilterGroupWrapper from './GroupWrapper';

import './index.css';

export interface FilterGroupProps<VT extends object> {
  operators: SelectOption[];
  connectors: SelectOption[];
  value: VT;
  onAddFilter: (path: FilterPath) => void;
  onAddFilterGroup: (path: FilterPath) => void;
  onChangeConnector: (value: any, path: FilterPath) => void;
  onChangeFilter: (value: Record<string, any>, path: FilterPath) => void;
  onCopy: (path: FilterPath) => void;
  onDelete: (path: FilterPath) => void;
  path?: FilterPath;
  extraFooterNode?: React.ReactNode;
}

const FilterGroup = <VT extends object = DefaultValueType>({
  value,
  onAddFilter,
  onAddFilterGroup,
  onChangeConnector,
  onChangeFilter,
  onCopy,
  onDelete,
  connectors,
  operators,
  path = [],
  extraFooterNode,
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
              <FilterGroupWrapper key={key} path={childPath} value={filterItemValue} connectors={connectors}>
                {({ dndHandlerProps }) => {
                  return (
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
                      extraFooterNode={
                        <FilterOperation
                          onDelete={() => {
                            onDelete(childPath);
                          }}
                          onCopy={() => {
                            onCopy(childPath);
                          }}
                          dndHandlerProps={dndHandlerProps}
                        />
                      }
                    />
                  );
                }}
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
        <FilterGroupFooter
          onAddFilter={() => {
            onAddFilter(filterGroupPath);
          }}
          onAddFilterGroup={() => {
            onAddFilterGroup(filterGroupPath);
          }}
          extra={extraFooterNode}
        />
      </div>
    </div>
  );
};

export default FilterGroup;
