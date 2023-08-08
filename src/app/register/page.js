'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Register() {
  const router = useRouter();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    password: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://localhost:7180/api/Student/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const student = await response.json();
      toast.success(student.message);
      setTimeout(() => {
        router.push('/login');
      }, 5000);
    } catch (error) {
      console.log('Registration::Error: ', error);
      toast.error('Registration failed! Please provide valid data');
    }
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-1 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
            <div className="relative hidden w-0 flex-1 lg:block p-4">
              <img
                className="absolute  object-cover rounded-l-lg"
                src="https://ecurater.com/wp-content/uploads/2020/10/login1.png"
                alt=""
              />
            </div>
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-10">
              <div className="mx-auto w-full max-w-2xl lg:w-full">
                <div>
                  <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Register to platform
                  </h2>
                </div>

                <div className="mt-10">
                  <div>
                    <form
                      className="space-y-4 md:space-y-6"
                      onSubmit={registerUser}
                    >
                      <div className="sm:flex justify-center items-center gap-3">
                        <div className="sm:w-1/2">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            First name
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="type your first name"
                            value={data.firstName}
                            onChange={(e) =>
                              setData({ ...data, firstName: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="sm:w-1/2">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Last name
                          </label>
                          <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="type your last name"
                            value={data.lastName}
                            onChange={(e) =>
                              setData({ ...data, lastName: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Your email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="name@company.com"
                          value={data.email}
                          onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Contact
                        </label>
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="type your contact no"
                          value={data.contact}
                          onChange={(e) =>
                            setData({ ...data, contact: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          value={data.password}
                          onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                          }
                        />
                      </div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Register your account
                      </button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Account yet?
                        <a
                          href="/login"
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                          Log in
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
