import {store} from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import React from 'react'

const Prefetch = () => { //manual subrscription to notes and users so that it doesnt expire after 60 s
    //we will wrap the page in this outlet component we are returning
  useEffect(()=>{
    // const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
    // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
    store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', {force : true}))
    store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', {force : true}))
    // return () => {
    //     notes.unsubscribe()
    //     users.unsubscribe()
    // }
  }, [])
  return <Outlet />
}

export default Prefetch