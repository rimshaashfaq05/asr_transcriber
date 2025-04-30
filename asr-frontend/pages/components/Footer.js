// components/Footer.js
export default function Footer() {
return (
    <footer style={styles.footer}>
    <div style={styles.content}>
        <div style={styles.section}>
        <h4 style={styles.heading}>Contact</h4>
        <p style={styles.text}>Email: support@asrapp.com</p>
        <p style={styles.text}>GitHub: github.com/yourusername</p>
        </div>
        <div style={styles.section}>
        <h4 style={styles.heading}>About</h4>
        <p style={styles.text}>MultiLingual ASR using Whisper AI</p>
        <p style={styles.text}>Fast, accurate, and multilingual audio-to-text conversion.</p>
        </div>
    </div>
    <div style={styles.bottom}>
        <p style={styles.bottomText}>© 2025 MultiLingual ASR</p>
    </div>
    </footer>
);
}

const styles = {
footer: {
    marginTop: 'auto',
    padding: '10px 10px',  // Adjusted padding for consistency
    background: 'linear-gradient(90deg, #DA115D 0%, #312C37 20%, #312C37 90%, #DA115D 100%)',
    color: '#fff',
    fontFamily: 'Segoe UI, sans-serif',
    fontSize: '16px',  // Added base font size for uniformity
},
content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '30px',
    maxWidth: '1000px',
    margin: '0 auto',
},
section: {
    flex: 1,
    minWidth: '250px',
},
heading: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
},
text: {
    fontSize: '14px',
    margin: '4px 0',
},
bottom: {
    marginTop: '20px',  // Adjusted margin to make it less bulky
    textAlign: 'center',
    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
    paddingTop: '15px',
},
bottomText: {
    fontSize: '14px',
    color: '#eee',
},
};
