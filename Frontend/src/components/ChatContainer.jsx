import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';

const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
    useEffect(() => {
        getMessages(selectedUser._id)
    }, [selectedUser._id, getMessages])

    if (isMessagesLoading) {
        return (
            <div>
                <ChatHeader />
                Loading....
                <MessageInput />
            </div>
        )
    }
    return (
        <div>
            <ChatHeader />
            <p>messages....</p>
            <MessageInput />
        </div>
    )
}

export default ChatContainer