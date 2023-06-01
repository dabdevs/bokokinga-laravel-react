import { Outlet } from "react-router-dom";
import '../guest.css'
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import Navbar from "./Navbar";

export default function GuestLayout() {
    const [collections, setCollections] = useState([])
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getCollections()
    }, [])

    const getCollections = () => {
        setLoading(true) 

        axiosClient.get('/collections')
            .then(({ data }) => {
                setCollections(data.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.log(err)
            })
    }

    return (
        <div>
            <header className="header-area header-sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <Navbar collections={collections}/> 
                        </div>
                    </div>
                </div>
            </header>
            <Outlet />
        </div>
    )
}