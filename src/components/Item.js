import React from "react";

function Item({ item, changeInCart, deleteItem }) {
  
function addToCart() {
  const config = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({isInCart: !item.isInCart})
  }
  fetch(`http://localhost:4000/items/${item.id}`, config)
    .then(res => res.json())
    .then(updatedItem => changeInCart(updatedItem));
}

function clickDelete() {
  fetch(`http://localhost:4000/items/${item.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(emptyObj => deleteItem(item));
}

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={addToCart}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={clickDelete}>Delete</button>
    </li>
  );
}

export default Item;
