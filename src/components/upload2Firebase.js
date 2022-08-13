import { storage } from "./config/firebaseConfig.js";
import { ref, uploadBytesResumable } from "firebase/storage";
import React, { useState, useCallback } from "react";
import { toast } from 'react-toastify';
import { useDropzone } from "react-dropzone";
import UploadPrompt from "./UploadPrompt.js"
import { closeIcon } from "../images/imageindex"

function Upload2firebase({ closeModal }) {
    const [file, setFile] = useState("")

    const handleUpload = () => {
        if (!file) {
            alert("Please upload an file first!")
            return
        }
        toast.success("Upload Success!")

        // Receives the storage reference and the file to upload.
        // Only uploads one file currently
        const storageRef = ref(storage, `/resumes/${file[0].name}`)
        const uploadTask = uploadBytesResumable(storageRef, file[0])

        setFile("")
    }

    // when file is selected, set file state to that of the selected files
    const onDropAccepted = useCallback((acceptedFiles) => {
        setFile(acceptedFiles)
    })

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDropAccepted })

    return (
        <div>
            {/* dropzone component used for drag and drop files, acceptedFiles is [] of selected files */}
            <div {...getRootProps({ className: "dropzone" })}>
                <input className="input-zone" {...getInputProps()} />
                <UploadPrompt file={file} />
            </div>

            <div className="uploadNameContainer">
                <span>Name</span>
                <input className="uploadNameForm" input="text" placeholder="enter name of applicant"></input>
            </div>

            <button onClick={handleUpload} className="uploadSubmitBtn">Submit</button>
            <button className="uploadCloseBtn" onClick={closeModal}><img src={closeIcon}></img></button>
        </div>
    );
}

export default Upload2firebase;