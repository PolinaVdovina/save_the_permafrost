import React, { useState } from 'react';
import { TableHead, 
    TablePagination, 
    TableBody, 
    Table, 
    TableCell,
    TableRow,
    IconButton,
    withStyles,
    Paper,
    Typography,
    Menu,
    MenuItem,
    TextField,
    Button,
    Select,
    Grid,
    Toolbar,
    Tooltip,
    Fab} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh'
import FilterListIcon from "@material-ui/icons/FilterList";
import {useStyles} from './style';
import DoneIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import EnterIcon from '@material-ui/icons/ExitToApp';
import CloseIcon from '@material-ui/icons/Close';
import FilterDrawer from './FilterDrawer';
import {typeSelectors, changeTextFields, selectors} from './filterSelectors';
import {getHouseList} from '../../https/houses'
import ConfirmDialog from './ConfirmDialog';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {store} from '../../store'
import {setFilter, setPagination} from '../../actions/FilterActions'
//Для примера (это полученные с сервера данные о домах в Postman)
const defaultTableData = [
    {
      "district": "Кайеркан",
      "id": 13,
      "max_laying_depth": 22.0,
      "min_laying_depth": 5.0,
      "number": "22",
      "street": "Норильская"
    },
    {
      "district": "Норильск",
      "id": 14,
      "max_laying_depth": 12.0,
      "min_laying_depth": 2.0,
      "number": "22",
      "street": "Норильская"
    }
  ]


  const mapStateToProps = function(state) {
    return {
      loggedIn: state.auth.loggedIn,
      login: state.auth.login,
      filter: state.filters.filter,
      pagination: state.filters.pagination,
    }
}


//Еее, наш основной компонент
class ViewTable extends React.Component {
    constructor(props) {
        super(props);
        
        const {
            settings = {},
            defaultPagination = {
                currentPage: 0, 
                rowsPerPage:10,
            },
        } = props;
        
        this.state = {
            openCard: false,
            //Открыто ли окошко с фильтром?
            isFilterDrawerOpen: false,    
            pagination: defaultPagination,

            changeRecord: {
                id: null,
                values: {},
            },

            //Открытый диалог с подтверждением действия
            confirmDialog: null,    //Может принимать значения 'Change', 'Delete'

            //Выбранные фильтры для каждого столбца. Передается на бакенд
            filter: {
                //Пример того, что может быть внутри filter:
                    //street: [{value:'Норильская', type: 'equal'},...] // пример того, что в фильтре (фильтров на 1 ключ может быть много)
                    //number: [{value:'22', type: 'more'},...] 
            },

            //Выбранный комнонент для каждого фильтра (типа кешируем их, чтобы потом не создавать динамически и не вызывать перерисовки, не терять фокус в FilterDrawer)
            filterComponents: {
                //street: [TextField,...]
            }
        };

        //по умолчанию состояние фильтра - это массивы для каждого из ключей с одним незаполненным фильтром
        //Object.keys(словарь) - получаем массив из всех ключей в словаре [street, number, ...]
        //.map - перебираем каждый элемент массива, то есть ключ. Для каждого ключа задаем состояние по умолчанию.
       // Object.keys(settings.headers).map(key => this.state.filter[key] = [{ value: '', type: typeSelectors[settings.headers[key].type][0], Component: TextField  }] );
       
    }
    checkPage = () => {
        const {
            filter,
            pagination,
            tableKey,
            defaultPagination,
            rowCount,
            onReloadData
        } = this.props;
        if(rowCount > 0) {

            let actPag = pagination[tableKey] ? pagination[tableKey] : defaultPagination;
            if (actPag.currentPage * actPag.rowsPerPage > rowCount - 1) {
                const newPag ={...actPag, currentPage: (rowCount-1) / actPag.rowsPerPage};
                store.dispatch( setPagination(tableKey, newPag) );
                onReloadData && onReloadData(filter[tableKey], newPag)
            }
        }    
    }

    onReloadData = (options) => {
        const {
            filter,

            tableKey,
            defaultPagination,
            onReloadData
        } = this.props;
        let pagination = this.props.pagination[tableKey] ? this.props.pagination[tableKey] : defaultPagination
        if(options)
            if(options.pagination)
                pagination = options.pagination
        onReloadData && onReloadData(filter[tableKey], pagination, this.checkPage);
    }

    //Закрыть меню с фильтрами
    closeFilterDrawer = () => {
        const {
            filter,
            pagination,
            tableKey,
            defaultPagination,
            onReloadData
        } = this.props;
        
        this.setState( {isFilterDrawerOpen: false} );
        this.onReloadData();
    }

