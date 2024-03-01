import { useContext } from 'react';

import { FieldNameContext } from '../context';

export const useFilterFieldName = () => useContext(FieldNameContext);
