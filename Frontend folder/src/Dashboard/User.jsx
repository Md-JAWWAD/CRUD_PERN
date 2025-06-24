import React, { useEffect, useState } from "react";
import {
  UserCircleIcon,
  ArrowPathIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import Modal from "../Components/Modal";
import SearchBtn from "../Components/SearchBtn";
import Pagination from "../Components/Pagination";
import Filter from "../Components/Filter";

const User = ({ userData, setUsers, fetchUser, totalUsers }) => {
  // const [dataofUser, setdataofUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    id: null,
  });

  console.log(totalUsers);

  let totalPages = Math.round(totalUsers / 5);
  console.log(totalPages);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (searchTerm) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:2025/user/get-all-user?search=${searchTerm}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data.data.users);
    } catch (error) {
      console.error("Error searching users:", error);
      alert("Failed to search users");
    }
  };

  const handlePagination = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:2025/user/get-all-user?page=${page}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(response.data.data.users);
    } catch (error) {
      console.error("Error during pagination:", error);
      alert("Failed to do pagination");
    }
  };

  const handleFilter = async (filterData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:2025/user/get-all-user?filter=${filterData}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(response.data.data.users);
    } catch (error) {
      console.error("Error during Filtering:", error);
      alert("Failed to do Filtering");
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!id) {
        console.log("Delete Error: Id not found");
      }
      const deleteApiResponse = await axios.delete(
        `http://localhost:2025/user/delete-user/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchUser();
      if (!deleteApiResponse.data.status) {
        console.log("Backend Delete Api Response: ", false);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password,
      id: user.id,
    });
    setShowModal(true);
  };

  // useEffect(() => {
  //   if (userData) {
  //     console.log("Type of productData:", typeof userData);
  //     console.log("All user List :", userData);
  //     setdataofUser(userData);
  //   }
  // }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      console.log(formData);
      if (formData.id) {
        // Update existing product
        const response = await axios.put(
          `http://localhost:2025/user/update-user/${formData.id}`,
          {
            name: formData.name,
            email: formData.email,
            role: formData.role,
            password: formData.password,
          },
          console.log(formData),
          config
        );
        console.log(
          formData.name,
          formData.email,
          formData.role,
          formData.password
        );
        setUsers(
          userData.map((p) => (p.id === formData.id ? response.data : p))
        );
        fetchUser();
      } else {
        // Create new product
        const response = await axios.post(
          "http://localhost:2025/user/create-user",
          {
            name: formData.name,
            email: formData.email,
            role: formData.role,
            password: formData.password,
          },
          config
        );
        setUsers([...userData, response.data]);
        fetchUser();
      }
      setShowModal(false);
      setFormData({
        name: "",
        email: "",
        role: "",
        password: "",
        id: null,
      });
    } catch (error) {
      console.error("Error saving product:", error);
      console.log(error.response.data.message);
      setValidationMessage(error.response.data.message);
      alert("Failed to save product");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Users</h1>
        <div className="flex justify-between items-center gap-2 mb-6">
          <Filter onFilter={handleFilter} />
          <SearchBtn onSearch={handleSearch} fetchUser={fetchUser} />
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add User
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className="blur-sm">{user.password}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleEdit(user)}
                  >
                    <ArrowPathIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <footer className="flex justify-center pt-5">
          <Pagination onPagination={handlePagination} totalPages={totalPages} />
        </footer>
      </div>

      {showModal && (
        <Modal
          title={formData.id ? "Edit User" : "Add User"}
          validationMessage={validationMessage}
          onClose={() => {
            setShowModal(false);
            setFormData({
              name: "",
              email: "",
              role: "",
              password: "",
            });
            setValidationMessage(null);
          }}
        >
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <div className="form-control">
                <legend className="fieldset-legend">New User</legend>
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control dropdown dropdown-right ">
                <label className="label">Role</label>
                <div
                  tabIndex={0}
                  className="input input-bordered flex items-center justify-between cursor-pointer "
                >
                  {formData.role || "Select role"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-5 p-2 m-2 shadow gap-2"
                >
                  <li className="bg-gray-100">
                    <a
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, role: "user" }))
                      }
                    >
                      User
                    </a>
                  </li>
                  <li className="bg-gray-100">
                    <a
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, role: "admin" }))
                      }
                    >
                      Admin
                    </a>
                  </li>
                </ul>
              </div>
              <div className="form-control">
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`input input-bordered ${
                    !formData.password || formData.password.length === 0
                      ? ""
                      : formData.password.length < 6 ||
                        formData.password.length > 15
                      ? "border-b-4 border-red-500"
                      : "border-b-4 border-green-500"
                  }`}
                  required
                />
                {formData.password && (
                  <div
                    className={
                      !formData.password || formData.password.length === 0
                        ? ""
                        : formData.password.length < 6 ||
                          formData.password.length > 15
                        ? "bg-red-500 text-white rounded p-2 m-2 text-sm text-center capitalize"
                        : formData.password.length > 6 ||
                          formData.password.length < 15
                        ? ""
                        : "bg-green-500 text-white rounded p-2"
                    }
                  >
                    {formData.password.length < 6
                      ? "password must be greater than 6"
                      : formData.password.length > 15
                      ? "password must be less than 15"
                      : ""}
                  </div>
                )}
              </div>
            </fieldset>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setShowModal(false);
                  setValidationMessage(null);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default User;
