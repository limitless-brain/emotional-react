import axios from "axios"

// // Song
// Route::get('/songs',[SongController::class,'index']);
// Route::get('/songs/{song}',[SongController::class,'getSong']);
// Route::get('/songs/{song}/lyrics',[SongController::class,'getLyrics']);
// // interactions
// Route::post('/songs/{song}/played',[SongController::class,'played']);
// Route::post('/songs/{song}/like',[SongController::class,'like']);
// Route::post('/songs/{song}/unlike',[SongController::class,'dislike']);
// Route::post('/songs/{song}/match',[SongController::class,'match']);
// Route::post('/songs/{song}/un-match',[SongController::class,'unMatch']);
// Route::get('/songs/{song}/interactions',[SongController::class,'getInteractions']);


const Song = {
    getAllSongs: async (page?: string, orderBy: 'feeling'|'release_date' | 'title' | 'year' | 'youtube_id' = 'year', order: 'desc' | 'asc' = 'desc') => {
        return await axios.get(`/songs${page}`,{params:{orderBy,order}})
    },
    getSong: async (id: string) => {
        return await axios.get(`/song/${id}`)
    },
    getLyrics: async (id: string) => {
        return await axios.get(`/songs/${id}/lyrics`)
    },
    like: async (id: string) => {
        return await axios.post(`/songs/${id}/like`)
    },
    dislike: async (id: string) => {
        return await axios.post(`/songs/${id}/dislike`)
    },
    match: async (id: string) => {
        return await axios.post(`/songs/${id}/match`)
    },
    unMatch: async (id: string) => {
        return await axios.post(`/songs/${id}/un-match`)
    },
    played: async (id: string) => {
        return await axios.post(`/songs/${id}/played`)
    },
    getInteraction: async (id: string) => {
        return await axios.get(`/songs/${id}/interactions`)
    },
}

export default Song