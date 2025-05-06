import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Outlet} from "react-router-dom"

const Layout = () => {
  return (
    <div>
        <Header/>
        <main style={{
            margintop:"1000px"
        }}>
            <Outlet/>
        </main>

        <Footer/>
    </div>
  )
}

export default Layout