import React, {createContext, useContext, useEffect, useState} from 'react';

interface INotificationContext {
    refresh: boolean,
    notification: INotificationState,
    notify: (notification: INotificationState) => void
}

interface INotificationState {
    message: string,
    severity: "success" | "info" | "warning" | "error" | undefined
}

const notificationContext = createContext({} as INotificationContext)

function useNotificationProvider() {

    const [refresh, setRefresh] = useState(false)
    const [notification, setNotification] = useState({} as INotificationState)

    const notify = (notification: INotificationState) => {
        setNotification(notification)
        setRefresh(!refresh)
    }

    return {
        refresh,
        notification,
        notify,
    }
}

export const useNotification = () => {
    return useContext(notificationContext)
}

export const NotificationProvider: React.FC = ({children}) => {
    const notification = useNotificationProvider()

    return (
        <notificationContext.Provider value={notification}>{children}</notificationContext.Provider>
    )
}