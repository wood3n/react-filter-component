import { Flex } from 'antd';

import { useDnd } from '@/hooks';
import type { FilterPath, SelectOption } from '@/types';

import { DndIndicator, DndOverlay } from '../Dnd';
import FilterOperation from '../FilterOperation';
import FilterInputCompact from './FilterInputCompact';

interface Props {
  path: FilterPath;
  value: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  onCopy: VoidFunction;
  onDelete: VoidFunction;
  operators?: SelectOption[];
}

const Filter = ({ path, value, onChange, onCopy, onDelete, operators }: Props) => {
  const { attributes, isDragging, listeners, setNodeRef, isOver, dropPlacement } = useDnd({ path });

  return (
    <Flex ref={setNodeRef} gap={8} align="center" style={{ position: 'relative' }}>
      <FilterInputCompact operators={operators} value={value} onChange={onChange} />
      <FilterOperation onCopy={onCopy} onDelete={onDelete} dndHandlerProps={{ ...attributes, ...listeners }} />
      <DndOverlay isDragging={isDragging}>
        <FilterInputCompact operators={operators} value={value} onChange={onChange} />
      </DndOverlay>
      {isOver && <DndIndicator isTop={dropPlacement === 'top'} />}
    </Flex>
  );
};

export default Filter;
