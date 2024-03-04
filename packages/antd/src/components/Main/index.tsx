import { useMemo, useState } from 'react';

import { produce } from 'immer';
import { get } from 'lodash-es';
import type { DragEndEvent } from '@dnd-kit/core';

import { FieldNameContext } from '../../context';
import type { DefaultValueType, FilterPath, FilterProps } from '../../types';
import { DndContext } from '../Dnd';
import FilterGroup from '../FilterGroup';
import { DefaultConnectorOptions, DefaultOperatorOptions } from './defaultProps';

const MainFilter = <VT extends object = DefaultValueType>({
  defaultValue,
  onChange,
  connectors = DefaultConnectorOptions,
  operators = DefaultOperatorOptions,
  fieldNames,
  ...restProps
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

  const innerDefaultValue = { [fieldNameMap.connector]: undefined, [fieldNameMap.filters]: [] } as VT;
  const isControlled = Object.hasOwn(restProps, 'value');
  const valueFromProps = restProps.value || innerDefaultValue;

  const [value, setValue] = useState(() => {
    if (defaultValue !== undefined) {
      return defaultValue;
    }

    return innerDefaultValue;
  });

  const componentValue = isControlled ? valueFromProps : value;

  const update = (newValue: VT) => {
    if (!isControlled) {
      setValue(newValue);
    }

    onChange?.(newValue);
  };

  const handleAddFilter = (path: FilterPath) => {
    const newValue = produce(componentValue, draft => {
      const group: Record<string, any>[] = get(draft, path);
      group.push({});
    });

    update(newValue);
  };

  const handleAddFilterGroup = (path: FilterPath) => {
    const newValue = produce(componentValue, draft => {
      const group: Record<string, any>[] = get(draft, path);
      group.push({
        [fieldNameMap.connector]: undefined,
        [fieldNameMap.filters]: [{}],
      });
    });

    update(newValue);
  };

  const handleChangeConnector = (newConnector: any, path: FilterPath) => {
    const isFirstLevel = path.length === 1;

    const newValue = produce(componentValue, draft => {
      if (isFirstLevel) {
        draft[fieldNameMap.connector] = newConnector;
      } else {
        const group: Record<string, any>[] = get(draft, path.slice(0, -1));
        group[fieldNameMap.connector] = newConnector;
      }
    });

    update(newValue);
  };

  const handleChangeFilter = (newFilter: Record<string, any>, path: FilterPath) => {
    const newValue = produce(componentValue, draft => {
      const index = path.at(-1) as string;
      const group: Record<string, any>[] = get(draft, path.slice(0, -1));
      group[index] = newFilter;
    });

    update(newValue);
  };

  const handleDelete = (path: FilterPath) => {
    const newValue = produce(componentValue, draft => {
      const index = Number(path.at(-1));
      const group: Record<string, any>[] = get(draft, path.slice(0, -1));
      group.splice(index, 1);
    });

    update(newValue);
  };

  const handleCopy = (path: FilterPath) => {
    const newValue = produce(componentValue, draft => {
      const index = Number(path.at(-1));
      const group: Record<string, any>[] = get(draft, path.slice(0, -1));
      group.splice(index + 1, 0, group[index]);
    });

    update(newValue);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (over && active.id !== over.id) {
      const dragPath: string[] = active.data.current?.path;
      const dropPath: string[] = over.data.current?.path;
      const dropPlacement: 'top' | 'bottom' = over.data.current?.dropPlacement;

      const newValue = produce(componentValue, draft => {
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

      update(newValue);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <FieldNameContext.Provider value={fieldNameMap}>
        <FilterGroup
          value={componentValue}
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
