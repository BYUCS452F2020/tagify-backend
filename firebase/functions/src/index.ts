import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import User from './models/user';
import AddSongRequest from './requests/addSongRequest';
import AddTagRequest from './requests/addTagRequest';
import GeneratePlaylistRequest from './requests/generatePlaylistRequest';
import AddSongTagRequest from './requests/addTagToSongRequest';
import GetSongRequest from './requests/getSongRequest';
import GetTagRequest from './requests/getTagRequest';
import Song from './models/song';
import Tag from './models/tag';

admin.initializeApp();
const db = admin.firestore();

export const addUser = functions.https.onRequest(async (request, response) => {
    const newUser = request.body as User;
    const userRef = await db.collection('users').doc(newUser.id);
    await userRef.set(newUser);
    
    response.send(newUser);
});

export const getUser = functions.https.onRequest(async (request, response) => {
    const userId = request.query.id as string;
    const userRef = await db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
        response.status(400).send("user not found");
        return;
    }

    const user = userDoc.data() as User;
    response.send(user);
});

export const addSong = functions.https.onRequest(async (request, response) => {
    const songRequest = request.body as AddSongRequest;
    const userRef = await db.collection('users').doc(songRequest.userId);

    const song: Song = { id: songRequest.songId, name: songRequest.songName, tags: [] }
    const songRef = await userRef.collection('songs').doc(song.id);
    await songRef.set(song);
    
    response.send(song);
});

export const addTag = functions.https.onRequest(async (request, response) => {
    const tagRequest = request.body as AddTagRequest;
    const userRef = await db.collection('users').doc(tagRequest.userId);

    const tagId = await userRef.collection('tags').doc().id;
    const tag: Tag = { id: tagId, name: tagRequest.tagName, songs: [] }

    const tagRef = await userRef.collection('tags').doc(tag.id);
    await tagRef.set(tag);
    
    response.send(tag);
});

/*
export const addTagToSong2 = functions.https.onRequest(async (request, response) => {
    const req = request.body as AddSongTagRequest;
    const songDoc = await db.collection('users').doc(req.userId).collection('songs').doc(req.songId).get();
    const songTags = await songDoc.data();
    const tags : Array<string> = songTags?.tags;
    tags.push(req.tagId);
    await db.collection('users').doc(req.userId).collection('songs').doc(req.songId).update({
        tags: tags
    });
    response.send({
        success: true
    });    
});

export const addSongToTag2 = functions.https.onRequest(async (request, response) => {
    const req = request.body as AddSongTagRequest;
    const tagDoc = await db.collection('users').doc(req.userId).collection('tags').doc(req.tagId).get();
    const tagSongs = await tagDoc.data();
    const songs : Array<string> = tagSongs?.songs;
    songs.push(req.tagId);
    await db.collection('users').doc(req.userId).collection('tags').doc(req.tagId).update({
        songs: songs
    });
    response.send({
        success: true
    });    
});
*/

async function addTagToSong(req:AddSongTagRequest) {
    const songDoc = await db.collection('users').doc(req.userId).collection('songs').doc(req.songId).get();
    const songTags = await songDoc.data();
    const tags : Array<string> = songTags?.tags;
    tags.push(req.tagId);
    await db.collection('users').doc(req.userId).collection('songs').doc(req.songId).update({
        tags: tags
    });
}

async function addSongToTag(req:AddSongTagRequest) {
    const tagDoc = await db.collection('users').doc(req.userId).collection('tags').doc(req.tagId).get();
    const tagSongs = await tagDoc.data();
    const songs : Array<string> = tagSongs?.songs;
    songs.push(req.songId);
    await db.collection('users').doc(req.userId).collection('tags').doc(req.tagId).update({
        songs: songs
    });
}

export const addSongTag = functions.https.onRequest(async (request, response) => {
    const req = request.body as AddSongTagRequest;
    await addSongToTag(req);
    await addTagToSong(req);
    response.send({
        success: true
    });
});

export const getSong = functions.https.onRequest(async (request, response) => {
    const req = request.body as GetSongRequest;
    const songDoc = await db.collection('users').doc(req.userId).collection('songs').doc(req.songId).get();
    const songData = await songDoc.data();
    response.send(songData);
});

export const getTag = functions.https.onRequest(async (request, response) => {
    const req = request.body as GetTagRequest;
    const tagDoc = await db.collection('users').doc(req.userId).collection('tags').doc(req.tagId).get();
    const tagData = await tagDoc.data();
    response.send(tagData);
});

export const generatePlaylist = functions.https.onRequest(async (request, response) => {
    const playlistRequest = request.body as GeneratePlaylistRequest;
    const userRef = await db.collection('users').doc(playlistRequest.userId);

    const songs = await userRef.collection('songs').get();
    if (songs.empty) {
        response.status(400).send('The user does not have any songs');
        return
    }

    let resultSongs: Array<Song> = [];
    const query = playlistRequest.query;
    songs.forEach((s) => {
        const song = s.data() as Song;
        let matchesQuery = false;
        query.forEach((innerQuery) => {
            let matchesInnerQuery = true;
            innerQuery.forEach((queryTag) => {
                if (song.tags.indexOf(queryTag) < 0) {
                    matchesInnerQuery = false;
                }
            });
            if (matchesInnerQuery) {
                matchesQuery = true;
            }
        });

        if (matchesQuery) {
            resultSongs.push(song);
        }
    });

    response.send(resultSongs);
});