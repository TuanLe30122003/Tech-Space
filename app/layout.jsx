import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import AgentToggle from "@/components/AgentModule/AgentToggle";
import { AppContextProvider } from "@/context/AppContext";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata = {
  title: "Tech Space",
  description: "E-Commerce website of selling technology products",
  icons: {
    icon: "/logo_no_text.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${outfit.className} antialiased text-gray-700`}>
          <AgentToggle />
          <Toaster />
          <AppContextProvider>
            <div className="w-full flex flex-col items-center justify-center">
              <div className="w-full max-w-[1440px] bg-red flex flex-col items-center justify-center">
                {children}
              </div>
            </div>
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
