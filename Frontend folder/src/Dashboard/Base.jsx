import axios from "axios";
import React, { useState } from "react";
import User from "./User";
// import Product from "./Product";

const Base = () => {
  const [users, setUsers] = useState([]);
  // const [products, setProducts] = useState([]);
    const [totalUsers, setTotalUsers] = useState("")
  const [activeTab, setActiveTab] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.get(
        "http://localhost:2025/user/get-all-user",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);
      console.log("Backend Resposne: ", response.data.message);
      // console.log(response.data.data);
      setUsers(response.data.data.users);
      setTotalUsers(response.data.data.countAllUsers)
      console.log(response.data.data.countAllUsers)
      setActiveTab("users");
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to fetch users");
    }
  };

  // const fetchProducts = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await axios.get("http://localhost:2025/product/get-all-product", {
  //       headers: { 'Authorization': `Bearer ${token}` }
  //     });
  //     setProducts(response.data.data);
  //     setActiveTab('products');
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //     alert("Failed to fetch products");
  //   }
  // };

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Base</div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              <li>
                <a onClick={fetchUsers}>User</a>
              </li>
              {/* <li><a onClick={fetchProducts}>Product</a></li> */}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4">
          {activeTab === "users" && (
            <User fetchUser={fetchUsers} userData={users} totalUsers={totalUsers} setUsers={setUsers} />
          )}
          {/* {activeTab === 'products' && <Product productData={products} setProductData={setProducts} />} */}
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <li>
            <a onClick={fetchUsers}>User</a>
          </li>
          {/* <li><a onClick={fetchProducts}>Product</a></li> */}
        </ul>
      </div>
    </div>
  );
};

export default Base;
