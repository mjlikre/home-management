import { INVENTORY_ERROR, GET_INVENTORY } from "../actions/types";

const INITIAL_STATE = {
  inventory: null,
  inventoryErr: null
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case GET_INVENTORY:
      return { ...state, inventory: action.payload };
    case INVENTORY_ERROR:
      return { ...state, inventoryErr: action.payload };
    default:
      return state;
  }
}
