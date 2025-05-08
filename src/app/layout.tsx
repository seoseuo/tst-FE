import type { Metadata } from "next";
import "./globals.css";
import Footer from "../component/footer";

export const metadata: Metadata = {
  title: "테스형",
  description: "자기사유 테스트 플랫폼",
  icons: {
    icon: "/logo-icon.ico",
  },
  openGraph: {
    title: "테스형 - 자기사유 테스트 플랫폼",
    description: "그대는 그 뭐냐 그거다...",
    url: "https://tessbro.site",
    siteName: "테스형",
    images: [
      {
        url: "/preview.png", // public 폴더에 이미지 두고 절대 경로로
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
    images: ["/preview.png"],
    site: "https://tessbro.site", // 없으면 생략해도 OK
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="테스형 - 자기사유 테스트 플랫폼" />
        <meta property="og:description" content="그대는 그 뭐냐 그거다..." />
        <meta property="og:url" content="https://tessbro.site" />
        <meta property="og:site_name" content="테스형" />
        <meta property="og:image" content="https://tessbro.site/preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="테스형 - 자기사유 테스트 플랫폼" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="테스형 - 자기사유 테스트 플랫폼" />
        <meta name="twitter:description" content="그대는 그 뭐냐 그거다..." />
        <meta name="twitter:image" content="https://tessbro.site/preview.png" />
        <meta name="twitter:site" content="https://tessbro.site" />

        <link rel="icon" href="/logo-icon.ico" />
      </head>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
