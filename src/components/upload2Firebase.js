import { storage } from "./config/firebaseConfig.js";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
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
            alert("Please upload an file first!");
        }

        const storageRef = ref(storage, `/resumes/${file.name}`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(

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
            <input className="uploadChooseFile" id="fileInputId" type={"file"} onChange={handleChange} />
            <label htmlFor="fileInputId">Choose File</label>
            <button onClick={handleUpload} className="uploadSubmitBtn">Upload</button>
        </div>
    );
}

export default Upload2firebase;