<<<<<<< HEAD
// import "@/styles/globals.css";
// import type { AppProps } from "next/app";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }


import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "./contexts/AuthContext";  // Import the AuthProvider

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      {/* <Navbar /> This will show the navigation bar */}
      <Component {...pageProps} />
    </AuthProvider>
  );
=======
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
>>>>>>> 90e99aa7fb7bd33fa04a3c41ec3e1fceaa2bdf3e
}
