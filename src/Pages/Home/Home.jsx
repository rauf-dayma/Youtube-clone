import React from 'react'
import Sidenavbar from '../../Components/Sidenavbar/Sidenavbar'
import HomePage from '../../Components/HomePage/HomePage'
import "./home.css"


const Home = ({sideNavbar, videos, userData}) => {
  return (
    <div className='home'>
        <Sidenavbar sideNavbar ={sideNavbar} userData = {userData}/>
        <HomePage sideNavbar ={sideNavbar} videos={videos} />
    </div>
  )
}

export default Home