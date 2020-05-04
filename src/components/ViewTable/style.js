import { makeStyles } from '@material-ui/core/styles';

export const useStyles = (theme) => ({
    tableHead: {
        //backgroundColor: theme.palette.primary['200'],
        //color: theme.palette.common.white,
    },

    filterButton: {
        width: '48px',
        height: '48px'
    },

    filterButtonIcon: {
        width: '32px',
        height: '32px'
    },
    
    tableCell: {
        width: '150px'
    },
    
    filterDrawer: {
        padding: '12px',
        width: '420px'
    },

    paper: {
        overflow: 'hidden',
        
    },

    headerCell: {

    },

    title: {
        flexGrow: 1,
    }
});