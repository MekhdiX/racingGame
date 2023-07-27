import { Nullable } from 'common/types';
import { useDispatch } from 'react-redux';
import { Action } from 'store/actions/types';
import { AppThunkAction, AppThunkDispatch } from 'store/types';

export const useAction = <TAction>(action: Action<TAction>) => {
  const dispatch = useDispatch();

  return () => dispatch(action);
};

export const useThunkAction = <TData, TAction>(action: (data: Nullable<TData>) => AppThunkAction<TAction>) => {
  const dispatch = useDispatch<AppThunkDispatch>();

  return (data: Nullable<TData>) => dispatch(action(data));
};
