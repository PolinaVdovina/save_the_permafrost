import { getHouseList, deleteHouse, changeHouse } from "../../https/houses";
import { getTubeList, deleteTube, changeTube } from "../../https/tubes";
import { getSampleList, changeSample, deleteSample } from "../../https/tubeSamples";


export const houseSettings = {
    title: 'Дома',
    //enterButtonHandler: (id) => alert('Ты вошёл в дом ' + id + ', долбаёб'),
    headers: {
        street:               {value: 'Улица',    type: 'text' },         
        district:             {value: 'Район',    type: 'district' },         
        number:               {value: 'Дом',      type: 'text' },         
        minLayingDepth:       {value: 'Глубина заложения фундамента (мин.)', type: 'float' },
        maxLayingDepth:       {value: 'Глубина заложения фундамента (макс.)', type: 'float' },
    },

    fetchFunctions: {
        getList: getHouseList,
        deleteRow: deleteHouse,
        changeRow: changeHouse,
    }
}

export const tubeSettings = {
    title:'Трубки',
    headers: {
        value:               {value: 'Наименование',    type: 'text' },         
        depth:             {value: 'Глубина',    type: 'float' },         
    },

    fetchFunctions: {
        getList: getTubeList,
        deleteRow: deleteTube,
        changeRow: changeTube,
    }
}

export const samplesSettings = {
    title: 'Замеры',
    headers: {
        date:             {value: 'Дата',    type: 'date' },
        depth:             {value: 'Глубина',    type: 'float' },         
        value:             {value: 'Температура',    type: 'text' },         
    },

    fetchFunctions: {
        getList: getSampleList,
        deleteRow: deleteSample,
        changeRow: changeSample,
    }
}