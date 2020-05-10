import React from 'react';
import Chart from './Chart';
import { Dialog, Button, DialogTitle, DialogContent, Typography } from '@material-ui/core';


export default function DialogChart(props) {
    return(
        <Dialog open={props.open} onClose={props.close} fullWidth maxWidth='lg'>
            <DialogTitle>
                <Typography variant="h3">
                    Скважина {props.data[0].tube}
                </Typography>                
            </DialogTitle>
            <Chart data={props.data}></Chart>
            <Button variant="contained" color="primary" onClick={props.close}>Закрыть</Button>           
        </Dialog>         
    )
} 