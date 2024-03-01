import { useContext } from 'react';

import { MousePositionContext } from '../context';

export const useMousePosition = () => useContext(MousePositionContext);
