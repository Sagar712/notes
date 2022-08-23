let x=0;
export class DBcontrol{

    callHH(){
       let obj = JSON.parse(localStorage.getItem('React-App-Script'));
       return obj.tasks;
    }

    printX(){
        console.log(x);
    }

    modify(y){
        x=y;
    }

    getX(){
        return x;
    }

    encrypt(key, msg){
    
        if(key==="")
            key="7121996";
    
        let encypted="";
        let looper=0, len = key.length;
        let conv;
        let exchange=0;
        let series = [" ","!","'","#","$","%","&","\"","(",")","*","+",",","-",".","/",
            "0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@",
            "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
            "[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u",
            "v","w","x","y","z","{","|","}","~"];
     
        for(let i=0; i<msg.length; i++){
            let j=parseInt(key.charAt(looper));
            for(let k=0; k<series.length; k++){
                if(series[k]===msg.charAt(i)){
                    exchange=k;
                    break;
                }
            }
            if(msg.charAt(i)==="\n"){
                encypted = encypted.concat("\n");
                continue;
            }
                    
            conv = series[(exchange+j)%95];
            if(conv ===" "){
                conv="©";
            }
            encypted = encypted.concat(conv);
            looper = (looper+1)%len;
        }
        
        return encypted;
        
    }

    decrypt(key, msg){
        if(key==="")
            key = "7121996";
        let encypted="";
        let j =0, looper=0, len = key.length;
        let exchange=0;
        let series = [" ","!","'","#","$","%","&","\"","(",")","*","+",",","-",".","/",
            "0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@",
            "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
            "[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u",
            "v","w","x","y","z","{","|","}","~"];

        for(let i=0; i<msg.length; i++) {
            j= parseInt(key.charAt(looper));
            let temp = msg.charAt(i)
            if(temp==="©")
                temp = " ";
            
            for(let k=0; k<series.length; k++) {
                if(series[k] === temp) {
                    exchange = k;
                    break;
                }
            }
            let conv;
            if(msg.charAt(i)==="\n"){
                encypted = encypted.concat("\n");
                continue;
            }
            if(exchange-j<0) {
                conv = series[95+(exchange-j)];
            }
            else
                conv = series[exchange-j];
            
            
            encypted = encypted.concat(conv);
            looper = (looper+1)%len;
        }
        return encypted;
    }

    addItem(title, key, description){
        let obj = JSON.parse(localStorage.getItem('React-App-Script'));
        let i=1;
        let status="";
        while(obj.tasks[i]!=null){
            i++;
        }
        console.log(key)
        let msg = this.encrypt(key, description);
        if(key===""){
            status="Default key";
            obj.tasks[i] = {
                title : title,
                status : status,
                description : msg,
                signature : "open"
            }
        }
        else{
            let signature = this.encrypt(key, "[&Vishvishvaraya;&");
            status="Unique Key";
            obj.tasks[i] = {
                title : title,
                status : status,
                description : msg,
                signature : signature
            }
        }   

        localStorage.setItem('React-App-Script', JSON.stringify(obj));

    }

    deleteItem(val){
        if(val>0){
            let obj = JSON.parse(localStorage.getItem('React-App-Script'));
            let deleted={
                tasks:{},
                items:{}
            };
            deleted.items = obj.items;
            let i=1, j=1;
            let index = val;
            while(obj.tasks[i]!=null){
                if(index!=i){
                    deleted.tasks[j++] = obj.tasks[i];
                }
                i++;
            }
            localStorage.setItem('React-App-Script', JSON.stringify(deleted));
        }
        else
            alert("No item selected!!");
    }

    saveChanges(key, description, index){
        let obj = JSON.parse(localStorage.getItem('React-App-Script'));
        let i=1;
        console.log("Editing intialized")
        while(obj.tasks[i]!=null){
            if(i === index){
                if(obj.tasks[i].status ==="Default key"){
                    obj.tasks[i].description = this.encrypt("", description);
                    console.log(obj);
                }
                else{
                    obj.tasks[i].description = this.encrypt(key, description);
                    console.log(obj);
                }
            }
            i++;
        }
        localStorage.setItem('React-App-Script', JSON.stringify(obj));
    }

    download(data, strFileName, strMimeType) {

        var self = window, // this script is only for browsers anyway...
            defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
            mimeType = strMimeType || defaultMime,
            payload = data,
            url = !strFileName && !strMimeType && payload,
            anchor = document.createElement("a"),
            toString = function(a){return String(a);},
            myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
            fileName = strFileName || "download",
            blob,
            reader;
            myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
      
        if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
            payload=[payload, mimeType];
            mimeType=payload[0];
            payload=payload[1];
        }
    
    
        if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
            fileName = url.split("/").pop().split("?")[0];
            anchor.href = url; // assign href prop to temp anchor
              if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
                var ajax=new XMLHttpRequest();
                ajax.open( "GET", url, true);
                ajax.responseType = 'blob';
                ajax.onload= function(e){ 
                  this.download(e.target.response, fileName, defaultMime);
                };
                setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
                return ajax;
            } // end if valid url?
        } // end if url?
    
    
        //go ahead and download dataURLs right away
        if(/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)){
        
            if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
                payload=dataUrlToBlob(payload);
                mimeType=payload.type || defaultMime;
            }else{			
                return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
                    navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
                    saver(payload) ; // everyone else can save dataURLs un-processed
            }
            
        }//end if dataURL passed?
    
        blob = payload instanceof myBlob ?
            payload :
            new myBlob([payload], {type: mimeType}) ;
    
    
        function dataUrlToBlob(strUrl) {
            var parts= strUrl.split(/[:;,]/),
            type= parts[1],
            decoder= parts[2] == "base64" ? atob : decodeURIComponent,
            binData= decoder( parts.pop() ),
            mx= binData.length,
            i= 0,
            uiArr= new Uint8Array(mx);
    
            for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);
    
            return new myBlob([uiArr], {type: type});
         }
    
        function saver(url, winMode){
    
            if ('download' in anchor) { //html5 A[download]
                anchor.href = url;
                anchor.setAttribute("download", fileName);
                anchor.className = "download-js-link";
                anchor.innerHTML = "downloading...";
                anchor.style.display = "none";
                document.body.appendChild(anchor);
                setTimeout(function() {
                    anchor.click();
                    document.body.removeChild(anchor);
                    if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
                }, 66);
                return true;
            }
    
            // handle non-a[download] safari as best we can:
            if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
                url=url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
                if(!window.open(url)){ // popup blocked, offer direct download:
                    //if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
                }
                return true;
            }
    
            //do iframe dataURL download (old ch+FF):
            var f = document.createElement("iframe");
            document.body.appendChild(f);
    
            if(!winMode){ // force a mime that will download:
                url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
            }
            f.src=url;
            setTimeout(function(){ document.body.removeChild(f); }, 333);
    
        }//end saver
    
    
    
    
        if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
            return navigator.msSaveBlob(blob, fileName);
        }
    
        if(self.URL){ // simple fast and modern way using Blob and URL:
            saver(self.URL.createObjectURL(blob), true);
        }else{
            // handle non-Blob()+non-URL browsers:
            if(typeof blob === "string" || blob.constructor===toString ){
                try{
                    return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
                }catch(y){
                    return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
                }
            }
    
            // Blob but not URL support:
            reader=new FileReader();
            reader.onload=function(e){
                saver(this.result);
            };
            reader.readAsDataURL(blob);
        }
        return true;
    }; /* end download() */
}