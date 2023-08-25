import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='my-7 flex items-center justify-center bg-white'>
      <div className='bg-white p-8 m-2 rounded shadow-2xl w-full max-w-md'>
        <h2 className='text-2xl font-semibold mb-6 text-center'>
          Sign in to your account
        </h2>
        <form>
          <div className='mb-4'>
            <label className='block text-sm font-medium py-1'>
              {' '}
              Your Email
            </label>
            <input
              type='email'
              className='w-full border rounded px-3 py-2'
              placeholder='Enter your Email'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium py-1'>Password</label>
            <input
              type='password'
              className='w-full border rounded px-3 py-2'
              placeholder='Enter your password'
              required
            />
          </div>
          <div className='flex items-center justify-between my-2 '>
            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  type='checkbox'
                  name='checkbox'
                  id='remember'
                  className='w-3 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                  required=''
                />
              </div>
              <div className='ml-1 text-sm'>
                <label htmlFor='remember' className='text-sm'>
                  Remember me
                </label>
              </div>
            </div>
            <h1 className='hover:underline hover:text-blue-600 text-sm'>
              Forget password?
            </h1>
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
          >
            Login
          </button>
        </form>
        <p className='flex justify-center my-2'>
          Don't have an account?
          <Link to='/signup' className='hover:text-blue-600 font-bold pl-1'>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
