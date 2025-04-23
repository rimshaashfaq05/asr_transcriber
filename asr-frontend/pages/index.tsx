import { useState } from 'react';
import axios from 'axios';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setDownloadUrl(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('📂 Please select an audio file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('audio_file', file); // ✅ KEY MUST MATCH BACKEND FIELD NAME

    try {
      setIsProcessing(true);
      setMessage('🚀 Uploading and processing, please wait...');

      const res = await axios.post('http://localhost:8000/api/transcribe/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob', // ✅ Expecting a downloadable file
      });

      // Blob to downloadable link
      const blob = new Blob([res.data], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);

      setDownloadUrl(url);
      setMessage('✅ Transcription completed! Click to download.');
    } catch (err) {
      console.error('Upload failed:', err);
      setMessage('❌ Upload or transcription failed!');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>🎤 Upload Audio File for Transcription</h2>

      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <br /><br />

      <button onClick={handleUpload} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Upload & Transcribe'}
      </button>

      <p>{message}</p>

      {downloadUrl && (
        <a href={downloadUrl} download="transcription.txt">
          ⬇️ Download Transcription
        </a>
      )}
    </div>
  );
}
