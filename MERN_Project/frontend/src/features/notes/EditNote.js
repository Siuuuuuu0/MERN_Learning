import { useParams } from 'react-router-dom'
import EditNoteForm from './EditNoteForm'
import { useGetNoteQuery } from './notesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import PulseLoader from 'react-spinners/PulseLoader'
import useAuth from '../../hooks/useAuth'

const EditNote = () => {
    const { id } = useParams()

    // const note = useSelector(state => selectNoteById(state, id))
    // const users = useSelector(selectAllUsers)
    const {username, isManager, isAdmin} = useAuth()

    const {note} = useGetNoteQuery('notesList', {
        selectFromResult : ({data}) => ({
            note : data?.entities[id]
        })
    })

    const {users} = useGetUsersQuery('usersList', {
        selectFromResult : ({data}) => ({
            users : data?.ids.map(id => data?.entities[id])
        })
    })

    if(!note || !users?.length) return <PulseLoader color={'#FFF'} />

    if(!isManager&&!isAdmin){
        if(note.username !== username){
            return <p className='errmsg'>No Access</p>
        }
    }
    const content = <EditNoteForm note={note} users={users} /> 

    return content
}
export default EditNote