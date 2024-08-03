import React, { useState } from 'react'
import './login.css'
import {  useNavigate  } from 'react-router-dom';
import UseApi from '../../api/UseApi';

const Login = () => {

    const saveUserInfoToLocalStorage = (userInfo) => {
        if (!userInfo) {
            localStorage.removeItem('user');
        } else {
            localStorage.setItem('user', JSON.stringify(userInfo));
        }
    }

    const [formlogin, setFormlogin] = useState({
        email: 'hoangphuc2004lk@gmail.com',
        password: '123456qQ!'
    })

    const luu = async() => {
        try {
            const result = await UseApi.login(formlogin);
            if(result.status){
                const userInfo = { ...formlogin }
                console.log(result.data)
                saveUserInfoToLocalStorage(result.data);
                window.location.reload();
            }else{
                console.log("lỗi")
            }
        } catch (error) {
            
        }
       
       
    }

    const handleTxt = (e) => {
        setFormlogin(prev => (
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }
    return (
        <section class="h-100 gradient-form d-flex align-items-center" style={{ backgroundColor: '#eee' }}>
            <div class="container">
                <div class="row d-flex justify-content-center align-items-center ">
                    <div class="col-xl-10">
                        <div class="card rounded-3 text-black">
                            <div class="row g-0">
                                <div class="col-lg-6">
                                    <div class="card-body">

                                        <div class="text-center">
                                            <img src="https://res.cloudinary.com/dnodsjqql/image/upload/v1711726984/r5t5e2p4vyffv2giuemr.png"
                                                style={{ width: '185px' }} alt="logo" />
                                            <h4 class="mt-1 mb-5 pb-1">Welcome</h4>
                                        </div>

                                        <form>
                                            <h5 style={{textAlign:'center',}}>Please login to your account</h5>

                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="form2Example11">Email</label>
                                                <input type="email" id="form2Example11" class="form-control"
                                                    name='email'
                                                    value={formlogin.email}
                                                    onChange={handleTxt}
                                                    placeholder="email address" />
                                            </div>

                                            <div class="form-outline mb-4">
                                                <label class="form-label" for="form2Example22">Password</label>
                                                <input type="password" id="form2Example22" class="form-control"
                                                    name='password'
                                                    value={formlogin.password}
                                                    onChange={handleTxt} />
                                            </div>

                                            <div class="text-center pt-1 mb-5 pb-1 row d-flex justify-content-center">
                                                <button
                                                    onClick={() => { luu() }}
                                                    class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" style={{ width: 100 }} type="button">
                                                    Log in</button>
                                                <a class="text-muted" href="#!">Forgot password?</a>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                                <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <img src="https://res.cloudinary.com/dnodsjqql/image/upload/v1711727449/dfubwdvoqq2akeoda2qm.png" 
                                         alt="anh" style={{width: '100%', height: '100%'}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login