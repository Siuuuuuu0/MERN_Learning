import React from 'react';
import Header from'./Header';
import Footer from './Footer';
import Nav from './Nav'; 
import { Outlet } from 'react-router-dom';
const Layout = (s) => {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Outlet /> {/*all other nested components*/}
      <Footer /> {/*we always want the header and nav to appear, but not the main elements*/} 
      </div>
  )
}

export default Layout