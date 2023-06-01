import { useStateContext } from "../contexts/ContextProvider";

export default function Cart() {
    const { cart, setCart } = useStateContext();  

    const quantity = cart.reduce((acc, currentItem) => {
        return acc + currentItem.quantity
    }, 0)

    const totalPrice = cart.reduce((acc, item) => {
        return acc + item.quantity * item.price
    }, 0)

    return (
        <div className="py-5">
            <h1>Cart ({quantity})</h1>
            <div>Items in cart: {quantity}</div>
            <div>Total: ${totalPrice / 100}</div>
            <button className="btn btn-primary" onClick={() => console.log(cart)}>Checkout</button>
        </div>
    )
}