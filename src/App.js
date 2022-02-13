import './App.css';

import {useEffect, useState} from 'react';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

import axios from 'axios';

import Search from './pages/Search';
import Welcome from './pages/Welcome';
import Product from './pages/Product';
import Category from './pages/Category';
import Checkout from './pages/Checkout';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash } from '@fortawesome/free-solid-svg-icons';

function App() {
	// store shopping cart data into array of objects
  	const [shoppingCartData, setShoppingCartData] = useState([]);

	// keep track of whether a user is logged in or not
	const [userLoggedIn, setUserLoggedIn] = useState(false);
	// keep track of if cart is loading
	const [loading, setLoading] = useState(false);
	// store user data if user is logged in
  	const [userData, setUserData] = useState({});

	// login credentials
	const [userName, setUserName] = useState('johnd');
  	const [userPassword, setUserPassword] = useState('m38rmF$');

	// func to transform double number into dollar format
	const dollarFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	});

	// func to count how many items are in shopping cart
	let itemCount = () => {
		let count = 0;
		shoppingCartData.forEach(item => {
			count += item.quantity;
		});
		return count;
	}

	// func to calculate total price of shopping cart
	let totalPrice = () => {
		let total = 0;
		shoppingCartData.forEach(item => {
			total += item.quantity * (item.data?.price ? Number(item.data.price.replace(/[^0-9.-]+/g,"")) : 0);
		});
		return dollarFormatter.format(total);
	}
	
	// func to fetch shopping cart data from backend
	let getShoppingCartData = (arr) => {
		setLoading(true);

		let dataCopy = [...arr];
		let dataPromise = [];

		dataCopy.forEach(item => {
			dataPromise.push(axios.get(`https://fakestoreapi.com/products/${item.productId}`));
		});

		Promise.all(dataPromise).then(res => {
			for(let i = 0; i < res.length; i++){
				dataCopy[i].data = res[i].data;
				dataCopy[i].data.price = dollarFormatter.format(dataCopy[i].data.price);
			}
			setShoppingCartData(dataCopy);

			setLoading(false);
		})
		

		
		
	}

	// func to remove an item from the shopping cart data array given an item id
	let removeItem = (id) => {
		let dataCopy = [...shoppingCartData];
		let index = dataCopy.findIndex(item => item.productId === id);
		dataCopy.splice(index, 1);
		setShoppingCartData(dataCopy);
	}

	// func to update shopping cart data array given an item id and new quantity
	let updateQuantity = (id, quantity) => {
		let dataCopy = [...shoppingCartData];
		let index = dataCopy.findIndex(item => item.productId === id);
		dataCopy[index].quantity = quantity;
		setShoppingCartData(dataCopy);
	}

	// using state credentials compare them against the backend credentials
	let checkUserCredentials = async () => {
		// get all user logins
		return axios.get('https://fakestoreapi.com/users')
			.then(res => {
				// check if there is a user with the same name and password
				let user = res.data.find(user => user.username === userName && user.password === userPassword);
				// if there is a user with the same name and password, set the userLoggedIn state to true, save user data to state
				if (user) {
					setUserLoggedIn(true);
					setUserData(user);
				} else {
					setUserLoggedIn(false);
				}

				return user.id;
			})
			.catch(err => {
				console.log(err);
			});
	}

	// func to merge local shopping cart data with backend shopping cart data
	let mergeShoppingCarts = async (apiData, localData) => {
		let mergedData = [...localData];
		console.log(apiData)
		apiData.forEach(apiItem => {
			let localItem = mergedData.find(localItem => localItem.productId === apiItem.productId);

			if (localItem !== undefined) {
				// if there is a local item with the same id, add the quantity of the api item to the local item
				localItem.quantity += apiItem.quantity;
			} else {
				// if there is no local item with the same id, add the api item to the local data
				mergedData.push(apiItem);
			}
		});

		getShoppingCartData(mergedData);
	}

	// func to preform a login
	let authenticateUser = () => {
		// get all logins check if current credentials are valid
		checkUserCredentials().then(res => {
			// if valid set userLoggedIn to true
			if (res) {
				// get shopping cart data from api
				axios.get(`https://fakestoreapi.com/carts/${res}`)
					.then(res => {
						// if current shopping cart data is empty
						if(shoppingCartData.length === 0) {
							
							// set shopping cart data to data from api
							getShoppingCartData(res.data.products);
						} else {
							// else if current shopping cart data is not empty
							// merge shopping cart data with data from api
							mergeShoppingCarts(res.data.products, shoppingCartData);
						}

					})
					.catch(err => console.log(err));
			} else {
				// if not valid set userLoggedIn to false
				// present error message
				setUserLoggedIn(false);
				console.log('Invalid credentials');
			}
		});
	
  	}

	
	useEffect(() => {
		getShoppingCartData(shoppingCartData);
	}, []);

	let loginForm = <div id="user-login-section">
		<div className="input-group mb-3 ">
			<input type="text" className="form-control" placeholder="Username" aria-label="Username" value={userName} onChange={(e) => setUserName(e.target.value)} aria-describedby="basic-addon1" />  
		</div>
		<div className="input-group mb-3 ">
			<input type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
		</div>
		<div class="d-grid gap-2">
			<button id="login-button" class="btn" type="button" onClick={authenticateUser} >Log In</button>
		</div>
	</div>

	let userInfoContainer = <div id="user-cart-section">
		<div className="d-grid gap-2">
			<h5>Welcome Back {userData?.name?.firstname} {userData?.name?.lastname}</h5>
		</div>
	</div>



 	return (
		<div className="App">
		<NavBar />
		<Routes>
			<Route path="/" element={<Welcome />} />
			<Route path="/search" element={<Search />} />
			<Route path="/product/:id" element={<Product />} />
			<Route path="/category/:category" element={<Category />} />
		</Routes>
	  	<Footer />

		<div class="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
			<div class="offcanvas-header">
				<h5 id="offcanvasRightLabel">Cart</h5>
				<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
			</div>
			<div class="offcanvas-body ">

			{!userLoggedIn && loginForm}

			{userLoggedIn && userInfoContainer}
				
				<div className='container' id="shopping-cart-section" >
					{shoppingCartData.map(item => (
						<div className="row py-1" key={item.productId}>
							<div className="col-4">
								<img className='img-fluid pt-4' src={item.data?.image} alt={item.data?.title} />
							</div>
							<div className="col-8 pt-4">
								<h6>{item?.data?.title}</h6>
								
								<div className=''>
									<p>{item?.data?.price}</p>
									<div className='row g-0 cart-options'>
										<div className='col-lg-3 '>
											<button className="btn w-100 cart-quantity-button" type="button" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</button>
										</div>
										<div className='col-lg-3'>
											<input type="number" className="form-control w-100" value={item.quantity} onChange={(e) => updateQuantity(item.productId, e.target.value)}/>
										</div>
										<div className='col-lg-3'>
											<button className="btn w-100 cart-quantity-button" type="button" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
										</div>
										<div className='col-lg-3'>
											<button className="btn w-100 cart-remove-button" type="button" onClick={()=> removeItem(item.productId)}>
												<FontAwesomeIcon icon={faTrash} />
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>		
					))}
				</div>
				

				<div className='row pt-3 cart-totals'>
					<div className='col-lg-6'>
						<h5>Total({ itemCount() } items): </h5>
					</div>
					<div className='col-lg-6'>
						<p>{totalPrice()}</p>
					</div>
					<div className='col-lg-12'>
						<button class="btn btn-primary w-100" type="button">Checkout</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	);
}

export default App;
