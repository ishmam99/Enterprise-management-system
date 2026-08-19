import { defineStore } from 'pinia'


export const useProductStore = defineStore('product', {
  state: () => ({
    // Single product object (for create/edit form)
    product: {
      name: '',
      brand_name: '',
      description: '',
      sku: '',
      barcode: '',
      price: 0,
      cost: 0,
      stock: 0,
      status: 'Active',
      category: '',
      vendor: '',
      image: null,
      imagePreview: null,
    } ,
    // Multiple products (for listing)
    products: []
  }),

  actions: {
    // Set single product
    setProduct(data) {
      this.product = data
    },

    // Add new product to the list
    addProduct(product) {
      // Generate a simple ID (in a real app, this would come from your backend)
      product.id = 'prod_' + Math.random().toString(36).substr(2, 9)
      this.products.unshift(product)
    },

    // Reset single product to initial state
    resetProduct() {
      this.product = {
        name: '',
        brand_name: '',
        description: '',
        sku: '',
        barcode: '',
        price: 0,
        cost: 0,
        stock: 0,
        status: 'Active',
        category: '',
        vendor: '',
        image: null,
        imagePreview: null,
      }
    },

    // Delete product by ID
    deleteProduct(productId) {
      this.products = this.products.filter(product => product.id !== productId)
    }
  }
})
