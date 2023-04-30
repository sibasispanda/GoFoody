import React from 'react';
import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <>
            <div className="row text-white" style={{"background-color": "#5A5A5A"}}>
                <div className='m-3 w-2 h-2 d-block'>
                {/* <Link className="navbar-brand  fs-italic" to="/" style={{font:'italic bold  Georgia, serif'}}><p className='m-1' style={{fontSize:'30px'}}>GoFoody</p></Link> */}
                <img src='https://i.pinimg.com/originals/a8/ec/ff/a8ecff27c0a44f5f26c3d55e9f337eb7.png' width = "200" height = "70" alt='...'/>
                {/* <button className='m-3 btn bg-white btn-light btn-outline-info' style={{position:'absolute',right:'200px'}}><img className='rounded' src='https://cdn.pixabay.com/photo/2018/01/21/14/36/indian-flag-3096740__340.png' width='70px' height='40px' alt='...'/></button> */}
                {/* <button className='m-3 btn bg-white btn-light btn-outline-info' style={{position:'absolute',right:'0px'}}>English</button> */}
                <Link to='https://bit.ly/3L4RMVi' style={{position:'absolute',right:'0px',height:'auto',width:'auto',padding:'6px 12px',margin:'10px'}}><img className='rounded' src='https://cdn.pixabay.com/photo/2018/01/21/14/36/indian-flag-3096740__340.png' width='60px' height='30px' alt='...'/></Link>
               
                </div>
                <div className="col-6 col-md-2 mb-3">
                    <h5>About</h5>
                    <ul className="nav flex-column text-white">
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Who we are</Link></li>
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Privacy</Link></li>
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Open Source</Link></li>
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Report</Link></li>
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Contact Us</Link></li>
                    </ul>
                </div>

                <div className="col-6 col-md-2 mb-3 text-white">
                    <h5>Order Something!</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Cart</Link></li>
                        <li className="nav-item mb-2"><Link to="/userlogin" className="nav-link p-0 text-muted">Login</Link></li>
                        <li className="nav-item mb-2"><Link to="/createuser" className="nav-link p-0 text-muted">SignUp</Link></li>
                        <li className="nav-item mb-2"><Link to="/about" className="nav-link p-0 text-muted">About</Link></li>
                    </ul>
                </div>

                <div className="col-6 col-md-2 mb-3 text-white">
                    <h5>Social Links</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Instagram</Link></li>
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Twitter</Link></li>
                        <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Facebook</Link></li>
                    </ul>
                </div>

                <div className="col-md-5 offset-md-1 mb-3 text-white">
                    <form>
                        <h5>Subscribe to our newsletter</h5>
                        <p>Monthly digest of what's new and exciting Offers from us.</p>
                        <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                            <label for="newsletter1" className="visually-hidden">Email address</label>
                            <input id="newsletter1" type="text" className="form-control" placeholder="Email address"/>
                                <button className="btn btn-primary" type="button">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}