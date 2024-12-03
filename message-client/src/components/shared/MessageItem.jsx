import moment from 'moment';
import React, { memo } from 'react';
import './shared.css'
import { Box } from '@mui/material';
import { fileFormat } from '../../lib/features';
import RenderAttachment from './RenderAttachment';
import { MessageItemEasterEgg } from '../../lib/esaterEgg';
import { DoneAll } from '@mui/icons-material';
import {motion} from'framer-motion'
import Reveal from '../animated/Reveal';

const MessageItem = ({ message, user }) => {
    const { sender, content, attachments = [], createdAt , seen } = message;
    const sameSender = sender?._id === user?._id;
    const timeAgo = moment(createdAt).format('Do MMM YYYY, h:mm:ss a');
    const makeLinksClickable = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" class="chat-link" >$1</a>');
    };

    const sanitizedContent = makeLinksClickable(content);

  
    return (
        <Reveal sameSender={sameSender} >
            <motion.div
                onDoubleClick={()=> MessageItemEasterEgg(content)}
                className='messageItem'
                style={{                    
                    backgroundColor: sameSender ? '#e1f0e1' : "#b5ffb5",
                    color: "black",
                    borderRadius: sameSender ? "5px 5px 0px 5px" : "5px 5px 5px 0px" ,
                    padding: "2px 5px",
                    width: "fit-content",
                }}
            >
                {
                    !sameSender && <p className='message-sender' >{sender.name}</p>
                }

                {
                    content && <p className='message-content' dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                }
                {attachments.length > 0 &&
                    attachments.map((attachment, index) => {
                        const url = attachment.url;
                        const file = fileFormat(url);

                        return (
                            <Box key={index}>
                                <a
                                    href={url}
                                    target="_blank"
                                    download
                                    style={{
                                        color: "black",
                                    }}
                                >
                                    <RenderAttachment file={file} url={url}/>
                                </a>
                            </Box>
                        );
                    })}
                {
                    sameSender? 
                    <p className="time-stamp">{timeAgo} <DoneAll sx={{fontSize:'15px' , color: seen ? "#008000" : "" }}/> </p>   
                    :
                    <p className="time-stamp">{timeAgo}</p>   
                }

            </motion.div>
        </Reveal>
    );
};

export default memo(MessageItem);