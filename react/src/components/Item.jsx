export default function Item({ id, name, price, slug, description, quantity, img_url }) {

    return (
        <div className="col-sm-6 col-lg-3">
            <div className="item p-2">
                <div role="button" className="item w-100">
                    <div className="thumb product-card">
                        <div className="hover-content">
                            <ul>
                                <li><a href="#"><i className="fa fa-eye"></i></a></li>
                                <li className="d-none"><a href="#"><i className="fa fa-star"></i></a></li>
                                <li><a><i className="fa fa-shopping-cart"></i></a></li>
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
        </div>
    )
}