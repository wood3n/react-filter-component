import { Card } from 'antd';

import { DndIndicator } from '@/components/Dnd';
import { useDnd } from '@/hooks';
import type { SelectOption } from '@/types';

import DndGroupOverlay from './DndGroupOverlay';

interface RenderChildrenProps {
  dndHandlerProps: Record<string, any>;
}

interface Props {
  path: string[];
  children: (props: RenderChildrenProps) => React.ReactNode;
  value: Record<string, any>;
  connectors?: SelectOption[];
}

const FilterGroupWrapper = ({ path, children, value, connectors }: Props) => {
  const { attributes, isDragging, listeners, isOver, setNodeRef, dropPlacement } = useDnd({
    path,
  });

  return (
    <div style={{ position: 'relative' }}>
      <Card size="small" ref={setNodeRef}>
        {children({
          dndHandlerProps: {
            ...attributes,
            ...listeners,
          },
        })}
        <DndGroupOverlay value={value} isDragging={isDragging} connectors={connectors} />
      </Card>
      {isOver && <DndIndicator isTop={dropPlacement === 'top'} />}
    </div>
  );
};

export default FilterGroupWrapper;
