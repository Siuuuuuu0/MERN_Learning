import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/users/UsersList";
import UsersPage from "./features/users/UsersPage";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path='post'>
          <Route index element={<AddPostForm />}/>
          <Route path=':postId' element={<SinglePostPage />}/>
          <Route path='edit/:postId' element={<EditPostForm />}/>
        </Route>
        <Route path='users'>
          <Route index element={<UsersList />}/>
          <Route path=':userId' element={<UsersPage />}/>
        </Route>
        {/*Catch all*/}
        <Route path='*' element={<Navigate to='/' replace />}/> {/*replace flag that replaces the bad request in the history with the good request*/}
      </Route>
    </Routes>
  );
}

export default App;
