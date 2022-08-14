import React from "react";
import {
  resumeAddress,
  resumeDate,
  resumeEmail,
  resumeNumber,
  resumePhone,
} from "../images/imageindex";

const ResumeTile = (props) => {
  const {
    testClick,
    name,
    birthday,
    email,
    phone,
    location,
    // skill1,
    // skill2,
    // skill3,
    pdf,
    searchTerm,
  } = props;

  return (
    <div className="resumeTile">
      <h1>{name}</h1>
      <div>
        <img src={resumeDate} /> {birthday} <br />
        <img src={resumeEmail} /> {email} <br />
        <img src={resumePhone} /> {phone} <br />
        <img src={resumeAddress} /> {location} <br />
      </div>
      <h2>Matched Keywords</h2>
      {/* <div className="resumeSkillsContainer">
        <div className="resumeSkill">{skill1}</div>
        <div className="resumeSkill">{skill2}</div>
        <div className="resumeSkill">{skill3}</div>
      </div> */}
    <div className="resumeSkillsContainer">
      {pdf.map((item, index) => {
        if (
          searchTerm !== "" &&
          `${item}`.toLowerCase().includes(`${searchTerm}`.toLowerCase())
          
        ) {
          // console.log(item.toLowerCase());

          return (
            
              <div className="resumeSkill">{item}</div>

          );
        }
      })}            
    </div>
      <button onClick={testClick}>View Details</button>
    </div>
  );
};

export default ResumeTile;
