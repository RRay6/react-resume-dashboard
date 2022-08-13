import "./App.css";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResumeTile from "./components/ResumeTile";
import Upload2firebase from "./components/upload2Firebase";
import { mainLogo, magnifyGlassLogo } from "./images/imageindex";
import Pagination from "./components/Pagination";
import CommonWords from "./components/CommonWords";
import resumeData from "./mock_data.json";
import { db } from "./components/config/firebaseConfig.js";
import { ref as ref_database, onValue } from "firebase/database";

Modal.setAppElement("#root");

function App() {
  // Resume submission overlay State
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  // onClick handler for testing
  const testClick = (e) => {
    e.preventDefault();
    toast.success("Wow so easy !");
  };

  // Add popular searches from word cloud to the search bar

  // Search Bar (captures user input)
  const [searchText, setSearchText] = React.useState("");

  const [data, setData] = useState([]);

  // Current number of resume tiles filtered by search.
  const [resumeDataSize, setResumeDataSize] = React.useState(resumeData.length);

  // Pagination (captures user's page number)
  const [currentPage, setCurrentPage] = React.useState(1);

  // The current view of the resume data:
  // This is hard coded to show 4 tiles on screen.
  const resumeDataView = React.useMemo(() => {
    const firstPageIndex = (currentPage - 1) * 4;
    const lastPageIndex = firstPageIndex + 4;
    let query = searchText.toLowerCase();

    let filterResumeData = Array.isArray(data)
      ? data.filter((person) => {
          // console.log(person.pdf);
          // console.log(person.pdf.includes(query));
          if (searchText === "") {
            //if query is empty
            return person;
          } else if (
            person.name.toLowerCase().includes(query) ||
            person.email.toLowerCase().includes(query) ||
            person.location.toLowerCase().includes(query)
            // person.pdf.includes(query)
            // person.skill1.toLowerCase().includes(query) ||
            // person.skill2.toLowerCase().includes(query) ||
            // person.skill3.toLowerCase().includes(query)
          ) {
            //returns filtered array
            return person;
          }
        })
      : [];
    setResumeDataSize(filterResumeData.length);
    return filterResumeData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, searchText]); // Change resume tiles when currentPage or searchText changes.

  // List All Files
  // const listItem = () => {
  //   storage
  //     .ref()
  //     .child("resumes/")
  //     .listAll()
  //     .then((res) => {
  //       res.items.forEach((item) => {
  //         setData((arr) => [...arr, item.name]);
  //       });
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });

  //   console.log(data);
  // };
  useEffect(() => {
    onValue(ref_database(db, `/resumes`), (snapshot) => {
      setData([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).forEach((name) => {
          setData((oldArray) => [...oldArray, name]);
        });
      }
    });
  }, []);

  return (
    <div className="app">
      {/* Navigation bar with: title + resume upload link */}
      <nav>
        <img className="titleLogo" src={mainLogo} />
        <span className="title">resume parser</span>
        <button className="uploadResume" onClick={() => setModalIsOpen(true)}>
          {" "}
          upload resume{" "}
        </button>
      </nav>

      {/* Popup overlay for the resume submission UI */}
      <Modal
        className="uploadModal"
        overlayClassName="uploadOverlay"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        {/* Upload2firebase component is the resume submission UI */}
        <Upload2firebase closeModal={() => setModalIsOpen(false)} />
      </Modal>

      {/* Search bar div with: invisible input form + search button */}
      <div className="searchBar">
        <img className="searchLogo" src={magnifyGlassLogo} />
        <input
          className="searchInput"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="enter your search here"
        />
        <span className="searchAdvanced">
          <strong>
            <u>advanced filter</u>
          </strong>
        </span>
      </div>

      <div className="commonWordsSection">
        <span>or select from the most common keywords found:</span>
        <div className="commonWordsContainer">
          <CommonWords
            skill="Javascript"
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <CommonWords
            skill="Python"
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <CommonWords
            skill="SQL"
            searchText={searchText}
            setSearchText={setSearchText}
          />
        </div>
      </div>

      {/* Resume summary tiles */}
      <div className="viewUploaded">
        <span>all applicants</span>
        <span className="viewAll">
          <strong>
            <u>switch to a list view</u>
          </strong>
        </span>
      </div>

      <div className="resumeTilesBoard">
        {resumeDataView.map((item) => {
          return (
            <ResumeTile
              testClick={testClick}
              name={item.name}
              birthday={item.birthday}
              email={item.email}
              phone={item.phoneNum}
              location={item.location}
              pdf={item.pdf}
              searchTerm={searchText}
              // skill2={item.skill2}
              // skill3={item.skill3}
              // pdf={item.pdf}
            />
          );
        })}
      </div>

      {/* {console.log("LOG START")}
      {console.log(data)}
      {console.log("LOG END")} */}

      {/* <button onClick={listItem} className="uploadSubmitBtn">
        TEST
      </button> */}

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
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}

export default App;
