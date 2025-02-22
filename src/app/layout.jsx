import "./globals.css";
import StoreProvider from "./StoreProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div className="w-full">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
}
