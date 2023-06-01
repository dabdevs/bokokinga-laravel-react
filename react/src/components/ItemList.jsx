
import { useState, useEffect } from "react"
import axiosClient from "../axios-client"; 
import Item from "./Item";

export default function ItemList() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getProducts()
    }, []) 

    const getProducts = () => {
        setLoading(true)

        axiosClient.get('/products')
            .then(({ data }) => {
                console.log(data)
                setProducts(data.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <section className="section products">
            <div className="container">
                <div className="row latest-products">
                    {
                        products?.map((product) => {
                            return <Item key={product.id} {...product} />
                        })
                    }
                </div>
            </div>
        </section>
    )
}