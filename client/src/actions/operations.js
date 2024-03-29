import {
  GET_CLIENT,
  GET_CLIENT_ERROR,
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
  AUTH_USER,
  GET_CLIENT_PRICE,
  GET_CLIENT_PRICE_ERROR,
  GET_DELETED
} from "./types";
import axios from "axios";

export const getClient = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/client", data, {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch({ type: GET_CLIENT, payload: res.data });
    callback();
  } catch (error) {
    if (error.response.data) {
      callback(error.response.data.error) 
  
      dispatch({ type: AUTH_USER, payload: null,})
    } else {
      dispatch({ type: GET_CLIENT_ERROR, payload: error });
    }
  }
};
export const inputTransaction = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/input", data, {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch({ type: INPUT_DATA, payload: res.data });
    callback();
  } catch (error) {
    if (error.response.data) {
      callback(error.response.data.error) 
      dispatch({ type: AUTH_USER, payload: null,})
    } else {
      dispatch({ type: INPUT_DATA_ERROR, payload: error });
    }
  }
};
export const getSummary = (callback) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/operations/summary",
      { status: "getting it" },
      { headers: { authorization: localStorage.getItem("token") } }
    );
    dispatch({ type: GET_SUMMARY, payload: res.data });
    console.log(res.data.data)
    localStorage.setItem("cycleDate", res.data.data[0][0].start_date);
    callback();
  } catch (error) {
    console.log(error)
      if (error.response.data) {
        callback(error.response.data.error) 
      }else{
        dispatch({ type: GET_SUMMARY_ERROR, payload: error });
      }
  }
      
};
export const deleteTransaction = (data, callback) => async (dispatch) => {
  try {
    await axios.post("/api/operations/delete", data, {
      headers: { authorization: localStorage.getItem("token") },
    });
    callback();
  } catch (error) {
    if (error.response.data) {
      callback(error.response.data.error) 
      
      dispatch({ type: AUTH_USER, payload: null,})
    } else {
      console.log(error);
    }
  }
};
export const salesSummary = (callback) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/operations/sales",
      { status: "getting it" },
      { headers: { authorization: localStorage.getItem("token") } }
    );
    dispatch({ type: GET_SALES, payload: res.data });
    callback();
  } catch (error) {
    console.log(error)
    if (error.response.data) {
      callback(error.response.data.error) 
      
      dispatch({ type: AUTH_USER, payload: null,})
    } else {
      dispatch({ type: GET_SALES_ERROR, payload: "err" });
    }
  }
};
export const insertSales = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/insertsales", data, {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch({ type: INPUT_DATA, payload: res.data });
    callback();
  } catch (error) {
    if (error.response.data) {
      callback(error.response.data.error) 
      
      dispatch({ type: AUTH_USER, payload: null,})
    } else {
      dispatch({ type: INPUT_DATA_ERROR, payload: "err" });
    }
  }
};

export const cycles = (callback) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/operations/cycle",
      { status: "getting it" },
      { headers: { authorization: localStorage.getItem("token") } }
    );
    dispatch({ type: GET_CYCLE_LIST, payload: res.data });
    callback();
  } catch (error) {
    if (error.response.data) {
      callback(error.response.data.error) 
      
      dispatch({ type: AUTH_USER, payload: null,})
    } else {
      dispatch({ type: GET_CYCLE_ERROR, payload: "err" });
    }
  }
};
export const currentCycle = (callback) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/operations/current_cycle",
      { status: "getting it" },
      { headers: { authorization: localStorage.getItem("token") } }
    );
    dispatch({ type: GET_CURRENT_CYCLE, payload: res.data });
    callback();
  } catch (error) {
    if (error.response.data) {
      callback(error.response.data.error) 
      
      dispatch({ type: AUTH_USER, payload: null,})
    } else {
      dispatch({ type: GET_CYCLE_ERROR, payload: "err" });
    }
  }
};
export const specificCycle = (data, callback) => async (dispatch) => {
  try {
    const res = await axios.post("/api/operations/specific_cycle", data, {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch({ type: GET_SPECIFIC_CYCLE, payload: res.data });
    callback();
  } catch (error) {
    if (error.response.data) {
      callback(error.response.data.error) 
      
      dispatch({ type: AUTH_USER, payload: null,})
    } else {
      dispatch({ type: GET_CYCLE_ERROR, payload: "err" });
    }
  }
};
export const editSalesRecord = (data, callback) => async (dispatch) => {
  try {
    await axios.post("/api/operations/edit_sales", data, {
      headers: { authorization: localStorage.getItem("token") },
    });

    callback();
  } catch (error) {
    if (error.response.data) {
      callback(error.response.data.error) 
      
      dispatch({ type: AUTH_USER, payload: null,})
    } else {
      console.log(error);
    }
  }
};
export const getClientList = (callback) => async (dispatch) => {
  try {
    const res = await axios.post(
      "/api/operations/getclient",
      { status: "getting it" },
      { headers: { authorization: localStorage.getItem("token") } }
    );
    dispatch({ type: GET_CLIENT_LIST, payload: res.data });
    callback();
  } catch (error) {
    if (error.response.data) {
      callback(error.response.data.error) 
      
      dispatch({ type: AUTH_USER, payload: null,})
    } else {
      dispatch({ type: GET_CLIENT_ERROR, payload: "err" });
    }
  }
};
export const inputClient = (data, callback) => async (dispatch) => {
  try {
    await axios.post("/api/operations/inputclient", data, {
      headers: { authorization: localStorage.getItem("token") },
    });
    callback();
  } catch (error) {
    if (error.response.data) {
      callback(error.response.data.error) 
      
      dispatch({ type: AUTH_USER, payload: null,})
    } else {
      console.log(error);
    }
  }
};

export const getClientPrice = (data, callback) => async (dispatch) =>{
  try{
    const res = await axios.post("/api/operations/getclientprice", data, {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch({ type: GET_CLIENT_PRICE, payload: res.data})
    callback()
  }catch(error) {
    if (error.response.data) {
      callback(error.response.data.error) 
      
      dispatch({ type: AUTH_USER, payload: null,})
    } else {
      dispatch({ type: GET_CLIENT_PRICE_ERROR, payload: error });
    }
  }
}

export const getDeleted = (done) => async (dispatch) => {
  try{
    const res = await axios.post('/api/operations/getdel', {date: localStorage.getItem("cycleDate")}, {
      headers: { authorization: localStorage.getItem("token") },
    });
    dispatch({type: GET_DELETED, payload: res.data})
    if (done){ 
      done()
    }
  }catch(error) {
    console.log(error)
  }
}

export const restoreDeleted = (data, done) => async () => {
  try{
    await axios.post('/api/operations/delrestore', data, {
      headers: { authorization: localStorage.getItem("token") },
    });
    if (done){
      done()
    }
  }catch(error){
    console.log(error)
  }
}
