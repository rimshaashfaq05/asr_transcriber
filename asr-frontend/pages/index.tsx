// import { useState } from 'react';
// import axios from 'axios';

// export default function UploadPage() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [downloadUrl, setDownloadUrl] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setMessage('');
//     setDownloadUrl(null);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage('📂 Please select an audio file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('audio_file', file); // ✅ KEY MUST MATCH BACKEND FIELD NAME

//     try {
//       setIsProcessing(true);
//       setMessage('🚀 Uploading and processing, please wait...');

//       const res = await axios.post('http://localhost:8000/api/transcribe/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         responseType: 'blob', // ✅ Expecting a downloadable file
//       });

//       // Blob to downloadable link
//       const blob = new Blob([res.data], { type: 'text/plain' });
//       const url = window.URL.createObjectURL(blob);

//       setDownloadUrl(url);
//       setMessage('✅ Transcription completed! Click to download.');
//     } catch (err) {
//       console.error('Upload failed:', err);
//       setMessage('❌ Upload or transcription failed!');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
//       <h2>🎤 Upload Audio File for Transcription</h2>

//       <input type="file" accept="audio/*" onChange={handleFileChange} />
//       <br /><br />

//       <button onClick={handleUpload} disabled={isProcessing}>
//         {isProcessing ? 'Processing...' : 'Upload & Transcribe'}
//       </button>

//       <p>{message}</p>

//       {downloadUrl && (
//         <a href={downloadUrl} download="transcription.txt">
//           ⬇️ Download Transcription
//         </a>
//       )}
//     </div>
//   );
// }


import { useState } from 'react';
import axios from 'axios';

export default function UploadPage() {
  // const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [file, setFile] = useState<File | null>(null); // ✅ typed correctly


  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);s
  //   setMessage('');
  //   setDownloadUrl(null);
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage('');
      setDownloadUrl(null);
    }
  };
  
  
  const handleUpload = async () => {
    if (!file) {
      setMessage('📂 Please select an audio file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('audio_file', file);

    try {
      setIsProcessing(true);
      setMessage('🚀 Uploading and processing, please wait...');

      const res = await axios.post('http://localhost:8000/api/transcribe/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
      });

      const blob = new Blob([res.data], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);

      setDownloadUrl(url);
      setMessage('✅ Transcription completed! Click below to download.');
    } catch (err) {
      console.error('Upload failed:', err);
      setMessage('❌ Upload or transcription failed!');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#f4fdfd',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      fontFamily: 'Segoe UI, sans-serif',
    }}>

      {/* Header */}
      <header style={{
        backgroundColor: '#1e3a8a',
        color: 'white',
        padding: '1.5rem',
        textAlign: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem' }}>ASR: Audio to Text Generator</h1>
        <p style={{ marginTop: '0.5rem', fontSize: '1rem' }}>
          Convert your voice into clear, readable text
        </p>
      </header>

      {/* Main Content */}
      <main style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        flexGrow: 1,
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '2.5rem',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
        }}>
          <h2 style={{ color: '#1e3a8a', marginBottom: '1rem' }}>
            Upload Your Audio File
          </h2>

          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            style={{
              padding: '0.5rem',
              marginBottom: '1.5rem',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
          <br />

          <button
            onClick={handleUpload}
            disabled={isProcessing}
            style={{
              backgroundColor: '#1e3a8a',
              color: 'white',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              width: '100%',
              marginBottom: '1rem',
              transition: 'background-color 0.3s',
            }}
          >
            {isProcessing ? 'Processing...' : 'Upload & Transcribe'}
          </button>

          <p style={{ color: '#333', fontSize: '0.95rem' }}>{message}</p>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download="transcription.txt"
              style={{
                display: 'inline-block',
                marginTop: '1rem',
                color: '#1e3a8a',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem',
                border: '1px solid #1e3a8a',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
              }}
            >
              ⬇️ Download Transcription
            </a>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1e3a8a',
        color: 'white',
        textAlign: 'center',
        padding: '1rem',
        fontSize: '0.9rem',
      }}>
        © {new Date().getFullYear()} ASR: Audio to Text Generator. All rights reserved.
      </footer>
    </div>
  );
}
