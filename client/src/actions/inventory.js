import {
    GET_INVENTORY,
    INVENTORY_ERROR
  } from "./types";

import axios from "axios";

export const getInventory = (callback) => async (dispatch) => {
try {
    const res = await axios.post("/api/inventory/get");
    dispatch({ type: GET_INVENTORY, payload: res.data });
    callback();
} catch (e) {
    dispatch({ type: INVENTORY_ERROR, payload: e });
}
};

export const updateInventory = (data, callback) => async (dispatch) => {
try {
    const res = await axios.post("/api/inventory/update", data);
    dispatch({ type: GET_INVENTORY, payload: res.data });
    callback();
} catch (e) {
    dispatch({ type: INVENTORY_ERROR, payload: e });
}
};

export const newInventory = (data, callback) => async (dispatch) => {
try {
    const res = await axios.post("/api/inventory/new", data);
    dispatch({ type: GET_INVENTORY, payload: res.data });
    callback();
} catch (e) {
    dispatch({ type: INVENTORY_ERROR, payload: e });
}
};