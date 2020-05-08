import React, { useState } from 'react';
import { Dialog, Button } from '@material-ui/core';
import HouseCard from './HouseCard';
import TubeCard from './TubeCard';
import SampleCard from './SampleCard';

export function CreateHouse(props) {
    const {
        open=false,
        onClose,
        onReloadData
    } = props;

    return(
        <Dialog open={open}>
            <HouseCard onReloadData={onReloadData} close={onClose} isCreate/>
        </Dialog>
    )
}

export function CreateTube(props) {
    const {
        open=false,
        onClose,
        onReloadData
    } = props;

    return(
        <Dialog open={open}>
            <TubeCard onReloadData={onReloadData} parentId={props.parentId} close={onClose} isCreate/>
        </Dialog>
    )
}

export function CreateSample(props) {
    //const [open, setOpen] = useState(props.open);
    const {
        open=false,
        onClose,
        onReloadData
    } = props;
    return(
        <Dialog open={open}>
            <SampleCard onReloadData={onReloadData} parentId={props.parentId} close={onClose} isCreate/>
        </Dialog>
    )
}