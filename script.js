AOS.init();

    const stripe = Stripe(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);
    const cart = [];

    const products = {
      "Adidas campus 00s": {
        details: "O Adidas Campus 00s ....",
        images: ["assets/campus oferta.png", "assets/campus oferta.png"],
        price: 1390
      },
      "yezzy 350 v2": {
        details: "Detalhes do Air Jordan III...",
        images: ["assets/air-jordan-iii-1.png", "assets/air-jordan-iii-2.png"],
        price: 1390
      },
      "Air jordan 4": {
        details: "Detalhes do Yeezy 700 v3...",
        images: ["assets/yeezy-700-v3-1.png", "assets/yeezy-700-v3-2.png"],
        price: 1299.90
      },
      "Air force 1": {
        details: "Detalhes Air force 1...",
        images: ["assets/air-force-1-low-chili-pepper-1.webp"],
        price: 1299.90
      },
    };

    const toggleCart = () => {
      const cart = document.getElementById("cart");
      cart.style.display = cart.style.display === "block" ? "none" : "block";
    };

    const updateCartCount = () => {
      const cartCount = document.querySelector(".cart-count");
      cartCount.innerText = cart.length;
    };

    const addToCart = (item, price) => {
      cart.push({ item, price });
      renderCart();
      updateCartCount();
    };

    const renderCart = () => {
      const cartItems = document.getElementById("cart-items");
      const cartTotal = document.getElementById("cart-total");
      cartItems.innerHTML = "";
      let total = 0;
      cart.forEach((cartItem) => {
        const li = document.createElement("li");
        li.innerText = `${cartItem.item} - R$${cartItem.price.toFixed(2)}`;
        cartItems.appendChild(li);
        total += cartItem.price;
      });
      cartTotal.innerText = total.toFixed(2);
    };

    const checkout = () => {
      const lineItems = cart.map(item => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.item,
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      }));

      stripe.redirectToCheckout({
        lineItems,
        mode: 'payment',
        successUrl: window.location.origin + '/success.html',
        cancelUrl: window.location.origin + '/cancel.html',
      }).then(function (result) {
        if (result.error) {
          alert(result.error.message);
        }
      });
    };

    const showProductDetails = (productName) => {
      const product = products[productName];
      if (!product) {
        console.error(`Product ${productName} not found.`);
        return;
      }

      const modal = document.getElementById('productModal');
      const productDetails = document.getElementById('productDetails');
      const productImages = document.getElementById('productImages');

      productDetails.innerHTML = `<h2>${productName}</h2><p>${product.details}</p>`;
      productImages.innerHTML = product.images.map(src => `<img src="${src}" alt="${productName} image" />`).join('');
      modal.style.display = 'block';
      modal.setAttribute('data-item', productName);
      modal.setAttribute('data-price', product.price);
    };

    const closeModal = () => {
      const modal = document.getElementById('productModal');
      modal.style.display = 'none';
    };

    const finalizePurchase = () => {
      const modal = document.getElementById('productModal');
      const item = modal.getAttribute('data-item');
      const price = parseFloat(modal.getAttribute('data-price'));
      addToCart(item, price);
      closeModal();
    };

    window.onclick = (event) => {
      const modal = document.getElementById('productModal');
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };

    const countdown = () => {
      const countDate = new Date("June 30, 2024 00:00:00").getTime();
      const now = new Date().getTime();
      const gap = countDate - now;

      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const textHour = Math.floor((gap % day) / hour);
      const textMinute = Math.floor((gap % hour) / minute);
      const textSecond = Math.floor((gap % minute) / second);

      document.getElementById("hours").innerText = textHour;
      document.getElementById("minutes").innerText = textMinute;
      document.getElementById("seconds").innerText = textSecond;
    };

    setInterval(countdown, 1000);