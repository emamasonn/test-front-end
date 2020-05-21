import { DELETE_TRANSACTION, CREATE_TRANSACTION, REFRESH_TRANSACTION, LOAD_TRANSACTION } from "../typesAction";

const initialState = [];

const reducerTransaction = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TRANSACTION:
      return [...action.payload]
    case CREATE_TRANSACTION:
      return [ ...state, action.payload]
    case DELETE_TRANSACTION:
      return state.filter(s => s.id !== action.payload);
    case REFRESH_TRANSACTION:
      return  [...action.payload]
    default:
      return state
  }
}
export default reducerTransaction;
