import React, {createContext, useEffect, useState} from 'react';
import {Snackbar} from "@material-ui/core";
import MuiAlert, {AlertProps} from "@material-ui/lab/Alert"
import {useNotification} from "./provider/NotificationProvider";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant={"filled"} {...props}/>
}


function Notification() {

    const [open, setOpen] = useState(false)

    const nProvider = useNotification()

    const handleClose = (event: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    useEffect(() => {
        if (nProvider.notification.message) {
            setOpen(true)
        }
    }, [nProvider.notification.message, nProvider.refresh])

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined
        if (!open) {
            timeout = setTimeout(() => nProvider.setIsShowing(false), 500)
        }
        return () => {
            clearTimeout(timeout!)
        }
    }, [nProvider, open])


    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={nProvider.notification.severity}>
                {nProvider.notification.message}
            </Alert>
        </Snackbar>
    );
}

export default Notification;