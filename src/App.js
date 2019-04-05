import React, { Component } from 'react';
import './App.css';
import AddProduct from './AddProduct';
import ProductItem from './ProductItem';
import S3FileUpload from 'react-s3';
//Optional Import
import { uploadFile } from 'react-s3';
 
const config = {
    bucketName: 'povilas-react-product-manager',
    //dirName: 'photos', /* optional */
    region: 'eu-east-1', 
  //  accessKeyId: 'ANEIFNENI4324N2NIEXAMPLE',
   // secretAccessKey: 'cms21uMxçduyUxYjeg20+DEkgDxe6veFosBT7eUgEXAMPLE',
}

const products = [
  {
    name: 'Nokia/Mobira Cityman 1320',
    price: 999
  },
  {
    name: 'Nokia 3310',
    price: 200
  },
  {
    name: 'Samsung Galaxy s10',
    price: 299
  }
];

localStorage.setItem('products', JSON.stringify(products));

class App extends Component {
  constructor(props){
    super(props);

    this.state={
      products: JSON.parse(localStorage.getItem('products'))
    };

    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
  }

  componentWillMount(){
   const products = this.getProducts();
   this.setState({products});
  }

  getProducts(){
    return this.state.products;
  }

  onAdd(name, price){
    const products = this.getProducts();

    products.push({
      name,
      price
    });

    this.setState({products});
  }

  onDelete(name){   
    const products = this.getProducts();
    const filteredProducts = products.filter(product=>{
      return product.name !== name;
    });

    this.setState({products: filteredProducts});    
  }

  onEditSubmit(name, price, originalName){
    let products = this.getProducts();

    products = products.map(product => {
      if(product.name === originalName){
        product.name = name;
        product.price = price;
      }

      return product;
    });
    this.setState({ products });
  }

  render() {
    return (
      <div className="App">
        <h1>Products Manager (Povilas CRUD app, ReactJs, LocalStorage)</h1>

        <AddProduct
          onAdd={this.onAdd}
        />
    
        {
          this.state.products.map(product =>{
            return(
            <ProductItem
              key={product.name}
              {...product}
              onDelete={this.onDelete}
              onEditSubmit={this.onEditSubmit}
            />
            );
          })
        }
      </div>
    );
  }
}

export default App;
