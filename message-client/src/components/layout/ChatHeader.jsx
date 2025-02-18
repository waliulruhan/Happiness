import React, { Suspense, lazy, useEffect } from 'react';
import './layout.css'
import {
    Add as AddIcon,
    Menu as MenuIcon,
    Search as SearchIcon,
    Group as GroupIcon,
    Logout as LogoutIcon,
    Notifications as NotificationsIcon,
  } from "@mui/icons-material";
import { Backdrop, Badge, IconButton, Tooltip } from '@mui/material';
import { useMyContext } from '../../utils/context';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../constants/config';
import { notifyError, notifySuccess } from '../../lib/Toasting';
import Cookies from 'js-cookie';

import logo from '../../assets/image/happinessLogo.png';

const SearchDialog = lazy(()=> import("../specific/Search"))
const NotificationsDialog = lazy(()=> import("../specific/Notifications"))
const NewGroupDialog = lazy(()=> import("../specific/NewGroup"))


  const IconBtn = ({ title, icon, onClick, value }) => {
    return (
      <Tooltip title={title}>
        <IconButton color="inherit" size="large" onClick={onClick}>
          {value ? (
            <Badge badgeContent={value} color="success">
              {icon}
            </Badge>
          ) : (
            icon
          )}
        </IconButton>
      </Tooltip>
    );
  };
const ChatHeader = ({chatDetails}) => {
    
    const navigate = useNavigate();
    const location = useLocation();

    const {myData} = useMyContext();

    const { isMobileChat , setIsMobileChat }= useMyContext()
    const logoutHandler = async ()=> {
    try {
        const {data} = await axios.get(`${server}/api/v1/user/logout` , {withCredentials: true});
        document.cookie = 'happiness-cookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure';
        notifySuccess(data.message)
        navigate('/auth')
    } catch (error) {
        notifyError(error.response.data.message || "Something went wrong")
    }    
    }

    useEffect(()=>{
        console.log(chatDetails)
    },[chatDetails])

    const getOtherMember =(members)=>{
        if(!chatDetails.isGroupChat){
            const otherMember =  members.find(member => member._id.toString() != myData._id);
            return otherMember;
        }
    }

    return (
        <div className='header'>
            <div className="header-logo flex-con">
                <p style={{fontWeight:"700"}} onClick={()=>{ location.pathname !== "/" && navigate('/')}}>Happiness</p>
            </div>
            <div className="header-menu">
            <IconBtn
                title={"Menu"}
                icon={<MenuIcon />}
                onClick={()=> setIsMobileChat(!isMobileChat)}
              />
            </div>

            <div className='header-middle'>

                {
                chatDetails.isGroupChat ?
                ( 
                    <div className='chat-user-info-container' >
                        <p>{chatDetails.name}</p>
                    </div>
                ) :

                (
                  <div className="chat-user-info-container">
                    <div className="chat-user-info-image">
                        
                    </div>
                    <div className="chat-user-info-data">

                    </div>
                  </div>  
                )
                }
            </div>


            <div className="chat-header-icons">
                <img src={logo} alt="logo" className="header-image" onClick={()=> { location.pathname !== "/" && navigate('/') }} />
            </div>
        </div>
    );
};

export default ChatHeader;