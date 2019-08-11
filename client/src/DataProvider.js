import axios from 'axios';

export default class DataProvider {
 
    static getCurveData(){

        return axios.get('./data/curve.csv')
    }
    static getScatterData(){

        return axios.get('./data/scatter.csv')
    }

}