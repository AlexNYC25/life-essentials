# Life Essentials

My take on a store front page built using React.js to create the UI and using the [Fake Store API](https://fakestoreapi.com/) to supply the page with placeholder data such as product details, user information, and saved shopping carts

## The Home Page

The Main page was created with the Bootstrap Library and Bootstrap Component Library to organize various elements using 
Bootstrap's grid system. 

The initial welcome video and other images was retrieved from [Pexels](https://www.pexels.com/) online repository of image and video assets.

![Home Page](https://github.com/AlexNYC25/life-essentials/blob/main/examples/mainPage-min.png)

## Product Category Page

The Product Category Page similarly used Bootstrap's grid system to display product cards with product information such as a product's image, name and rating using stars svg elements retrieved from [icon8](https://icons8.com/)

With The Product details being fetched using axios from the previously mentioned Fake Store API 

![Category Page](https://github.com/AlexNYC25/life-essentials/blob/main/examples/category-min.png)

## Product Page

The Product Page for each individual product details were displayed with the grid system as well as having a quantity number with the ability to add that product with the provided quantity into the shopping cart.

![Product Page](https://github.com/AlexNYC25/life-essentials/blob/main/examples/product-min.png)

## Shopping Cart

The actual shopping cart is built using react hooks(useState, useEffect) to hold shopping cart data, while fetching product data from the API to display details such as the product image and name.

### Other Details

Various other components were also used such as [Font Awesome's](https://fontawesome.com/) icons for UI elements and [Google Fonts](https://fonts.google.com/) Open Sans and Playfair Display Fonts were also used.