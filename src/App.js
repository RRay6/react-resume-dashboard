import './App.css';
import React from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResumeTile from './components/ResumeTile'
import { useState } from "react";
import Pagination from './components/Pagination';

Modal.setAppElement('#root');

function App() {
  // Resume submission overlay State
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  // onClick handler for testing
  const testClick = (e) => {
    e.preventDefault();
    toast("Wow so easy !");
  }

  // For pagination
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="app">

      {/* Navigation bar with: title + resume upload link */}
      <nav>
        <span className="title">resume parser</span>
        <button className="uploadResume" onClick={() => setModalIsOpen(true)}> upload resume </button>
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
        <ResumeTile 
          testClick={testClick}
          name="Tony Smith"
          birthday="August 9, 17:00"
          email="tonysmith@gmail.com"
          phone="+1(000)111-2234"
          location="Toronto, Canada"
          skill1="JavaScript"
          skill2="Python"
          skill3="Sql"
        />
        <ResumeTile testClick={testClick}/>
        <ResumeTile testClick={testClick}/>
      </div>


      <ToastContainer
        position="bottom-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        transition={Slide}
      />

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={10}
        pageSize={3}
        onPageChange={page => setCurrentPage(page)}
      />

    </div>
  );
}

export default App;