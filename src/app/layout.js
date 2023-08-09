import { default as AuthProvider } from "@/components/Provider";
import Provider from "@/redux/Provider";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Amazon",
  description:
    "Discover a world of endless possibilities with the Amazon app. Shop millions of products, from electronics and fashion to books and home essentials. Enjoy fast, secure, and convenient shopping on the go. Join millions of satisfied customers and experience the ultimate online shopping destination with Amazon. Download the app now and start your seamless shopping journey today",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Provider>
            {/*  Header */}
            <Header />
            {/* Main */}
            {children}
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
