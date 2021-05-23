import React, { useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api/api';
import { setAccessToken, setRefreshToken } from '../../utils/tokenHandler';
import { useUser } from '../../utils/queries/query';

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      username: '',
      email: '',
      password: '',
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

export const Register = (props) => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { refetch } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await API.post('/api/auth/register', {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      await refetch();
      setLoading(false);
      props.history.push('/');
    } catch (err) {
      setLoading(false);
      setError(true);
      setErrorMsg(err.response.data.error.message);
      setTimeout(() => {
        setError(false);
        setErrorMsg('');
      }, 2000);
      setFormData({
        reset: true,
      });
    }
  };

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center mt-16">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center font-bold text-lg p-2">Register</h2>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={formData.username || ''}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formData.email || ''}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="**********"
              name="password"
              onChange={handleChange}
              value={formData.password || ''}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              Register
            </button>

            <Link
              className="inline-block align-baseline font-bold text-sm text-gray-500 hover:text-gray-800"
              to="/login"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
      {error && (
        <div
          className="max-w-xs mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