    //Открыть меню с фильтрами
    openFilterDrawer = () => this.setState( {isFilterDrawerOpen: true} )

    closeChangeRecord = () => {
        this.setState({
            changeRecord: {
                id: null,
                values: {}
            }
        });
    }
    //Отрисовка менюшки с фильтрами
    renderFilterDrawer = () => {
        const {
            settings = {},
            classes,
            filter,
            tableKey
        } = this.props;

        const {
            isFilterDrawerOpen,
            
        } = this.state;

        //Обработчик события при добавления фильтра (+) в контекстном меню
        const onAddClickHandler = (event, headerKey) => {
            const oldState = filter[tableKey];
            store.dispatch( setFilter(tableKey, {
                ...oldState,    
                [headerKey]: [...oldState[headerKey], {value:'', type: typeSelectors[settings.headers[headerKey].type][0]}]   
            }) );
            
        }

        //Обработчик события при удалении фильтра (корзина) в контекстном меню
        //Находится внутри цикл-метода, потому что этой фунции нужно знать ОДНОВРЕМЕННО
        //ключ заголовка, к которому относится фильтр (headerKey) (он получается из текущего компонента);
        //индекс элемента фильтра из массива (он получается из дочернего компонента через props)
        //другого способа передать в аргументы функции информацию из текущего и дочернего элемента одновременно я не нашел...
        const onDeleteClickHandler = (event, headerKey, index) => {
            const oldState = filter[tableKey];
            if (oldState[headerKey].length > 1) {
                const newFilter = oldState[headerKey].filter((value, ind) => index != ind );
                store.dispatch(
                    setFilter(tableKey, { ...oldState, [headerKey]:newFilter } ),
                );      
            }
            else {
                const newFilter = [{ value: '', type: oldState[headerKey][0].type }];
                store.dispatch(
                    setFilter(tableKey, { ...oldState, [headerKey]:newFilter  } ),
                );      
            }

        }
        
        //Обработчик изменения фильтра
        const onChangeHandler = (event, headerKey, index, isSelectorChanged) => {
            let newFilter = {};
            if(isSelectorChanged) {
                if(selectors[filter[tableKey][headerKey][index].type].variant == selectors[event.target.value].variant)
                    newFilter = { value: filter[tableKey][headerKey][index].value, type: event.target.value}
                else
                    newFilter = { value: '', type: event.target.value}
            }
            else
                newFilter = { value: event.target.value, type: filter[tableKey][headerKey][index].type}

            const oldState = filter[tableKey];
            oldState[headerKey][index] = newFilter;
            store.dispatch(
                setFilter(tableKey, oldState),
            );                
       
        }
        
        return (
            <FilterDrawer 
            headers = {settings.headers}
            filters = {filter[tableKey]}
            open={isFilterDrawerOpen} 
            onChange = {onChangeHandler}
            onDelete={onDeleteClickHandler}
            onAdd= {onAddClickHandler}
            onClose={this.closeFilterDrawer}/>
        )
    }

    //функция для создания заголовка таблиц и кнопок на них
    renderTableHeaders = () => {
        const {
            settings = {},
            classes,
            drawHeader,
            advancedTableData,
        } = this.props;

        return (
            <TableRow>
                <TableCell
                className = {classes.tableCell}/>
            {
                //Object.keys - получаем массив ключей из settings.header (например, такой: [street, district, number])
                //.map(итерация) - метод, создающий цикл, в котором проходим по каждому ключу
                Object.keys(settings.headers).map( (headerKey) => {                        
                    //для каждого ключа создаем соответствующую ячейку в заголовке таблицы и вешаем на нее обработчики 
                    //(например при нажатии на открытие контекстного меню с фильтром, или при добавлении (+) фильтра в меню)
                    
                    return (<TableCell
                    className = {classes.tableCell}
                    key={headerKey}>
                        {settings.headers[headerKey].value}
                    </TableCell>)}
                )
                //в итоге map() - возвращает массив TableCell'ов 
            }
            {
                advancedTableData &&
                advancedTableData.map((value) => 
                <TableCell>
                {value}
                </TableCell>)
            }
            </TableRow>
        )
    }



