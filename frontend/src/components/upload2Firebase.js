import { storage, db } from "./config/firebaseConfig.js";
import { ref as ref_storage, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import UploadPrompt from "./UploadPrompt.js";
import { closeIcon } from "../images/imageindex";
import axios from "axios";
import {
  set,
  ref as ref_database,
  onValue,
  remove,
  update,
} from "firebase/database";
import { uid } from "uid";

function Upload2firebase({ closeModal }) {
  const [file, setFile] = useState("");
  // const [pdf, setPDF] = useState([]);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  // const [names, setNames] = useState([]);
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [location, setLocation] = useState("");

  const handleUpload = () => {
    if (!file) {
      alert("Please upload an file first!");
      return;
    }
    toast.success("Upload Success!");

    // Receives the storage reference and the file to upload.
    // Only uploads one file currently
    const storageRef = ref_storage(storage, `/resumes/${file[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, file[0]);

    const data = new FormData();

    for (let i = 0; i < file.length; i++) {
      // check file types here
      data.append("file", file[i]);
    }

    console.log("Test 2");
    axios
      .post("//localhost:8000/upload", data)
      .then((response) => {
        console.log(response.data);
        console.log("Test 3");

        axios
          .get("//localhost:8000/converter")
          .then((response) => {
            let pdf = response.data;

            setFile("");

            const uuid = uid();
            set(ref_database(db, `/resumes/${uuid}`), {
              uuid,
              name,
              birthday,
              email,
              phoneNum,
              location,
              pdf,
            });

            setName("");
            setBirthday("");
            setEmail("");
            setPhoneNum("");
            setLocation("");

            toast.success("Upload Success");
            //onSuccess(response.data)
          })
          .catch((e) => {
            //console.log('Error', e);
            toast.error("Upload Error");
          });

        console.log("Test 4");
        // toast.success("Upload 2 Success");
        //onSuccess(response.data)
      })
      .catch((e) => {
        //console.log('Error', e);
        // toast.error("Upload 2 Error");
      });
  };

  // when file is selected, set file state to that of the selected files
  const onDropAccepted = useCallback((acceptedFiles) => {
    setFile(acceptedFiles);
  });

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDropAccepted,
  });

  //read
  // useEffect(() => {
  //   onValue(ref_database(db, `/resumes`), (snapshot) => {
  //     setNames([]);
  //     const data = snapshot.val();
  //     if (data !== null) {
  //       Object.values(data).forEach((name) => {
  //         setNames((oldArray) => [...oldArray, name]);
  //       });
  //     }
  //   });
  // }, []);

  //write
  // const write2db = () => {
  //   const uuid = uid();
  //   set(ref_database(db, `/resumes/${uuid}`), {
  //     uuid,
  //     name,
  //     email,
  //     phoneNum,
  //     location,
  //     pdf,
  //   });

  //   setName("");
  //   setEmail("");
  //   setPhoneNum("");
  //   setLocation("");
  //   setPDF([]);
  // };

  // names.maps maps info according to name, will probably be on
  // on resumeTile.js file

  return (
    <div>
      {/* dropzone component used for drag and drop files, acceptedFiles is [] of selected files */}
      <div {...getRootProps({ className: "dropzone" })}>
        <input className="input-zone" {...getInputProps()} />
        <UploadPrompt file={file} />
      </div>
      <div className="uploadNameContainer">
        <span>Name</span>
        <input
          className="uploadNameForm"
          input="text"
          placeholder="enter name of applicant"
          onChange={(e) => setName(e.target.value)}
        ></input>
        {/* </div><FirebaseDB/> */}
      </div>
      <div className="uploadBirthdayContainer">
        <span>Birthday</span>
        <input
          className="uploadNameForm"
          input="text"
          placeholder="enter birthday of applicant"
          onChange={(e) => setBirthday(e.target.value)}
        ></input>
      </div>
      <div className="uploadEmailContainer">
        <span>Email</span>
        <input
          className="uploadNameForm"
          input="text"
          placeholder="enter email of applicant"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
      </div>
      <div className="uploadPhoneNumberContainer">
        <span>Phone Number</span>
        <input
          className="uploadNameForm"
          input="text"
          placeholder="enter phone number of applicant"
          onChange={(e) => setPhoneNum(e.target.value)}
        ></input>
      </div>
      <div className="uploadLocationContainer">
        <span>Location</span>
        <input
          className="uploadNameForm"
          input="text"
          placeholder="enter location of applicant"
          onChange={(e) => setLocation(e.target.value)}
        ></input>
      </div>
      <button onClick={handleUpload} className="uploadSubmitBtn">
        Submit
      </button>
      <button className="uploadCloseBtn" onClick={closeModal}>
        <img src={closeIcon}></img>
      </button>
    </div>
  );
}

export default Upload2firebase;
