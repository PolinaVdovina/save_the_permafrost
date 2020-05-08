import ViewTable from "./ViewTable";
import React from 'react';
import { getHouseList, deleteHouse, changeHouse } from "../../https/houses";
import { getTubeList, deleteTube, changeTube } from "../../https/tubes";
import { getSampleList, changeSample, deleteSample } from "../../https/tubeSamples";
import { Backdrop, CircularProgress, DialogTitle, DialogActions, Dialog, Button, DialogContent } from "@material-ui/core";
import zIndex from "@material-ui/core/styles/zIndex";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { store } from "../../store";
import {setFilter, setPagination} from '../../actions/FilterActions'
import { typeSelectors } from "./filterSelectors";
function defaultFilters(settings) {
    let dict = {};
    Object.keys(settings.headers).map(key => dict[key] = [{ value: '', type: typeSelectors[settings.headers[key].type][0]  }] );
    return dict;
}

const mapStateToProps = function(state) {
    return {
        loggedIn: state.auth.loggedIn,
        login: state.auth.login,
        filter: state.filters.filter,
        pagination: state.filters.pagination,
        }
    }   


const defaultSettings = {
    title: 'Дома',
    headers: {
        street:   {value: 'Улица',    type: 'text' },         //ключ столбца, который будет показываться в таблице, является ключом из json
        district: {value: 'Район',    type: 'district' },         //type будет использоваться для коррекции ввода фильтра, выбора типа фильтра ( для строк и цифр = , >, <, диапазон)
        number:   {value: 'Дом',      type: 'text' },         
        id:       {value: 'Айдишник', type: 'integer' },
    },

    //Функции, которые вызываются при обращении к бакенду
    fetchFunctions: {
        getList: getHouseList,
        deleteRow: deleteHouse,
        changeRow: changeHouse,
    },

    //Действие, которое вызывается, когда мы 'входим в сущность' (Например, при входе в дом показываются его замеры)
    //enterButtonHandler: (id) => alert('Ты вошёл в дом ' + id + ', долбаёб'),
}


//Table Fetcher
class Kompot extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isFetching: false,
            fetchErrorDialog: false,
            tableData: [],
            rowCount: 0,
            redirectTo: null,
        };
        const {
            addivityTableKey=''
        } = props;
        const tableKey = props.settings.tableKey + addivityTableKey;
        if(!props.filter[tableKey]) {
            store.dispatch( setFilter(tableKey, defaultFilters(props.settings)) );
        }

    }
    
    getData = (filter, pagination, next) => {
        
        this.setState({isFetching: true});
        const {
            root = 'entities',
            settings = defaultSettings,      
            staticFilters,   
            advancedTableData='depths'
        } = this.props

        return settings.fetchFunctions.getList({
            onSuccess: (data) => {
                this.setState({
                    tableData: data[root], 
                    filter: filter, 
                    rowCount: data.count,
                    isFetching: false,
                    advancedTableData: data[advancedTableData]
                });
                

            },
            onFailed: () => {
                this.setState({isFetching: false, fetchErrorDialog: true});
            },
            filter: staticFilters ? {...filter, ...staticFilters} : filter,
            pagination: pagination,
            next: next,
        });
    }


    componentDidMount() {
        const {
            defaultPagination = {
                currentPage: 0, 
                rowsPerPage:10,
                rowCount: 0,
            },
            filter,
            defaultFilter = {},
            settings,
            pagination,
            addivityTableKey=''
        } = this.props;
        this.getData(filter[settings.tableKey+addivityTableKey], pagination[settings.tableKey+addivityTableKey] ? pagination[settings.tableKey+addivityTableKey] : defaultPagination);
    }

    onReloadData = (filter, pagination, next) => {
        return this.getData(filter, pagination, next);
    }

    deleteRowHandler = (rowIndex, rowData, next) => {
        const {
            settings = defaultSettings,
        } = this.props;

        return settings.fetchFunctions.deleteRow({
            id: rowData.id,
            next: next,
        });
    }

    enterRowHandler = (id) => {
        const {
            enterPage
        } = this.props; 
    }

    changeRowAcceptHandler = (id, value, next) => {
        const {
            settings = defaultSettings,
        } = this.props;
        
        this.setState({});
        settings.fetchFunctions.changeRow({value:value,next: next});
        
    }
    
    render() {
        const {
            enterPage,
            settings = defaultSettings,                      //Адрес функции для получения списка сущностей в бакенде
            defaultPagination = {
                currentPage: 0, 
                rowsPerPage:10,
            },
            drawHeader,
            drawBody,
            addivityTableKey='',
            filter,
            tableKey
        } = this.props;
        
        const {
            tableData = [],
            rowCount = 0,
            isFetching,
            fetchErrorDialog,
            advancedTableData
        } = this.state;

        if(!filter[settings.tableKey + addivityTableKey])
            return null;
        return (
            <React.Fragment>
                <Dialog open={fetchErrorDialog==true}>
                    <DialogTitle>Ошибка</DialogTitle>
                    <DialogContent>
                        Не удалось подключиться к серверу. Проверьте ваше соединение.
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ () => this.setState({fetchErrorDialog:false}) }> ОК</Button>
                    </DialogActions>
                </Dialog>
                
                {
                isFetching &&
                <Backdrop open={true} style={{zIndex:1000}}>
                    <CircularProgress/>
                </Backdrop>
                }
                <ViewTable
                drawHeader={drawHeader} 
                drawBody={drawBody}
                settings = {settings}
                tableData={tableData}
                onReloadData={this.onReloadData}
                defaultPagination={defaultPagination}
                rowCount={rowCount}
                onDeleteRow = {settings.fetchFunctions.deleteRow ? this.deleteRowHandler : null}
                onChangeRowAccept = {settings.fetchFunctions.changeRow ? this.changeRowAcceptHandler : null}
                enterButtonHandler={this.enterRowHandler}
                enterPage={enterPage}
                advancedTableData={advancedTableData}
                tableKey={settings.tableKey + addivityTableKey}
                />
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps)(Kompot)