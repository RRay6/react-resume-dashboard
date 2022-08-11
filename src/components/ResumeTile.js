import React from 'react'

export default function ResumeTile({testClick}) {
  return (
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
  )
}
