import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import { BookmarkContextComponent } from './BookmarkContext';
import PrivateRoute from './components/PrivateRoute';
import MyBookmarks from './Pages/MyBookmarks';
import AddBookmark from './Pages/AddBookmark';



const App = () => {
    return (
        <BookmarkContextComponent>
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/mybookmarks' element={
                    <PrivateRoute>
                        <MyBookmarks />
                    </PrivateRoute>
                } /> 
                 <Route path='/addbookmark' element={
                    <PrivateRoute>
                        <AddBookmark />
                    </PrivateRoute>
                } /> 
            </Routes>
            </Layout>
        </BookmarkContextComponent>
    );
}

export default App;