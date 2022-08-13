import React from 'react'

const CommonWords = props => {
  const {
    setSearchText,
    searchText,
    skill,
  } = props;

  return (
    <div 
        className={searchText === skill ? "resumeSkillActive" : "resumeSkill"} 
        onClick={(e) => setSearchText(skill)}
    >{skill}</div>
  )
}

export default CommonWords;