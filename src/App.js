import './App.css';
import React from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root');

function App() {
  // Resume submission overlay State
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  // onClick handler for testing
  const testClick = (e) => {
    e.preventDefault();
    toast("Wow so easy !");
  }

  return (
    <div className="app">

      {/* Navigation bar with: title + resume upload link */}
      <nav>
        <span className="title">resume parser</span>
        <span className="uploadResume" onClick={() => setModalIsOpen(true)}> upload resume </span>
      </nav>

      {/* Popup overlay for the resume submission UI */}
      <Modal
        className="uploadModal"
        overlayClassName="uploadOverlay"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {/* Label is CSS stylable button for a hidden file input because file input can't be styled */}
        <input className="uploadChooseFile" id="fileInputId" type={"file"} onChange={testClick} />
        <label htmlFor="fileInputId">Choose File</label>

        <button className="uploadSubmitBtn" onClick={testClick}>Upload</button>
        <button className="uploadCloseBtn" onClick={() => setModalIsOpen(false)}>X</button>
      </Modal>

      {/* Search bar div with: invisible input form + search button */}
      <div className="searchBar">
        <input className="searchInput" placeholder="enter your search here" />
        <button className="searchBtn" onClick={testClick}>search</button>
      </div>

      {/* Resume summary tiles */}
      <div className="resumeTilesBoard">
        <div className="resumeTile">
          <h1>Tony Smith</h1>
          <div>
            August 9, 17:00 <br />
            tonysmith@gmail.com <br />
            +1(000)111-2234 <br />
            Toronto, Canada <br />
          </div>
          <h2>Skills</h2>
          <div className="resumeSkillsContainer">
            <div className="resumeSkill">JavaScript</div>
            <div className="resumeSkill">Python</div>
            <div className="resumeSkill">Sql</div>
          </div>
          <button onClick={testClick}>View Details</button>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        transition={Slide}
      />
    </div>
  );
}

export default App;