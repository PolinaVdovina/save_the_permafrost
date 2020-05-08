import React from 'react';
import Chart from './Chart';
import { Dialog, Button } from '@material-ui/core';


export default function DialogChart(props) {
    return(
        <Dialog open={props.open} onClose={props.close} fullWidth maxWidth='lg'>
            <Chart data={props.data}></Chart>
            <Button variant="contained" color="primary" onClick={props.close}>Закрыть</Button> 
        </Dialog>         
    )
} 