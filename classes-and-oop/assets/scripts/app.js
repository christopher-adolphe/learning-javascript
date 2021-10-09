class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(parentElemId, shouldRender = true) {
    this.parentElemId = parentElemId;

    if (shouldRender) {
      this.renderElem();
    }
  }

  // renderElem() {}

  createElement(tag, classes, attributes) {
    const element = document.createElement(tag);

    if (classes) {
      element.className = classes;
    }

    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        element.setAttribute(attr.name, attr.value)
      }
    }

    document.getElementById(this.parentElemId).append(element);

    return element;
  }
}

class Product {
  title;
  imageUrl;
  price;
  description;

  constructor(productTitle, productImgUrl, productPrice, productDescription) {
    this.title = productTitle;
    this.imageUrl = productImgUrl;
    this.price = productPrice;
    this.description = productDescription;
  }
}

class ProductItem extends Component {
  constructor(product, parentElemId) {
    super(parentElemId, false);
    this.product = product;
    this.renderElem();
  }

  addToCartHandler() {
    console.log('Adding product to cart...', this.product);
    App.addProductToCart(this.product);
  }

  // Overriding the 'renderElem' method of the base class so that the sub class has it's own implementation of it
  renderElem() {
    const itemElem = this.createElement('li', 'product-item');

    itemElem.innerHTML = `
      <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}"/>
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add to cart</button>
        </div>
      </div>
    `;

    const btnAddToCart = itemElem.querySelector('button');

    btnAddToCart.addEventListener('click', this.addToCartHandler.bind(this));
  }
}

class ProductList extends Component {
  // Declaring a private property that is only accessible to the ProductList class
  #products = [];

  constructor(parentElemId) {
    super(parentElemId, false);

    this.renderElem();
    this.fetchProducts();
  }

  fetchProducts() {
    this.#products = [
      new Product('Pillow', 'https://m.media-amazon.com/images/I/71j6-GDETuL._SR500,500_.jpg', 19.99, 'Soft decorative pillow for couch.'),
      new Product('Carpet', 'https://images-na.ssl-images-amazon.com/images/I/81-K80Pt7PL._AC_SX522_.jpg', 50.00, 'Decorative carpet.'),
      new Product('Metal lamp tripod', 'https://ae01.alicdn.com/kf/HTB1LenNlVkoBKNjSZFkq6z4tFXae/Resin-Metal-Tripod-Lamp-Classical-American-Decorative-Table-Lamp-Bedroom-Bedside-Lamp-Living-Room-Home-Lighting.jpg_q50.jpg', 79.99, 'Classical American lamp for living room.')
    ];

    this.createProductItems();
  }

  createProductItems() {
    for (const product of this.#products) {
      new ProductItem(product, 'product-list');
    }
  }

  // Overriding the 'renderElem' method of the base class so that the sub class has it's own implementation of it
  renderElem() {
    this.createElement('ul', 'product-list', [new ElementAttribute('id', 'product-list')]);

    if (this.#products && this.#products.length > 0) {
      this.createProductItems();
    }
  }
}

class Cart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.textContent = `Total: \$ ${this.totalAmount.toFixed(2)}`;
  }

  get totalAmount() {
    const sum = this.items.reduce((prevValue, currentItem) => prevValue + currentItem.price, 0);

    return sum;
  }

  constructor(parentElemId) {
    // Using super(); to execute the constructor of the base class
    // super() should always be call in the subclass constructor before initializing any property using 'this'
    super(parentElemId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];

    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  orderProduct() {
    console.log('Ordering products...');
    console.log(this.items);
  }

  // Overriding the 'renderElem' method of the base class so that the sub class has it's own implementation of it
  renderElem() {
    // Cart sub class gets access to the 'createElement' method from the Component base class
    const cartElem = this.createElement('section', 'cart')

    cartElem.innerHTML = `
      <h2>Total: \$ ${0}</h2>
      <button>Order now</button>
    `;

    const btnOrder = cartElem.querySelector('button');
    
    // Using an anonimous arrow funtion as alternative
    // btnOrder.addEventListener('click', () => this.orderProduct());
    btnOrder.addEventListener('click', this.orderProduct.bind(this));

    this.totalOutput = cartElem.querySelector('h2')
  }
}

class Shop {
  cart;

  constructor() {
    this.renderShop();
  }
  
  renderShop() {
    this.cart = new Cart('app');
    new ProductList('app');
  }
}

class App {
  static shoppingCart;

  // Declaring a static method that can be accessed without instantiation
  static init() {
    const shop = new Shop();
    this.shoppingCart = shop.cart;
  }

  static addProductToCart(product) {
    this.shoppingCart.addProduct(product);
  }
}

App.init();
