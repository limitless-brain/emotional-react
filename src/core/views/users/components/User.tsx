import React from 'react';
import {IFBUser} from "./blueprint";
import {Avatar, Button, Card, CardActions, CardHeader, makeStyles} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const User: React.FC<{ user: IFBUser, current_uid?: string }> = (props) => {

    const cardClasses = makeStyles({
        card: {
            borderRadius: '1rem'
        }
    })()

    const history = useHistory()

    const onChatClicked = () => {
        if (props.current_uid) {
            history.push(`/chat/${props.current_uid}/${props.user.uid}`)
        }
    }

    return (
        <Card
            variant='outlined'
            className="rounded-2xl transition-all duration-500"
            classes={{root: cardClasses.card}}>
            <CardHeader
                avatar={<Avatar alt={props.user.name} src={props.user.photo ? props.user.photo : `https://i.pravatar.cc/150?u=${props.user.uid}`}/>}
                title={props.user.name}
                subheader={props.user.email}>
            </CardHeader>
            <CardActions>
                <Button onClick={onChatClicked}>chat</Button>
                <Button>collaborate</Button>
                <Button>invite</Button>
            </CardActions>
        </Card>
    );
}

export default User;