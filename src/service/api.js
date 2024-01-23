//installed axios

import axios from 'axios';

import { API_NOTIFICATIONS_MESSAGES , SERVICE_URLS } from '../constants/config';

import { getAccessToken } from '../utils/common-utils';

const API_URL ='http://localhost:8000'

const axiosInstance = axios.create({
    baseURL : API_URL,
    timeout:10000,//MILLISECONDS
    headers:{
        "Content-Type":"application/json"
    }
})

//interceptor in case of request
//two callbacks are present as argument
axiosInstance.interceptors.request.use(
    function(config){
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
        return Promise.reject(processError(error))
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


const processError = (error) =>{
    if(error.response){
        //request made and server respond with a status other than 200
        //that falls out of the range of 2.x.x
        console.log('ERROR IN RESPONSE: ',error.toJSON());
        return{
            isError:true,
            msg : API_NOTIFICATIONS_MESSAGES.responseFailure,
            code : error.response.status
        }

    } else if(error.request){
        //request was made but no response was not recieved
        console.log('ERROR IN REQUEST: ',error.toJSON());
        return{
            isError:true,
            msg : API_NOTIFICATIONS_MESSAGES.requestFailure,
            code : ""
        }

    } else{
        //something wrong in frontend
        //something happened in setting up request that triggers an error
        console.log('ERROR IN NETWORK: ',error.toJSON());
        return{
            isError:true,
            msg : API_NOTIFICATIONS_MESSAGES.networkError,
            code : ""
        }

    }
}

const API ={};

//SINCE OBJECTS ARE THERE SO USINF FOR OF LOOP
for(const [key,value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadProgress) => 
        axiosInstance({
            method:value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            headers : {
                authorization : getAccessToken()
            },
            onUploadProgress: function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function(progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
    
}

export {API};