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
        Object.keys(settings.headers).map(key => this.state.filter[key] = [{ value: '', type: typeSelectors[settings.headers[key].type][0], Component: TextField  }] );
    }


    componentDidMount() {
        getHouseList(
            (houseList) => {
                
            }
        );
    }

    //Закрыть меню с фильтрами
    closeFilterDrawer = () => {
        this.setState( {isFilterDrawerOpen: false} );
        this.props.onReloadData && this.props.onReloadData(this.state.filter, this.state.pagination);
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
            classes
        } = this.props;

        const {
            isFilterDrawerOpen,
            filter,
        } = this.state;

        //Обработчик события при добавления фильтра (+) в контекстном меню
        const onAddClickHandler = (event, headerKey) => {
            this.setState( (oldState) => ({
                    //Новое состояние фильтра - это старое состояние фильтра (...oldState.filter) + новое значение фильтра по данному ключу,
                    //в который мы ДОБАВЛЯЕМ новый фильтр, а не перееопределяем его полностью (для этого ...oldState.filter[headerKey])
                    filter: {
                        ...oldState.filter,    
                        [headerKey]: [...oldState.filter[headerKey], {value:'', type: typeSelectors[settings.headers[headerKey].type][0]}]   
                    }
                }) 
            );
        }

        //Обработчик события при удалении фильтра (корзина) в контекстном меню
        //Находится внутри цикл-метода, потому что этой фунции нужно знать ОДНОВРЕМЕННО
        //ключ заголовка, к которому относится фильтр (headerKey) (он получается из текущего компонента);
        //индекс элемента фильтра из массива (он получается из дочернего компонента через props)
        //другого способа передать в аргументы функции информацию из текущего и дочернего элемента одновременно я не нашел...
        const onDeleteClickHandler = (event, headerKey, index) => {
            this.setState( oldState => {
                if (oldState.filter[headerKey].length > 1) {
                    const newFilter = oldState.filter[headerKey].filter((value, ind) => index != ind );
                    return { filter: {...oldState.filter, [headerKey]:newFilter } }
                }
                else {
                    const newFilter = [{ value: '', type: oldState.filter[headerKey][0].type }];
                    return { filter: {...oldState.filter, [headerKey]:newFilter } }
                }
            } );
        }
        
        //Обработчик изменения фильтра
        const onChangeHandler = (event, headerKey, index, isSelectorChanged) => {
            let newFilter = {};
            if(isSelectorChanged) {
                if(selectors[filter[headerKey][index].type].variant == selectors[event.target.value].variant)
                    newFilter = { value: filter[headerKey][index].value, type: event.target.value}
                else
                    newFilter = { value: '', type: event.target.value}
            }
            else
                newFilter = { value: event.target.value, type: filter[headerKey][index].type}

            
            this.setState( (oldState) => {
                //Новое состояние фильтра - это старое состояние фильтра (...oldState.filter) + новое значение фильтра по данному ключу,
                //в который мы ДОБАВЛЯЕМ новый фильтр, а не перееопределяем его полностью (для этого ...oldState.filter[headerKey])
                oldState.filter[headerKey][index] = newFilter;
                return {filter: {
                    ...oldState.filter,     
                }}
            } );     

        }
        
        return (
            <FilterDrawer 
            headers = {settings.headers}
            filters = {filter}
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
        } = this.props;

        return (
            <TableRow>
                <TableCell
                className = {classes.tableCell}/>
            {
                //Object.keys - получаем массив ключей из settings.header (например, такой: [street, district, number])
                //.map(итерация) - метод, создающий цикл, в котором проходим по каждому ключу
                Object.keys(settings.headers).map( (headerKey) => (                        
                    //для каждого ключа создаем соответствующую ячейку в заголовке таблицы и вешаем на нее обработчики 
                    //(например при нажатии на открытие контекстного меню с фильтром, или при добавлении (+) фильтра в меню)
                    <TableCell
                    className = {classes.tableCell}
                    key={headerKey}>
                        {settings.headers[headerKey].value}
                    </TableCell>)
                )
                //в итоге map() - возвращает массив TableCell'ов 
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

        } = this.props;

        const {
            isFilterDrawerOpen,
            filter,
            pagination,
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
            onChangeRowAccept(id, changeRecord.values, () => onReloadData(filter, pagination) ); 
            this.closeChangeRecord();
        }

        const onDeleteRowHandler = (id, value) => {
            //Проверяем, что мы не находимся на странице, индекс которой больше, чем всего страниц
            const checkPage = () => {
                if(rowCount > 0) {
                    if (pagination.currentPage * pagination.rowsPerPage > rowCount - 1) {
                        const newPag = {...pagination, currentPage: pagination.currentPage-1};
                        this.setState( { pagination: newPag  });
                        onReloadData && onReloadData(filter, newPag)
                    }
                }    
            }
            onDeleteRow && onDeleteRow(id, value, () => onReloadData(filter,pagination, this.checkPage))
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
                            id != changeRecord.id && 
                            <React.Fragment>
                                <Tooltip title='Удалить запись'>                        
                                    <IconButton 
                                    onClick = { () => this.setState({confirmDialog:{actionName:'Delete', actionFunc: () => onDeleteRowHandler(id,value)} }) }>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip
                                onClick = { () => onChangeRowHandler(id, value) } 
                                title='Изменить запись'>
                                    <IconButton>
                                        <CreateIcon/>
                                    </IconButton>
                                </Tooltip>
                            </React.Fragment>
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
                    </TableRow>
                )
            }
            </React.Fragment>
        )
    }

    onChangeRowsPerPageHandler = (event) => {
        const {
            onChangePerPage,
            onReloadData
        } = this.props;

        const newPag = {
            ...this.state.pagination,
            currentPage: 0,
            rowsPerPage: Number(event.target.value)
        }
        this.setState({pagination: newPag});

        if(onChangePerPage)
            onChangePerPage(event.target.value);
        
        this.closeChangeRecord();
        onReloadData && onReloadData(this.state.filter, newPag);
    }

    onChangePageHandler = (event,newPage) => {
        const {
            onReloadData
        } = this.props;
        const newPag = {
            ...this.state.pagination,
            currentPage: newPage , 
        }
        this.setState({pagination: newPag});
        this.closeChangeRecord();
        onReloadData && onReloadData(this.state.filter, newPag);
    }

    render() {
        const {
            settings,
            classes,
            rowCount,
            onReloadData,
            onBack
        } = this.props;

        const {
            pagination,
            confirmDialog,
            filter
        } = this.state;



        return (
            <React.Fragment>
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
                            onClick = {() => onReloadData(filter, pagination) }
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
                            onClick = {() => onReloadData(filter, pagination) }
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
                    </Toolbar>
                    <Table style={{ tableLayout: 'auto' }} fixedHeader={false}>
                        <TableHead className = {classes.tableHead}>
                        { this.renderTableHeaders() }
                        </TableHead>
                        
                        <TableBody>
                        { this.renderTableBody() }
                        </TableBody>

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15, 25, 50, 75, 100]}
                            count = { rowCount }
                            rowsPerPage = { pagination.rowsPerPage }
                            page = { pagination.currentPage }
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

export default  withStyles(useStyles)(ViewTable);  //хуков для стилей у меня нет блять (классы сука), поэтому экспорт делается так