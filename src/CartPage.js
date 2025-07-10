import React from "react";
import "./styles.css";
import { FaTrashAlt } from "react-icons/fa";

function CartPage({ cart, setCart }) {
  const handleQuantityChange = (index, change) => {
    const updatedCart = [...cart];
    const currentQty = updatedCart[index].quantity || 1;
    const newQty = currentQty + change;

    if (newQty <= 0) {
      updatedCart.splice(index, 1); 
    } else {
      updatedCart[index].quantity = newQty;
    }

    setCart(updatedCart);
  };

  const handleRemove = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const subtotal = cart.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + item.price * quantity;
  }, 0);

  const totalItems = cart.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + quantity;
  }, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cart.map((item, index) => {
              const quantity = item.quantity || 1;

              return (
                <div className="cart-item" key={index}>
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <p>Size: {item.size || "—"}</p>
                    <p>Color: {item.color || "—"}</p>

                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                      <input
                        type="number"
                        readOnly
                        value={quantity}
                        className="quantity-display"
                      />
                      <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                    </div>

                    <p className="item-price">
                      ₹{item.price.toLocaleString()} x {quantity} ={" "}
                      <strong>₹{(item.price * quantity).toLocaleString()}</strong>
                    </p>

                    <button className="remove-button" onClick={() => handleRemove(index)}>
                      <FaTrashAlt /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h4>Subtotal ({totalItems} item{totalItems > 1 ? "s" : ""}): ₹{subtotal.toLocaleString()}</h4>
            <button className="checkout-button">Proceed to Buy</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
