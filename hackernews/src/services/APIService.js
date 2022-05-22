import axios from "axios";

const API_URL = "https://asw-2022.herokuapp.com/api";
const token = 'Token dd8b60cb3ffefa4c7102e5c255752e28eedca1a7';
const headers = {
    accept: 'application/json',
    Authorization: token,
    

}



class APIService {

    get(route) {
        return axios.get(API_URL + route , { headers: headers });
    }
    
    post(route, body) {
        return axios.post(API_URL + route, body, { headers: headers });
    }

    put(route, body) {
        return axios.put(API_URL + route, body, { headers: headers });
    }

    delete(route) {
        return axios.delete(API_URL + route, { headers: headers });
    }
}

export default new APIService();