import store from '~/redux';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';

type GetStateFunType = typeof store.getState;
type IRootState = ReturnType<GetStateFunType>;

export const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;