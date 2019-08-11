import axios from 'axios';

export default class DataProvider {
 
    static getCurveData(){

        return axios.get('https://raw.githubusercontent.com/HongyuJiang/data-fitting/master/client/src/data/curve2.csv')
    }
    static getScatterData(){

        return axios.get('https://raw.githubusercontent.com/HongyuJiang/data-fitting/master/client/src/data/scatter.csv')
    }

}