    //функция для создания тела таблицы
    renderTableBody = () => {
        const {
            tableData = defaultTableData,
            settings = {},
            onChangeRowAccept,
            onDeleteRow,
            onReloadData,
            rowCount,
            classes,
            enterButtonHandler,
            enterPage,
            drawBody,
            advancedTableData,
            pagination,
            defaultPagination,
            tableKey
        } = this.props;

        const {
            isFilterDrawerOpen,
            filter,
            
            changeRecord,
            confirmDialog
        } = this.state;

        const onChangeRowHandler = (id, value) => {
            this.setState({changeRecord: {
                id: id,
                values: value,
            }});

        }

        const onChangeRowCellHandler = (key, newValue) => {
            this.setState({changeRecord: {
                ...this.state.changeRecord,
                values: {
                    ...this.state.changeRecord.values,
                    [key]: newValue,
                }
            }});
        }

        const onChangeRowCancelHandler = () => {
            this.closeChangeRecord();
        }


        const onChangeRowAcceptHandler = (id) => {
            onChangeRowAccept(id, changeRecord.values, () => onReloadData(filter,pagination[tableKey] ? pagination[tableKey] : defaultPagination) ); 
            this.closeChangeRecord();
        }

        const onDeleteRowHandler = (id, value) => {
            //Проверяем, что мы не находимся на странице, индекс которой больше, чем всего страниц

            onDeleteRow && onDeleteRow(id, value, () => onReloadData(filter,pagination[tableKey] ? pagination[tableKey] : defaultPagination, this.checkPage))
        }

        return (
            <React.Fragment>
            {
                //Проходим по каждому элементу массива полученных от сервера данных (например, дому)
                tableData.map( (value, id) => 
                    //Каждый элемент массива - это строка в таблице
                    <TableRow key={id}> 
                    
                        <TableCell
                        className = {classes.tableCell}>
                            {
                            id != changeRecord.id && onDeleteRow && 
                            <React.Fragment>
                                <Tooltip title='Удалить запись'>                        
                                    <IconButton 
                                    onClick = { () => this.setState({confirmDialog:{actionName:'Delete', actionFunc: () => onDeleteRowHandler(id,value)} }) }>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
                            </React.Fragment>
                            }
                            {
                            id != changeRecord.id && onChangeRowAccept &&
                            <Tooltip
                            onClick = { () => onChangeRowHandler(id, value) } 
                            title='Изменить запись'>
                                <IconButton>
                                    <CreateIcon/>
                                </IconButton>
                            </Tooltip>
                            }
                            {
                            id == changeRecord.id && 
                            <React.Fragment>
                                <Tooltip title='Отменить'>                        
                                    <IconButton
                                    onClick = { onChangeRowCancelHandler }>
                                        <CloseIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip
                                title='Принять'>
                                    <IconButton
                                    onClick = { () => onChangeRowAcceptHandler(id) } >
                                        <CheckIcon/>
                                    </IconButton>
                                </Tooltip>
                            </React.Fragment>
                            }
                            {
                                (enterPage &&
                                changeRecord.id==null) && 
                                <Tooltip title='Подробнее'>                        
                                    <IconButton
                                    component={Link}
                                    to={enterPage+tableData[id].id}
                                    >
                                        <EnterIcon/>
                                    </IconButton>
                                </Tooltip>
                            }
                        </TableCell>
                        {
                            //Object.keys - получаем массив ключей из settings.header ([street, district, number])
                            //.map - метод, создающий цикл, в котором проходим по каждому ключу (так же как и при создании заголовка)
                            Object.keys(settings.headers).map( (headerKey) => 
                            {
                                const Comp = changeTextFields[ settings.headers[headerKey].type  ];

                                //для каждого ключа создаем соответствующую ячейку в теле таблицы. 
                                //Так как название ключей у settings.header - это названия ключей из json,
                                //то берем данные у элемента, полученного на сервере, с таким же ключом

                                if(id >= 1 && 'group' in settings.headers[headerKey]) {
                                    if(tableData[id][headerKey] == tableData[id-1][headerKey]) {
                                        return <TableCell/>;
                                    }
                                }
                                
                                return (id != changeRecord.id && 
                                <TableCell
                                className = {classes.tableCell} 
                                key={headerKey}>
                                    <Typography>{value[headerKey]}</Typography>
                                </TableCell>
                                ||
                                id == changeRecord.id && 
                                <TableCell
                                className = {classes.tableCell}
                                key={headerKey}>
                                    <Comp
                                    fullWidth
                                    onChange={(event) => onChangeRowCellHandler(headerKey, event.target.value)}
                                    value={changeRecord.values[headerKey]}/>
                                </TableCell>)
                            }
                            )
                        }
                        {   advancedTableData && advancedTableData.map((value, index) => 
                            <TableCell>
                            {tableData[id].depth_values[index]}
                            </TableCell>
                        )}
                    </TableRow>
                )
            }
            </React.Fragment>
        )
    }

