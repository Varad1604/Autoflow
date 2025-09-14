import { AppLayout } from '../components/layout/AppLayout';

export default function Account() {
  return (
    <AppLayout>
      <div className="p-6 md:p-10 w-full max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Account</h1>
        <p className="text-muted-foreground mb-8">Manage your account details and preferences here.</p>
        <div className="bg-card rounded-lg shadow p-6 flex flex-col gap-4">
          <span className="text-lg font-semibold">Account management coming soon.</span>
        </div>
      </div>
    </AppLayout>
  );
}
