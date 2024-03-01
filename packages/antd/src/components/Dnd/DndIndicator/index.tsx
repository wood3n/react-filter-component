import cls from 'classnames';

import './index.css';

interface Props {
  isTop?: boolean;
}

const DndIndicator = ({ isTop }: Props) => {
  return (
    <div
      className={cls('drag-over-indicator', {
        'drag-over-indicator-bottom': !isTop,
        'drag-over-indicator-top': isTop,
      })}
    />
  );
};

export default DndIndicator;
