import axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import reqUrl from '../../Helpers/requestUrl'
import '../LoginPage/Login.css'

const Signup = () => {
    const [isValidate, setIsValidate] = useState(false)
    const history = useHistory()
    const addUser = (e) => {
        e.preventDefault()
        const first_name = e.target.first_name.value
        const last_name = e.target.last_name.value
        const email = e.target.email.value
        const password = e.target.password.value
        axios.post(`${reqUrl}user`, { first_name, last_name, email, password }).then(response => {
            if (response.status === 201) {
                setIsValidate(false)
                history.push("/")
            }
        }).catch(error => {
            setIsValidate(true)
        })
    }
    return (
        <div className="login-page">
            <div className="login">
                <div className="form-container">
                    <h1 className="login-title">Kayıt Ol</h1>
                    {
                        isValidate &&
                        <p className="login-validate">
                            <i className="fas fa-info-circle"></i>
                            Lütfen girdiğiniz bilgileri kontrol ediniz!
                        </p>
                    }
                    <form onSubmit={addUser}>
                        <div className="form-group">
                            <i className="fas fa-user"></i>
                            <input type="text" name="first_name" className="form-input" required placeholder="Ad" />
                            <span></span>
                        </div>
                        <div className="form-group">
                            <i className="fas fa-user"></i>
                            <input type="text" name="last_name" className="form-input" required placeholder="Soyad" />
                            <span></span>
                        </div>
                        <div className="form-group">
                            <i className="fas fa-envelope"></i>
                            <input type="text" name="email" className="form-input" required placeholder="E-Mail" />
                            <span></span>
                        </div>
                        <div className="form-group">
                            <i className="fas fa-key"></i>
                            <input type="Password" name="password" className="form-input" required placeholder="Şifre" />
                            <span></span>
                        </div>
                        <div className="form-buttons">
                            <button className="form-button form-button-login">Kayıt Ol</button>
                            <Link to="/" className="form-button form-button-signup">Giriş Yap</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
