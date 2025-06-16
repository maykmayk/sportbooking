import axios from "axios";

export default class ApiManager {
    axiosClient = axios.create();

    constructor() {
        this.init();
    }

    init() {
        // Imposta il baseURL di default
        this.axiosClient.defaults.baseURL = process.env.REACT_APP_BASE_URL;
        // this.axiosClient.defaults.baseURL = '/api';

        this.axiosClient.defaults.headers.common = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Access-Control-Allow-Origin': '*'
        };
    }

    // Metodo GET
    async get(url, options = {}, customBaseUrl = null) {
        const client = customBaseUrl ? this.createClient(customBaseUrl) : this.axiosClient;
        return client.get(url, options).then(response => response);
    }

    // Metodo POST
    async post(url, payload, options = {}, customBaseUrl = null) {
        const client = customBaseUrl ? this.createClient(customBaseUrl) : this.axiosClient;
        return client.post(url, payload, options).then(response => response);
    }

    // Metodo DELETE
    async delete(url, options = {}, customBaseUrl = null) {
        const client = customBaseUrl ? this.createClient(customBaseUrl) : this.axiosClient;
        return client.delete(url, options).then(response => response);
    }

    // Metodo PUT (aggiunto)
    async put(url, payload, options = {}, customBaseUrl = null) {
        const client = customBaseUrl ? this.createClient(customBaseUrl) : this.axiosClient;
        return client.put(url, payload, options).then(response => response);
    }

    // Crea un nuovo client con un baseURL personalizzato
    createClient(customBaseUrl) {
        return axios.create({
            baseURL: customBaseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });
    }
}
