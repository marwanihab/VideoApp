import React from 'react'

import VideosList from '../../modules/Videos/components/VideoList'
import LoginBox from '../../modules/Auth/components/LoginBox'
//import MainPage from '../../modules/MainPage/components'

export default function HomePage() {
  return (
   <div>
    <LoginBox />
    <VideosList />
   </div>  
    //<MainPage />
  )
}
