import Home from './Home';
import PostPage from './PostPage'; 
import About from './About'; 
import Missing from './Missing';
import NewPost from './NewPost';
import Layout from './Layout';
import EditPost from './EditPost';
import {Route, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';

function App() {
  const setPosts = useStoreActions((actions)=>actions.setPosts);
  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');

    useEffect(()=>{
        setPosts(data); 
    }, [data, setPosts]);

  return (
      <div className="App">
        <Routes>
          <Route path ='/' element={<Layout />}>
            <Route index element={<Home 
              isLoading={isLoading}
              fetchError={fetchError}
            />}/> {/*default route*/}
            <Route path = 'post'>
              <Route index element={ /*index for the post route */
                <NewPost />
              } />
              <Route path = ':id' element={<PostPage />}/> {/* adds the routes together ie /post/:id */}
            </Route>
            <Route path = 'edit/:id' element={<EditPost />
            } />
            <Route path = 'about' element={<About />} />
            <Route path = '*' element={<Missing />} /> {/*catch all*/}
          </Route>
        </Routes>
      </div>
  );
}

export default App;
