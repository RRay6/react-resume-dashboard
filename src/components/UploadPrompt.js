import React from 'react'

export default function UploadPrompt({ file }) {

  if (!file) {
    return (
      <div className='uploadPromptDefault'>
        <span>drag and drop or <u>browse</u> </span>
      </div>
    )
  } else if (file.length > 1) {
    return (
      <div className='uploadPromptSelected'>{file.length} files selected</div>
    )
  } else {
    return (
      <div className='uploadPromptSelected'>{file[0].name}</div>
    )
  }
}