import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import {Home} from './pages/Home'
import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'
import { AboutUs } from './pages/AboutUs'
import './assets/style/main.css'
import { store } from './store/store'

export default function App() {
  //asdasdasd
  return (
      <Provider store={store}>
          <Router>
              <div>
                  <AppHeader />
                  
                  <main>
                      <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/toy" element={<ToyIndex />} />
                          <Route path='/toy/:toyId' element={<ToyDetails />} />
                          <Route path="/toy/edit/:toyId" element={<ToyEdit />} />
                          <Route path="/about" element={<AboutUs />} />
                         {/* <Route path="/admin" element={<Admin />}/>
                          <Route path="user/profile" element={<UserProfile />}/>  */}
                      </Routes>
                  </main>
                  <AppFooter />
              </div>
          </Router>
      </Provider>
  )
}


