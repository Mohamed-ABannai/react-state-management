// src/App.jsx
import { useState,useEffect } from "react";

function App() {

const availableItems= [
  {
    id: 1,
    name: "Black T shirt",
    price: 5
  },
  {
    id: 2,
    name: "Hanger Set",
    price: 8
  },
  {
    id: 3,
    name: "Thoub",
    price: 12
  },
  {
    id: 4,
    name: "Computer Bag",
    price: 20
  },
  {
    id: 5,
    name: "Couch",
    price: 50
  },
  {
    id: 6,
    name: "Gaming Chair",
    price: 70
  }
]
const [availableBalance,setAvailableBalance]=useState(40)
const [availableItem, setAvailableItems] = useState(availableItems)
const [shoppingCart,setShoppingCart]=useState([])
const[warningMessage,setWarningMessage]=useState('')

useEffect(() => {

  if (warningMessage) {

    const timer = setTimeout(() => {
      setWarningMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }

}, [warningMessage]);

function handleAddToCart(item){
if(availableBalance - item.price >= 0){
const filteredItems=availableItem.filter((oneItem)=>{
  return oneItem!==item
})

console.log(filteredItems)
setAvailableItems(filteredItems)

setShoppingCart([...shoppingCart,item])
setAvailableBalance(availableBalance-item.price)
setWarningMessage('')
}

else {
  setWarningMessage("Insufficient funds. Your balance is too low to purchase this item");
}

}


function handleRemoveFromShoppingCart(ItemsInShop){


const filteredCards=shoppingCart.filter((oneItem)=>{
  return oneItem.id!==ItemsInShop.id
})

console.log(filteredCards)
setShoppingCart(filteredCards)

setAvailableItems([...availableItem,ItemsInShop])
setAvailableBalance(availableBalance+ItemsInShop.price)

}


  return (
    <>
<h1>Sayed Hameds Closet</h1>

<h2>Your Balance: {availableBalance}</h2>

<h2>Available Items</h2>

{availableItem.length>0 ? availableItem.map((item)=>
<div key={item.id}>
 <p> Item :{item.name} , Price: {item.price}</p> 
 <button onClick={()=>{handleAddToCart(item)}}>Add to Cart</button>
</div>
):<p>Items not Available</p>}

<h2>Shopping Cart</h2>

{shoppingCart.length > 0 ? shoppingCart.map((item)=>
<div key={item.id}>
 <p> Item :{item.name} , Price: {item.price}</p> 
 <button onClick={()=>{handleRemoveFromShoppingCart(item)}}>Delete Item</button>
</div>
):<p>Your cart is empty</p>
}

<p id="warning">{warningMessage}</p>

  </>
  );
}

export default App
