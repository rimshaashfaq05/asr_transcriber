<<<<<<< HEAD
import { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'; // to handle redirects
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthContext } from './contexts/AuthContext'; // import AuthContext

export default function UploadPage() {
  const { isAuthenticated } = useContext(AuthContext); // Use AuthContext
  const router = useRouter();
  
=======
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


import { useState, useRef } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function UploadPage() {
>>>>>>> 90e99aa7fb7bd33fa04a3c41ec3e1fceaa2bdf3e
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [transcribedText, setTranscribedText] = useState('');
  const dropRef = useRef();

<<<<<<< HEAD
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login'); // redirect to login page
    }
  }, [isAuthenticated]);

=======
>>>>>>> 90e99aa7fb7bd33fa04a3c41ec3e1fceaa2bdf3e
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setDownloadUrl(null);
    setTranscribedText('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setTranscribedText('');
      setDownloadUrl(null);
      setMessage('📂 File ready to upload: ' + droppedFile.name);
    }
  };
<<<<<<< HEAD
=======
  
>>>>>>> 90e99aa7fb7bd33fa04a3c41ec3e1fceaa2bdf3e

  const handleDragOver = (e) => {
    e.preventDefault();
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
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      const blob = new Blob([res.data], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);

      setDownloadUrl(url);
      setMessage('✅ Transcription completed!');

      // Read text
      const reader = new FileReader();
      reader.onload = function () {
        setTranscribedText(reader.result);
      };
      reader.readAsText(blob);
    } catch (err) {
      console.error('Upload failed:', err);
      setMessage('❌ Upload or transcription failed!');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transcribedText);
    setMessage('📋 Text copied to clipboard!');
  };

  return (
    <div style={{ fontFamily: 'Arial' }}>
      <Navbar />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '78vh',
        background: '#f5f5f5',
        padding: '2rem'
      }}>
        <div style={{
          background: '#fff',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '600px',
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '1rem', color:'black' }}>🎤 Upload Audio for Transcription</h2>

          <div
<<<<<<< HEAD
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{
              border: '2px dashed #ccc',
              padding: '2rem',
              borderRadius: '12px',
              backgroundColor: '#fafafa',
              marginBottom: '1rem',
              textAlign: 'center',
              cursor: 'pointer',
              color: 'black'
            }}
          >
            {file ? (
              <p>{file.name}</p>
            ) : (
              <p>Drag & drop an audio file here, or click "Browse"</p>
            )}
          </div>
=======
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            border: '2px dashed #ccc',
            padding: '2rem',
            borderRadius: '12px',
            backgroundColor: '#fafafa',
            marginBottom: '1rem',
            textAlign: 'center',
            cursor: 'pointer',
            color: 'black'
          }}
        >
          {file ? (
            <p>{file.name}</p>
          ) : (
            <p>Drag & drop an audio file here, or click "Browse"</p>
          )}
        </div>

