import axios from 'axios';
import { URLS } from "../../../api/baseUrl";

export default {
    getItems(payload) {
        return axios.get(`${URLS.currentBaseUrl()}`, payload)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error)
            });
    },
    getDataList(payload) {
        return axios.get(payload)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                console.log(error)
            });
    },
};