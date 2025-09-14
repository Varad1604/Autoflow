import {AppLayout} from '../components/layout/AppLayout';

export default function History() {
  return (
    <AppLayout>
      <div className="p-6 md:p-10 w-full max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">History</h1>
        <p className="text-muted-foreground mb-8">Review your automation history and activity logs.</p>
        {/* Add history list, filters, etc. here following your design language */}
        <div className="bg-card rounded-lg shadow p-6 flex flex-col gap-4">
          <span className="text-lg font-semibold">No history available.</span>
        </div>
      </div>
    </AppLayout>
  );
}
