import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const Login = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    // Dummy login check (replace with real auth logic)
    if (email && password) {
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        router.push('/transcription');
      }, 2000);
    } else {
      alert('Please enter both email and password');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h2 style={{ textAlign: 'center' }}>Login</h2>
          {message && <p style={styles.successMessage}>{message}</p>}
          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter your password"
                style={styles.input}
              />
            </div>
            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.button}>Login</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '78vh',
    backgroundColor: '#DCDCDC',
    flexDirection: 'column',
    paddingBottom: '50px',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
    textAlign: 'left',
    marginTop: '20px',
    color: 'black'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
    color: '#333',
    fontSize: '14px',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  successMessage: {
    color: '#28a745',
    marginBottom: '15px',
  },
};

export default Login;
