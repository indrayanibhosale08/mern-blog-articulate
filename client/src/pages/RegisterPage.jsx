// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { register } from '../features/users/userSlice';
// import Loader from '../components/Loader';
// import Message from '../components/Message';

// const RegisterPage = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { userInfo, loading, error } = useSelector((state) => state.user);

//   useEffect(() => {
//     if (userInfo) {
//       navigate('/dashboard');
//     }
//   }, [navigate, userInfo]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setMessage('Passwords do not match');
//     } else {
//       setMessage(null);
//       dispatch(register({ name, email, password }));
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-brand-light p-4">
//       <div className="max-w-md w-full">
//         <div className="text-center mb-8">
//           <Link to="/" className="font-serif text-5xl font-bold text-brand-dark">
//             Articulate.
//           </Link>
//         </div>
//         <div className="bg-white p-8 rounded-lg shadow-lg">
//           <h1 className="text-3xl font-bold text-center mb-6 text-brand-dark">Create an Account</h1>
//           {message && <Message variant="danger">{message}</Message>}
//           {error && <Message variant="danger">{error}</Message>}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-brand-gray">Name</label>
//               <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
//             </div>
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-brand-gray">Email Address</label>
//               <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
//             </div>
//             <div>
//               <label htmlFor="password"className="block text-sm font-medium text-brand-gray">Password</label>
//               <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
//             </div>
//             <div>
//               <label htmlFor="confirmPassword"className="block text-sm font-medium text-brand-gray">Confirm Password</label>
//               <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
//             </div>
//             <div>
//               <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:opacity-50">
//                 {loading ? 'Creating Account...' : 'Sign Up'}
//               </button>
//             </div>
//           </form>
//           <p className="mt-6 text-center text-sm text-brand-gray">
//             Already have an account?{' '}
//             <Link to="/login" className="font-medium text-brand-blue hover:underline">
//               Sign In
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../features/users/userSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      setMessage(null);
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="font-serif text-5xl font-bold text-brand-dark">
            Articulate.
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold font-serif text-center mb-6 text-brand-dark">Create an Account</h1>
          
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand-gray">Name</label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-gray">Email Address</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="password"className="block text-sm font-medium text-brand-gray">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="confirmPassword"className="block text-sm font-medium text-brand-gray">Confirm Password</label>
              <input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            {/* THIS IS THE CORRECTED BUTTON */}
            <div>
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {loading ? 'Creating Account...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-brand-gray">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;