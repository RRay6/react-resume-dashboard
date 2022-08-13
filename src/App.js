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
    e.preventDefault()
    toast.success("Wow so easy !")
  }

  // Add popular searches from word cloud to the search bar


  // Search Bar (captures user input)
  const [searchText, setSearchText] = React.useState("");

  // Current number of resume tiles filtered by search.
  const [resumeDataSize, setResumeDataSize] = React.useState(resumeData.length);

  // Pagination (captures user's page number)
  const [currentPage, setCurrentPage] = React.useState(1);

  // The current view of the resume data:
  // This is hard coded to show 4 tiles on screen.
  const resumeDataView = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * 4;
    const lastPageIndex = firstPageIndex + 4;
    let query = searchText.toLowerCase()
    let filterResumeData = resumeData.filter(person => {
      if (searchText === "") {
        //if query is empty
        return person;
      } else if (person.name.toLowerCase().includes(query)
        ||       person.email.toLowerCase().includes(query)
        ||       person.location.toLowerCase().includes(query)
        ||       person.skill1.toLowerCase().includes(query)
        ||       person.skill2.toLowerCase().includes(query)
        ||       person.skill3.toLowerCase().includes(query)
      ) {
        //returns filtered array
        return person;
      }})
    setResumeDataSize(filterResumeData.length);
    return filterResumeData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, searchText]); // Change resume tiles when currentPage or searchText changes.



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
        <Upload2firebase closeModal={() => setModalIsOpen(false)}/>
      </Modal>

      {/* Search bar div with: invisible input form + search button */}
      <div className="searchBar">
        <img className="searchLogo" src={magnifyGlassLogo} />
        <input className="searchInput" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="enter your search here" />
        <span className="searchAdvanced"><strong><u>advanced filter</u></strong></span>
      </div>

      <div className="commonWordsSection">
        <span>or select from the most common keywords found:</span>
        <div className="commonWordsContainer">
          <div className="resumeSkill" onClick={() => setSearchText("Javascript")}>Javascript</div>
          <div className="resumeSkill" onClick={() => setSearchText("Python")}>Python</div>
          <div className="resumeSkill" onClick={() => setSearchText("SQL")}>SQL</div>
        </div>
      </div>


      {/* Resume summary tiles */}
      <div className="viewUploaded">
        <span>all applicants</span>
        <span className="viewAll"><strong><u>switch to a list view</u></strong></span>
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
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        transition={Slide}
      />

      <Pagination
        className="paginationBar"
        currentPage={currentPage}
        totalCount={resumeDataSize}
        pageSize={4}
        onPageChange={page => setCurrentPage(page)}
      />

    </div>
  );
}

export default App;