import React from 'react'

const Button = (props) => {
  return (
    <button className="bg-purple text-white px-4 py-1 rounded-full lg:text-2xl" onClick={props.onClick}>{props.children}</button>
  )
}

export default Button