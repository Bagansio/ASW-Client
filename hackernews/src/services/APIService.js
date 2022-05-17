import axios from "axios";

const API_URL = "https://cors-anywhere.herokuapp.com/https://asw-2022.herokuapp.com/api";
const token = 'Token c5307996d4ab85032a347eed56a84c855adc807f';
const headers = {
    accept: 'application/json',
    Authorization: token,

}

const instance = axios.create({
    withCredentials: true,
    baseURL: API_URL
    
})

class APIService {

    get(route) {
        return axios.get(API_URL + route, { headers: headers });
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
