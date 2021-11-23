import { products } from './products';
import { renderProducts } from './rendering';

const addProduct = async (event) => {
  try {
    const module = await import('./product-management.js');

    module.addProduct(event);
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (productId) => {
  try {
    const module = await import('./product-management.js');

    module.deleteProduct(productId);
  } catch (error) {
    console.log(error);
  }
};

const initProducts = () => {
  renderProducts(products, deleteProduct);
};

const addProductForm = document.getElementById('new-product');

initProducts();

addProductForm.addEventListener('submit', addProduct);
