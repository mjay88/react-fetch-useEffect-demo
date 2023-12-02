import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [users, setUsers] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	//https://jsonplaceholder.typicode.com/users

	// useEffect(() => {
	// 	setLoading(true);
	// 	setError(undefined);
	// 	//a signal is built into javascript, we will use it to prevent our fetch from running twice.
	// 	const controller = new AbortController(); //any time abort is called, don't call any of the code inside of our fetch
	// 	fetch("https://jsonplaceholder.typicode.com/users", {
	// 		signal: controller.signal,
	// 	})
	// 		.then((res) => {
	// 			if (res.status === 200) {
	// 				return res.json();
	// 			} else {
	// 				return Promise.reject(res);
	// 			}
	// 		})
	// 		.then((data) => {
	// 			setUsers(data);
	// 		})
	// 		.catch((e) => {
	// 			//.catch by default also contains AbortControl so when you abort it throws it as an error so we just need to check the type of or error
	// 			if (e?.name === "AbortError") return;
	// 			setError(e);
	// 		})
	// 		.finally(() => {
	// 			setLoading(false);
	// 		});

	// 	return () => {
	// 		controller.abort();
	// 	};
	// }, []);
	useEffect(() => {
		//if useEffect already has an error and it runs again we want to reset it so set as undefined at top of useEffect
		setError(undefined);

		const controller = new AbortController();
		const fetchUsers = async () => {
			try {
				setLoading(true);
				const res = await fetch("https://jsonplaceholder.typicode.com/users", {
					signal: controller.signal,
				});
				if (res.status !== 200) {
					throw new Error(`response status was ${res.status}`);
				}
				const data = await res.json();
				console.log("here");
				setUsers(data);
			} catch (e) {
				if (e?.name === "AbortError") return;
				setError(e.message);
			}
			setLoading(false);
		};
		fetchUsers();

		return () => {
			controller.abort();
		};
	}, []);

	let jsx;
	if (loading) {
		jsx = <h2>Loading...</h2>;
	} else if (error != null) {
		jsx = <h2>Error</h2>;
	} else {
		jsx = JSON.stringify(users);
	}
	return (
		<div>
			<h1>Users</h1>
			{jsx}
		</div>
	);
}

export default App;
