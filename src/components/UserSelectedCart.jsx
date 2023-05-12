import React from 'react'
import { useSelector } from 'react-redux'

export default function UserSelectedCart() {
    const users=useSelector(store=>store.userSelected.UserSelected)
    console.log(users);
  return (
    <div>UserSelectedCart</div>
  )
}
