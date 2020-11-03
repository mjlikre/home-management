import {GET_CLIENT, GET_CLIENT_ERROR, GET_DAILY, GET_DAILY_ERROR, GET_MONTHLY, GET_MONTHLY_ERROR, INPUT_DATA, INPUT_DATA_ERROR, GET_SUMMARY, GET_SUMMARY_ERROR} from "./types"
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
        const res = await axios.post("/api/operations/delete", data)
    }catch(e) {
        console.log(e)
    }
}