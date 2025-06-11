import { UserModel } from "../../model/user.model";
import { ActionState } from "../../types/global";
import { UserActions } from "../actions/user.actions";

export interface UserStateStore{
  user: UserModel,
  isLogged: boolean
}

const initState: UserStateStore = {
  user: new UserModel(),
  isLogged: false
}

export const UserReducer = (state = initState, action: ActionState) => {
  switch(action.type){
    case UserActions.SaveLoggedUser:{
      return {
        ...state,
        user: action.data,
        isLogged: true
      } as UserStateStore;
    }
    case UserActions.ResetStore:{
      return initState;
    }
    default: 
      return state;
  }
}