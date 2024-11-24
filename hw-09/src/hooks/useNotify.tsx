import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { io } from 'socket.io-client'

export default function useNotify() {
    const url = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/notifications'

    useEffect(() => {
        const socket = io(url, {
            transports: ['websocket'],
            autoConnect: true,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            extraHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        socket.on('newPost', (data) => {
            toast(`${data.user}, has been added new post ${data.message}! `, {
                icon: '🚀',
                duration: 1500,
                position: 'bottom-right'
            })
        })

        return () => {
            socket.disconnect()
        }
    }, [])
}
