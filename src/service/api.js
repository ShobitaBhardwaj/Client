//installed axios

import axios from 'axios';

import { API_NOTIFICATIONS_MESSAGES , SERVICE_URLS } from '../constants/config';

import { getAccessToken , getType } from '../utils/common-utils';

const API_URL ='http://localhost:8000';

const axiosInstance = axios.create({
    baseURL : API_URL,
    timeout:10000,//MILLISECONDS
    headers:{
        "content-Type":"application/json"
    }
});

//interceptor in case of request
//two callbacks are present as argument
axiosInstance.interceptors.request.use(
    function(config){
        if (config.TYPE.params){
            config.params = config.TYPE.params;
        } else if (config.TYPE.query){
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error){
        console.log("HEllo");
        return Promise.reject(error);
    }
)


//interceptor in case of response
axiosInstance.interceptors.response.use(
    function(response){
        //stop global loader here
        return processResponse(response);
    },
    function(error){
        //stop global loader here
        return Promise.reject(processError(error));
    }
)

///////////////////////////////
//if success -> return {isSucess : true, data:Object}
//if fail -> return {isFailure:true, status:string,msg:string,code :int}
//////////////////////////////

const processResponse = (response) =>{
    if (response?.status === 200){
        return {isSuccess : true, data : response.data}
    }
    else{
        return{
            isFailure : true,
            status : response?.status,
            msg: response?.msg,
            code: response?.code
    }
  }
}


///////////////////////////////
//if success -> return {isSucess : true, data:Object}
//if fail -> return {isFailure:true, status:string,msg:string,code :int}
//////////////////////////////


const processError = async (error) => {
    if (error.response) {
        // Request made and server responded with a status code 
        // that falls out of the range of 2xx
        if (error.response?.status === 403) {    
            sessionStorage.clear();
        } else {
            console.log("ERROR IN RESPONSE: ", error.toJSON());
            return {
                isError: true,
                msg: API_NOTIFICATIONS_MESSAGES.responseFailure,
                code: error.response.status
            }
        }
    } else if (error.request) { 
        // The request was made but no response was received
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATIONS_MESSAGES.requestFailure,
            code: ""
        }
    } else { 
        // Something happened in setting up the request that triggered an Error
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICATIONS_MESSAGES.networkError,
            code: ""
        }
    }
}


const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken(),
            },
            TYPE: getType(value, body),
            onUploadProgress: function(progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
}

export { API };