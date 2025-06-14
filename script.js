let cart = [];

window.addEventListener('DOMContentLoaded', () => {
  const savedCart = sessionStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
    sessionStorage.removeItem('cart');
  }
});

function addToCart(item, price) {
  const existingItem = cart.find(product => product.name === item);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name: item, price: price, quantity: 1 });
  }
  updateCart();

  // animação no ícone do carrinho
  const cartIcon = document.getElementById('cart-icon');
  cartIcon.classList.add('bounce');
  setTimeout(() => cartIcon.classList.remove('bounce'), 400);
}

function updateCart() {
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    cartItems.innerHTML = '<p>O carrinho está vazio.</p>';
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div>
      <strong>${item.name}</strong><br/>
      Quantidade: ${item.quantity}<br/>
      Total: R$ ${(item.quantity * item.price).toFixed(2)}
    </div><hr/>
  `).join('');
}
