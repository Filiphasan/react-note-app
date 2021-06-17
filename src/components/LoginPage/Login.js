import axios from 'axios'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import reqUrl from '../../Helpers/requestUrl'
import './Login.css'

const Login = ({ setUserId }) => {
    const [isValidate, setIsValidate] = useState(false)
    const history = useHistory()
    const handleSubmit = (e) => {
        e.preventDefault()
        let email = e.target.email.value
        let password = e.target.password.value
        axios.post(`${reqUrl}login`, { email, password }).then(response => {
            if (response.status === 200) {
                setIsValidate(false)
                localStorage.setItem("token", response.data.token)
                setUserId(response.data.user_id)
                history.push("/notes")
            }
        }).catch(error => {
            setIsValidate(true)
        })
    }
    return (
        <div className="login-page">
            <div className="login">
                <div className="form-container">
                    <h1 className="login-title">Giriş Yap</h1>
                    {
                        isValidate &&
                        <p className="login-validate">
                            <i className="fas fa-info-circle"></i>
                            Lütfen girdiğiniz bilgileri kontrol ediniz!
                        </p>
                    }
                    <form onSubmit={handleSubmit}>
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
                            <button className="form-button form-button-login">Giriş Yap</button>
                            <Link to="/signup" className="form-button form-button-signup">Kayıt Ol</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Login
