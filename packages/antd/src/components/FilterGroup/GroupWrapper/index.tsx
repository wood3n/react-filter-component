import { Collapse } from 'antd';

import { DndIndicator } from '@/components/Dnd';
import FilterOperation from '@/components/FilterOperation';
import { useDnd } from '@/hooks';
import type { SelectOption } from '@/types';

import DndGroupOverlay from './DndGroupOverlay';

interface Props {
  path: string[];
  children: React.ReactNode;
  onCopy: VoidFunction;
  onDelete: VoidFunction;
  value: Record<string, any>;
  connectors?: SelectOption[];
}

const FilterGroupWrapper = ({ path, children, onCopy, onDelete, value, connectors }: Props) => {
  const { attributes, isDragging, listeners, isOver, setNodeRef, dropPlacement } = useDnd({
    path,
  });

  return (
    <div style={{ position: 'relative' }}>
      <Collapse
        ref={setNodeRef}
        size="small"
        defaultActiveKey={['1']}
        style={{
          position: 'relative',
        }}
      >
        <Collapse.Panel
          header="group"
          key="1"
          extra={
            <FilterOperation
              onCopy={onCopy}
              onDelete={onDelete}
              dndHandlerProps={{
                ...attributes,
                ...listeners,
              }}
            />
          }
        >
          {children}
          <DndGroupOverlay value={value} isDragging={isDragging} connectors={connectors} />
        </Collapse.Panel>
      </Collapse>
      {isOver && <DndIndicator isTop={dropPlacement === 'top'} />}
    </div>
  );
};

export default FilterGroupWrapper;
