const admin = require('firebase-admin');
const serviceAccount = require('../../tagify-firestore.json');

import Song from "../../data_models/Song";
import ISongDao from "../interface/ISongDao";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export default class FirestoreSongDao implements ISongDao {
    async addSong(spotifyId: string): Promise<Song> {
        console.log(db.collection('users'));
        return null;
    }
    async addSongs(spotifyIds: string[]): Promise<Song[]> {
        throw new Error("Method not implemented.");
    }
    async getUserSongsFromTag(userId: number, tagId: number): Promise<Song[]> {
        throw new Error("Method not implemented.");
    }
    async generatePlaylist(userId: number, songQuery: string[][]): Promise<Song[]> {
        throw new Error("Method not implemented.");
    }

}