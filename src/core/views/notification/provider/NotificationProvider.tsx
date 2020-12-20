import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';

interface INotificationContext {
    refresh: boolean,
    isShowing: boolean
    setIsShowing: (show: boolean) => void
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
    const [isShowing, setIsShowing] = useState(false)

    const [notifications, setNotifications] = useState([] as Array<INotificationState>)

    const notify = (notification: INotificationState) => {
        notifications.push(notification)
        setNotifications([...notifications])
    }

    useEffect(() => {
        if(!isShowing && notifications.length > 0) {
            setNotification(notifications.shift()!)
            setIsShowing(true)
            setRefresh(!refresh)
        }
    },[isShowing, notifications, refresh])

    return {
        isShowing,
        setIsShowing,
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