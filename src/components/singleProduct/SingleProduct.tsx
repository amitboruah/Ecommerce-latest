import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import actions from "../../redux/product/action";
import cartActions from "../../redux/cart/action";

import { authenticated, user } from "../../utility";
import "./singleProduct.scss";

export default function SingleProduct() {
  const [quantity, setQuantity] = useState(1);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const prodData = useSelector((state: any) => state.prodlist.singleProd);
  const qty = useSelector((state: any) => state.cartReducers.quantity);

  const { id }: any = useParams();
  // console.log(typeof(id),"from product");
  
  const prodId = {
    id: parseInt(id),
  };

  const prodForCart = {
    Email: user,
    quantity: quantity,
    productId:  parseInt(id),
  };

  const handleAddToCart = () => {
    setQuantity(quantity + 1);
    setVisible(true);

    dispatch(cartActions.addToCart(prodForCart));
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
    setVisible(true);

    dispatch(cartActions.addToCart(prodForCart));
  };

  console.log(qty);

  useEffect(() => {
    dispatch(actions.fetchSingleProduct(prodId));
  }, [qty]);

  return (
    <>
      <div className="products row">
        <div className="left col">
          <img src={prodData.image} alt="img" />
        </div>
        <div className="right col ">
          <h2 className="title">{prodData.Product_name}</h2>
          <div className="container">
            <p className="description">{prodData.Desctiption}</p>

            <h4 className="price">
              price <span>$ {prodData.Price}</span>
            </h4>
            {authenticated && (
              <div className="addContainer">
                <button onClick={handleAddToCart}>Add to Cart</button>
                {visible ? (
                  <span className="quantityBar">
                    {quantity > 0 ? quantity - 1 : quantity}
                  </span>
                ) : null}
                <button onClick={handleRemoveFromCart}>Remove from Cart</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
