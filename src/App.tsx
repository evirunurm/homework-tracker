import './App.css'
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import React from "react";

import Nav from "./components/nav/nav";
const Home = React.lazy(() => import("./views/Home"));
const About = React.lazy(() => import("./views/About"));

function App() {
	return (
		<>
			<Nav />
			<Router>
		  <div>
			<ul>
			  <li>
				<Link to="/">Home</Link>
			  </li>
			  <li>
				<Link to="/about">About</Link>
			  </li>
			</ul>

			<hr />

			{/*  Displays a loading component with "fallback" attribute*/}
			<React.Suspense >
			  <Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About/>} />
			  </Routes>
			</React.Suspense>
		  </div>
    </Router>
		</>

	)
}

export default App
