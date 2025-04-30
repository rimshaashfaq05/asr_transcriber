// components/HomePage.js
import React from 'react';
import Header from './components/Navbar';
import Footer from './components/Footer';

export default function HomePage() {
return (
<div style={styles.container}>
    <Header />

    <main style={styles.main}>
    <div style={styles.contentRow}>
        {/* Left Side Text */}
        <div style={styles.leftColumn}>
        <h1 style={styles.heading}>Turn Your Voice into Text – Instantly</h1>
        <p style={styles.subheading}>
        Our app is designed to make transcription easy — simply upload an audio file, and in no time, you'll have a precise text output ready for use.
        our tool accurately converts your spoken words into text. It's a fast, efficient, and reliable solution for anyone needing a written version of their audio recordings.
        </p>
        </div>
        {/* Right Side Animation */}
        <div style={styles.rightColumn}>
        <img 
            src="/icons8-audio-wave.gif"
            alt="Audio Wave"
            style={styles.largeAnimation}
        />
        <img
            src="/icons8-document.gif"
            alt="Document Animation"
            style={styles.largeAnimation}
        />
        </div>
    </div>
    </main>

    {/* Wave animation */}
    <div style={styles.waveWrapper}>
    <div className="wave"></div>
    </div>

    <Footer />

    {/* Wave CSS */}
    <style jsx>{`
    .wave {
        background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg"><path fill="%23cccccc" fill-opacity="1" d="M0,192L30,192C60,192,120,192,180,170.7C240,149,300,107,360,117.3C420,128,480,192,540,213.3C600,235,660,213,720,208C780,203,840,213,900,218.7C960,224,1020,224,1080,202.7C1140,181,1200,139,1260,122.7C1320,107,1380,117,1410,122.7L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>')
        repeat-x;
        position: relative;
        width: 200%;
        height: 150px;
        animation: animateWave 10s linear infinite;
    }

    @keyframes animateWave {
        0% {
        transform: translateX(0);
        }
        100% {
        transform: translateX(-50%);
        }
    }
    `}</style>
</div>
);
}

const styles = {
container: {
fontFamily: 'Segoe UI, sans-serif',
background: 'linear-gradient(to bottom, #ffffff, #f5f5f5)',
minHeight: '100vh',
display: 'flex',
flexDirection: 'column',
},
main: {
flex: 1,
padding: '200px 40px 60px 60px',
backgroundColor: '#000000'
},
contentRow: {
display: 'flex',
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
flexWrap: 'wrap',
maxWidth: '1200px',
margin: '0 auto',
},
leftColumn: {
flex: 1,
minWidth: '300px',
paddingRight: '30px',
},
heading: {
fontSize: '36px',
fontWeight: 'bold',
color: '#ffff',
marginBottom: '20px',
},
subheading: {
fontSize: '18px',
color: '#ffff',
lineHeight: '1.6',
},
rightColumn: {
flex: 1,
minWidth: '300px',
textAlign: 'center',
},
largeAnimation: {
width: '30%',  // Increased size for GIFs
height: 'auto',
margin: '15px 15px',
borderRadius: '10px',
boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
},
waveWrapper: {
overflow: 'hidden',
height: '150px',
backgroundColor: '#000000',
},
};
