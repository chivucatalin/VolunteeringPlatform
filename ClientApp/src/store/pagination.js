import { createSlice } from '@reduxjs/toolkit'

//unde tinem datele despre paginare -la ce pagina suntem,cate elemente pe pagina avem si cate evenimente am primit din backend

const slice = createSlice({
    name: 'pagination',
    initialState: {
        pagination: {
            eventPage:1,
            eventItemsPerPage:4,
            eventTotal:0
        },
    },
    reducers: {
       _eventPageChange: (state,action) =>{
        state.pagination.eventPage=action.payload;
       },
       _eventItemsChange: (state,action) =>{
        state.pagination.eventItemsPerPage=action.payload;
       },
       _eventTotalChange:(state,action)=>{
        state.pagination.eventTotal=action.payload;
       }
    },
});
export default slice.reducer

const { _eventPageChange , _eventItemsChange , _eventTotalChange} = slice.actions
export const eventPageChange = (pageNumber) => async dispatch => {
    try {
        dispatch(_eventPageChange(pageNumber));
    } catch (e) {
        return console.error(e.message);
    }
}

export const eventItemsChange = (pageSize) => async dispatch => {
    try {
        dispatch(_eventItemsChange(pageSize));
    } catch (e) {
        return console.error(e.message);
    }
}

export const eventTotalChange = (eventTotal) => async dispatch => {
    try {
        dispatch(_eventTotalChange(eventTotal));
    } catch (e) {
        return console.error(e.message);
    }
}
