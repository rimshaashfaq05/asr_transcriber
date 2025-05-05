import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const SignUp = () => {
  const router = useRouter();
  const [message, setMessage] = useState(''); // To display success message
  const [error, setError] = useState(''); // To display error message

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');
    const confirmPassword = formData.get('confirmPassword');
  
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Mocking the signup response
    try {
      // Simulating successful signup with a mock check
      if (email && password) {
        setMessage('Sign-up successful! Redirecting to login...');
        setError('');
        setTimeout(() => {
          router.push('/login'); // Redirect to login after 2 seconds
        }, 2000);
      } else {
        throw new Error('Invalid input!');
      }
    } catch (error) {
      setError(error.message);
      setMessage('');
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
          {message && <p style={styles.successMessage}>{message}</p>}
          {error && <p style={styles.errorMessage}>{error}</p>}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label>Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                style={styles.input}
              />
            </div>
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
            <div style={styles.inputGroup}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="Confirm your password"
                style={styles.input}
              />
            </div>
            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.button}>Sign Up</button>
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
    minHeight: '77vh',
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
    marginTop: '5px',
    color: "black"
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
    color: 'grey',
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
  errorMessage: {
    color: '#FF0000', // Red color for error message
    marginBottom: '15px',
  },
};

export default SignUp;
