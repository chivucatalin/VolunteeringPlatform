import * as React from 'react';
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import { eventPageChange } from '../../store/pagination.js'


const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
}
//ca sa putem alege pagina de la evenimente
export const PageChoose = () => {
    const dispatch = useDispatch()
    const { pagination } = useSelector(state => state.pagination)
    return (<div>
        <Pagination count={
            parseInt(pagination.eventTotal / pagination.eventItemsPerPage) + 1
        } showFirstButton showLastButton sx={style} onChange={(ev, page) => dispatch(eventPageChange(parseInt(page)))} 
        page={pagination.eventTotal}/>
    </div>)
}