import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { GlassNav } from "./components/GlassNav";
import ReloadPrompt from "./components/ReloadPrompt";
import { AuthProvider } from "./contexts/AuthContext";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
  },
  // PWA Manifest
  { rel: "manifest", href: "/manifest.webmanifest" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#0b0b0b" />
        <meta name="theme-color" content="#0b0b0b" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Register the service worker only in production (simple heuristic):
              // - Avoid localhost and 127.0.0.1
              // - Avoid non-HTTPS
              (function(){
                var isLocalhost = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);
                var isHttps = window.location.protocol === 'https:';
                if (!isLocalhost && isHttps && 'serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js', { scope: '/' })
                      .then(function(registration){
                        console.log('SW registered: ', registration);
                      })
                      .catch(function(err){
                        console.log('SW registration failed: ', err);
                      });
                  });
                }
              })();
            `,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body className="px-2 sm:px-0">
        {/* Global background color + grain */}
        <svg
          className="fixed inset-0 -z-50 pointer-events-none"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <filter id="paper-grain" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.35" numOctaves="2" seed="572" result="noise"/>
              <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise"/>
              <feComponentTransfer in="alphaNoise" result="grain">
                <feFuncA type="discrete" tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0"/>
              </feComponentTransfer>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="#E8DCCA" />
          <rect width="100%" height="100%" filter="url(#paper-grain)" opacity="0.02" />
        </svg>
        {/* SVG Filter for Glass Distortion */}
        <svg style={{ display: "none" }}>
          <filter id="glass-distortion">
            <feTurbulence type="turbulence" baseFrequency="0.008" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={77} />
          </filter>
        </svg>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const glassElements = document.querySelectorAll('.glass-button');
              glassElements.forEach(function(element){
                element.addEventListener('mousemove', handleMouseMove);
                element.addEventListener('mouseleave', handleMouseLeave);
              });
              function handleMouseMove(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const specular = this.querySelector('.glass-specular');
                if (specular) {
                  specular.style.background = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0) 60%)';
                }
              }
              function handleMouseLeave() {
                const filter = document.querySelector('#glass-distortion feDisplacementMap');
                if (filter) {
                  filter.setAttribute('scale', '77');
                }
                const specular = this.querySelector('.glass-specular');
                if (specular) {
                  specular.style.background = 'none';
                }
              }
            });
          `,
          }}
        />
        <AuthProvider>
          <AppContent>{children}</AppContent>
        </AuthProvider>
        <ReloadPrompt />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function AppContent({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isNewUserPage = location.pathname === "/";
  const shouldHideNavbar = isLoginPage || isNewUserPage;
  
  return (
    <div className="container mx-auto px-4 app-viewport">
      {!shouldHideNavbar && <GlassNav />}
      <div className={shouldHideNavbar ? "" : "pt-4 app-content"}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
