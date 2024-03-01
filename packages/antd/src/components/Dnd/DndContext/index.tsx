import { DndContext as DndKitContext, type DragEndEvent, pointerWithin } from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';

interface Props {
  children: React.ReactNode;
  onDragEnd: (e: DragEndEvent) => void;
}

const DndContext = ({ children, onDragEnd }: Props) => (
  <DndKitContext
    collisionDetection={({ active, droppableContainers, ...args }) => {
      const dragId = active.id as string;

      return pointerWithin({
        ...args,
        active,
        droppableContainers: droppableContainers.filter(droppableContainer => {
          const dropId = droppableContainer.id as string;
          const dropPath: string[] = droppableContainer.data.current?.path;

          // drag节点自身以及group内部的子节点禁止drop
          return dropPath.length !== 1 && !dropId.startsWith(dragId);
        }),
      });
    }}
    modifiers={[snapCenterToCursor]}
    onDragEnd={onDragEnd}
  >
    {children}
  </DndKitContext>
);

export default DndContext;
