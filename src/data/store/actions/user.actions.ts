import { UserModel } from "../../model/user.model";
import { ActionState } from "../../types/global";

export enum UserActions {
  SaveLoggedUser = '@User/SaveLoggedUser',
  ResetStore = '@User/ResetStore'
}

export const saveLoggedUser = (data: UserModel) => ({
  type: UserActions.SaveLoggedUser,
  data: data
} as ActionState)

export const resetStore = () => ({
  type: UserActions.ResetStore,
  data: {}
} as ActionState)