import { combineReducers } from 'redux';
import { CounterReducer } from './counter.reducer';
import { UserReducer } from './user.reducer';

const rootReducer = combineReducers({
    counter: CounterReducer,
    loggedUser: UserReducer,
    // cart: CartReducer,
    // notification: NotificationReducer
})

export default rootReducer;