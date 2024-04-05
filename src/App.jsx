import './App.css'
import {useEffect, useState} from "react";
import Notification from "./Components/Notification/Notification.jsx";


function App() {
    const [data,setData] = useState({label: '', status: 'error', text: ''})
    const [visibleNotice, setVisibleNotice] = useState(false)
    const fetch = () => {
        return new Promise((resolve, reject) => {
            if (Math.random() > 0.5) return resolve();
            const index = setTimeout(() => {
                reject({label: 'Ошибка', status: 'error', text: 'Не выполнено'});
                return clearTimeout(index);
            }, 1000);
        })
    }

    const getData = async () => {
        setVisibleNotice(false)
        const res = await fetch()
            .then(() => setData({label: 'Успешно', status: 'success', text: 'всё выполнено'}))
            .catch(() => setData({label: 'Ошбика', status: 'error', text: 'Не выполнено'}))
        setVisibleNotice(true)
    }
  return (
    <div className="App">
        <button onClick={getData}>Отправить запрос</button>
        {visibleNotice ? <Notification label={data.label} status={data.status} text={data.text} setVisible={setVisibleNotice}/> : null}
    </div>
  )
}

export default App
