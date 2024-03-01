import { useMemo } from 'react';

import { get } from 'lodash-es';
import { useImmer } from 'use-immer';
import type { DragEndEvent } from '@dnd-kit/core';

import { FieldNameContext } from '../../context';
import type { DefaultValueType, FilterPath, FilterProps } from '../../types';
import { DndContext } from '../Dnd';
import FilterGroup from '../FilterGroup';
import { DefaultConnectorOptions, DefaultOperatorOptions } from './defaultProps';

const MainFilter = <VT extends object = DefaultValueType>({
  defaultValue,
  value: valueFromProps,
  onChange,
  connectors = DefaultConnectorOptions,
  operators = DefaultOperatorOptions,
  fieldNames,
}: FilterProps<VT>) => {
  const fieldNameMap = useMemo(
    () => ({
      connector: fieldNames?.connector || 'connector',
      filters: fieldNames?.filters || 'filters',
      left: fieldNames?.left || 'left',
      operator: fieldNames?.operator || 'operator',
      value: fieldNames?.value || 'value',
    }),
    [fieldNames]
  );

  const [value, setValue] = useImmer(() => {
    if (valueFromProps !== undefined) {
      return valueFromProps;
    }

    if (defaultValue !== undefined) {
      return defaultValue;
    }

    return { [fieldNameMap.connector]: undefined, [fieldNameMap.filters]: [] };
  });

  const handleAddFilter = (path: FilterPath) => {
    setValue(draft => {
      const group: Record<string, any>[] = get(draft, path);
      group.push({});
    });
  };

  const handleAddFilterGroup = (path: FilterPath) => {
    setValue(draft => {
      const group: Record<string, any>[] = get(draft, path);
      group.push({
        [fieldNameMap.connector]: undefined,
        [fieldNameMap.filters]: [{}],
      });
    });
  };

  const handleChangeConnector = (newConnector: any, path: FilterPath) => {
    const isFirstLevel = path.length === 1;

    setValue(draft => {
      if (isFirstLevel) {
        draft[fieldNameMap.connector] = newConnector;
      } else {
        const group: Record<string, any>[] = get(draft, path.slice(0, -1));
        group[fieldNameMap.connector] = newConnector;
      }
    });
  };

  const handleChangeFilter = (newFilter: Record<string, any>, path: FilterPath) => {
    setValue(draft => {
      const index = path.at(-1) as string;
      const group: Record<string, any>[] = get(draft, path.slice(0, -1));
      group[index] = newFilter;
    });
  };

  const handleDelete = (path: FilterPath) => {
    setValue(draft => {
      const index = Number(path.at(-1));
      const group: Record<string, any>[] = get(draft, path.slice(0, -1));
      group.splice(index, 1);
    });
  };

  const handleCopy = (path: FilterPath) => {
    setValue(draft => {
      const index = Number(path.at(-1));
      const group: Record<string, any>[] = get(draft, path.slice(0, -1));
      group.splice(index + 1, 0, group[index]);
    });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (over && active.id !== over.id) {
      const dragPath: string[] = active.data.current?.path;
      const dropPath: string[] = over.data.current?.path;
      const dropPlacement: 'top' | 'bottom' = over.data.current?.dropPlacement;

      setValue(draft => {
        const dragItem: Record<string, any> = get(draft, dragPath);
        const dropToArr: Record<string, any>[] = get(draft, dropPath.slice(0, -1));
        const dropIndex = dropPlacement === 'top' ? 0 : Number(dropPath.at(-1)) + 1;
        dropToArr.splice(dropIndex, 0, { ...dragItem });

        const traverse = (treeNodes?: Record<string, any>[]) => {
          if (Array.isArray(treeNodes)) {
            for (const item of treeNodes) {
              if (dragItem === item) {
                treeNodes.splice(treeNodes.indexOf(item), 1);
                break;
              } else if (item[fieldNameMap.filters]) {
                traverse(item[fieldNameMap.filters] as Record<string, any>[]);
              }
            }
          }
        };

        traverse(draft[fieldNameMap.filters] as Record<string, any>[]);
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <FieldNameContext.Provider value={fieldNameMap}>
        <FilterGroup
          value={value}
          onAddFilter={handleAddFilter}
          onAddFilterGroup={handleAddFilterGroup}
          onChangeConnector={handleChangeConnector}
          onChangeFilter={handleChangeFilter}
          onCopy={handleCopy}
          onDelete={handleDelete}
          connectors={connectors}
          operators={operators}
        />
      </FieldNameContext.Provider>
    </DndContext>
  );
};

export default MainFilter;
