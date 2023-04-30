import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
const mycarticon = <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>


export default function Navbar() {
    const [nameu, setnameu] = useState('');
    let data = useCart();
    // let userEmail = localStorage.getItem("userEmail");
    const [cartview, setcartview] = useState(false)

    const navigate = useNavigate();

    const handlelogout =()=>{
        localStorage.removeItem("authToken");
        navigate("/")
    }

    const getusername=async()=>{
        let email = localStorage.getItem("userEmail");
        // console.log(email);
        
        const user = await fetch('http://localhost:5000/api/userfind', {
                // as it is post method so we have to define
                method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        });
        const { name } = await user.json();
        console.log(name);
        setnameu(name);
        ;
    }
    useEffect(() => {
      
    getusername()
      return () => {
        
      }
    }, [])
    
    
    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-*">
            <Link className="navbar-brand fs-1 fs-italic" to="/" style={{ font: 'italic bold 12px/30px Georgia, serif' }}><p className='m-3' style={{ fontSize: '30px' }}>GoFoody</p></Link>
            {/* <img src='https://i.pinimg.com/originals/a8/ec/ff/a8ecff27c0a44f5f26c3d55e9f337eb7.png' width = "200" height = "70" alt='...'/> */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item active">
                        <Link className="nav-link active fs-5" to="/">Home <span className="sr-only"></span></Link>
                    </li>

                    {/* this condition add mycart after login */}
                    {
                        (localStorage.getItem('authToken')) ?
                            <li>
                                <Link className='nav-link active fs-5' to='/myOrder'>My Orders</Link>
                            </li>
                            : ""
                    }


                </ul>
                {/* this condition applies after logout */}
                {

                    (!localStorage.getItem('authToken')) ?
                        <div className="dflex">
                             <Link className="btn btn-success text-white mx-1" to="/login">Login</Link>

                            <Link className="btn btn-suceess text-white mx-1" to="/createuser">SignUp</Link>
                        </div>

                        :
                        <div>
                            {/* <button className=''><p>{nameu}</p></button> */}

                            <div className='btn  mx-2 border'>
                                {nameu}
                            </div>
                            <div className='btn  mx-2' onClick={()=>{setcartview(true)}}>
                                {mycarticon} {" "}
                                <Badge pill bg="danger">{data.length}</Badge>
                            </div>
                            {cartview?<Modal onClose={()=>setcartview(false)}><Cart></Cart></Modal>:null}
                            <div className='btn text-danger mx-2' onClick={handlelogout}>
                                Logout 
                            </div>
                            
                        </div>
                }
            </div>
        </nav>

    )
}