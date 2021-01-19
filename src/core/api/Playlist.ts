import axios from "axios";

// Route::apiResource('/playlists', PlaylistController::class);
// Route::put('/playlists/{playlist}/{song}',[PlaylistController::class,'addSong']);
// Route::delete('/playlist/{playlist}/{song}',[PlaylistController::class,'removeSong']);
// Route::get('/playlists/{emotion}}',[PlaylistController::class,'getPlaylistsByEmotion']);


const Playlist = {

    getPlaylists: async () => {
        return await axios.get('/playlists')
    },

    getPlaylistsByEmotion: async (emotion: string) => {
        return await axios.get(`/playlists/${emotion}`)
    },

    getPlaylist: async (id: string) => {
        return await axios.get(`/playlists/${id}`)
    },

    addPlaylist: async (name: string, emotion: string = 'neutral') => {
        return await axios.post('/playlists', {name, emotion})
    },

    updatePlaylist: async (name: string, emotion: string) => {
        return await axios.put('/playlists', {name, emotion})
    },

    removePlaylist: async (id: string) => {
        return await axios.delete(`/playlists/${id}`)
    },
    addSong: async (playlistId: string, songId: string = 'neutral') => {
        return await axios.post(`/playlists/${playlistId}/${songId}`)
    },

    removeSong: async (playlistId: string, songId: string = 'neutral') => {
        return await axios.delete(`/playlists/${playlistId}/${songId}`)
    },

    ownedByCurrentUser: async (id: string) => {
        return await axios.get(`/playlists/${id}/own`)
    }
}

export default Playlist