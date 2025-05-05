<<<<<<< HEAD
// // components/Navbar.js
// import Link from 'next/link';
// import { useContext } from 'react';
// import { useRouter } from 'next/router';
// import { AuthContext } from '../contexts/AuthContext';

// export default function Navbar() {
// const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
// const router = useRouter();

// const handleLogout = () => {
// localStorage.removeItem('authToken');
// setIsAuthenticated(false);
// router.push('/login');
// };

// return (
// <nav style={styles.navbar}>
//     <div style={styles.logoContainer}>
//     <img
//         src="/icons8-audio-wave.gif"
//         alt="Audio Wave Logo"
//         style={styles.logoImage}
//     />
//     <span style={styles.logoText}>MultiLingual ASR</span>
//     </div>

//     <div style={styles.links}>
//     {!isAuthenticated ? (
//         <>
//         <Link href="/" style={styles.link}>Home</Link>
//         <Link href="/signup" style={styles.link}>Sign Up</Link>
//         <Link href="/login" style={styles.link}>Login</Link>
//         </>
//     ) : (
//         <>
//         <Link href="/transcription" style={styles.link}>Transcribe</Link>
//         <button onClick={handleLogout} style={{ ...styles.link, background: 'none', border: 'none', cursor: 'pointer' }}>
//             Logout
//         </button>
//         </>
//     )}
//     </div>
// </nav>
// );
// }

// const styles = {
// navbar: {
// display: 'flex',
// justifyContent: 'space-between',
// alignItems: 'center',
// padding: '18px 30px',
// background: 'linear-gradient(90deg,#312C37 0%, #DA115D 50%, #312C37 100%)',
// color: '#fff',
// boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
// position: 'sticky',
// top: 0,
// zIndex: 999,
// },
// logoContainer: {
// display: 'flex',
// alignItems: 'center',
// gap: '12px',
// },
// logoImage: {
// height: '36px',
// width: '36px',
// },
// logoText: {
// fontSize: '24px',
// fontWeight: '700',
// fontFamily: 'Segoe UI, sans-serif',
// color: '#ffffff',
// },
// links: {
// display: 'flex',
// gap: '25px',
// },
// link: {
// color: '#ffffff',
// textDecoration: 'none',
// fontWeight: '500',
// fontSize: '16px',
// fontFamily: 'Segoe UI, sans-serif',
// transition: 'color 0.3s ease',
// },
// };

import Link from 'next/link';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img
          src="/icons8-audio-wave.gif"
          alt="Audio Wave Logo"
          style={styles.logoImage}
        />
        <span style={styles.logoText}>MultiLingual ASR</span>
      </div>

      <div style={styles.links}>
        {!isAuthenticated ? (
          <>
            <Link href="/" style={styles.link}>Home</Link>
            <Link href="/signup" style={styles.link}>Sign Up</Link>
            <Link href="/login" style={styles.link}>Login</Link>
          </>
        ) : (
          <>
            <Link href="/transcription" style={styles.link}>Transcribe</Link>
            <button
              onClick={handleLogout}
              style={{
                ...styles.link,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 30px',
    background: 'linear-gradient(90deg,#312C37 0%, #DA115D 50%, #312C37 100%)',
    color: '#fff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 999,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoImage: {
    height: '36px',
    width: '36px',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '700',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#ffffff',
  },
  links: {
    display: 'flex',
    gap: '25px',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '16px',
    fontFamily: 'Segoe UI, sans-serif',
    transition: 'color 0.3s ease',
  },
=======
// components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
return (
<nav style={styles.navbar}>
    <div style={styles.logoContainer}>
    <img
        src="/icons8-audio-wave.gif"
        alt="Audio Wave Logo"
        style={styles.logoImage}
    />
    <span style={styles.logoText}>MultiLingual ASR</span>
    </div>
    <div style={styles.links}>
    <Link href="/" style={styles.link}>Home</Link>
    <Link href="/signup" style={styles.link}>Sign Up</Link>
    <Link href="/login" style={styles.link}>Login</Link>
    <Link href="/transcription" style={styles.link}>Transcribe</Link>
    </div>
</nav>
);
}

const styles = {
navbar: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
padding: '18px 30px',
background: 'linear-gradient(90deg,#312C37 0%, #DA115D 50%, #312C37 100%)',

// background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
color: '#fff',
boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
position: 'sticky',
top: 0,
zIndex: 999,
},
logoContainer: {
display: 'flex',
alignItems: 'center',
gap: '12px',
},
logoImage: {
height: '36px',
width: '36px',
},
logoText: {
fontSize: '24px',
fontWeight: '700',
fontFamily: 'Segoe UI, sans-serif',
color: '#ffffff',
},
links: {
display: 'flex',
gap: '25px',
},
link: {
color: '#ffffff',
textDecoration: 'none',
fontWeight: '500',
fontSize: '16px',
fontFamily: 'Segoe UI, sans-serif',
transition: 'color 0.3s ease',
},
>>>>>>> 90e99aa7fb7bd33fa04a3c41ec3e1fceaa2bdf3e
};
