import { storage } from "./config/firebaseConfig.js";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import React, { useState } from "react";

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
            <body className='body-page'><div className="dont-move">
            <div class="file-upload-icon-container">
            <img class="file-upload-icon" />
            <input className="uploadChooseFile" id="fileInputId" type={"file"} onChange={handleChange} />
            <label htmlFor="fileInputId">Choose File</label>
            <button onClick={handleUpload} className="uploadSubmitBtn">Upload</button>
            <p className="percent">{percent} % done</p>
            </div>
            </div>
            </body>

            
        </div>
    );
}

export default Upload2firebase;