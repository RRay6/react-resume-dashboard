import React from 'react'

const ResumeTile = props => {
  const {
    testClick,
    name,
    birthday,
    email,
    phone,
    location,
    skill1,
    skill2,
    skill3,
  } = props;

  return (
    <div className="resumeTile">
    <h1>{name}</h1>
    <div>
      {birthday} <br />
      {email} <br />
      {phone} <br />
      {location} <br />
    </div>
    <h2>Skills</h2>
    <div className="resumeSkillsContainer">
      <div className="resumeSkill">{skill1}</div>
      <div className="resumeSkill">{skill2}</div>
      <div className="resumeSkill">{skill3}</div>
    </div>
    <button onClick={testClick}>View Details</button>
  </div>
  )
}

export default ResumeTile;