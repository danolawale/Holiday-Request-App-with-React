import { useState } from 'react'
import './HolidayRequestForm.css'
export default function HolidayRequestForm(props) {

    const [name, setName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [startTime, setStartTime] = useState('')

    const datePrefix = (number) => {
        return number > 9 ? number : `0${number}`
    }

    const formatDate = (dt, isDateTimeLocal = false) => {
        let year = datePrefix(dt.getFullYear());
        let month = datePrefix(dt.getMonth() + 1);
        let day = datePrefix(dt.getDate());

        let hours = datePrefix(dt.getHours());
        let minutes = datePrefix(dt.getMinutes());
        let seconds = datePrefix(dt.getSeconds());

        if(isDateTimeLocal === false) {
            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
        } else {
            return `${year}-${month}-${day}T${hours}:${minutes}`;
        }

        
    }

    const modifyDate = (start) => {
        let time = start === 'full-09:00' ? '09:00' : start
        let duration = start === 'full-09:00' ? 8 : 4

        setStartDate(prevDate => {
            let previousDate = prevDate || convertToDateTimeLocal(props.holiday?.start)
            let [ bookedDate, bookedTime] = previousDate.split('T')
            return formatDate(new Date(`${bookedDate}T${time}`))
        })
        setEndDate(prevDate => {
            let previousDate = prevDate || convertToDateTimeLocal(props.holiday?.start)
            let [ bookedDate, bookedTime] = previousDate.split('T')
            let date = new Date(`${bookedDate}T${time}`)
            date.setHours(date.getHours() + duration)
            date.setMinutes(date.getMinutes() + 30)

            return formatDate(date)
        })
    }

    const convertToDateTimeLocal = (dateTimeString) => {
        if(!dateTimeString) {
            return
        }
        const [dateString, timeString] = dateTimeString?.split(' ')
        

        if(!dateString) {
            return
        }

        const [day, month, year] = dateString.split('-')
        const [hour, minutes] = timeString.split(':')

        return `${year}-${month}-${day}T${hour}:${minutes}`;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const request = {
            id: props.holiday?.id || props.nextRow,
            start: startDate,
            end: endDate,
            status: 'pending',
            requestedBy: name || props.holiday?.requestedBy,
            requestedOn: formatDate( new Date())
        }
        console.log(request)

        if(props.holiday?.id) {
            props.updateHoliday(request)
        } else {
            props.requestHoliday(request)
        }

        
    }
    return (
        <form className="holiday-request-form" onSubmit={handleSubmit}>
            <label>
                <button name="close" onClick={(e) => props.closeModal(e)}>Close...</button>
            </label>
            <label>
                <span>Name</span>
                <select onChange={(e) => setName(e.target.value)} value={name || props.holiday?.requestedBy}>
                <option value="">Select Your Name</option>
                <option value="James Crayford">James Crayford</option>
                <option value="Lola Crystal">Lola Crystal</option>
                <option value="Dan Halloway">Dan Halloway</option>
                <option value="kerrie Henshaw">Kerrie Henshaw</option>
                <option value="David Major">David Major</option>
            </select>
            </label>

            <label>
                <span>Start Date</span>
                <input type="datetime-local" value={ startDate || convertToDateTimeLocal(props.holiday?.start) } onChange={(e) => setStartDate(e.target.value)}/>

            </label>

            <label>
                <span>End Date</span>
                <input type="datetime-local" value={ endDate || convertToDateTimeLocal(props.holiday?.end) } onChange={(e) => setEndDate(e.target.value)}/>
            </label>

            { ((startDate && endDate) || props.holiday) && (<label>
                <span>Duration</span>
                <select onChange={(e) => setStartTime(e.target.value)}>
                    <option>Duration Type</option>
                    <option value="full-09:00">Full Day</option>
                    <option value="09:00">Half Day - AM</option>
                    <option value="13:00">Half Day - PM</option>
                </select>
            </label>)}

            <label>
                <span>Status</span>
                <input type="text" value="pending" disabled/>
            </label>

            {startTime && <button name="submit" type="submit" onClick={() => modifyDate(startTime)}>Submit</button>}
        </form>
    )
}