    onChangeRowsPerPageHandler = (event) => {
        const {
            onChangePerPage,
            onReloadData,
            filter,
            tableKey,
            pagination,
            defaultPagination
        } = this.props;

        if(!pagination[tableKey]) {
            store.dispatch(setPagination(tableKey, defaultPagination));
        }

        const newPag = {
            currentPage: 0,
            rowsPerPage: Number(event.target.value)
        }

        store.dispatch(setPagination(tableKey, newPag));
        
        if(onChangePerPage)
            onChangePerPage(event.target.value);
        
        this.closeChangeRecord();
        this.onReloadData({pagination: newPag});
    }

    onChangePageHandler = (event,newPage) => {
        const {
            onReloadData,
            tableKey,
            filter,
            pagination,
            defaultPagination
        } = this.props;

        if(!pagination[tableKey]) {
            store.dispatch(setPagination(tableKey, defaultPagination));
        }

        const newPag = {
            ...pagination[tableKey],
            currentPage: newPage , 
        }
        store.dispatch(setPagination(tableKey, newPag));
        this.closeChangeRecord();
        this.onReloadData({pagination: newPag});
    }

    render() {
        const {
            settings,
            classes,
            rowCount,
            onReloadData,
            onBack,
            filter,
            tableKey,
            defaultPagination,
            pagination,
            CardDialog,
            parentId,
        } = this.props;

        const {
            confirmDialog,
            openCard
        } = this.state;


        return (
            <React.Fragment>
                <CardDialog open={openCard} onClose={() => { this.setState({openCard:false}); this.onReloadData() }} parentId={parentId}/>
                
                {this.renderFilterDrawer()}
                {confirmDialog!=null && 
                    <ConfirmDialog
                    title='Подтверждение действия' 
                    description='Вы точно хотите удалить запись?'
                    onAccept = { 
                        () => {
                            confirmDialog.actionFunc();
                            this.setState({confirmDialog:null})
                        } 
                    }
                    onCancel = { () => this.setState({confirmDialog:null}) }
                    open={true}/>}
                <Paper className = {classes.paper}>
                    <Toolbar>
                        {
                        onBack && 
                        <Tooltip title='Назад'>
                            <IconButton
                            onClick = {() => this.onReloadData() }
                            className={classes.filterButton}>
                                <BackIcon 
                                className={classes.filterButtonIcon}/>
                            </IconButton>
                        </Tooltip>
                        }
                        <Typography 
                        variant='h6'
                        className={classes.title}>
                            {settings.title}
                        </Typography>
                        <Tooltip title='Обновить'>
                            <IconButton
                            onClick = {() => this.onReloadData() }
                            className={classes.filterButton}>
                                <RefreshIcon 
                                className={classes.filterButtonIcon}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Изменить фильтры'>
                            <IconButton
                            onClick = {() => this.openFilterDrawer()}
                            className={classes.filterButton}>
                                <FilterListIcon 
                                className={classes.filterButtonIcon}/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Добавить запись'>
                            <IconButton
                            onClick={() => this.setState({openCard:true})}
                            className={classes.filterButton}>
                                <AddIcon
                                className={classes.filterButtonIcon}/>
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                    <Table style={{ tableLayout: 'auto' }} fixedHeader={false}>
                        <TableHead className = {classes.tableHead}>
                        { this.renderTableHeaders() }
                        </TableHead>
                        
                        <TableBody>
                        { this.renderTableBody() }
                        </TableBody>
                        <TablePagination
                            rowsPerPageOptions={[1, 10, 15, 25, 50, 75, 100]}
                            count = { rowCount }
                            rowsPerPage = { pagination[tableKey] ? pagination[tableKey].rowsPerPage : defaultPagination.rowsPerPage }
                            page = { pagination[tableKey] ? pagination[tableKey].currentPage : defaultPagination.currentPage }
                            onChangeRowsPerPage = { this.onChangeRowsPerPageHandler }
                            onChangePage = {this.onChangePageHandler}
                            labelRowsPerPage='Строк на странице'
                        />
                    </Table>
                </Paper>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps)(withStyles(useStyles)(ViewTable));  //хуков для стилей у меня нет блять (классы сука), поэтому экспорт делается так