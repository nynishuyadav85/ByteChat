import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';

const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
    useEffect(() => {
        getMessages(selectedUser._id)
        subscribeToMessages()
        return () => unsubscribeFromMessages();
    }, [selectedUser._id, getMessages, unsubscribeFromMessages, subscribeToMessages])

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
            <MessageSkeleton />
            <MessageInput />
        </div>
    )
}

export default ChatContainer