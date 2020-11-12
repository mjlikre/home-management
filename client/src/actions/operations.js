import {GET_CLIENT, GET_CLIENT_ERROR, GET_DAILY, GET_DAILY_ERROR, GET_MONTHLY, GET_MONTHLY_ERROR, INPUT_DATA, INPUT_DATA_ERROR, GET_SUMMARY, GET_SUMMARY_ERROR, GET_SALES, GET_SALES_ERROR, GET_CURRENT_CYCLE, GET_CYCLE_ERROR, GET_SPECIFIC_CYCLE, GET_CYCLE_LIST} from "./types"
import axios from "axios";

export const getToday = (callback) => async (dispatch) => {
    try{
        const res = await axios.post("/api/operations/thisday")
        dispatch({ type: GET_DAILY, payload: res.data})
        callback()
    }catch(e){
        dispatch({ type: GET_DAILY_ERROR, payload: e})
    }
}

export const getDaily = (data, callback) => async (dispatch) => {
    try{
        const res = await axios.post("/api/operations/daily", data)
        dispatch({ type: GET_DAILY, payload: res.data})
        callback()
    }catch(e){
        dispatch({ type: GET_DAILY_ERROR, payload: e})
    }
}

export const getThisMonth = (callback) => async (dispatch) => {
    try{
        const res = await axios.post("/api/operations/thismonth")
        dispatch({ type: GET_MONTHLY, payload: res.data})
        callback()
    }catch(e){
        dispatch({ type: GET_MONTHLY_ERROR, payload: e})
    }
}

export const getMonthly = (data, callback) => async (dispatch) => {
    try{
        const res = await axios.post("/api/operations/monthly", data)
        dispatch({ type: GET_MONTHLY, payload: res.data})
        callback()
    }catch(e){
        dispatch({ type: GET_MONTHLY_ERROR, payload: e})
    }
}

export const getClient = (data, callback) => async (dispatch) => {
    try{
        const res = await axios.post("/api/operations/client", data)
        dispatch({ type: GET_CLIENT, payload: res.data})
        callback()
    }catch(e){
        dispatch({ type: GET_CLIENT_ERROR, payload: e})
    }
}
export const inputTransaction = (data, callback) => async (dispatch) => {
    try{
        const res = await axios.post("/api/operations/input", data)
        dispatch({ type: INPUT_DATA, payload: res.data})
        callback()
    }catch(e){
        dispatch({ type: INPUT_DATA_ERROR, payload: e})
    }
}
export const getSummary = (callback) => async (dispatch) => {
    try{
        const res = await axios.post("/api/operations/summary");  
        dispatch({ type: GET_SUMMARY, payload: res.data})
        callback()
    }catch(e){
        dispatch({ type: GET_SUMMARY_ERROR, payload: e})
    }
}
export const deleteTransaction = (data, callback) => async () => {
    try{
        await axios.post("/api/operations/delete", data)
    }catch(e) {
        console.log(e)
    }
}
export const salesSummary = (callback) => async (dispatch) => {
    try{
        const res = await axios.post("/api/operations/sales")
        dispatch({type: GET_SALES, payload: res.data})
        callback()
    }catch(e){ 
        dispatch({type: GET_SALES_ERROR, payload: "err"})
    }
}
export const insertSales = (data, callback) => async (dispatch) => {
    try{
        const res = await axios.post("/api/operations/insertsales", data)
        dispatch({ type: INPUT_DATA, payload: res.data})
        callback()
    }catch(e){
        dispatch({ type: INPUT_DATA_ERROR, payload: "err"})
    }
}
export const deleteSales = (data, callback) => async () => {
    try{
        await axios.post("/api/operations/salesdel", data)
        callback()
    }catch(e) {
        console.log(e)
    }
}
export const cycles = (callback) => async (dispatch) => {
    try{
      const res = await axios.post("/api/operations/cycle")
      dispatch({ type: GET_CYCLE_LIST, payload: res.data })
      callback()
    }catch(e) {
        dispatch({ type: GET_CYCLE_ERROR, payload: "err"})
    }
}
export const currentCycle = (callback) => async (dispatch) => {
    try {
        const res = await axios.post("/api/operations/current_cycle")
        dispatch({ type: GET_CURRENT_CYCLE, payload: res.data })
        callback()
    }catch(e) {
        dispatch({ type: GET_CYCLE_ERROR, payload: "err"})
    }
}
export const specificCycle = (data, callback) => async (dispatch) => {
    try {
        const res = await axios.post("/api/operations/specific_cycle", data)
        dispatch({ type: GET_SPECIFIC_CYCLE, payload: res.data })
        callback()
    }catch(e) {
        dispatch({ type: GET_CYCLE_ERROR, payload: "err"})
    }
}
export const editSalesRecord = (data, callback) => async () => {
    try {
        await axios.post("/api/operations/edit_sales", data)
        
        callback()
    }catch(e) {
        console.log(e)
    }
}
