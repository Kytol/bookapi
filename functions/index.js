const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors({origin: true}));

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// create
app.post("/api/create", (req, res) => {
    (async () => {
      try {
        const bookId = Math.floor(Math.random() * 99999999999999999999);
        req.body.id = bookId
        req.body.book.id = bookId
        await db.collection("books").doc("/" + bookId + "/")            .create(req.body.book);
        return res.status(200).send({"status": "successfully created ", bookId } );
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });

// read
app.get("/api/read/:book_id", (req, res) => {
    (async () => {
      try {
        const document = db.collection("books").doc(req.params.book_id);
        const item = await document.get();
        const response = item.data();
        return res.status(200).send({"status": "successfully got book "});
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });
  
// read all
app.get("/api/read", (req, res) => {
  (async () => {
    try {
      const query = db.collection("books");
      const response = [];
      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs;
        for (const doc of docs) {
          const selectedItem = {
            id: doc.id,
            book: doc.data(),
          };
          response.push(selectedItem);
        }
        return response;
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// update
app.put("/api/update/:book_id", (req, res) => {
    (async () => {
      try {
        const document = db.collection("books").doc(req.params.book_id);
        await document.update(req.body.book);
        return res.status(200).send({"status": "successfully updated"});
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });

  // delete
app.delete("/api/delete/:book_id", (req, res) => {
    (async () => {
      try {
        const document = db.collection("books").doc(req.params.book_id);
        await document.delete();
        return res.status(200).send({"status": "successfully deleted"});
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })();
  });

    // delete all
app.delete("/api/delete-all", (req, res) => {
  (async () => {
    try {
      const query = db.collection("books");
      console.log('query: ', query);
      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs;
        console.log('docs: ', docs);
        for (const doc of docs) {
            const document = db.collection("books").doc(doc.id);
             document.delete();
        }
        return res.status(200).send("successfully deleted everything");
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

exports.app = functions.https.onRequest(app);