>>>>>>> 90e99aa7fb7bd33fa04a3c41ec3e1fceaa2bdf3e

          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              style={{
                display: 'block',
                margin: '0 auto',
                padding: '0.5rem',
                borderRadius: '8px',
                border: '1px solid #ccc',
                backgroundColor: '#fff'
              }}
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={isProcessing}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              marginBottom: '1rem'
            }}
          >
            {isProcessing ? 'Processing...' : 'Upload & Transcribe'}
          </button>

          {message && <p style={{ textAlign: 'center', color: '#333' }}>{message}</p>}

          {transcribedText && (
            <>
              <textarea
                value={transcribedText}
                readOnly
                style={{
                  width: '100%',
                  height: '200px',
                  backgroundColor: '#000',
                  color: '#fff',
                  padding: '1rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  marginTop: '1rem'
                }}
              />
              <button
                onClick={handleCopy}
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                📋 Copy Text
              </button>
            </>
          )}

          {downloadUrl && (
            <a
              href={downloadUrl}
              download="transcription.txt"
              style={{
                display: 'block',
                textAlign: 'center',
                marginTop: '1rem',
                color: '#28a745',
                fontWeight: 'bold'
              }}
            >
              ⬇️ Download Transcription
            </a>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
<<<<<<< HEAD


// import { useState, useRef } from 'react';
// import axios from 'axios';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';

// export default function UploadPage() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [downloadUrl, setDownloadUrl] = useState(null);
//   const [transcribedText, setTranscribedText] = useState('');
//   const dropRef = useRef();

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setMessage('');
//     setDownloadUrl(null);
//     setTranscribedText('');
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const droppedFile = e.dataTransfer.files[0];
//     if (droppedFile) {
//       setFile(droppedFile);
//       setTranscribedText('');
//       setDownloadUrl(null);
//       setMessage('📂 File ready to upload: ' + droppedFile.name);
//     }
//   };
  

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage('📂 Please select an audio file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('audio_file', file);

//     try {
//       setIsProcessing(true);
//       setMessage('🚀 Uploading and processing, please wait...');

//       const res = await axios.post('http://localhost:8000/api/transcribe/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         responseType: 'blob',
//       });

//       const blob = new Blob([res.data], { type: 'text/plain' });
//       const url = window.URL.createObjectURL(blob);

//       setDownloadUrl(url);
//       setMessage('✅ Transcription completed!');

//       // Read text
//       const reader = new FileReader();
//       reader.onload = function () {
//         setTranscribedText(reader.result);
//       };
//       reader.readAsText(blob);
//     } catch (err) {
//       console.error('Upload failed:', err);
//       setMessage('❌ Upload or transcription failed!');
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(transcribedText);
//     setMessage('📋 Text copied to clipboard!');
//   };

//   return (
//     <div style={{ fontFamily: 'Arial' }}>
//       <Navbar />
//       <div style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: '78vh',
//         background: '#f5f5f5',
//         padding: '2rem'
//       }}>
//         <div style={{
//           background: '#fff',
//           padding: '2rem',
//           borderRadius: '12px',
//           boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
//           width: '100%',
//           maxWidth: '600px',
//         }}>
//           <h2 style={{ textAlign: 'center', marginBottom: '1rem', color:'black' }}>🎤 Upload Audio for Transcription</h2>

//           <div
//           onDragOver={handleDragOver}
//           onDrop={handleDrop}
//           style={{
//             border: '2px dashed #ccc',
//             padding: '2rem',
//             borderRadius: '12px',
//             backgroundColor: '#fafafa',
//             marginBottom: '1rem',
//             textAlign: 'center',
//             cursor: 'pointer',
//             color: 'black'
//           }}
//         >
//           {file ? (
//             <p>{file.name}</p>
//           ) : (
//             <p>Drag & drop an audio file here, or click "Browse"</p>
//           )}
//         </div>


//           <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
//             <input
//               type="file"
//               accept="audio/*"
//               onChange={handleFileChange}
//               style={{
//                 display: 'block',
//                 margin: '0 auto',
//                 padding: '0.5rem',
//                 borderRadius: '8px',
//                 border: '1px solid #ccc',
//                 backgroundColor: '#fff'
//               }}
//             />
//           </div>

//           <button
//             onClick={handleUpload}
//             disabled={isProcessing}
//             style={{
//               width: '100%',
//               padding: '0.75rem',
//               backgroundColor: '#28a745',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               fontSize: '1rem',
//               marginBottom: '1rem'
//             }}
//           >
//             {isProcessing ? 'Processing...' : 'Upload & Transcribe'}
//           </button>

//           {message && <p style={{ textAlign: 'center', color: '#333' }}>{message}</p>}

//           {transcribedText && (
//             <>
//               <textarea
//                 value={transcribedText}
//                 readOnly
//                 style={{
//                   width: '100%',
//                   height: '200px',
//                   backgroundColor: '#000',
//                   color: '#fff',
//                   padding: '1rem',
//                   borderRadius: '8px',
//                   fontSize: '1rem',
//                   marginTop: '1rem'
//                 }}
//               />
//               <button
//                 onClick={handleCopy}
//                 style={{
//                   width: '100%',
//                   marginTop: '0.5rem',
//                   backgroundColor: '#007bff',
//                   color: 'white',
//                   padding: '0.75rem',
//                   borderRadius: '8px',
//                   border: 'none',
//                   cursor: 'pointer',
//                   fontSize: '1rem'
//                 }}
//               >
//                 📋 Copy Text
//               </button>
//             </>
//           )}

//           {downloadUrl && (
//             <a
//               href={downloadUrl}
//               download="transcription.txt"
//               style={{
//                 display: 'block',
//                 textAlign: 'center',
//                 marginTop: '1rem',
//                 color: '#28a745',
//                 fontWeight: 'bold'
//               }}
//             >
//               ⬇️ Download Transcription
//             </a>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
=======
>>>>>>> 90e99aa7fb7bd33fa04a3c41ec3e1fceaa2bdf3e
