export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart=JSON.parse(localStorage.getItem('cart'))||[
    {
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6' ,
        quantity:2,
        deliveryOptionId: '1'
    },
    {
      productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d' ,
      quantity:1,
      deliveryOptionId: '2' 
    }];
}

function savetoStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addtoCart(productId,quantity){
  let matchingitem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingitem = cartItem;
    }
  });

  

  if (matchingitem){
    matchingitem.quantity +=quantity;
  }
  else{
    cart.push({
      productId ,//productId:productId,
      quantity,
      deliveryOptionId: '1'
    });
  }
  savetoStorage();
}

export function removeFromCart(productId){
  let newcart=[];
  cart.forEach((cartItem)=>{
    if(productId!== cartItem.productId){
    newcart.push(cartItem);
  }});
  cart=newcart;
  savetoStorage();
}
export function caluclatecartQuantity(){
  let cartquantity=0;
    cart.forEach((cartItem)=>{
      cartquantity+=cartItem.quantity;
    });
    return cartquantity;
}

export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingitem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingitem = cartItem;
    }
  });
  matchingitem.deliveryOptionId = deliveryOptionId;
  savetoStorage();
}
export function savetoCart(productId){
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      cartItem.quantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    }
  });
  savetoStorage();
}

export function clearCart() {
  cart.length = 0; // This will empty the cart array
  savetoStorage();
}