export let cart=[
{
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6' ,
    quantity:2
},
{
  productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d' ,
  quantity:1 
}];

export function addtoCart(productId){
  let matchingitem;
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingitem = cartItem;
    }
  });

  let quantity=Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

  if (matchingitem){
    matchingitem.quantity +=quantity;
  }
  else{
    cart.push({
      productId ,//productId:productId,
      quantity
    });
  }
}

export function removeFromCart(productId){
  let newcart=[];
  cart.forEach((cartItem)=>{
    if(productId!== cartItem.productId){
    newcart.push(cartItem);
  }});
  cart=newcart;
}