import React, { useState } from "react";
// import logo from './logo.svg';
import firebase from "firebase";
import "./App.css";

// 設定ファイル
const firebaseConfig = {
  apiKey: "AIzaSyCOtaZPB-d1A3tEuJm_csj6IeLq5PpuPro",
  authDomain: "my-project-4d424.firebaseapp.com",
  databaseURL: "https://my-project-4d424.firebaseio.com",
  projectId: "my-project-4d424",
  storageBucket: "my-project-4d424.appspot.com",
  messagingSenderId: "468644500368",
  appId: "1:468644500368:web:fbb114d1076b6cac26d915",
  measurementId: "G-KC4WFSKXH9",
};
// Firebaseの初期化
firebase.initializeApp(firebaseConfig);

function App() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [documentId, setDocumentId] = useState("");

  // ------------------------------------------
  // データを取得するボタン（非同期処理があることを宣言）
  // ------------------------------------------
  const handleClickFetchButton = async () => {
    const db = firebase.firestore();
    // ------------------documentを取得(動画006)------------------------
    // // ドキュメントデータ取得（非同期処理）
    // const doc = await db.collection("users").doc('Kvjzt1eRH8S20Y0kAcdj').get();
    // // 処理後に実行
    // console.log(doc.data());

    // ------------------collectionを取得(動画006)------------------------
    // // コレクションデータ取得（非同期処理）
    // const snapshot = await db.collection("users")
    // .where("age", ">", 20)/* ageが20より大きいの場合 */
    // .limit(1)/* 1件のみ取得 */
    // .get()
    // snapshot.forEach(function(doc) {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    const snapshot = await db.collection("users").get();
    const _users = [];
    snapshot.forEach((doc) => {
      _users.push({
        userId: doc.id,
        ...doc.data(),
      });
    });
    setUsers(_users);
  };

  // ------------------------------------------
  // データを追加するボタン
  // ------------------------------------------
  const handleClickAddButton = async () => {
    if (!userName || !age) {
      alert('"userName" or "age" が空です');
      return;
    }
    const parseAge = parseInt(age, 10);

    if (isNaN(parseAge)) {
      alert("numberは半角の数値でセットしてください");
      return;
    }
    const db = firebase.firestore();
    // await db
    // .collection('users')
    // .doc('1')
    // .set({
    //   name: 'Dummy',
    //   // age: 80
    // }, { merge: true });

    const ref = await db.collection("users").add({
      name: userName,
      age: age,
    });
    const snapShot = await ref.get();
    const data = snapShot.data();
    console.log(ref.id, data);

    setUserName("");
    setAge("");
  };

  // ------------------------------------------
  // データを更新するボタン
  // ------------------------------------------
  const handleClickUpdateButton = async () => {
    if (!documentId) {
      alert("documentIdをセットしてください。");
      return;
    }

    const newData = {};
    if (userName) {
      newData["name"] = userName;
    }
    if (age) {
      newData["age"] = parseInt(age, 10);
    }

    try {
      const db = firebase.firestore();
      await db.collection("users").doc(documentId).update(newData);
      setUserName("");
      setAge("");
      setDocumentId("");
    } catch (error) {
      console.error(error);
    }

    // const db = firebase.firestore();
    // await db.collection('users').doc('Kvjzt1eRH8S20Y0kAcdj').update({
    //   name: '田中だよ〜〜〜〜〜〜〜〜〜',
    //   age: 1
    // });
  };

  // ------------------------------------------
  // データを削除するボタン
  // ------------------------------------------
  const handleClickDeleteButton = async () => {
    if (!documentId) {
      alert('documentIdをセットしてください');
      return;
    }

    try {
      const db = firebase.firestore();
      await db.collection('users').doc(documentId).delete();
      setUserName('');
      setAge('');
      setDocumentId('');
    } catch (error) {
      console.log(error);
    }
    // const db = firebase.firestore();
    // db.collection("users").doc("1").delete().then(function() {
    //   console.log("Document successfully deleted!");
    // }).catch(function(error) {
    //     console.error("Error removing document: ", error);
    // });
  }

  // ------------------------------------------
  // リスト表示
  // ------------------------------------------
  let userListItems = users.map((user) => {
    return (
      <li key={user.userId}>
        {user.userId} : {user.name} : {user.age} : {user.location}
      </li>
    );
  });

  return (
    <div className="App">
      <h1>ハロー23</h1>
      <div>
        <label htmlFor="username">userName : </label>
        <input
          type="text"
          id="username"
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <label htmlFor="age">age : </label>
        <input
          type="text"
          id="age"
          value={age}
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label htmlFor="documentId">documentId : </label>
        <input
          type="text"
          id="documentId"
          value={documentId}
          onChange={(event) => {
            setDocumentId(event.target.value);
          }}
        />
      </div>
      <button onClick={handleClickFetchButton}>取得</button>
      <button onClick={handleClickAddButton}>追加</button>
      <button onClick={handleClickUpdateButton}>更新</button>
      <button onClick={handleClickDeleteButton}>削除</button>
      <ul>{userListItems}</ul>
    </div>
  );
}

export default App;
