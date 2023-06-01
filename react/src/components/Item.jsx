import { useStateContext } from "../contexts/ContextProvider";

export default function Item({ id, name, price, slug, description, quantity, img_url }) {
    const { cart, setCart } = useStateContext();  

    const addToCart = () => {
        setCart((currentItems) => {
            const itemFound = currentItems.find((item) => item.id === id)

            if (itemFound) {
                return currentItems?.map((item) => {
                    if (item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item;
                    }
                })
            } else {
                return [...currentItems, {id, quantity: 1, price}]
            }
        })
    }

    const removeItem = (id) => {
        setCart((currentItems) => {
            const itemFound = currentItems.find((item) => item.id === id)

            if (itemFound?.quantity === 1) {
                return currentItems.filter((item) => item.id !== id)
            } else {
                return currentItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item;
                    }
                })
            }
        })
    }

    const getQuantityById = (id) => {
        return cart.find((item) => item.id === id)?.quantity || 0;
    }

    const quantityPerItem = getQuantityById(id);

    return (
        <div className="col-sm-6 col-lg-3">
            <div role="button" className="item my-2">
                <div className="thumb product-card">
                    <div className="hover-content">
                        <ul>
                            <li><a href="#"><i className="fa fa-eye"></i></a></li>
                            <li className="d-none"><a href="#"><i className="fa fa-star"></i></a></li>
                            <li onClick={() => addToCart()}><a><i className="fa fa-shopping-cart"></i></a></li>
                            {quantityPerItem > 0 && 
                                <li onClick={() => removeItem(id)}><a><i className="fa fa-minus"></i></a></li>
                            }
                        </ul>
                    </div>
                    <img src={img_url} alt="product img" />
                </div>
                <div className="down-content p-2">
                    <h4>
                        <a className="text-dark" href="#">{name}</a>
                    </h4>
                    <span>${price / 100}</span>
                    <ul className="stars d-none">
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                        <li><i className="fa fa-star"></i></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}