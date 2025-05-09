// Барлық ".btn-circle" классындағы түймелерге оқиға тыңдағыш қосамыз
document.querySelectorAll('.btn-circle').forEach(button => {   
  button.addEventListener('click', () => {     
    // Барлық ".content" классындағы элементтерді жасырамыз
    document.querySelectorAll('.content').forEach(content => {       
      content.classList.add('hidden');     
    });     
    // Түйменің "data-content" атрибутын оқып, сәйкес элементті көрсетеміз
    const target = button.getAttribute('data-content');     
    document.getElementById(target).classList.remove('hidden');   
  }); 
});

// Себетке тауарды қосу функциясы
function addToCart(productName, productPrice) {   
  // Себетті localStorage-тен аламыз немесе бос массив инициализациялаймыз
  let cart = JSON.parse(localStorage.getItem('cart')) || [];    

  // Егер тауар себетте бар болса, оның санын көбейтеміз
  const existingProduct = cart.find(item => item.name === productName);   
  if (existingProduct) {     
    existingProduct.quantity++;   
  } else {     
    // Егер жоқ болса, жаңа тауар объектісін жасап, себетке қосамыз
    const product = {       
      name: productName,       
      price: productPrice,       
      quantity: 1     
    };     
    cart.push(product);   
  }    

  // Өзгертілген себетті қайтадан localStorage-ке сақтаймыз
  localStorage.setItem('cart', JSON.stringify(cart));    

  // Қолданушыға хабарлама көрсетеміз
  alert("Өнім қорапшаға қосылды!"); 
}

// Себеттегі тауарларды бетке жүктеу функциясы
function loadCart() {   
  let cart = JSON.parse(localStorage.getItem('cart')) || [];   
  let cartTableBody = document.getElementById('cart-body');   
  let totalPrice = 0;    

  // Кестені көрсетпес бұрын тазалаймыз
  cartTableBody.innerHTML = '';    

  // Себеттегі әрбір тауар үшін кестенің жолдарын жасаймыз
  cart.forEach(item => {     
    totalPrice += item.price * item.quantity;      

    let row = `       
      <tr>         
        <td>${item.name}</td>         
        <td>${item.price}₸</td>         
        <td><input type="number" value="${item.quantity}" min="1" class="form-control" onchange="updateQuantity('${item.name}', this.value)"></td>         
        <td>${(item.price * item.quantity).toFixed(2)}₸</td>         
        <td><button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.name}')">Өшіру</button></td>       
      </tr>     
    `;     
    cartTableBody.innerHTML += row;   
  });    

  // Жалпы соманы жаңартамыз
  document.getElementById('total-price').innerText = `Жалпы: ${totalPrice.toFixed(2)}₸`; 
}

// Себеттегі тауар санының өзгеруін өңдеу функциясы
function updateQuantity(productName, quantity) {   
  let cart = JSON.parse(localStorage.getItem('cart')) || [];   
  const product = cart.find(item => item.name === productName);   
  if (product) {     
    // Тауардың жаңа санын енгіземіз
    product.quantity = parseInt(quantity);     
    localStorage.setItem('cart', JSON.stringify(cart));     
    loadCart(); // Себетті қайта жүктейміз   
  } 
}

// Себеттен тауарды өшіру функциясы
function removeFromCart(productName) {   
  let cart = JSON.parse(localStorage.getItem('cart')) || [];   
  // Себеттен белгілі бір тауарды алып тастаймыз
  cart = cart.filter(item => item.name !== productName);   
  localStorage.setItem('cart', JSON.stringify(cart));   
  loadCart(); // Себетті қайта жүктейміз 
}

// Бетті ашқан кезде себетті жүктеу
document.addEventListener('DOMContentLoaded', loadCart);

document.getElementById("photoUploadForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Предотвращаем стандартную отправку формы

  let name = document.getElementById("name").value;
  let comment = document.getElementById("comment").value;

  // Номер телефона получателя в международном формате (без "+")
  let phoneNumber = "77052783010"; // Замените на свой номер WhatsApp

  // Формируем сообщение
  let message = `Аты-жөні: ${name}%0AПікір: ${comment}`;

  // Открываем WhatsApp
  let whatsappUrl = `https://wa.me/77052783010?text=сәлем заказ бергім келеді`;
  window.open(whatsappUrl, "_blank");
});
