export default function Navbar({collections}) {
    return (
        <nav className="main-nav">
            <a href="/" className="logo">
                <img height="70" src="" alt="logo" />
            </a>
            <ul className="nav">
                <li><a href="#" id="search"><i className="fa fa-search"></i></a></li>
                {collections && (
                    <li className="submenu">
                        <a href="#">Colecciones</a>
                        <ul>
                            {collections.map((collection) => <li key={collection.name}><a href="#">{collection.name}</a></li>)}
                        </ul>
                    </li>
                )}
                <li className="scroll-to-section">
                    <a href="#">
                        <i className="fa fa-shopping-cart fa-2x"></i>
                        <p className="cart-count">0</p>
                    </a>
                </li>
            </ul>
            <a className='menu-trigger'>
                <span>Menu</span>
            </a>
        </nav>
    )
}