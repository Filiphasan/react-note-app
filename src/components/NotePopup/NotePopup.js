import axios from 'axios'
import React, { useState } from 'react'
import reqUrl from '../../Helpers/requestUrl'
import './NotePopup.css'

const NotePopup = ({ popup, setPopup, pushNote, user_id, token }) => {
    const addNote = (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const description = e.target.description.value
        axios.post(`${reqUrl}note`, { title, description, user_id }, { headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' } }).then(response => {
            if (response.status === 201) {
                pushNote(response.data)
                setPopup(false)
            }
        }).catch(error => {
            console.log(error)
        })
    }
    return (
        <>
            <div className={`modal ${popup ? 'opened' : ''}`}>
                <div className="modal-overlay modal-toggle" onClick={() => setPopup(false)}></div>
                <div className="modal-wrapper modal-transition">
                    <div className="modal-header">
                        <button className="modal-close modal-toggle" onClick={() => setPopup(false)}><i className="fas fa-times"></i></button>
                        <h2 className="modal-heading"><i className="fas fa-plus"></i> Not Ekle</h2>
                    </div>
                    <div className="modal-body">
                        <div className="modal-content">
                            <form className="modal-form" onSubmit={addNote}>
                                <div className="form-modal-item">
                                    <i className="fas fa-heading"></i>
                                    <input type="text" name="title" placeholder="Not Başlık" />
                                </div>
                                <div className="form-modal-item">
                                    <i className="fas fa-comment-alt"></i>
                                    <textarea rows="5" name="description" placeholder="Not Açıklama"></textarea>
                                </div>
                                <button className="form-modal-btn" type="submit"><i className="far fa-save"></i> Kaydet</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotePopup
