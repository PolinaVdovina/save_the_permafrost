import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

export default (props) =>
{
    const {
        open=false,
        title='Внимание',
        description='Сообщение',
        onAccept,
        onCancel,
    } = props;

    return (
        <Dialog open={open}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {description}
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Отмена</Button>
                <Button onClick={onAccept}>ОК</Button>
            </DialogActions>
        </Dialog>
    )
}