import React from 'react'

const BaseLayout: React.FC = ({children}) => {
  return (
    <div >
      <h1>Yay! Welcome to umi!</h1>
      {children}
    </div>)
}