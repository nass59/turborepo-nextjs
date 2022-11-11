import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./header.module.css";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const onClickSignIn = (e: React.MouseEvent) => {
    e.preventDefault();
    signIn();
  };

  const onClickSignOut = (e: React.MouseEvent) => {
    e.preventDefault();
    signOut();
  };

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>

      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {/* NOT SIGNED */}
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={onClickSignIn}
              >
                Sign in
              </a>
            </>
          )}

          {/* SIGNED */}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as (status: {status})</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={onClickSignOut}
              >
                Sign out
              </a>
            </>
          )}
        </p>

        <nav>
          <ul className={styles.navItems}>
            <li className={styles.navItem}>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/client">
                <a>Client</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/ssr/server">
                <a>Server</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/protected">
                <a>Protected</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/api-example">
                <a>API</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/admin">
                <a>Admin</a>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/me">
                <a>Me</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
