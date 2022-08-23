import axios from 'axios'
import React from 'react'
import './Backup.css'

const Base_URL = 'https://backup-data-server.herokuapp.com/';
//const Base_URL = 'http://localhost:8080/';
function Backup() {

    let Obj = JSON.parse(localStorage.getItem('React-App-Script'));
    if(Obj.username === undefined){
        Obj.username=''
    }
    localStorage.setItem('React-App-Script', JSON.stringify(Obj))

    function UploadData() {
        let allData;

        if (Obj.username === '' || Obj.username === null) {
            window.location.href = "./LoginSignup.html"
            return
        }
        else {
            axios.get(Base_URL + Obj.username)
                .then(res => {

                    allData = res.data;
                    console.log(allData[0]);

                    // Verifying account existence
                    if (allData.length > 0) {
                        let Item = allData[0];
                        Item.data = JSON.stringify(Obj.tasks);
                        console.log(Item);

                        // Uploading Data to server
                        axios.put(Base_URL, Item)
                            .then(resp => {
                                alert(resp.data)
                                console.log(resp)
                            })
                    }

                })
                .catch(e => console.log(e));
        }

    }

    function DownloadData() {
        if (Obj.username === '' || Obj.username === null) {
            window.location.href = "./LoginSignup.html"
            return
        }

        else {
            axios.get(Base_URL + Obj.username)
                .then(res => {
                    const Data = JSON.parse(res.data[0].data);
                    console.log(Data);
                    let i = 1;
                    while (Obj.tasks[i] != null) {
                        i++;
                    }
                    let j=1;
                    while(Data[j]!=null){
                        Obj.tasks[i++] = Data[j++];
                    }
                    console.log(Obj)
                    localStorage.setItem('React-App-Script', JSON.stringify(Obj));
                    alert("Backup appended successfully !");
                })
        }


    }

    return (
        <div className="backuppage">

            <div className="backbtnar">
                <div className="backBtn" onClick={() => window.history.back()} > {"<"}  Back</div>
            </div>

            <div className="allboxes">
                <div className="box">
                    <p>
                        Upload all data to cloud. So even if you lost phone, you still
                        access data which is safe on cloud
                    </p>
                    <div className="butn">
                        <button onClick={UploadData}>
                            Take Backup <i className="fas fa-cloud-upload-alt"> </i>
                        </button>
                    </div>
                </div>
                <div className="box">
                    <p>
                        Downloads and appends backup to existing items. Cureent data will be there as it is.
                    </p>
                    <div className="butn">
                        <input type="file" className="inputFile" />
                        <button style={{ backgroundColor: "rgb(194, 0, 74)" }} onClick={DownloadData}>
                            Download Backup <i className="fas fa-cloud-download-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Backup
