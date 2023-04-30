import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
export default function Login() {
    let navigate = useNavigate();
            const [cred, setcred] = useState({email: "", password: ""})

    const handlesubmit = async (e) => {
                e.preventDefault() //synthetic event
        // hitting the backend api
        const response = await fetch('http://localhost:5000/api/userlogin', {
                // as it is post method so we have to define
                method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: cred.email, password: cred.password})
        });

            const json = await response.json()
            console.log(json);

            if (!json.success) {
                alert("Enter Valid Credentials!")
            }
            if (json.success) {
                localStorage.setItem("userEmail",cred.email);
                localStorage.setItem("authToken",json.authToken);
                navigate("/")
            }

    }

    const onchange = (event) => {
                setcred({ ...cred, [event.target.name]: event.target.value })
            }



            return (
            <>
                
                <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
                    <div>
                        <Navbar></Navbar>
                    </div>
                <div className="container">
                    <form className='w-50 m-5 mt-5  bg-* ' style={{fontWeight:'100px'}} onSubmit={handlesubmit}>
                        
                        <div className="m-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={cred.email} onChange={onchange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="m-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={cred.password} onChange={onchange} />
                        </div>
                        <div className="m-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="m-3 btn btn-success">Submit</button>
                        <Link to='/createuser' className="m-3 btn btn-danger">Register</Link>
                    </form>
                </div>
</div>
            </>
            )
    
}