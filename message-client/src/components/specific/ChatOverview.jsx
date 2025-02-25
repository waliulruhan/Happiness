import './specific.css';
import { Stack } from '@mui/material';
import React from 'react';
import ChatItem from '../shared/ChatItem';
import { useMyContext } from '../../utils/context';
import {motion} from "framer-motion"

const ChatOverview = ({
    
}) => {
    const { myData, setIsChatoverview } = useMyContext();
    
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

            //  height={'100%'}
            //   overflow={'auto'}
            //    width={w}
            //     bgcolor='#f7fdf0'

            className='chat-overview-container'  
            >
               <p>Eita ekhono banao hoynai shona. banano hosse. wait koren.</p> 
            </motion.div>
    );
};

export default ChatOverview;