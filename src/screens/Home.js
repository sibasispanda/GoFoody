import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
// import Carousel from '../components/Carousel';
import { Link } from 'react-router-dom';


export default function Home() {

    //using array because map function works on array

    const [foodCat, setfoodCat] = useState([]);
    const [fooditem, setfooditem] = useState([]);
    const [search, setSearch] = useState('')

    // fetch the food category and items from backend through API
    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();

        
        setfooditem(response[0])
        setfoodCat(response[1])

        // As two elements are return in array format from backend
        console.log(response[0],response[1])
    }

    useEffect(() => {
        loadData()
    }, []) //dependences - through any change










    return (
        <>
            <Navbar />
            {/* in jsx fro using css we have to get it into object and camel case format */}





            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>

                    <div className="carousel-inner" id='carousel'>
                        {/* zindex to place search bar above the image */}

                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }}/>
                                {/* <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}></button> */}
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </form>
                        </div>

                        <div className="carousel-item active" id='MyCarousel'>
                            <img src="https://source.unsplash.com/random/900X700/?burger" className="carousel_item d-block w-100" style={{ filter: 'brightness(40%)' }} alt="..." />

                        </div>
                        <div className="carousel-caption text-white" style={{ bottom: '80px', padding: '50px', fontSize: '90px', zIndex: "10", fontStyle: 'italic', fontWeight: '700', font: 'italic bold 12px/30px Georgia, serif;' }}>
                            <div style={{ fontSize: '70px' }}>
                                <p>GoFoody</p>

                                {

                                    (!localStorage.getItem('authToken')) ?
                                        <div>
                                            <Link to='/login' className="m-3 btn btn-success">Login</Link>
                                            <Link to='/createuser' className="m-3 btn btn-danger">Register</Link>
                                        </div>
                                        : <div className="container" style={{padding:'50px'}}></div>
                                }
                            </div>
                            {/* <button class = 'btn btn' */}
                            {/* <div className="col xs-4" style={{height:'auto',width:'100%'}}> */}

                            {/* </div> */}
                        </div>
                        <div className="carousel-item" id='MyCarousel'>
                            <img src="https://source.unsplash.com/random/900X700/?pastry" className="carousel_item d-block w-100" style={{ filter: 'brightness(40%)' }} alt="..." />
                        </div>
                        <div className="carousel-item" id='MyCarousel'>
                            <img src="https://source.unsplash.com/random/900X700/?barbeque" className="carousel_item d-block w-100" style={{ filter: 'brightness(40%)' }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            








            <div className='container'>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (<div className='row mb-3'><div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                                <hr/>
                                    {fooditem !== [] ? fooditem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 m-3'>
                                                    <Cards foodItem={filterItems}
                                                        options={filterItems.options[0]}
                                                        ></Cards>
                                                </div>
                                            )
                                        })
                                        : <h1>No Such Data Found</h1>}
                                
                            </div>
                            )
                        })
                        : <div><h1>Not Fetched</h1></div>
                }

            </div>
            <Footer />
        </>
    )
}