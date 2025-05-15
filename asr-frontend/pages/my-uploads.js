// frontend/pages/my-uploads.js
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthContext } from '../contexts/AuthContext';

export default function MyUploadsPage() {
const { isAuthenticated } = useContext(AuthContext);
const router = useRouter();
const [userInfo, setUserInfo] = useState(null);
const [uploads, setUploads] = useState([]);
const [transcriptions, setTranscriptions] = useState([]);

// Redirect to login if not authenticated
useEffect(() => {
if (!isAuthenticated) {
    router.push('/login');
}
}, [isAuthenticated, router]);

// Helper to get JWT header
const getAuthHeader = () => {
const token = localStorage.getItem('authToken');
return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch user info, uploads and transcriptions
useEffect(() => {
if (!isAuthenticated) return;

axios
    .get('/api/user-info/', { headers: getAuthHeader() })
    .then(res => setUserInfo(res.data))
    .catch(console.error);

axios
    .get('/api/user-files/', { headers: getAuthHeader() })
    .then(res => setUploads(res.data))
    .catch(console.error);

axios
    .get('/api/user-transcriptions/', { headers: getAuthHeader() })
    .then(res => setTranscriptions(res.data))
    .catch(console.error);
}, [isAuthenticated]);

if (!isAuthenticated) {
return null; // or a loading spinner
}

return (
<div style={styles.container}>
    <Navbar />

    <main style={styles.main}>
    {/* User Info */}
    {userInfo && (
        <section style={styles.section}>
        <h2 style={styles.sectionHeading}>My Profile</h2>
        <p><strong>Username:</strong> {userInfo.username}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        </section>
    )}

    {/* Uploaded Files */}
    <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Uploaded Files</h2>
        {uploads.length === 0 ? (
        <p style={styles.subText}>No files uploaded yet.</p>
        ) : (
        <ul style={styles.list}>
            {uploads.map((f, i) => (
            <li key={i} style={styles.listItem}>
                <a href={f.file} target="_blank" rel="noopener noreferrer" style={styles.link}>
                {f.file.split('/').pop()}
                </a>
                <span style={styles.timestamp}>
                {new Date(f.uploaded_at).toLocaleString()}
                </span>
            </li>
            ))}
        </ul>
        )}
    </section>

    {/* Transcriptions */}
    <section style={styles.section}>
        <h2 style={styles.sectionHeading}>Transcriptions</h2>
        {transcriptions.length === 0 ? (
        <p style={styles.subText}>No transcriptions yet.</p>
        ) : (
        <ul style={styles.transList}>
            {transcriptions.map((t, i) => (
            <li key={i} style={styles.transItem}>
                <p style={styles.transFile}>File: {t.file.split('/').pop()}</p>
                <p style={styles.transText}>{t.text}</p>
                <p style={styles.timestamp}>
                {new Date(t.created_at).toLocaleString()}
                </p>
            </li>
            ))}
        </ul>
        )}
    </section>
    </main>

    <Footer />
</div>
);
}

const styles = {
container: {
fontFamily: 'Segoe UI, sans-serif',
background: 'linear-gradient(to bottom, #000000, #312C37)',
color: '#fff',
minHeight: '100vh',
display: 'flex',
flexDirection: 'column',
},
main: {
flex: 1,
padding: '80px 20px',
maxWidth: '800px',
margin: '0 auto',
},
section: {
marginBottom: '40px',
},
sectionHeading: {
fontSize: '24px',
marginBottom: '12px',
borderBottom: '2px solid #444',
paddingBottom: '4px',
},
subText: {
color: '#aaa',
},
list: {
listStyle: 'none',
padding: 0,
},
listItem: {
background: '#1e1e1e',
padding: '10px',
borderRadius: '4px',
marginBottom: '8px',
display: 'flex',
justifyContent: 'space-between',
},
link: {
color: '#4FC3F7',
textDecoration: 'underline',
},
timestamp: {
fontSize: '12px',
color: '#888',
marginLeft: '10px',
},
transList: {
listStyle: 'none',
padding: 0,
},
transItem: {
background: '#1e1e1e',
padding: '12px',
borderRadius: '4px',
marginBottom: '12px',
},
transFile: {
fontWeight: '600',
marginBottom: '6px',
},
transText: {
whiteSpace: 'pre-wrap',
lineHeight: 1.4,
marginBottom: '6px',
}
};
