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
}
