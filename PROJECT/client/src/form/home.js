import React,{useEffect,useState}  from 'react';
import axios from 'axios';


const Home=(props)=>{
    const[json,setJson]=useState([])

    useEffect(() => {
        axios.get('/getuser',{headers:{'auth-token':`${JSON.parse(localStorage.getItem('auth-token'))}`}})
            .then(res=>{
                setJson(res.data);
                console.log(res.data)
            })
            .catch(err=>{
                window.alert(JSON.stringify(err.response.data))
            })
        
    }, [])
    return(
        
        <div>
            <p>{JSON.stringify(json)}</p>
            <button onClick={()=>{
                localStorage.clear();
                props.history.push('/login')
            }}>LOGOUT</button>
        </div>
    )

}
export default Home