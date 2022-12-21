import { useState } from 'react';
import './App.css';
import HolidayRequestTable from './components/HolidayRequestTable';
import HolidayRequestForm from './components/HolidayRequestForm';
import Modal from './components/Modal';

function App() {

  const [ showModal, setShowModal ] = useState(false);
  const [ holidays, setHolidays ] = useState([]);
  const [ showTable, setShowTable ] = useState(true);

  const requestHoliday = (holiday) => {
    setHolidays(prevHolidays => {
      return [...prevHolidays, holiday]
    })

    setShowModal(false)
  }

  return (
    <div className="App">
      <h2>Holiday Request Table</h2>
      <button onClick={() => setShowModal(true)}>Request Holiday</button>
      <HolidayRequestTable holidays={holidays} setHolidays={setHolidays} />

      {showModal && <Modal>
        <HolidayRequestForm requestHoliday={requestHoliday} nextRow={holidays.length + 1}/>
      </Modal>}
    </div>
);
}

export default App;
