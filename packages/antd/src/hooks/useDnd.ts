import { useMemo } from 'react';

import { useDndContext, useDraggable, useDroppable } from '@dnd-kit/core';

import type { FilterPath } from '../types';
import { useMousePosition } from './useMousePosition';

interface Props {
  path: FilterPath;
}

export const useDnd = ({ path }: Props) => {
  const { over } = useDndContext();
  const mouse = useMousePosition();

  const dropPlacement = useMemo(() => {
    const index = path.at(-1);
    if (index === '0' && over?.rect) {
      const y = mouse.clientY - over.rect.top; // 获取鼠标在元素中的y坐标
      return y > over.rect.height / 2 ? 'bottom' : 'top';
    }

    return 'bottom';
  }, []);

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
