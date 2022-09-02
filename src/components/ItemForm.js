import React, { useState } from "react";

function ItemForm({ onSubmit, addItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function onSubmit(e) {
    e.preventDefault();
    const item = {name: name, category: category, isInCart: false,}
    
    const config = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }
    
    fetch('http://localhost:4000/items', config)
      .then(res => res.json())
      .then(newItem => addItem(newItem));
  }

  return (
    <form className="NewItem" onSubmit={onSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
