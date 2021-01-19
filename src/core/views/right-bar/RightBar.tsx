import React, {useEffect, useState} from 'react';
import {BUTTON_TAILWIND_STYLE, paperUseStyles} from "../../utils/Utils";
import {Divider, Drawer} from "@material-ui/core";
import {useAuth} from "../../providers/AuthProvider";
import {FullWidthButton, FullWidthNavLink} from "../button/CustomButton";

function RightBar() {

    const [showPlaylist, setShowPlaylist] = useState(false)
    const [profile, setProfile] = useState({name: 'user', email: 'null@null'})

    const paperClasses = paperUseStyles()

    const auth = useAuth()

    useEffect(() => {
        // no update needed
        if (auth.user.profile === profile) return

        // no profile
        if (auth.user.profile === undefined) {
            // request it
            auth.getProfile(undefined, false).then((_) => {
                // set it
                setProfile(auth.user.profile)
            })
        } else {
            // set the profile from auth instance
            setProfile(auth.user.profile)
        }
    }, [auth, profile])

    return (
        <div className="fixed right-0 flex flex-col justify-center items-center">
            <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={`${BUTTON_TAILWIND_STYLE} rounded-l-2xl`}>
                <i className="w-12 fa fa-user"/>
            </button>
            <React.Fragment key={"right_drawer"}>
                <Drawer
                    PaperProps={{
                        classes: {root: paperClasses.root}
                    }}
                    anchor={"right"} open={showPlaylist} onClose={() => setShowPlaylist(false)}>
                    <div
                        className="h-full w-80 flex flex-col">
                        <div
                            onClick={() => setShowPlaylist(false)}
                            className="group cursor-pointer w-full h-12 px-4 flex flex-row-reverse justify-between items-center text-text-primary hover:bg-action-hover">
                        <span className="inline-block text-2xl align-middle group-hover:text-action-active">
                            <i className="fa fa-angle-right"/>
                        </span>
                            <span
                                className="select-none font-medium text-xl uppercase align-bottom group-hover:text-action-active">
                            {profile.name}
                        </span>
                        </div>
                        <Divider/>
                        <div
                            className="flex flex-col w-full text-text-primary justify-center items-center py-4 space-y-4">
                            <div
                                className="w-40 h-40 flex items-center justify-center rounded-full bg-bg-primary shadow">
                            <span className="text-3xl font-semibold">
                                {
                                    profile.name.split(' ')
                                        .map(str => str.charAt(0)).toString()
                                        .replaceAll(',', '')
                                }
                            </span>
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <span>{profile.email}</span>
                            </div>
                        </div>
                        <Divider/>
                        <div className="flex flex-col w-full text-text-primary">
                            <FullWidthNavLink to='/users' label={'friends'} icon={'fa-user-friends'} iconPos={'right'}/>
                            <FullWidthButton label={'edit profile'} icon={'fa-user-edit'} iconPos={'right'}/>
                            <FullWidthButton onClick={() => {
                                auth.logout().then()
                            }
                            } label={'logout'} icon={'fa-sign-out-alt'} iconPos={'right'}/>
                        </div>
                    </div>
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default RightBar;