import "./header.scss";
import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authenticated, user } from "../../utility";
import { Drawer, Empty } from "antd";
import cartActions from "../../redux/cart/action";

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [quantity, setQuantity] = useState(null);

  const dispatch = useDispatch();
  const cartData = useSelector((state: any) => state.cartReducers.Cart);
  const navigate = useNavigate();

  // console.log(cartData , "from header");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // navigate with logo

  const handleLogo = (e: any) => {
    e.preventDefault();
    if (authenticated) {
      navigate("/home");
    } else {
      navigate("/");
    }
  };

  const name = user?.split("@");

  const userEmail = {
    Email: user,
  };

  // to add item through drawer

  const itemAdded = (id: number, qty: number) => {
    let prodForCart = {
      Email: user,
      productId: id,
      quantity: qty + 1,
    };

    dispatch(cartActions.addToCart(prodForCart));
    // dispatch(cartActions.ShowCart(userEmail));


  };

  // to remove item from drawer

  const handleRemove = (id: number, qty: number) => {
    let prodForCart = {
      Email: user,
      productId: id,
      quantity: qty - 1,
    };

    dispatch(cartActions.addToCart(prodForCart));
    // dispatch(cartActions.ShowCart(userEmail));


  };

  // cart drawer

  const showDrawer = (e: any): any => {
    e.preventDefault();
    setVisible(true);
    dispatch(cartActions.ShowCart(userEmail));
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {}, [authenticated, itemAdded, handleRemove, dispatch]);

  return (
    <>
      <header id="home" className="welcome-hero">
        <div className="top-area">
          <div className="header-area">
            <nav
              className="navbar navbar-default bootsnav  navbar-sticky navbar-scrollspy"
              data-minus-value-desktop="70"
              data-minus-value-mobile="55"
              data-speed="1000"
            >
              <div className="container">
                <div className="attr-nav">
                  <ul>
                    {authenticated ? (
                      <>
                        <li>
                          <a href="#">
                            <p className="username">
                              Hi, &nbsp;
                              <span>{name[0]}</span>
                            </p>
                          </a>
                        </li>
                        <li className="logout icon" onClick={handleLogout}>
                          <a href="">
                            <LogoutOutlined />
                          </a>
                          <div className="iconDetail">Logout</div>
                        </li>
                      </>
                    ) : null}
                    {authenticated ? (
                      <li className="dropdown">
                        <a
                          href=""
                          onClick={(e) => {
                            showDrawer(e);
                          }}
                        >
                          <span className="lnr lnr-cart"></span>
                          <span className="badge badge-bg-1">
                            {/* {product.length} */}
                          </span>
                        </a>
                        <Drawer
                          title="Cart Details"
                          placement="right"
                          size="large"
                          onClose={onClose}
                          visible={visible}
                        >
                          {cartData.length !== 0 ? (
                            <>
                              {cartData.map((data: any, ky: number) => {
                                return (
                                  <React.Fragment key={ky}>
                                    <li className="single-cart-list">
                                      <a
                                        className="photo"
                                        style={{
                                          width: "300px",
                                          height: "300px",
                                          padding: "30px",
                                        }}
                                      >
                                        <img
                                          src={data.item.image}
                                          className="cart-thumb"
                                          alt="image"
                                        />
                                      </a>
                                      <div
                                        className="cart-list-txt"
                                        style={{ paddingTop: "60px" }}
                                      >
                                        <h6>
                                          <a>{data.item.Product_name}</a>
                                        </h6>
                                        <p>
                                          {data.quantity} qty{" "}
                                          <span className="price">
                                            $ {data.item.Price}
                                          </span>
                                        </p>
                                      </div>
                                      <div
                                        className="cart-close"
                                        style={{ marginTop: "40px" }}
                                      >
                                        <span
                                          className="lnr "
                                          onClick={() =>
                                            itemAdded(
                                              data.item.id,
                                              data.quantity
                                            )
                                          }
                                          style={{
                                            fontSize: "40px",
                                            color: "grey",
                                          }}
                                        >
                                          +
                                        </span>
                                      </div>
                                      <div
                                        className="cart-close"
                                        style={{ marginTop: "100px" }}
                                      >
                                        <span
                                          className="lnr"
                                          onClick={() =>
                                            handleRemove(
                                              data.item.id,
                                              data.quantity
                                            )
                                          }
                                          style={{
                                            fontSize: "70px",
                                            color: "grey",
                                          }}
                                        >
                                          -
                                        </span>
                                      </div>
                                    </li>
                                    <hr />
                                  </React.Fragment>
                                );
                              })}

                              {/* <span>Total: $ {price}</span> */}
                              <button
                                className="btn-cart pull-right"
                                onClick={() => navigate("/checkout")}
                              >
                                Proceed
                              </button>
                            </>
                          ) : (
                            // <img
                            //   src="https://upload.wikimedia.org/wikipedia/commons/5/54/Ajux_loader.gif"
                            //   alt="loading"
                            //   className="loader"
                            //   style={{ width: "300px" }}
                            // />
                            <Empty />
                          )}
                        </Drawer>
                      </li>
                    ) : null}
                  </ul>
                </div>
                <div className="navbar-header">
                  <button
                    type="button"
                    className="navbar-toggle"
                    data-toggle="collapse"
                    data-target="#navbar-menu"
                  >
                    <i className="fa fa-bars"></i>
                  </button>
                  <a
                    className="navbar-brand"
                    href=""
                    onClick={(e) => {
                      handleLogo(e);
                    }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/34/34611.png"
                      alt=""
                    />
                    LetsBuy.
                  </a>
                </div>
                <div
                  className="collapse navbar-collapse menu-ui-design"
                  id="navbar-menu"
                >
                  <ul
                    className="nav navbar-nav navbar-center"
                    data-in="fadeInDown"
                    data-out="fadeOutUp"
                  >
                    {authenticated ? (
                      <>
                        <li className=" scroll active">
                          <a href="#home" onClick={() => navigate("/home")}>
                            home
                          </a>
                        </li>
                        <li className="scroll">
                          <a href="" onClick={() => navigate("/collection")}>
                            collections
                          </a>
                        </li>
                        <li className="scroll">
                          <a href="#feature" onClick={() => navigate("/home")}>
                            features
                          </a>
                        </li>
                        <li className="scroll">
                          <a href="#blog" onClick={() => navigate("/home")}>
                            blog
                          </a>
                        </li>
                        <li className="scroll">
                          <a
                            href="#newsletter"
                            onClick={() => navigate("/home")}
                          >
                            contact
                          </a>
                        </li>
                      </>
                    ) : null}

                    {!authenticated ? (
                      <>
                        <li className="scroll">
                          <a href="#blog" onClick={() => navigate("/contact")}>
                            blog
                          </a>
                        </li>
                        <li className="scroll">
                          <a
                            href="#newsletter"
                            onClick={() => navigate("/contact")}
                          >
                            contact
                          </a>
                        </li>
                      </>
                    ) : null}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div className="clearfix"></div>
        </div>
      </header>
    </>
  );
}
