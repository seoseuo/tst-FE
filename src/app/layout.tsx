import type { Metadata } from "next";
import "./globals.css";
import Footer from "../component/footer";

export const metadata: Metadata = {
  title: "테스형",
  description: "자기사유 테스트 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* 뷰포트 메타 태그 추가 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
