import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
        {/* <!-- Header Start --> */}
        <div className="header-area header-transparent fixed-header" style={{background:"linear-gradient(to bottom,#bb56fe,#5b72fe)"}}>
            <div className="main-header ">
                <div className="header-bottom  header-sticky">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            {/* <!-- Logo --> */}
                            <div className="col-xl-2 col-lg-2">
                                <div className="logo">
                                    <a href="index.html"><img src="assets/img/logo/logo.png" alt=""/></a>
                                </div>
                            </div>
                            <div className="col-xl-10 col-lg-10">
                                <div className="menu-wrapper d-flex align-items-center justify-content-end">
                                    {/* <!-- Main-menu --> */}
                                    <div className="main-menu d-none d-lg-block">
                                        <nav>
                                            <ul id="navigation">                                                                                          
                                                <li className="active" >
                                                    <Link to="/" >Home</Link>
                                                    {/* <a href="index.html">Home</a> */}
                                                    </li>
                                                <li>
                                                    {/* <a href="courses.html">Courses</a> */}
                                                    <Link to="/course" >Courses</Link>
                                                    </li>
                                                <li>
                                                    {/* <a href="about.html">About</a> */}
                                                    <Link to="/about" >About</Link>
                                                    
                                                    </li>
                                                
                                                {/* <li><a href="contact.html">Contact</a></li> */}
                                               
                                                {/* <!-- Button --> */}

                                                <li className="button-header">
                                                <Link to="/login" className="btn btn3">Log in</Link>
                                                    {/* <a href="login.html" className="btn btn3">Log in</a> */}
                                                    </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div> 
                            {/* <!-- Mobile Menu --> */}
                            <div className="col-12">
                                <div className="mobile_menu d-block d-lg-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Header End --> */}
    </header>
  )
}

export default Header