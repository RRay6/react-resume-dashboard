import { storage , db} from "./config/firebaseConfig.js";
import { ref as ref_storage, uploadBytesResumable } from "firebase/storage";
import React, {useEffect, useState, useCallback } from "react";
import { toast } from 'react-toastify';
import { useDropzone } from "react-dropzone";
import UploadPrompt from "./UploadPrompt.js"
import { closeIcon } from "../images/imageindex"
import { set, ref  as ref_database, onValue, remove, update } from 'firebase/database';
import { uid } from 'uid';

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
        const storageRef = ref_storage(storage, `/resumes/${file[0].name}`)
        const uploadTask = uploadBytesResumable(storageRef, file[0])
        setFile("");
        write2db(name);

    }

    // when file is selected, set file state to that of the selected files
    const onDropAccepted = useCallback((acceptedFiles) => {
        setFile(acceptedFiles)
    })

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ onDropAccepted })

    const [name, setName] = useState('');
    const [names, setNames] = useState([]);
    const [email, setEmail] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [location, setLocation] = useState('');
    const [company, setCompany] = useState('');
    const [skills, setSkills] = useState('');
  
    //read
    useEffect(() => {
      onValue(ref_database(db, `/resumes`), (snapshot) => {
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
      set(ref_database(db, `/resumes/${uuid}`), {
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
        <div >
            {/* dropzone component used for drag and drop files, acceptedFiles is [] of selected files */}
            <div {...getRootProps({ className: "dropzone" })}>
                <input className="input-zone" {...getInputProps()} />
                <UploadPrompt file={file} />
            </div>
            <div className="uploadNameContainer">
            <span>Name</span>
            <input className="uploadNameForm" input="text" placeholder="enter name of applicant" onChange={(e) => setName(e.target.value)}></input>
            {/* </div><FirebaseDB/> */}
            </div>
            <button onClick={handleUpload} className="uploadSubmitBtn">Submit</button>
            <button className="uploadCloseBtn" onClick={closeModal}><img src={closeIcon}></img></button>
            
        </div>
    );
}

export default Upload2firebase;