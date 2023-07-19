import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import db from './firebase-config';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const userCollectionRef = collection(db, 'users');

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(userCollectionRef);
    const fetchedUsers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("querySnapshot: ", querySnapshot);
    setUsers(fetchedUsers);
  };

  useEffect(() => {
    fetchUsers();
  },[]);

  const addUser = async (e) => {
    e.preventDefault();
    const user = { name, age };
    await addDoc(userCollectionRef, user);
    setName('');
    setAge('');
    fetchUsers();
  };

  const updateUser = async (id) => {
    setEditUserId(id);
    const userToUpdate = users.find((user) => user.id === id);
    if (userToUpdate) {
      setName(userToUpdate.name);
      setAge(userToUpdate.age);
    }
  };

  const saveUser = async (e) => {
    e.preventDefault();
    const userRef = doc(userCollectionRef, editUserId);
    await updateDoc(userRef, { name, age });
    setName('');
    setAge('');
    setEditUserId(null);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    const userRef = doc(userCollectionRef, id);
    await deleteDoc(userRef);
    fetchUsers();
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={editUserId ? saveUser : addUser}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">{editUserId ? 'Save' : 'Add'}</button>
      </form>
      <h2>Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
          <button onClick={() => updateUser(user.id)}>Edit</button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
