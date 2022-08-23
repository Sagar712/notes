import React, { useEffect } from 'react'
import { DBcontrol } from './DBcontrol';
import './Export.css'

export default function Export(props) {
    
    let ob = new DBcontrol();
    
    function importHandle() {
        document.querySelector(".inputFile").click();
    }
    
    useEffect(() => {
        document.querySelector(".inputFile").addEventListener('change', function(e){
            let inputDial = document.querySelector(".inputFile");
            console.log(inputDial.files);
            const reader = new FileReader()
            reader.onload = function(){
                try{
                    const allData = JSON.parse(reader.result);
                    if(allData.tasks != null && allData.items != null){
                        console.log(allData);
                        //localStorage.setItem('React-App-Script', JSON.stringify(allData));
                        DataAppend(allData);
                        alert("import successful");
                    }
                    else{
                        alert("import Failed !\nPossible reasons:"+
                            "\n• Wrong name\n• extension is not .json");
                    }
                }
                catch(e){
                    alert("import Failed !\nPossible reasons:"+
                    "\n• wrong name\n• extension is not .json\n• file corrupted(very rare)");
                }
    
            }
            reader.readAsText(inputDial.files[0]);
        });
    }, []);

    function DataAppend(downloaded) {
        let Old_one = JSON.parse(localStorage.getItem('React-App-Script'));
        let i=1;
        while(Old_one.tasks[i]!=null)
            i++;
        let j=1;
        while(downloaded.tasks[j]!=null){
            Old_one.tasks[i++] = downloaded.tasks[j];
            j++;
        }
        console.log(Old_one)
        localStorage.setItem('React-App-Script', JSON.stringify(Old_one));
        props.useForceUpdate();
    }

    function exportFile() {
        let masterDb = {tasks:{},items:{}};
        let scriptDb = JSON.parse(localStorage.getItem("React-App-Script"));
        if(scriptDb != null)
            masterDb = scriptDb;
        console.log(masterDb);
        ob.download(JSON.stringify(masterDb), "React-Back-up.json", "text/plain");
    }

    return (
        <div className="exportpage">
            <div className="backbtnar">
                <div className="backBtn" onClick={()=>window.history.back()} > {"<"}  Back</div>
            </div>

            <div className="allboxes">
                <div className="box">
                    <p>
                        Export all encryted text to your device which you can later revoke here by importing.
                        File will be stored in downloads folder with name <span style={{color: "rgb(255, 196, 0)"}}>Back-Up-Data.json</span> 
                    </p>
                    <div className="butn">
                        <button onClick={exportFile}>
                            export <i className="fas fa-upload"> </i>
                        </button>
                    </div>
                </div>
                <div className="box">
                    <p>
                        All imported items will be added on home page. 
                        You need to choose valid <span style={{color: "rgb(255, 196, 0)"}}>Back-Up-Data.json</span>
                        to import items successfully.
                    </p>
                    <div className="butn">
                        <input type="file" className="inputFile"/>
                        <button style={{backgroundColor: "rgb(194, 0, 74)"}} onClick={importHandle}>
                            import <i className="fas fa-download"></i> 
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
