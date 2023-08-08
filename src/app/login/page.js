'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [data, setData] = useState('');
  const router = useRouter();

  const handleLoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://localhost:7180/api/Student/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const student = await response.json();
      if (student.response === 'false') {
        toast.error(student.message);
      }
      if (student.response === 'true') {
        setData(student), loginUser(student);
        router.push('/');
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const loginUser = async (data) => {
    await signIn('credentials', { ...data, redirect: false }).then(
      (callback) => {
        if (callback?.error) {
          toast.error(callback.error);
        }
        if (callback?.ok && !callback?.error) {
          toast.success('Logged in successfully!');
          setTimeout(() => {
            router.push('/');
          }, 5000);
        }
      }
    );
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
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
              <div className="mx-auto w-full max-w-sm lg:w-96">
                <div>
                  <h2 className="mt-2 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to platform
                  </h2>
                </div>

                <div className="mt-10">
                  <div>
                    <form
                      className="space-y-4 md:space-y-6"
                      onSubmit={handleLoginUser}
                    >
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
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              email: e.target.value,
                            })
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
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="remember"
                              aria-describedby="remember"
                              type="checkbox"
                              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                              required=""
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label className="text-gray-500 dark:text-gray-300">
                              Remember me
                            </label>
                          </div>
                        </div>
                        <a
                          href="/forgot-password"
                          className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Login to your account
                      </button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet?
                        <a
                          href="/register"
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                          Sign up
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
