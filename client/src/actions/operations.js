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
  GET_CURRENT_CYCLE,
  GET_CYCLE_ERROR,
  GET_SPECIFIC_CYCLE,
  GET_CYCLE_LIST,
  GET_CLIENT_LIST,
  INPUT_CLIENT
} from "./types";
import axios from "axios";

export const getToday = (callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/thisday", {status: "getting it"},{
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch({ type: GET_DAILY, payload: res.data });
    callback();
  } catch (e) {
    dispatch({ type: GET_DAILY_ERROR, payload: e });
  }
};

export const getDaily = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/daily", data, {headers: { authorization: localStorage.getItem("token")}   
    });
    dispatch({ type: GET_DAILY, payload: res.data });
    callback();
  } catch (e) {
    dispatch({ type: GET_DAILY_ERROR, payload: e });
  }
};

export const getThisMonth = (callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/thismonth",{status: "getting it"}, {headers: { authorization: localStorage.getItem("token")}
    });
    dispatch({ type: GET_MONTHLY, payload: res.data });
    callback();
  } catch (e) {
    dispatch({ type: GET_MONTHLY_ERROR, payload: e });
  }
};

export const getMonthly = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/monthly", data, {headers: { authorization: localStorage.getItem("token")}
    });
    dispatch({ type: GET_MONTHLY, payload: res.data });
    callback();
  } catch (e) {
    dispatch({ type: GET_MONTHLY_ERROR, payload: e });
  }
};

export const getClient = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/client", data, {headers: { authorization: localStorage.getItem("token")}
    });
    dispatch({ type: GET_CLIENT, payload: res.data });
    callback();
  } catch (e) {
    dispatch({ type: GET_CLIENT_ERROR, payload: e });
  }
};
export const inputTransaction = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/input", data, {headers: { authorization: localStorage.getItem("token")}
    });
    dispatch({ type: INPUT_DATA, payload: res.data });
    callback();
  } catch (e) {
    dispatch({ type: INPUT_DATA_ERROR, payload: e });
  }
};
export const getSummary = (callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/summary",{status: "getting it"}, {headers: { authorization: localStorage.getItem("token")}
    });
    dispatch({ type: GET_SUMMARY, payload: res.data });
    callback();
  } catch (e) {
    dispatch({ type: GET_SUMMARY_ERROR, payload: e });
  }
};
export const deleteTransaction = (data, callback) => async () => {
  try {
    await axios.post("/api/operations/delete", data, {headers: { authorization: localStorage.getItem("token")}
    });
  } catch (e) {
    console.log(e);
  }
};
export const salesSummary = (callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/sales",{status: "getting it"}, {headers: { authorization: localStorage.getItem("token")}
    });
    dispatch({ type: GET_SALES, payload: res.data });
    callback();
  } catch (e) {
    dispatch({ type: GET_SALES_ERROR, payload: "err" });
  }
};
export const insertSales = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/insertsales", data, {headers: { authorization: localStorage.getItem("token")}
    });
    dispatch({ type: INPUT_DATA, payload: res.data });
    callback();
  } catch (e) {
    dispatch({ type: INPUT_DATA_ERROR, payload: "err" });
  }
};
export const deleteSales = (data, callback) => async () => {
  try {
    await axios.post("/api/operations/salesdel", data, {headers: { authorization: localStorage.getItem("token")}
    });
    callback();
  } catch (e) {
    console.log(e);
  }
};
export const cycles = (callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/cycle",{status: "getting it"}, {headers: { authorization: localStorage.getItem("token")}
    });
    dispatch({ type: GET_CYCLE_LIST, payload: res.data });
    callback();
  } catch (e) {
    dispatch({ type: GET_CYCLE_ERROR, payload: "err" });
  }
};
export const currentCycle = (callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/current_cycle",{status: "getting it"}, {headers: { authorization: localStorage.getItem("token")}
    });
    dispatch({ type: GET_CURRENT_CYCLE, payload: res.data });
    callback();
  } catch (e) {
    dispatch({ type: GET_CYCLE_ERROR, payload: "err" });
  }
};
export const specificCycle = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/specific_cycle", data, {headers: { authorization: localStorage.getItem("token")}
    });
    dispatch({ type: GET_SPECIFIC_CYCLE, payload: res.data });
    callback();
  } catch (e) {
    dispatch({ type: GET_CYCLE_ERROR, payload: "err" });
  }
};
export const editSalesRecord = (data, callback) => async () => {
  try {
    await axios.post("/api/operations/edit_sales", data, {headers: { authorization: localStorage.getItem("token")}
    });

    callback();
  } catch (e) {
    console.log(e);
  }
};
export const getClientList = (callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/getclient", {status: "getting it"}, {headers: { authorization: localStorage.getItem("token")}
    
    })
    dispatch({type: GET_CLIENT_LIST, payload: res.data})
    callback();
  } catch(e) {
    dispatch({ type: GET_CLIENT_ERROR, payload: "err" });
  }
};
export const inputClient = (data, callback) => async () => {
  try{
    await axios.post("/api/operations/inputclient", data, {headers: { authorization: localStorage.getItem("token")}
    })
    callback();
  }catch(e) {
    console.log(e)
  }
}
