import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/items')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function addItem(item) {
    setItems(items => [...items, item]);
  }
  
  function changeInCart(updatedItem) {
    setItems(items => items.map(item => {
      if(item.id === updatedItem.id) {
        return updatedItem;
      }
      return item;
    }));
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm addItem={addItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} changeInCart={changeInCart}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
