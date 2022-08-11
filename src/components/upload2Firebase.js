import storage from "./config/firebaseConfig.js";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import React, { useState } from "react";
import filelogo from './images/file-upload.jpg';
function Upload2firebase() {
    const [file, setFile] = useState("");
 
    // progress
    const [percent, setPercent] = useState(0);
 
    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }
 
    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
 
        const storageRef = ref(storage, `/resumes/${file.name}`);
 
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };
 
    return (
        <div>
            <title> Tech | Apply</title>
            <h1 className="page-header"> Apply! </h1>
            
            <body className='body-page'><div className="dont-move">
            <div class="file-upload-icon-container">
            <img class="file-upload-icon" src={filelogo}/>
  
            <input className="file-choose" type="file" onChange={handleChange} accept=".pdf" />
            <button onClick={handleUpload} className="upload">Upload</button>
            <p className="percent">{percent} % done</p>
            </div>
            </div>
            </body>

            <footer className="footer"> <div className="footer-txt">Tech Company</div> </footer>
            
        </div>
    );
}

export default Upload2firebase;