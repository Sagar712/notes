import { useState } from 'react';
import './App.css';
import Backup from './Components/Backup';
import { DBcontrol } from './Components/DBcontrol';
import Edit_desk from './Components/Edit_desk';
import Edit_mob from './Components/Edit_mob';
import Export from './Components/Export';
import Items_desk from './Components/Items_desk';
import Items_mob from './Components/Items_mob';
import Navigator_desk from './Components/Navigator_desk';
import Navigator_mob from './Components/Navigator_mob';
import PopupAdd from './Components/PopupAdd';
import Profile from './Components/Profile';

function App() {
  const [value, setValue] = useState(0); // integer state
  const [des, setDes] = useState("Empty Data");
  const [resize, setResize] = useState(window.innerWidth);
  let obj = new DBcontrol();

  function useForceUpdate() {
    setValue(value => value + 1); // update the state to force render
    console.log("Reloaded App");
    if (obj.getX() > 0) {
      let allItems = obj.callHH();
      console.log(obj.getX())
      setDes(allItems[obj.getX()].description);
    }
  }

  function triggerPop() {
    document.querySelector('.bigContainer').classList.add('active');
    document.querySelector('.popupTask').classList.add('active');
    window.history.pushState(null, null, null);
  }

  function deltePostOpertn() {
    obj.modify(0);
    setValue(value => value + 1);
  }
  window.addEventListener('resize', () => {
    setResize(window.innerWidth);
  })
  window.onpopstate = (e) => {
    document.querySelector('.edit').classList.remove('active');
    document.querySelector('.exportpage').classList.remove('active');
    document.querySelector('.backuppage').classList.remove('active');
    document.querySelector('.bigContainer').classList.remove('active');
    document.querySelector('.popupTask').classList.remove('active')
    document.querySelector('.profilepage1').classList.remove('active');
    setValue(value => value + 1);
  }

  return (
    <div className="parent">
      {resize > 1110 ?
        <>
          <Navigator_desk popupAddBtn={triggerPop} />
          <div className="container">
            <Items_desk useForceUpdate={useForceUpdate} />
            <Edit_desk desc={des} allItems={obj.callHH()} index={obj.getX()} useForceUpdate={useForceUpdate} deltePostOpertn={deltePostOpertn} />
          </div>
        </>

        :
        <>
          <Navigator_mob popupAddBtn={triggerPop} />
          <div className="container">
            <Items_mob useForceUpdate={useForceUpdate} />
            <Edit_mob desc={des} allItems={obj.callHH()} index={obj.getX()} useForceUpdate={useForceUpdate} deltePostOpertn={deltePostOpertn} />
          </div>
        </>
      }
      <Backup />
      <Export useForceUpdate={useForceUpdate} />
      <PopupAdd triggerPop={triggerPop} />
      <Profile />
    </div>
  );
}

export default App;
