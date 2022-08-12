import './App.css';
import React from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ResumeTile from './components/ResumeTile'
import Upload2firebase from './components/upload2Firebase';
import { mainLogo, magnifyGlassLogo } from './images/imageindex'
import Pagination from './components/Pagination';
import resumeData from './mock_data.json';

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
  const [currentPage, setCurrentPage] = React.useState(1);

  // Resume data
  const resumeDataView = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * 4;
    const lastPageIndex = firstPageIndex + 4;
    return resumeData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);


  return (
    <div className="app">

      {/* Navigation bar with: title + resume upload link */}
      <nav>
        <img className="titleLogo" src={mainLogo} />
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
        {/* Upload2firebase component is the resume submission UI */}
        <Upload2firebase />
        <button className="uploadCloseBtn" onClick={() => setModalIsOpen(false)}>X</button>
      </Modal>

      {/* Search bar div with: invisible input form + search button */}
      <div className="searchBar">
        <img className="searchLogo" src={magnifyGlassLogo} />
        <input className="searchInput" placeholder="enter your search here" />
        <span className="searchAdvanced"><strong><u>advanced filter</u></strong></span>
      </div>

      <div className="commonWordsSection">
        <span>or select from the most common keywords found:</span>
        <div className="commonWordsContainer">
          <div className="resumeSkill">Javascript</div>
          <div className="resumeSkill">Python</div>
          <div className="resumeSkill">SQL</div>
        </div>
      </div>


      {/* Resume summary tiles */}
      <div className="viewUploaded">
        <span>recently uploaded</span>
        <span className="viewAll"><strong><u>view all</u></strong></span>
      </div>

      <div className="resumeTilesBoard">
        {resumeDataView.map(item => {
          return (
            <ResumeTile
              testClick={testClick}
              name={item.name}
              birthday={item.birthday}
              email={item.email}
              phone={item.phone}
              location={item.location}
              skill1={item.skill1}
              skill2={item.skill2}
              skill3={item.skill3}
            />
          );
        })}
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
        className="paginationBar"
        currentPage={currentPage}
        totalCount={resumeData.length}
        pageSize={4}
        onPageChange={page => setCurrentPage(page)}
      />

    </div>
  );
}

export default App;