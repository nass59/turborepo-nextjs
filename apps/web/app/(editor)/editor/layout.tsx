interface EditorLayoutProps {
  children?: React.ReactNode;
}
export default function EditorLayout({ children }: EditorLayoutProps) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">
      {children}
    </div>
  );
}
