import type { Metadata } from "next";
import "./globals.css";
import Footer from "../component/footer";

export const metadata: Metadata = {
  title: "테스형",
  description: "자기사유 테스트 플랫폼",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "테스형 - 자기사유 테스트 플랫폼",
    description: "그대는 그 뭐냐 그거다...",
    url: "https://tessbro.site",
    siteName: "테스형",
    images: [
      {
        url: "https://tessbro.site/preview.png",
        width: 1200,
        height: 630,
        alt: "테스형 - 자기사유 테스트 플랫폼",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "테스형 - 자기사유 테스트 플랫폼",
    description: "그대는 그 뭐냐 그거다...",
    images: ["https://tessbro.site/preview.png"],
    site: "https://tessbro.site",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
