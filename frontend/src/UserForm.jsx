import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserForm({ onUserAdded, userToEdit, onUserUpdated }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', dob: '' });
  const [errors, setErrors] = useState({});
  const [serverErrors, setserverErrors] = useState(false);
  const [serverMessage, setserverMessage] = useState();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (userToEdit) {
      setForm({
        id: userToEdit.id,
        name: userToEdit.name,
        email: userToEdit.email,
        password: '', 
        confirmPassword: '',
        dob: userToEdit.dob
      });
    }
  }, [userToEdit]);
  const validate = () => {
    let errs = {};

    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Email is invalid";

    // Only validate password fields if adding
    if (!userToEdit) {
      if (!form.password) errs.password = "Password is required";
      if (!form.confirmPassword) errs.confirmPassword = "Confirm Password is required";
      if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    }

    if (!form.dob) errs.dob = "Date of Birth is required";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const url = userToEdit
      ? `http://localhost/backend/api/update.php`
      : `http://localhost/backend/api/create.php`;
    const postData = userToEdit
      ? { ...form, id: userToEdit.id }
      : form;

      console.log(postData);

    try {
      const response = await axios.post(url, postData);
      const { success, message } = response.data;

      setserverMessage(message);
      setserverErrors(!success);

      if (success) {
        if (userToEdit) {
          onUserUpdated?.();
        } else {
          onUserAdded?.();
        }
        setForm({ name: '', email: '', password: '', confirmPassword: '', dob: '' });
      }
    } catch (error) {
      console.error(error);
      setserverMessage('Error submitting form');
      setserverErrors(true);
    }
  };



  return (
    <>
      {serverMessage && (
        <div
          className={`p-4 mb-4 text-sm rounded-lg ${serverErrors
            ? "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400"
            : "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400"
            }`}
          role="alert"
        >
          <span className="font-medium">
            {serverErrors ? "Error:" : "Success:"}
          </span>{" "}
          {serverMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mb-3">
        <div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border p-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border p-2"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border p-2"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div>
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full border p-2"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        <div>
          <input
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            className="w-full border p-2"
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {userToEdit ? 'Update User' : 'Add User'}
        </button>

      </form>
    </>
  );
}

export default UserForm;