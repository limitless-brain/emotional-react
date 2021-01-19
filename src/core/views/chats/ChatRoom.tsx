import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import firebase from "firebase";
import {useCollectionData, useDocument, useDocumentData} from "react-firebase-hooks/firestore";
import {
    Avatar,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles,
    Paper,
    TextField
} from "@material-ui/core";
import {paperUseStyles} from "../../utils/Utils";
import {SendRounded} from "@material-ui/icons";
import {IFBUser} from "../users/components/blueprint";
import Loading from "../loading/Loading";

export interface IMessage {
    senderUid: string,
    receiverUid: string,
    message: string,
    timestamp: firebase.firestore.Timestamp
}

export interface IChannel {
    uid: string,
    users: string[]
}

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

function ChatRoom() {

    const {sid, rid} = useParams<{ sid: string, rid: string }>()

    const channelId = sid < rid ? sid + rid : rid + sid

    const channelRef = firebase.firestore().collection('chat_channel').doc(channelId)

    const messagesRef = channelRef.collection('messages')

    const sProfileRef = firebase.firestore().collection('users').doc(sid)

    const rProfileRef = firebase.firestore().collection('users').doc(rid)

    const [message, setMessage] = useState('')

    const [channel, loading, error] = useDocument(channelRef)

    const [messages, loadingMessages, errorMessages] = useCollectionData<IMessage>(messagesRef)

    const [sProfile, loadingSProfile, errorSProfile] = useDocumentData<IFBUser>(sProfileRef)
    const [rProfile, loadingRProfile, errorRProfile] = useDocumentData<IFBUser>(rProfileRef)

    const paperClasses = paperUseStyles()

    const classes = useStyles();


    const sendMessage = async (event: React.MouseEvent<HTMLButtonElement>) => {

        (event.target as HTMLButtonElement).blur()
        setMessage('')

        const msg: IMessage = {
            message: message, receiverUid: rid, senderUid: sid, timestamp: firebase.firestore.Timestamp.now()
        }

        let c = channel as firebase.firestore.DocumentSnapshot

        if (!c.exists) {
            channelRef.set({
                uid: channelId,
                users: [sid, rid]
            } as IChannel).then(() => {
                // send the message
                messagesRef.add(msg)
            })
        } else {
            messagesRef.add(msg).then()
        }
    }

    return (
        <div className="w-full h-full p-14">
            <Paper square classes={paperClasses} className="flex flex-col w-full h-full rounded-2xl justify-end">
                {loadingMessages && <Loading/>}
                {(messages && sProfile && rProfile) && <List className="w-full">
                    {
                        messages.sort((a, b) => a.timestamp < b.timestamp ? -1 : 0).map(msg => {
                            if (msg.senderUid === sid) {
                                return (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar alt={sProfile.name}
                                                    src={sProfile?.photo!}>
                                                {sProfile?.name.charAt(0).toUpperCase()}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={msg.message}
                                            secondary={msg.timestamp.toDate().toLocaleString()}
                                        />
                                    </ListItem>
                                )
                            } else {
                                return (
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar alt={rProfile.name}
                                                    src={`https://i.pravatar.cc/150?u=${rProfile?.uid}`}>
                                                {rProfile?.name.charAt(0).toUpperCase()}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={msg.message}
                                            secondary={msg.timestamp.toDate().toLocaleString()}
                                        />
                                    </ListItem>
                                )
                            }
                        })}
                        </List>}
                    <Divider/>
                    <Grid container spacing={2} alignItems='center' className="p-2">
                        <Grid item justify='center'>
                            <Avatar alt={sProfile?.name} src={sProfile?.photo!}>
                                {sProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                        </Grid>
                        <Grid item className="flex-grow">
                            <TextField
                                value={message}
                                onChange={(event) => {
                                    setMessage(event.target.value)
                                }}
                                fullWidth
                                placeholder="Write your message"/>
                        </Grid>
                        <Grid item>
                            <IconButton onClick={sendMessage}>
                                <SendRounded/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
        </div>)
}

export default ChatRoom