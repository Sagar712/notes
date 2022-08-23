import React from 'react'
import './Navigator.css';

export default function Navigator_desk(props) {

    function LogOut() {
        let LocalStorage = JSON.parse(localStorage.getItem('React-App-Script'));
        LocalStorage.username = '';
        localStorage.setItem('React-App-Script', JSON.stringify(LocalStorage));
        alert("Logged out successfully")
    }

    return (
        <header>
            <div className="logo"><i className="fas fa-mask"></i> Script</div>

            <div className="menuitems">
                <div className="icons" onClick={props.popupAddBtn}>
                    Add
                </div>

                <div className="icons" onClick={() => {
                    document.querySelector('.backuppage').classList.add('active');
                    window.history.pushState(null, null, null);
                }}>
                    Backup
                </div>

                <div className="icons" onClick={() => {
                    document.querySelector('.exportpage').classList.add('active');
                    window.history.pushState(null, null, null);
                }}>
                    Export
                </div>
                <div className="icons" onClick={() => {
                    document.querySelector('.profilepage1').classList.add('active');
                    window.history.pushState(null, null, null);
                }}>
                    Profile
                </div>

                {/*
<div className="icons" onClick={() => {
                    window.location.href = './LoginSignup.html'
                }}>
                    Log in
                </div>
                <div className="icons" onClick={LogOut}>
                    Log out
                </div>
                */}


            </div>
        </header>
    )
}
