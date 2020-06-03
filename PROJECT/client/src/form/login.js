import React,{useState} from 'react';
import axios from "axios"


export default function LoginForm(props){
    const[error,setError]= useState({
        emailerr : "",
        passworderr:"",
    });
    const[email,setEmail]=useState(''); 
    const[password,setPassword]=useState('');

    const handlechange=(e)=>{
    
        if (e.target.name==='email')
        setEmail(e.target.value);
        else 
        setPassword(e.target.value);
       
    }
    const validate=()=>{
  
        let emailerr="";
        let passworderr="";
        let len_pass=password.length;

        if(!email.includes("@") || !email.includes(".") )
        {
            if(!email)
            {emailerr="EMAIL CANNOT BE LEFT BLANK";}
            else
            {emailerr="INVALID EMAIL"}
            
        }

        if(len_pass<6)
        {
            passworderr="PASSWORD SHOULD HAVE MINIMUM 6 CHARACTERS"
        }  

        if(emailerr||passworderr)
        {
            setError({...error,emailerr:emailerr,passworderr:passworderr});  
            return false;  
        }

        return true;
    }
    
    const handlesubmit=(e)=>{
        e.preventDefault();
        const isvalid=validate();
       if(isvalid){
         axios.post('/login',{email:email,password:password})
            .then(res=>{  
                localStorage.setItem("auth-token",JSON.stringify(res.data.token))
                props.history.push('/home')
            })
            .catch(err=>{
               window.alert(err.response.data);
              
            })
          initialise(); 

        }
        
    }
    const initialise=()=>{
        console.log(email,password); 
        setEmail('');
        setPassword('');
        setError({...error,emailerr:"",passworderr:""});
    }
        
    return(
           
        <div>
            <h2 style={{marginLeft:1178,paddingTop:120,marginBottom:0}}>LOGIN</h2>
            <section>
                <form onSubmit={handlesubmit} >                    
                    <div>
                        <input name="email" placeholder="Email" value={email} onChange={handlechange}/>
                        <p style={{fontSize:10,color:"red"}}><b>{error.emailerr}</b></p>
                    </div> 

                    <div>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={handlechange}/>
                        <p style={{fontSize:10,color:"red"}}><b>{error.passworderr}</b></p>
                    </div>

                    <div>
                        <button type='submit' >LOGIN</button>   
                        <button onClick={()=>{window.location.href='/register'}}  >REGISTER</button>
                    </div>
                </form>
            </section>
        </div>
    )
        
    
}
