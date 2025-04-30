// pages/signup.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from './components/Navbar'; // Adjusting Navbar import as per your request
import Footer from './components/Footer'; // Adjusting Footer import as per your request

const SignUp = () => {
  const router = useRouter();
  const [message, setMessage] = useState(''); // To display success message

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation logic
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Here, you would typically send data to your backend or auth service
    console.log({ name, email, password });

    // Show success message and redirect after 2 seconds
    setMessage('Sign-up successful! Redirecting to login...');
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.formContainer}>
        <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
          {message && <p style={styles.successMessage}>{message}</p>}
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
    minHeight: '77vh', // Prevents scrolling, assuming Navbar and Footer take up 100px of height
    backgroundColor: '#DCDCDC',
    flexDirection: 'column',
    paddingBottom: '50px', // Prevents the footer from getting too close to the form
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
    textAlign: 'left',
    marginTop: '5px', // Space from the navbar
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
    backgroundColor: '#28a745', // Green button
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  successMessage: {
    color: '#28a745', // Green color for success message
    marginBottom: '15px',
  },
};

export default SignUp;
