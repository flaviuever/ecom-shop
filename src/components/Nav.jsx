import React from "react";
import {Link} from 'react-router-dom'
import './nav.css'
const Nav = ({ selectedLanguage }) => {
    return(
        <div className="navContainer">
            <nav className="navBar">
                <ul className="ulList">
                <Link className="link" to="/category/1">{selectedLanguage.labelForWinter}</Link>
                <Link className="link" to="/category/2">{selectedLanguage.labelForSpring}</Link>
                <Link className="link" to="/category/3">{selectedLanguage.labelForAutumn}</Link>
                </ul>
            </nav>
        </div>
        
    )
}

export default Nav;