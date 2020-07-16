import React from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SearchIcon from '@material-ui/icons/Search';

import './menu.css'

export default function menu(){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <div className="dropdown">
                        <button className="dropbtn">
                            Centro de Custos
                            <ArrowDownwardIcon />
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <div className="dropdown">
                        <button className="dropbtn">
                            Status
                            <ArrowDownwardIcon />
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <div className="dropdown">
                        <button className="dropbtn">
                            Surpervisor
                            <ArrowDownwardIcon />
                        </button>
                        <div className="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                </li>
            </ul>
            <form className="form-inline">
                <div className='input-group'>
                    <input className="form-control " type="search" placeholder="Search" aria-label="Search"/>
                    <span className='input-group-btn'>
                        <button className="btn btn-outline-success" type="submit">
                            <SearchIcon />
                        </button>
                    </span>
                </div>
            </form>
        </div>
    </nav>
    );
}