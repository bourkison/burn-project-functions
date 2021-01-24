const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();


exports.aggregateLikes = functions.region("australia-southeast1").firestore
    .document("exercises/{exerciseId}/likes/{likeId}")
    .onWrite((change, context) => {

    const exerciseId = context.params.exerciseId;
    console.log("Exercise ID: ", exerciseId);

    const docRef = admin.firestore().collection("exercises").doc(exerciseId);

    return docRef.collection("likes")
        .get()
        .then(querySnapshot => {
        const likeCount = querySnapshot.size;
        const lastActivity = admin.database.ServerValue.TIMESTAMP;

        const data = { likeCount, lastActivity };

        return docRef.update(data);
    })
    .catch(e => {
        console.log(e);
    })
})
