import { ActionState } from "../../types/global";
import { CounterActions } from "../actions/counter.actions";

export interface CounterStateStore{
  count: number;
}

const initState: CounterStateStore = {
  count: 0
}

export const CounterReducer = (state = initState, action: ActionState) => {
  switch(action.type){
    case CounterActions.IncreaseCounter:{
      return {
        ...state,
        count: state.count + 1
      } as CounterStateStore;
    }
    case CounterActions.DecreaseCounter:{
      return {
        ...state,
        count: state.count - 1
      } as CounterStateStore;
    }
    default: 
      return state;
  }
}