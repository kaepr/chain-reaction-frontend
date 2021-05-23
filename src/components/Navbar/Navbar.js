/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import { Link, Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { mutate } from 'swr';

import { userData } from '../../store/store';
import API from '../../utils/api/api';
import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
} from '../../utils/tokenHandler';
import { LoggedOutRoutes, LoggedInRoutes } from './NavbarData';

export const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [user, setUser] = useRecoilState(userData);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    console.log('here', user);
    if (Object.keys(user).length !== 0 && user.constructor === Object) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [user]);

  const handleLogout = async () => {
    console.log('do logout');
    try {
      const token = getRefreshToken();
      await API.delete('/api/auth/logout', {
        data: {
          refreshToken: token,
        },
      });
      removeAccessToken();
      removeRefreshToken();
      setLogged(false);
      setUser({});
      mutate('/api/user/me');
    } catch (err) {
      console.log(err);
    }
  };

  console.log('loggd in navbar = ', logged);

  return (
    <div className="">
      <nav className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="font-bold text-white text-lg">
                  <Link to="/">CRO</Link>
                </span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {logged ? (
                    <>
                      {LoggedInRoutes.map((data, index) => (
                        <Link
                          key={index}
                          to={`${data.path}`}
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          {data.name}
                        </Link>
                      ))}
                      <div
                        onClick={handleLogout}
                        className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      {LoggedOutRoutes.map((data, index) => (
                        <Link
                          key={index}
                          to={`${data.path}`}
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          {data.name}
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setOpen(!isOpen)}
                type="button"
                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {() => (
            <div className="md:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {logged ? (
                  <>
                    {LoggedInRoutes.map((data, index) => (
                      <Link
                        key={index}
                        to={`${data.path}`}
                        onClick={() => setOpen(!isOpen)}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        {data.name}
                      </Link>
                    ))}
                    <div
                      onClick={handleLogout}
                      className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Logout
                    </div>
                  </>
                ) : (
                  <>
                    {LoggedOutRoutes.map((data, index) => (
                      <Link
                        key={index}
                        to={`${data.path}`}
                        onClick={() => setOpen(!isOpen)}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                      >
                        {data.name}
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
};
