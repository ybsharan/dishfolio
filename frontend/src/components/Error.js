import { useRouteError, Link } from 'react-router-dom';

const Error = () => {
  const err = useRouteError();
  return (
    <div>
      <h1>Check the Url, Something Went Wrong!!!</h1>
      <h3>{err.status + ':' + err.statusText}</h3>
      <h3>{err.data}</h3>
      <button className='error-back-home'>
        <Link to='/'>Back To Home</Link>
      </button>
    </div>
  );
};

export default Error;
