import React, {useEffect, useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, TextField} from "@material-ui/core";
import {SelectableFullWidthButton} from "../../button/CustomButton";
import Api from "../../../api/Api";
import {useNotification} from "../../../providers/NotificationProvider";
import {handleInputOnChange} from "../../../utils/Utils";

interface IPlaylist {
    id?: string,
    name?: string,
    emotion?: string
}

const Playlist: React.FC = () => {

    const [showDialog, setShowDialog] = useState(false)

    const [selected, setSelected] = useState('')

    const [playlists, setPlaylists] = useState([])

    const [playlist, setPlaylist] = useState<IPlaylist>({})

    const onCreateClicked = () => {
        setShowDialog(true)
        setPlaylist({})
    }

    const handleCreate = () => {
        if (playlist.name) {
            Api.playlists.addPlaylist(playlist.name, playlist.emotion)
                .then(resp => {
                    nProvider.notify(`Playlist ${playlist.name} successfully created`, 'success')
                })
                .catch(error => {
                    nProvider.notify(`Unable to create playlist: ${error.response.data}`, 'error')
                })
            setShowDialog(false);
            requestPlaylist()
        } else {
            nProvider.notify('Name field is required!', 'warning')
        }
    }

    const handleClose = () => {
        setShowDialog(false)
        setPlaylist({})
    }

    const addPlaylists = () => {
        let elements: Array<any> = []
        playlists.sort((a: any, b: any) => a.id - b.id)
        playlists.forEach((playlist: any) => {

            const isFavorite = playlist.name.includes('favorite')

            const isRecent = playlist.name.includes('recent')

            elements.push(
                <SelectableFullWidthButton id={`playlist-${playlist.id}`}
                                           label={playlist.name}
                                           icon={`${isFavorite ? 'fa-heart' : isRecent ? 'fa-history' : 'fa-file'}`}
                                           selectedId={selected}
                                           onClick={(id => setSelected(id))}/>
            )
        })
        return elements
    }

    const requestPlaylist = () => {
        Api.playlists.getPlaylists()
            .then(resp => {
                setPlaylists(resp.data)
            })
            .catch(error => {
                nProvider.notify('Unable to get playlists', 'error')
            })
    }

    const nProvider = useNotification()

    useEffect(() => {
        requestPlaylist()
    }, [])

    useEffect(() => {
    }, [showDialog])

    return (
        <div id='playlist-view' className="w-full">
            <div
                onClick={onCreateClicked}
                className="group cursor-pointer w-full h-12 px-4 flex flex-row-reverse justify-between items-center text-text-primary hover:bg-action-hover">
                        <span className="inline-block align-middle group-hover:text-action-active">
                            <i className="fa fa-plus"/>
                        </span>
                <span
                    className="select-none font-medium text-xl uppercase align-bottom group-hover:text-action-active">
                            playlists
                        </span>
            </div>
            <Divider/>
            <Dialog
                open={showDialog} onClose={handleClose}>
                <DialogTitle id="playlist-create-dialog">Create New Playlist</DialogTitle>
                <DialogContent>
                    <TextField
                        onChange={event => handleInputOnChange(event, playlist, setPlaylist)}
                        autoFocus
                        margin="dense"
                        id="name"
                        name='name'
                        label="Name"
                        type="text"
                        fullWidth
                        required/>
                    <TextField
                        onChange={event => handleInputOnChange(event, playlist, setPlaylist)}
                        margin="dense"
                        id="emotion"
                        name='emotion'
                        label="Emotion"
                        type="text"
                        fullWidth/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color={"primary"}>Cancel</Button>
                    <Button onClick={handleCreate} color={'primary'}>Create</Button>
                </DialogActions>
            </Dialog>
            <div className="w-full flex flex-col text-text-primary overflow-y-scroll no-scrollbar">
                {addPlaylists()}
            </div>
        </div>
    );
}

export default Playlist;