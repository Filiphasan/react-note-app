import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import reqUrl from '../../Helpers/requestUrl'
import './Notes.css'
import Navbar from '../Navbar/Navbar'
import NotePopup from '../NotePopup/NotePopup'

const Notes = () => {
    const token = localStorage.getItem("token")
    const userId = jwtDecode(token).user_id
    const [userNotes, setUserNotes] = useState([])
    const [popup, setPopup] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    useEffect(() => {
        axios.get(`${reqUrl}note/${userId}`, { headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' } })
            .then(response => { setUserNotes(response.data.data) })
            .catch(error => { console.log(error) })
    }, [])

    const handleAddNote = () => {
        setPopup(true)
    }
    const pushNote = (note) => {
        setUserNotes([...userNotes, note])
    }
    const deleteNote = (id) => {
        axios.delete(`${reqUrl}note/${id}`, { headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' } }).then(response => {
            const index = userNotes.findIndex(note => note.id === id)
            if (index > -1) {
                const newUserNotes = userNotes.filter(note => note.id !== id)
                setUserNotes(newUserNotes)
            }
        }).catch(error => console.log(error))
    }
    return (
        <>
            <NotePopup popup={popup} setPopup={setPopup} pushNote={pushNote} isUpdate={isUpdate} user_id={userId} token={token} />
            <Navbar />
            <div className="note-page">
                <div className="container">
                    <div className="note-list">
                        <div className="note-list-header">
                            <h3 className="note-list-header-title"><i className="fas fa-clipboard"></i> Not Listesi</h3>
                            <button className="note-list-header-btn" onClick={() => { handleAddNote() }}><i className="fas fa-plus"></i> Yeni Not Ekle</button>
                        </div>
                        {
                            userNotes.length > 0 ? (
                                userNotes.map(note => {
                                    return (
                                        <div className="note" key={note.id}>
                                            <div className="note-content">
                                                <h4 className="note-title">{note.title}</h4>
                                                <p className="note-desc">{note.description}</p>
                                            </div>
                                            <div className="note-action">
                                                <button className="note-btn note-delete" title="Sil" onClick={() => deleteNote(note.id)}><i className="fas fa-trash"></i></button>
                                                <button className="note-btn note-edit" title="Düzenle" ><i className="fas fa-edit"></i></button>
                                            </div>
                                        </div>
                                    )
                                })

                            ) :
                                (
                                    <div className="note-nocontent">
                                        <h4><i className="fas fa-info-circle"></i> Kayıtlı Not Bulunmamaktadır. Yeni Not Ekle Butonuna Tıklayarak Not Ekleyebilirsiniz.</h4>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes
