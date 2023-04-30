import React,{useEffect, useRef, useState} from "react"
import { useDispatchCart,useCart } from "./ContextReducer";
export default function Cards(props) {

let dispatch = useDispatchCart();
let data = useCart();
const priceRef = useRef();
let options = props.options;
// let foodItem = props.foodItem;
let priceOptions = Object.keys(options)
const [qty, setqty] = useState(1)
const [size, setsize] = useState("")
const handleQty = (e) => {
    setqty(e.target.value);
  }
  const handleOptions = (e) => {
    setsize(e.target.value);
  }
const handleAddToCart = async()=> {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        console.log(item);
        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food.length !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        console.log("Size is same so simply update",food.size,size)
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img:props.foodItem.img})
        console.log("Size different so simply ADD one more to the list",food.size,size)
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img:props.foodItem.img })
    // await dispatch({type:'ADD',id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
    // console.log(data);
}
let finalPrice = qty*parseInt(options[size]);
useEffect(()=>{
    setsize(priceRef.current.value)
},[])

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem" , "maxHeight": "360px" }}>
                    <img className="card-img-top" src={props.foodItem.img} alt="" style={{height:'120px' , objectFit:'fill'}}/>
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success rounded' onChange={handleQty}>
                                {
                                    Array.from(Array(6), (e,i)=> {
                                        return(
                                            <option key = {i+1} value = {i+1}> {i+1} </option>
                                        )
                                    })
                                }
                            </select>

                            <select className='m-2 h-100 bg-success' ref={priceRef} onChange={handleOptions}>
                                {
                                    priceOptions.map((data)=>{
                                        return <option key={data} value={data}>{data}</option>
                                    })
                                }
                            </select>

                            <div className='d-inline h-100 fs-5'>
                                Rs{finalPrice}/-
                            </div> 
                        </div>
                        <hr/>
                        <button className={`btn btn-success justify-center ms-1`} onClick={handleAddToCart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}