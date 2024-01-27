//API_NOTIFICATIONS_MESSAGES

export const API_NOTIFICATIONS_MESSAGES ={
    loading:{
        title:'Loading...',
        message: 'Data is being loaded, Please wait'
    },
    success:{
        title:'Success',
        message:'Data Successfully loaded'
    },
    responseFailure :{
        title:'Error',
        message:'An error occured while fetching response from the server. Try again later'
    },
    requestFailure :{
        title:'Error',
        message:'An error occured while parsing request data'
    },
    networkError :{
        title:'Error',
        message:'Unable to connect to server. Please check internet connectivity and try again later'
    }

}


//API service call
//In order to add new api just add object
export const SERVICE_URLS ={
    userSignup : { url : '/signup',method: 'POST'},
    userLogin : { url : '/login', method:'POST'},
    uploadFile : { url: '/file/upload', method:'POST' },
    createPost : {url: 'create',method:'POST'},
    getAllPosts: { url:'/posts',method:'GET' }
}