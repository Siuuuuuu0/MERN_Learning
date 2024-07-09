import React from 'react'
import {useParams} from 'react-router-dom'
import { useGetUserQuery } from './usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'

const EditUser = () => {

  const {id} = useParams()
  // const user = useSelector(state => selectUserById(state, id))
  const {user} = useGetUserQuery('usersList', {
    selectFromResult : ({data}) => ({
      user : data?.entities[id]
    })
  })
  if (!user) return <PulseLoader color={'#FFF'} />
  
  const content = <EditUserForm user={user} /> 

  return content
}

export default EditUser