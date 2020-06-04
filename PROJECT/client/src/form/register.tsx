import React,{useState} from 'react';
import axios from "axios"



export default function RegisterForm(props:any){
    const[error,setError]= useState({
        nameerr : " ",
        emailerr : "",
        passworderr:"",
        confirmpassworderr:"",
        numbererr:""
    });
    const[number,setNum]=useState('');
    const[email,setEmail]=useState('');
    const[name,setName]=useState('');
    const[password,setPassword]=useState('');
    const[confirmpassword,setConfirmpassword]=useState('');
    const[state,setstate]=useState('');
    
    const handlechange=(e:any)=>{

        if(e.target.name==='name')
        setName(e.target.value);
        else if (e.target.name==='email')
        setEmail(e.target.value);
        else if (e.target.name==='password')
        setPassword(e.target.value);
        else if (e.target.name==='confirmpassword')
        setConfirmpassword(e.target.value);
        else if (e.target.name==='number')
        setNum(e.target.value);
        else 
        setstate(e.target.value);
    }
    const validate=()=>{
        let nameerr ="";
        let emailerr="";
        let passworderr="";
        let confirmpassworderr="";
        let numbererr="";
        let len_confirmpass=confirmpassword.length;
        
        let len_pass=password.length;

        if(!name)
        {
            nameerr="NAME CANNOT BE LEFT BLANK";
               
        }
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
        if(password)
        {
            if(len_confirmpass<6)
            {
                confirmpassworderr="PASSWORD SHOULD HAVE MINIMUM 6 CHARACTERS"
            }  
            else if(confirmpassword!==password)
            {
                confirmpassworderr="BOTH PASSWORDS DOESN'T MATCH "
            }
        }

        if(number.length!==10)
         {
             numbererr="MOBILE NUMBER SHOULD HAVE EXACTLY 10 DIGITS"
         }
        if(nameerr||numbererr||emailerr||passworderr||confirmpassworderr)
        {
             setError({...error,nameerr:nameerr,emailerr:emailerr,passworderr:passworderr,confirmpassworderr:confirmpassworderr,numbererr:numbererr});  
 
            return false;  
        }
        
        
        return true;
    }
    
    const handlesubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const isvalid=validate();
       if(isvalid){
         axios.post('/register',{name:name,email:email,password:password,confirmpassword:confirmpassword,number:number,state:state})
            .then(res=>{
                props.history.push('/login')
            })
            .catch(err=>{
               window.alert(JSON.stringify(err.response.data));
              
            })
          initialise(); 

        }
        
    }
    const initialise=()=>{
        console.log(name,email,password,confirmpassword,state,number);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmpassword('');
        setNum('');
        setError({...error,nameerr:"",emailerr:"",passworderr:"",confirmpassworderr:"",numbererr:""});
    }
        
    return(
           
        <div>
            <h2 style={{marginLeft:1178,paddingTop:120,marginBottom:0}}>REGISTRATION</h2>
            
            <section>
                <form onSubmit={handlesubmit} >                    
                    
                    <div>
                        <input name="name"  placeholder="Name" value={name}  onChange={handlechange}/>
                        <p style={{fontSize:10 ,color:"red"}}><b>{error.nameerr}</b></p>
                    </div>

                    <div>
                        <input name="email" placeholder="Email" value={email} onChange={handlechange}/>
                        <p style={{fontSize:10,color:"red"}}><b>{error.emailerr}</b></p>
                    </div> 

                    <div>
                        <input type="password" name="password" placeholder="Password" value={password} onChange={handlechange}/>
                        <p style={{fontSize:10,color:"red"}}><b>{error.passworderr}</b></p>
                    </div>

                    <div>
                        <input type="password" name="confirmpassword" placeholder="Confirm Password" value={confirmpassword} onChange={handlechange}/>
                        <p style={{fontSize:10,color:"red"}}><b>{error.confirmpassworderr}</b></p>
                    </div>

                    <div>
                        <input  name="number" placeholder="Enter Mobile Number" value={number} onChange={handlechange}/>
                        <p style={{fontSize:10,color:"red"}}><b>{error.numbererr}</b></p>
                    </div>


                    <div>
                    <select onChange={handlechange} >

                        <option >SELECT-STATE</option>
                        <option value='Tamil Nadu'>Tamil Nadu</option>
                        <option value='Karnataka'>Karnataka</option>                    
                        <option value='Kerala'>Kerala</option>
                        <option value='Andhra Pradesh'>Andhra Pradesh</option>
                        <option value='Arunachal Pradesh'>Arunachal Pradesh</option>
                        <option value='Assam'>Assam</option>
                        <option value='Bihar'>Bihar</option>
                        <option value='Chhatisgarh'>Chhatisgarh</option>
                        <option value='Goa'>Goa</option>
                        <option value='Gujarat'>Gujarat</option>
                        <option value='Haryana'>Haryana</option>
                        <option value='Himachal Pradesh'>Himachal Pradesh</option>
                        <option value='Jharkhand'>Jharkhand</option>
                        <option value='Karnataka'>Karnataka </option>
                        <option value='Kerala'>Kerala</option>
                        <option value='Madhya Pradesh'>Madhya Pradesh </option>
                        <option value='Maharashtra '>Maharashtra </option>
                        <option value='Manipur'>Manipur</option>
                        <option value='Meghalaya'>Meghalaya</option>
                        <option value='Mizoram'>Mizoram</option>
                        <option value='Nagaland'>Nagaland</option>
                        <option value='Odisha '>Odisha </option>
                        <option value='Punjab' >Punjab</option>
                        <option value='Rajasthan'>Rajasthan</option>
                        <option value='Sikkim'>Sikkim</option>
                        <option value='Telangana'>Telangana</option>
                        <option value='Tripura'>Tripura</option>
                        <option value='Uttarakhand'>Uttarakhand</option>
                        <option value='Uttar Pradesh'>Uttar Pradesh</option>
                        <option value='West Bengal'>West Bengal</option>

                    </select>
                    </div>
                    <div>
                        <button type='submit' >REGISTER</button>   
                        <button onClick={()=>{window.location.href='/login'}}  >LOGIN</button>
                    </div>
                </form>
            </section>

        

        </div>
    )
        
    
}
