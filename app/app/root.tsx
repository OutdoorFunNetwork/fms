import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import type { MetaFunction } from "remix";

import styles from '~/styles.css';
import { ToastContextProvider } from "./context/Toast";

export const loader: LoaderFunction = () => ({
  baseTitle: 'Fun Management System'
});

export const meta: MetaFunction = ({ location }) => ({ title: 'Fun Management System' });

export const links = (): { rel: string; href: string }[] => {
  return [{ rel: 'stylesheet', href: styles }];
}


export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <Meta />
        <Links />
      </head>
      <body>
        <ToastContextProvider>
          <Outlet />
        </ToastContextProvider>
        <div id="modal-portal"></div>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
