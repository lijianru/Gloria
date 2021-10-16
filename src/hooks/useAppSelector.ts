import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '../state-container/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
