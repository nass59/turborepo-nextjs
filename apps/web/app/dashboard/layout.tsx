export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>
        <ul>
          <li>link 1</li>
          <li>link 2</li>
          <li>link 3</li>
          <li>link 4</li>
        </ul>
      </nav>

      {children}
    </section>
  );
}
