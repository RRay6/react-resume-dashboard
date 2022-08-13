import React, { useEffect, useState } from 'react';
import { db } from './config/firebaseConfig';
import { set, ref, onValue, remove, update } from 'firebase/database';
import { uid } from 'uid';

// Parsed file keywords will be written to a file
// New file will then be written firebase Realtime database
// It will then display on the webApp
// We can upload to firebase for storage and at the same time parse the file
// and create the new file to write to the DB
const FirebaseDB = () => {
  const [name, setName] = useState('');
  const [names, setNames] = useState([]);
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [skills, setSkills] = useState('');

  //read
  useEffect(() => {
    onValue(ref(db, `/resumes`), (snapshot) => {
      setNames([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).forEach((name) => {
          setNames((oldArray) => [...oldArray, name]);
        });
      }
    });
  }, []);
  //write
  const write2db = () => {
    const uuid = uid();
    set(ref(db, `/resumes/${uuid}`), {
      uuid,
      name,
      email,
      phoneNum,
      location,
      company,
      skills,
    });
    setName('');
    setEmail('');
    setPhoneNum('');
    setLocation('');
    setCompany('');
    setSkills('');
  };

  // names.maps maps info according to name, will probably be on
  // on resumeTile.js file
  return (
    <table>
      {names.map((name) => (
        <>
          <tr key={name.name}></tr>
          <th>{name.name}</th>
          <td> {name.email}</td>
          <td>{name.phoneNum}</td>
          <td>{name.location} </td>
          <td>{name.skills} </td>
        </>
      ))}
      ;
    </table>
  );
};

export default FirebaseDB;
