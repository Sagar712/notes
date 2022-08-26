import React, { useEffect, useState } from 'react'
import './profile.css'

function Profile(props) {

    const [uname, setUname] = useState('');
    const [butn, setButn] = useState();
    let dark

    useEffect(() => {
        setUname(returnUser());
        setButn(ButtonReturn());
    }, [])

    function returnUser() {
        const Obj = JSON.parse(localStorage.getItem('React-App-Script'));
        if (Obj.username == '') {
            console.log(Obj.username)
            return <p style={{ color: 'grey' }}>Not signed in</p>
        }

        return <p>{Obj.username}</p>
    }

    function LogOut() {
        let LocalStorage = JSON.parse(localStorage.getItem('React-App-Script'));
        LocalStorage.username = '';
        localStorage.setItem('React-App-Script', JSON.stringify(LocalStorage));
        setUname(returnUser());
        setButn(ButtonReturn());
        alert("Logged out successfully")

    }

    function DeleteAll() {
        console.log("Hello");
        const Obj = JSON.parse(localStorage.getItem('React-App-Script'));

        if (window.confirm("This will permanently delete all data! CAUTION!")) {
            Obj.tasks = {}
            localStorage.setItem('React-App-Script', JSON.stringify(Obj));
            alert("All data deleted successfully!")
        }
        else
            alert("Aborted!")

    }

    function ButtonReturn() {
        const Obj = JSON.parse(localStorage.getItem('React-App-Script'));
        if (Obj.username == '') {
            return <button className='btn1' onClick={() => {
                window.location.href = './LoginSignup.html'
            }}>Log In</button>
        }

        return <button className='btn1' onClick={LogOut}>Log Out</button>
    }

    if (localStorage.getItem('ScriptDarkMode') == null) {
        localStorage.setItem('ScriptDarkMode', 'OFF')
    }

    function handleChangeNightMode() {
        dark = localStorage.getItem('ScriptDarkMode')
        document.querySelector('.circle').classList.toggle('move')
        document.querySelector('.toggleme').classList.toggle('move')
        if (dark == 'OFF') {
            localStorage.setItem('ScriptDarkMode', 'ON')
            document.documentElement.setAttribute("data-theme", "dark");
        }
        else {
            localStorage.setItem('ScriptDarkMode', 'OFF')
            document.documentElement.setAttribute("data-theme", "root");
        }
        props.useForceUpdate()
    }

    return (
        <div className="profilepage1">

            <div className="backbtnar">
                <div className="backBtn" onClick={() => window.history.back()} > {"<"}  Back</div>
            </div>

            <div className='profileHere'>
                <div className='userNameHere'>{uname}</div>
                <div className='buttonset'>
                    {butn}
                    <button className='btn2' onClick={() => {
                        window.location.href = './LoginSignup.html'
                    }}>Sign Up</button>
                </div>
                <div className='changeNightMode'>
                    <div style={{ marginLeft: "1rem" }}>Night mode</div>
                    <div className="toggleme" onClick={handleChangeNightMode}>
                        <div className="circle"></div>
                    </div>
                </div>
                <div className='changeNightMode' onClick={DeleteAll}>
                    <div style={{ marginLeft: "1rem" }}>Delete all</div>
                    <i className="fas fa-trash-alt"></i>
                </div>
                <div className='changeNightMode'>
                    <div style={{ marginLeft: "1rem" }}>Share Data</div>
                    <i className="fab fa-whatsapp"></i>
                </div>
            </div>

            <div className='copyright'>© Sagar Wankhade</div>
        </div>
    )
}

export default Profile
