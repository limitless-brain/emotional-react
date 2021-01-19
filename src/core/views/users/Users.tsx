import React, {useEffect} from 'react';
import firebase from "firebase";
import {useCollectionData, useDocumentData} from "react-firebase-hooks/firestore";
import {IFBUser} from "./components/blueprint";
import User from "./components/User";
import {Grid, withWidth, WithWidthProps} from "@material-ui/core";
import Loading from "../loading/Loading";

function Users() {

    const fbUser = firebase.auth().currentUser

    const usersRef = firebase.firestore().collection('users')

    const [users, loadingUsers, usersError] = useCollectionData<IFBUser>(usersRef)

    return (
        <div
            className="absolute w-full h-full overflow-y-scroll no-scrollbar flex-col justify-center items-center px-12 pb-24 pt-24">
            {usersError && <strong>Error: {JSON.stringify(usersError)}</strong>}
            {loadingUsers && <Loading/>}
            <Grid
                container
                justify="center"
                spacing={2}
                className="flex flex-wrap w-full justify-around overflow-hidden">
                {users && users.map(user =>
                    user.uid !== fbUser?.uid ?
                        (<Grid key={user.uid} item sm={12} md={6} lg={4}><User user={user} current_uid={fbUser?.uid}/></Grid>)
                        : null
                )}
            </Grid>

        </div>
    );
}

export default Users