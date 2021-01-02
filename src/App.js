import React, {useState} from 'react';
// import logo from './logo.svg';
import firebase from 'firebase';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyCOtaZPB-d1A3tEuJm_csj6IeLq5PpuPro",
  authDomain: "my-project-4d424.firebaseapp.com",
  databaseURL: "https://my-project-4d424.firebaseio.com",
  projectId: "my-project-4d424",
  storageBucket: "my-project-4d424.appspot.com",
  messagingSenderId: "468644500368",
  appId: "1:468644500368:web:fbb114d1076b6cac26d915",
  measurementId: "G-KC4WFSKXH9"
};

// Firebaseの初期化
firebase.initializeApp(firebaseConfig);

function App() {
  const [users, setUsers] = useState([]);

  // データを取得するボタン（非同期処理があることを宣言）
  const handleClickFetchButton = async () => {
    const db = firebase.firestore();
    // ------------------documentを取得------------------------
    // // ドキュメントデータ取得（非同期処理）
    // const doc = await db.collection("users").doc('Kvjzt1eRH8S20Y0kAcdj').get();
    // // 処理後に実行
    // console.log(doc.data());


    // ------------------collectionを取得------------------------
    // // コレクションデータ取得（非同期処理）
    // const snapshot = await db.collection("users")
    // .where("age", ">", 20)/* ageが20より大きいの場合 */
    // .limit(1)/* 1件のみ取得 */
    // .get()
    // snapshot.forEach(function(doc) {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });


    const snapshot = await db
    .collection("users")
    .get();
    const _users = [];
    snapshot.forEach(doc => {
      _users.push({
        userId: doc.id,
        ...doc.data()
      });
    });
    setUsers(_users);
  };

  let userListItems = users.map(user => {
    return (
      <li key={user.userId}>{user.userId} : {user.name} : {user.age} : {user.location}</li>
    );
  });

  return (
    <div className="App">
      <h1>ハロー23</h1>
      <button onClick={handleClickFetchButton}>取得</button>
      <ul>{userListItems}</ul>
    </div>
  );
}

export default App;
