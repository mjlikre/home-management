import {
  GET_CLIENT,
  GET_CLIENT_ERROR,
  GET_DAILY,
  GET_DAILY_ERROR,
  GET_MONTHLY,
  GET_MONTHLY_ERROR,
  INPUT_DATA,
  INPUT_DATA_ERROR,
  GET_SUMMARY,
  GET_SUMMARY_ERROR,
  GET_SALES,
  GET_SALES_ERROR,
  GET_CYCLE_ERROR,
  GET_CYCLE_LIST,
  GET_CURRENT_CYCLE,
  GET_SPECIFIC_CYCLE,
  GET_CLIENT_LIST,
  GET_CLIENT_PRICE
} from "./../actions/types";

const INITIAL_STATE = {
  client: null,
  clientError: null,
  daily: null,
  dailyError: null,
  monthly: null,
  monthlyError: null,
  input: null,
  inputError: null,
  summary: null,
  summaryError: null,
  sales: null, 
  salesError: null,
  cycleList: null,
  currentCycle: null,
  specificCycle: null,
  cycleError: null,
  clientList: null,
  client_price: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CLIENT:
      return { ...state, client: action.payload };
    case GET_CLIENT_ERROR:
      return { ...state, clientError: action.payload };
    case GET_DAILY:
      return { ...state, daily: action.payload };
    case GET_DAILY_ERROR:
      return { ...state, dailyError: action.payload };
    case GET_MONTHLY:
      return { ...state, monthly: action.payload };
    case GET_MONTHLY_ERROR:
      return { ...state, monthlyError: action.payload };
    case INPUT_DATA:
      return { ...state, input: action.payload };
    case INPUT_DATA_ERROR:
      return { ...state, inputError: action.payload };
    case GET_SUMMARY:
      return { ...state, summary: action.payload };
    case GET_SUMMARY_ERROR:
      return { ...state, summaryError: action.payload };
    case GET_SALES: 
      return { ...state, sales: action.payload };
    case GET_SALES_ERROR: 
      return { ...state, salesError: action.payload };
    case GET_CYCLE_LIST: 
      return { ...state, cycleList: action.payload };
    case GET_CURRENT_CYCLE: 
      return { ...state, currentCycle: action.payload };
    case GET_SPECIFIC_CYCLE: 
      return { ...state, specificCycle: action.payload };
    case GET_CYCLE_ERROR: 
      return { ...state, cycleError: action.payload };
    case GET_CLIENT_LIST: 
      return { ...state, clientList: action.payload };
    case GET_CLIENT_PRICE: 
      return { ...state, client_price: action.payload };
    default:
      return state;
  }
}
