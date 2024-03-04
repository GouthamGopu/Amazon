export let cart=[];

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