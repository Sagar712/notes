import React, { useState } from 'react'
import './Navigator.css'

export default function Navigator_mob(props) {
    const [flip, setflip] = useState(false);
    function popMenu() {
        document.querySelector('.menuItems').classList.toggle('active');
        document.querySelector('.menubtn-bar').classList.toggle('active');
        document.querySelector('.menuContainer').classList.toggle('active');
        if (!flip) {
            document.querySelector('#changeclas').className = 'fas fa-times';
            setflip(true)
        }
        else {
            document.querySelector('#changeclas').className = 'fas fa-ellipsis-v';
            setflip(false)
        }
    }

    function LogOut() {
        let LocalStorage = JSON.parse(localStorage.getItem('React-App-Script'));
        LocalStorage.username = '';
        localStorage.setItem('React-App-Script', JSON.stringify(LocalStorage));
        alert("Logged out successfully")
        popMenu()
    }

    return (
        <>
            <header>
                <div className="logo"> Script</div>

                <div className="bar">
                    <div className="addbtnbar" onClick={props.popupAddBtn}>
                        <i style={{ fontSize: "1.1rem" }} className="fas fa-plus"></i>
                    </div>
                    <button className="menubtn-bar" onClick={popMenu}>
                        <i id="changeclas" className="fas fa-ellipsis-v" style={{ fontSize: "1.3rem" }}></i>
                    </button>
                </div>

                <div className="menuItems">
                    <ul>
                        <li onClick={() => {
                            popMenu();
                            document.querySelector('.backuppage').classList.add('active');
                            window.history.pushState(null, null, null);
                        }}>
                            Backup
                        </li>
                        <li onClick={() => {
                            popMenu();
                            document.querySelector('.exportpage').classList.add('active');
                            window.history.pushState(null, null, null);
                        }}>
                            Export
                        </li>
                        <li onClick={() => {
                            popMenu();
                            document.querySelector('.profilepage1').classList.add('active');
                            window.history.pushState(null, null, null);
                        }}>
                            Profile
                        </li>
                    </ul>
                </div>
            </header>
            <div className="menuContainer" onClick={popMenu}>

            </div>
        </>
    )
}
