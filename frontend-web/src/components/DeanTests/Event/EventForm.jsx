import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createEvent, updateEvent, deleteEvent } from '../../../features/events/eventSlice'

function EventForm() {
    const dispatch = useDispatch()

    const [formData, setFormData] = useState(
        {
            location: "", 
            date: "",
            'O-': "", 
            'O+': "",
            'A-': "", 
            'A+': "",
            'B-': "", 
            'B+': "", 
            'AB-': "", 
            'AB+': "", 
        }
    )

    const [formData2, setFormData2] = useState(
        {
            id: "",
            'O-': "", 
            'O+': "",
            'A-': "", 
            'A+': "",
            'B-': "", 
            'B+': "", 
            'AB-': "", 
            'AB+': "", 
        }
    )

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        dispatch(createEvent(formData))
        console.log(formData)
    }
    
    function handleChange2(event) {
        const {name, value} = event.target
        setFormData2(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleSubmit2(event) {
        event.preventDefault()
        dispatch(updateEvent(formData2))
        console.log(formData2)
    }
    
    const [formData3, setFormData3] = useState(
        {
            id: "",
        }
    )

    function handleChange3(event) {
        const {name, value} = event.target
        setFormData3(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleSubmit3(event) {
        event.preventDefault()
        dispatch(deleteEvent(formData3))
        console.log(formData3)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Location"
                    onChange={handleChange}
                    name="location"
                    value={formData.location}
                />
                <input
                    type="text"
                    placeholder="Date"
                    onChange={handleChange}
                    name="date"
                    value={formData.date}
                />
                <input
                    type="number"
                    placeholder="O-"
                    onChange={handleChange}
                    name="O-"
                    value={formData['O-']}
                />
                <input
                    type="number"
                    placeholder="O+"
                    onChange={handleChange}
                    name="O+"
                    value={formData['O+']}
                />
                <input
                    type="number"
                    placeholder="A-"
                    onChange={handleChange}
                    name="A-"
                    value={formData['A-']}
                />
                <input
                    type="number"
                    placeholder="A+"
                    onChange={handleChange}
                    name="A+"
                    value={formData['A+']}
                />
                <input
                    type="number"
                    placeholder="B-"
                    onChange={handleChange}
                    name="B-"
                    value={formData['B-']}
                />
                <input
                    type="number"
                    placeholder="B+"
                    onChange={handleChange}
                    name="B+"
                    value={formData['B+']}
                />
                <input
                    type="number"
                    placeholder="AB-"
                    onChange={handleChange}
                    name="AB-"
                    value={formData['AB-']}
                />
                <input
                    type="number"
                    placeholder="AB+"
                    onChange={handleChange}
                    name="AB+"
                    value={formData['AB+']}
                />
                
                <br />
                <br />
                <button>Submit</button>
            </form>

            <form onSubmit={handleSubmit2}>
                <input
                    type="text"
                    placeholder="Event ID"
                    onChange={handleChange2}
                    name="id"
                    value={formData2.id}
                />
                <input
                    type="number"
                    placeholder="O-"
                    onChange={handleChange2}
                    name="O-"
                    value={formData2['O-']}
                />
                <input
                    type="number"
                    placeholder="O+"
                    onChange={handleChange2}
                    name="O+"
                    value={formData2['O+']}
                />
                <input
                    type="number"
                    placeholder="A-"
                    onChange={handleChange2}
                    name="A-"
                    value={formData2['A-']}
                />
                <input
                    type="number"
                    placeholder="A+"
                    onChange={handleChange2}
                    name="A+"
                    value={formData2['A+']}
                />
                <input
                    type="number"
                    placeholder="B-"
                    onChange={handleChange2}
                    name="B-"
                    value={formData2['B-']}
                />
                <input
                    type="number"
                    placeholder="B+"
                    onChange={handleChange2}
                    name="B+"
                    value={formData2['B+']}
                />
                <input
                    type="number"
                    placeholder="AB-"
                    onChange={handleChange2}
                    name="AB-"
                    value={formData2['AB-']}
                />
                <input
                    type="number"
                    placeholder="AB+"
                    onChange={handleChange2}
                    name="AB+"
                    value={formData2['AB+']}
                />
                
                <br />
                <br />
                <button>Submit</button>
            </form>

            <form onSubmit={handleSubmit3}>
                <input
                    type="text"
                    placeholder="Event ID"
                    onChange={handleChange3}
                    name="id"
                    value={formData3.id}
                />
                <br />
                <br />
                <button>Submit</button>
            </form>
        </>
    )
}

export default EventForm