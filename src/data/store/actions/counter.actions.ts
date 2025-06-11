import { ActionState } from "../../types/global";

export enum CounterActions {
  IncreaseCounter = '@Counter/IncreaseCounter',
  DecreaseCounter = '@Counter/DecreaseCounter'
}

export const IncreaseCounter = () => {
  return {
    type: CounterActions.IncreaseCounter,
    data: {}
  } as ActionState
};

export const DecreaseCounter = () => ({
  type: CounterActions.DecreaseCounter,
  data: {}
} as ActionState)