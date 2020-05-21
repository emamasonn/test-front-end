import {DELETE_TRANSACTION, CREATE_TRANSACTION, REFRESH_TRANSACTION, LOAD_TRANSACTION} from '../typesAction'

export const createTransaction = (data) => ({
    type: CREATE_TRANSACTION,
    payload: data
 });

 export const deleteTransaction = (id) => ({
    type: DELETE_TRANSACTION,
    payload: id
 });

 
 export const refreshTransaction = (data) => ({
   type: REFRESH_TRANSACTION,
   payload: data
});

export const loadTransaction = (data) => ({
   type: LOAD_TRANSACTION,
   payload: data
});