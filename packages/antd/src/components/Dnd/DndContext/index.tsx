import { useMouse } from 'ahooks';
import { DndContext as DndKitContext, type DragEndEvent, pointerWithin } from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';

import { MousePositionContext } from '@/context';

interface Props {
  children: React.ReactNode;
  onDragEnd: (e: DragEndEvent) => void;
}

const DndContext = ({ children, onDragEnd }: Props) => {
  const mousePosition = useMouse();

  return (
    <DndKitContext
      collisionDetection={({ active, droppableContainers, ...args }) => {
        const dragId = active.id as string;
        const dragPath: string[] = active.data.current?.path;
        const dragIndex = Number(dragPath.at(-1));

        return pointerWithin({
          ...args,
          active,
          droppableContainers: droppableContainers.filter(droppableContainer => {
            const containerId = droppableContainer.id as string;
            const containerPath: string[] = droppableContainer.data.current?.path;
            const containerIndex = Number(containerPath.at(-1));

            const isBeforeItem =
              containerPath.length === dragPath.length && containerIndex !== 0 && dragIndex - containerIndex === 1;

            /*
             * make these node can't be drop:
             * 1. first level group node
             * 2. dragging item
             * 3. inner node of drag item
             * 4. dragging item before
             */
            return containerPath.length !== 1 && !containerId.startsWith(dragId) && !isBeforeItem;
          }),
        });
      }}
      modifiers={[snapCenterToCursor]}
      onDragEnd={onDragEnd}
    >
      <MousePositionContext.Provider value={mousePosition}>{children}</MousePositionContext.Provider>
    </DndKitContext>
  );
};

export default DndContext;
