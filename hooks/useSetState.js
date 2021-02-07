import { useReducer } from 'react';

const reducer = (state, action) => ({
  ...state,
  ...action,
});

const useSetState = (initialState) => {
  const [state, setState] = useReducer(reducer, initialState);
  return [state, setState];
};

export default useSetState;
