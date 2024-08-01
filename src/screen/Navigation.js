import React, { useState } from 'react'
import Home from '../screen/Home'
import Product from '../screen/Product/Product';
import Category from './Category/Category';
import Order from '../screen/order/Order';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import VerifiEmail from './VerifiEmail';
const Navigation = () => {
    const [select, setselect] = useState('Home');

    const logout = () => {
        localStorage.removeItem('user');
        window.location.reload();

      }

    const render = (page) => {
        switch (page) {
            case 'Home':
                return <Home />

            case 'Product':
                return <Product />

            case 'Category':
                return <Category />

            case 'Order':
                return <Order />

            default:
                break;
        }
    }

    return (
        <div className="container-fluid">
            <div className="row" style={{ justifyContent: 'space-between' }}>
                <div className="col-md-2">
                    <div className="d-flex flex-column justify-content-between" style={{height: '100vh'}}>
                        <div className="d-flex flex-column">
                            <h2>Menu</h2>
                            <button onClick={() => setselect('Home')} style={{ marginTop: 10 }} className={`btn ${select === 'Home' ? 'btn-primary' : 'btn-secondary'}`}>Home</button>
                            <button onClick={() => setselect('Product')} style={{ marginTop: 10 }} className={`btn ${select === 'Product' ? 'btn-primary' : 'btn-secondary'}`}>Product</button>
                            <button onClick={() => setselect('Category')} style={{ marginTop: 10 }} className={`btn ${select === 'Category' ? 'btn-primary' : 'btn-secondary'}`}>Category</button>
                            <button onClick={() => setselect('Order')} style={{ marginTop: 10 }} className={`btn ${select === 'Order' ? 'btn-primary' : 'btn-secondary'}`}>Order</button>
                        </div>
                        <h3
                            onClick={logout}
                        style={{ color: 'red', alignSelf: 'center' }}>Sign out</h3>
                    </div>
                </div>

                <div className="col-md-10">
                    <div className="main-content">
                        {render(select)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation