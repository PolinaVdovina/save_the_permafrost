import React from 'react';
import Typography from '@material-ui/core/Typography';
import {list} from '../pages/pages'
import { Link } from 'react-router-dom';


export default function AuthError() {
    return(
        <Typography variant='h6'> 
                Для этого действия вам необходимо <Link to={list.auth.shortPath}>авторизироваться</Link>
        </Typography>
    )
}