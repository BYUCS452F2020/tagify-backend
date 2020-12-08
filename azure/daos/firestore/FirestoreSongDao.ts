import Song from "../../data_models/Song";
import ISongDao from "../interface/ISongDao";

import * as firebase from 'firebase-admin';
import "../../tagify-firestore.json";
const serviceAccount = require('../../tagify-firestore.json');
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

const db = firebase.firestore();

export default class FirestoreSongDao implements ISongDao {
    async addSong(spotifyId: string): Promise<Song> {
        console.log(await db.listCollections());
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