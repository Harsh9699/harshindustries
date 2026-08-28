export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-surface border-r brutalist-border flex flex-col">
        <div className="p-lg border-b brutalist-border">
          <h2 className="font-headline-sm text-headline-sm text-primary uppercase tracking-wider">
            Harsh Admin
          </h2>
        </div>
        <nav className="flex-1 p-md flex flex-col gap-sm">
          <a href="/admin" className="font-label-caps text-label-caps text-on-surface hover:text-primary p-sm border border-transparent hover:border-surface-variant transition-colors">
            Dashboard
          </a>
          <a href="/admin/enquiries" className="font-label-caps text-label-caps text-on-surface hover:text-primary p-sm border border-transparent hover:border-surface-variant transition-colors">
            Enquiries
          </a>
          <a href="/admin/products" className="font-label-caps text-label-caps text-on-surface hover:text-primary p-sm border border-transparent hover:border-surface-variant transition-colors">
            Products
          </a>
        </nav>
        <div className="p-md border-t brutalist-border">
          <button className="w-full text-left font-label-caps text-label-caps text-error hover:text-error-container p-sm">
            Sign Out
          </button>
        </div>
      </aside>
      
      {/* Admin Main Content */}
      <main className="flex-1 p-lg overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
