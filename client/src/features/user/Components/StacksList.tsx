import React from 'react'

import StackItem from './StackItem'

const StacksList = () => {
  return (
    <div className="card-list group pointer-events-none grid grid-cols-5 gap-6 transition-opacity">
      <>
        {Array.from(Array(8).keys()).map(index => (
          <StackItem
            imageSrc="https://firebasestorage.googleapis.com/v0/b/kanjigami-61289.appspot.com/o/213.png?alt=media&token=3eef68c5-c33c-4eb7-99ff-fb4474f405f8"
            stack="クリスマス"
            key={index}
          />
        ))}
      </>
    </div>
  )
}

export default StacksList
