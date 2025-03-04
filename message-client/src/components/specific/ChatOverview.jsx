import './specific.css';
import { IconButton, Stack } from '@mui/material';
import React from 'react';
import ChatItem from '../shared/ChatItem';
import { useMyContext } from '../../utils/context';
import {motion} from "framer-motion"
import { Close, CropSquareSharp } from '@mui/icons-material';

const ChatOverview = ({
    chatId,
    chatDetails,
}) => {
    const { myData, setIsChatoverview } = useMyContext();
    console.log(chatDetails)
    
    const ChatOverviewVariants = {
        hidden: {
          y: 100,
          opacity: 0,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.1,
            type: 'spring',
            stiffness: 250,
            damping: 25
          },
        },
        exit: {
          opacity: 0.5,
          y: 100,
          transition: {
            duration: 0.1,
          },
        },
      };


    return (
            <motion.div
            variants={ChatOverviewVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"

            className='chat-overview-container'  
            >
               <div className="chat-overview-header">
                 <IconButton onClick={()=> setIsChatoverview(false) }>
                    <Close /> 
                 </IconButton>
               </div>
               <div className="chat-overview-main">
                    <div className="chat-overview-1">
                        <div className="chat-overview-photo">
                            <img src="" alt='img' />
                        </div>
                        <div className="chat-overview-name">
                            <p>{'name'}</p>
                        </div>
                    </div>
                    <div className="chat-overview-2">

                    </div>
               </div>
            </motion.div>
    );
};

export default ChatOverview;