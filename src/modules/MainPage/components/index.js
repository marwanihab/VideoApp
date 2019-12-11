import React, { useState, useEffect } from 'react';
import VideosList from '../../Videos/components/VideoList'
import LoginBox from '../../Auth/components/LoginBox'


const MainPage = (props) => { 

  const [isLogedIn, setLogin] = useState("")
  
  const onLogin = () =>{
    
    setLogin(true)

  }
  useEffect(() => {
        
      },[isLogedIn]); // eslint-disable-line
  
  return (
    <div>
    <LoginBox isLogedIn={isLogedIn} setLogin={setLogin} login={onLogin} />
    <VideosList logEvent={isLogedIn}/>
    </div>  
    )    
}

export default MainPage