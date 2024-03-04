import { useMemo } from 'react';

import { useDndContext, useDraggable, useDroppable } from '@dnd-kit/core';

import type { FilterPath } from '../types';
import { useMousePosition } from './useMousePosition';

interface Props {
  path: FilterPath;
}

export const useDnd = ({ path }: Props) => {
  const { active, over } = useDndContext();
  const mouse = useMousePosition();

  const dropPlacement = useMemo(() => {
    if (active && over) {
      const dragPath: string[] = active.data.current?.path;
      const dragIndex = Number(dragPath.at(-1));
      const dropPath: string[] = over.data.current?.path;
      const dropIndex = Number(dropPath.at(-1));

      if (dropIndex === 0) {
        // dragItem over相邻的 dropItem 且 dropItem 为第一项时只能放置在 dropItem 上方
        if (dragPath.length === dropPath.length && dragIndex === 1) {
          return 'top';
        }

        // other
        const y = mouse.clientY - over.rect.top;
        return y > over.rect.height / 2 ? 'bottom' : 'top';
      }
    }

    return 'bottom';
  }, [mouse, active, over]);

  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef: setDragNodeRef,
  } = useDraggable({
    id: path.join('-'),
    data: {
      path,
    },
  });

  const { isOver, setNodeRef: setDropNodeRef } = useDroppable({
    id: path.join('-'),
    data: {
      dropPlacement,
      path,
    },
  });

  const setNodeRef = (el: HTMLElement | null) => {
    setDragNodeRef(el);
    setDropNodeRef(el);
  };

  return {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    isOver,
    dropPlacement,
  };
};
