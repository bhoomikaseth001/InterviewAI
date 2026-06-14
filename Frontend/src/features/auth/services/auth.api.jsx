import axios from "axios"

//because this part was common in all the functions(leaving in 1st function and replacing in others for understanding)
const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})


//these 4 funcitons will interact with the apis created at the frontend

export async function register({username,email, password}){
     //the register api created at the backend registers the user along with that create token and add that token to the cookies
    //but using axios at the frontend will not give u the cookies access to the server, hence we need to send axios along with a flag "withCredentials:true" 
    try{

    const response = await axios.post('http://localhost:3000/api/auth/register',{
        withCredentials:true
    })
    
    return response.data
    }
    catch(err){
        console.log(err)
    }
}

export async function login({email,password}){
    try{
        const response = await api.post('/api/auth/login')
        return response.data
    }
    catch(err){
        console.log(err)
    }
}

export async function logout(){
    try{
        const response = await api.get('/api/auth/logout')

        return response.data
    }
    catch(err){
        console.log(err)
    }
}

export async function getMe(){
    try{
        const response = await api.get('/api/auth/get-me')

        return response.data
    }
    catch(err){
        console.log(err)
    }
}


   
