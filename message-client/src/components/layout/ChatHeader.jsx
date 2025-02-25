import React, { Suspense, lazy, useEffect, useState } from 'react';
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
import AvatarCard from '../shared/AvatarCard';
import { CommonLoader } from './Loaders';
import moment from 'moment';
import { transformImage } from '../../lib/features';

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
const ChatHeader = ({userData, chatDetails}) => {
  const {isLoading, data:userInfo} = userData;
    
    const navigate = useNavigate();
    const location = useLocation();


    const { isMobileChat , setIsMobileChat, setIsChatoverview, myData }= useMyContext()

    // const [userData, setUserData] = useState({});
    // const [userDataLoading, setUserDataLoading] = useState(false);

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

    // useEffect(()=>{
    //     const fetchUserInfo = async ()=> {
    //       setUserDataLoading(true);
    //       try {
    //           console.log(userDataLoading)
    //             if(chatDetails.members && !chatDetails.groupChat){
    //               const otherMember =  chatDetails.members.find(member => member.toString() != myData._id);
    //               const { data } = await axios.post(
    //                   `${server}/api/v1/user/get-user-info`,
    //                   {
    //                       userId : otherMember,
    //                   },
    //                   {
    //                       withCredentials: true
    //                   }
    //               );
    //               setUserData(data.user);

    //           }
    //         } catch (error) {
    //           console.log(error);
    //         }
    //         finally{
    //           setUserDataLoading(false);
    //           console.log(userData)
    //           console.log(userDataLoading)
    //         }
            
    //     }
    //     fetchUserInfo();
       
    // },[chatDetails])


    return (
        <div className='header'>
            <div className="header-logo flex-con">
                <p style={{fontWeight:"700"}} onClick={()=>{ location.pathname !== "/" && navigate('/'); setIsChatoverview(false)}}>Happiness</p>
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
                chatDetails.groupChat ?
                ( 
                    <div className='chat-user-info-container' >
                        <p>{chatDetails.name}</p>
                    </div>
                ) :

                ( 
                  isLoading || userInfo === null ?
                  <CommonLoader/>
                  :
                  (
                  <div className="chat-user-info-container">
                    <div className="chat-user-info-image">
                      <img src={transformImage(userInfo?.avatar?.url)} alt="" />
                    </div>
                    <div className="chat-user-info-data" onClick={()=> setIsChatoverview((prev)=> !prev)}>
                        <p className="chat-user-name">{userInfo.name}</p>
                        <p className="chat-user-last-active">{moment(userInfo.lastActive).format("h:mm:ss a, DD/MM/YY")} </p>
                    </div>
                  </div>  
                  )
                )
                }                
            </div>


            <div className="chat-header-icons">
                <img src={logo} alt="logo" className="header-image" onClick={()=> { location.pathname !== "/" && navigate('/'); setIsChatoverview(false) }} />
            </div>
        </div>
    );
};

export default ChatHeader;