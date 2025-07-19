import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

function App() {
  const [users, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(null);
  const [alert, setAlert] = useState(null);


  const handleEdit = (user) => {
    setUserToEdit(user);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await axios.delete(`http://localhost/backend/api/delete.php`, {
        data: { id: id },
      });

      if (response.data.success) {
        setAlert({
          type: 'success',
          message: response.data.message || 'User deleted successfully',
        });
        fetchUsers();
      } else {
        setAlert({
          type: 'error',
          message: response.data.message || response.data.error || 'Failed to delete user',
        });
      }
    } catch (err) {
      console.error("Delete failed", err);
      setAlert({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
    }
  };



  const fetchUsers = async () => {
    const res = await axios.get('http://localhost/backend/api/read.php');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className='container mx-auto p-4'>

      <h1 className="text-2xl font-bold text-center mb-8">User Management</h1>
      
      <UserForm
        userToEdit={userToEdit}
        onUserAdded={fetchUsers}
        onUserUpdated={() => {
          setUserToEdit(null);
          fetchUsers();
        }}
      />

      {alert && (
        <div
          className={`p-4 mb-4 mt-3 text-sm rounded-lg ${
            alert.type === 'success'
              ? 'text-green-800 bg-green-50'
              : 'text-red-800 bg-red-50'
          }`}
          role="alert"
        >
          <span className="font-medium">
            {alert.type === 'success' ? 'Success:' : 'Error:'}
          </span>{' '}
          {alert.message}
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        

        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Sr.No.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                DOB
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, key) => (
              <tr key={key + 1} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {key + 1}
                </th>
                <td className="px-6 py-4">
                  {user.name}
                </td>
                <td className="px-6 py-4">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  {user.dob}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-green-600 hover:underline" onClick={() => setUserToEdit(user)}>Edit</button>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>

  );
}

export default App;