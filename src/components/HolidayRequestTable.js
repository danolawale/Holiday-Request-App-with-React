
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Modal from './Modal'
import HolidayRequestForm from './HolidayRequestForm'

export default function HolidayRequestTable({holidays, setHolidays, showModal, setShowModal}) {

    const [showUpdateModal, setShowUpdateModal] = useState(false)

    const deleteRequest = (id) => {
        setHolidays(prevRequests => {
            return prevRequests.filter(request => request.id !== id)
        })
    }

    return (
        <div ><br />
            <table className='holiday-table'>
            <thead>
                <tr>
                    <th>id</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Status</th>
                    <th>Requested By</th>
                    <th>Requested On</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {holidays.map(holiday => (
                <tr>
                    <td>{holiday.id}</td>
                    <td>{holiday.start}</td>
                    <td>{holiday.end}</td>
                    <td>{holiday.status}</td>
                    <td>{holiday.requestedBy}</td>
                    <td>{holiday.requestedOn}</td>
                    <td>
                        <a href="#" onClick={() => setShowUpdateModal(true)}><FontAwesomeIcon icon={faPen} />
                        {showUpdateModal && 
                            <Modal>
                                <HolidayRequestForm holiday={holiday}/>
                            </Modal>
                        }
                        </a>&nbsp;&nbsp;&nbsp;
                        <a href="#" onClick={(e) => deleteRequest(holiday.id)}><FontAwesomeIcon icon={faTrash} /></a>
                    </td>
                </tr>
            ))}
            </tbody>
            </table>
        </div>
    )
}