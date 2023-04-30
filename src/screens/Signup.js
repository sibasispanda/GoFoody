import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';

export default function SignUp() {
    const [cred, setcred] = useState({ name: "", email: "", password: "", geolocation: "" })
    let [address, setAddress] = useState("");
    let navigate = useNavigate()

    // const handleClick = async (e) => {
    //     e.preventDefault();
    //     let navLocation = () => {
    //       return new Promise((res, rej) => {
    //         navigator.geolocation.getCurrentPosition(res, rej);
    //       });
    //     }
    //     let latlong = await navLocation().then(res => {
    //       let latitude = res.coords.latitude;
    //       let longitude = res.coords.longitude;
    //       return [latitude, longitude]
    //     })
    //     // console.log(latlong)
    //     let [lat, long] = latlong
    //     console.log(lat, long)




    //   try {
    //     // const response = await axios.post('/getlocation', { lat, long });
    //     // const location = response.data.location;
    //     // // locationOutput.textContent = `Location: ${location}`;
    //     // console.log(location);
    //     const response = await fetch("http://localhost:5000/api/getLocation", {
    //     method: 'POST',
    //     headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ latlong: { lat, long } })

    // });
    // const location = response.data.location;
    // console.log(location);

    //   } catch (error) {
    //     console.error(error);
    //     // locationOutput.textContent = 'Failed to retrieve location';
    //     console.log('Failed to retrieve location');
    //   }

    // }


    const handleClick = async (e) => {
        e.preventDefault();
        let navLocation = () => {
            return new Promise((res, rej) => {
                navigator.geolocation.getCurrentPosition(res, rej);
            });
        }
        let latlong = await navLocation().then(res => {
            let latitude = res.coords.latitude;
            let longitude = res.coords.longitude;
            return [latitude, longitude]
        })
        //console.log(latlong)
        let [lat, long] = latlong
        console.log(lat, long)
        const response = await fetch("http://localhost:5000/api/getLocation", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ latlong: { lat, long } })

        });
        const { location } = await response.json()
        console.log(location);
        setAddress(location);
        setcred({ ...cred, [e.target.name]: location })
    }


    const handlesubmit = async (e) => {
        e.preventDefault() //synthetic event
        // hitting the backend api
        const response = await fetch('http://localhost:5000/api/createuser', {
            // as it is post method so we have to define
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password, location: cred.geolocation })
        });
        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials!")
        }
        if (json.success) {
            //save the auth toke to local storage and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/login")
      
          }

    }

    const onchange = (event) => {
        setcred({ ...cred, [event.target.name]: event.target.value })
    }



    return (
        <>
            <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
                <div>
                    <Navbar />
                </div>









                <div className="container" >
                    {/* m-5 mt-5 */}
                    <form className='w-50' onSubmit={handlesubmit}>
                        <div className="m-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" className="form-control" placeholder='Your Name' name='name' value={cred.name} onChange={onchange} />
                        </div>
                        <div className="m-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email@.com' name='email' value={cred.email} onChange={onchange} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="m-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Password must be more than 5 letters' name='password' value={cred.password} onChange={onchange} />
                        </div>
                        {/* <div className="m-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Location</label>
                        <input type="text" className="form-control" name='geolocation' value={cred.geolocation} onChange={onchange} />
                        <button onClick={handleClick} >click</button>
                    </div> */}
                        <div className="m-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <fieldset>
                                <input type="text" className="form-control" name='address' placeholder='"Click below for fetching address"' value={address} onChange={(e) => setAddress(e.target.value)} aria-describedby="emailHelp" />
                            </fieldset>
                            
                        </div>
                        <div className="m-3">
                            <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-dark">Click for current Location </button>
                        </div>
                        {/* <div className="m-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div> */}
                        <button type="submit" className="m-3 btn btn-success">Submit</button>
                        <Link to='/login' className="m-3 btn btn-danger">Already a User!</Link>
                    </form>
                    
                </div>
            </div>
        </>
    )
}