import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

const db = admin.firestore();

interface User {
    id: string;
    firstName: string;
    lastName: string;
}

interface AddSongRequest {
    userId: string;
    songId: string;
    songName: string;
}

// interface AddTagRequest {
//     userId: string;
//     tagName: string;
// }

interface Song {
    id: string;
    name: string;
}

interface Tag {
    id: string;
    name: string;
}

interface SongWithTags {
    id: string;
    name: string;
    tags: Array<Tag>;
}

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

    const song: Song = { id: songRequest.songId, name: songRequest.songName }
    const songRef = await userRef.collection('songs').doc(song.id);
    await songRef.set({id: song.id, name: song.name});
    
    const res: SongWithTags = { id: song.id, name: song.name, tags: [] }
    response.send(res);
});

// export const addTag = functions.https.onRequest(async (request, response) => {
//     const tagRequest = request.body as AddTagRequest;
//     const userRef = await db.collection('users').doc(tagRequest.userId);

//     const tagRef = await userRef.collection('tags');
//     await songRef.set({id: song.id, name: song.name});
    
//     const res: SongWithTags = { id: song.id, name: song.name, tags: [] }
//     response.send(res);
// });