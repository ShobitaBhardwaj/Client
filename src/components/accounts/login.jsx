import { useState } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';

import { API } from '../../service/api';


//styled is imported for css

const Component = styled(Box)`
width:400px;
margin:auto;
margin-top:30px;
box-shadow:5px 2px 5px 2px rgb(0 0 0/0.6);
`;
//Box with CSS is stored in component
//img is treated as a variable since it is a HTML tag
//Every HTML element is passed as a string and also we have to pass a object inside parenthesis and add the css inside the object.
// Remember the CSS inside objects are camel case
//Since it is a object comma will be used in place of semicolon
const Image = styled('img')({
    width:'400px',
    height:'200px',
    display: 'flex',
});

const Wrapper = styled(Box)`
padding:25px 35px;
display:flex;
flex:1;
padding-top:0;
flex-direction:column;
& > div, & > button,& > p{
    margin-top:20px;

}`;

const Loginbutton = styled(Button)`
height:48px;
border-radius:2px;
`


const Signupbutton = styled(Button)`
background:#fff;
height:48px;
border-radius:2px;
color:#2874F0;
box-shadow:0 2px 4px 0 rgb(0 0 0/20%);
`
//Creating a dummy object and store it under a state

const Error =styled(Typography)`
font-size:10px;
color: #ff6161;
line-height: 0;
margin-top:10px;
font-weight:600;
`

const signupInitialValues ={
    name:'',
    username:'',
    password:''
}

const Login = () => {//using function based components
    const imageURL = 'https://img.freepik.com/premium-photo/word-blog-blogging-concept-illustration-web-blogger_186380-2953.jpg';

    const [account, toggleAccount] = useState('login');
    //Creating a new state named signup
    //and a function of signup ie setsignup
    const [signup, setSignup] = useState(signupInitialValues);
    const [error, setError] = useState('');


    const toggleSignup = ()=>{
       account === 'signup' ? toggleAccount('login') : toggleAccount('signup') ;
    }
    //state is a const var can't be changed diresctly
    //so used state function toggleAccount
    //passing an event e
    //setsignup function will overrride the values so using ...signup so it will append it and keep the earlier values as it is
    const onInputChange = (e) =>{
        setSignup({...signup ,[e.target.name] :e.target.value}); //Creating key value pair
    }

    const signupUser = async ()=>{
      let response = await API.userSignup(signup);
      if(response.isSuccess){
        setError('');
        setSignup(signupInitialValues);
        toggleAccount('login');
      }else{
        setError('Something is wrong. Please try again later.');
      }
    }
    //Wrapping with Box
    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="login" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant="standard" label="Enter Username" />
                            <TextField variant="standard" label="Enter Password" />

                            { error && <Error>{error}</Error>}

                            <Loginbutton variant="contained">Login</Loginbutton>
                            <Typography style={{ textAlign: 'center' }}>OR</Typography>
                            <Signupbutton onClick={() => toggleSignup()}>Create an account</Signupbutton>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField variant="standard" onChange={(e) =>onInputChange(e)} name = 'name' label="Enter Name" />
                            <TextField variant="standard" onChange={(e) =>onInputChange(e)} name = 'username' label="Enter Username" />
                            <TextField variant="standard" onChange={(e) =>onInputChange(e)} name = 'password' label="Enter Password" />
                            
                            
                            { error && <Error>{error}</Error>}
                            <Signupbutton onClick={()=> signupUser()}>Signup</Signupbutton>
                            <Typography style={{ textAlign: 'center' }}>OR</Typography>
                            <Loginbutton variant="contained" onClick={() => toggleSignup()}>Already have an account</Loginbutton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}

export default Login;


//https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png
//https://img.freepik.com/premium-photo/word-blog-blogging-concept-illustration-web-blogger_186380-2953.jpg