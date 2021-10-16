import { useDispatch } from 'react-redux';

import { AppDispatch } from '../state-container/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
