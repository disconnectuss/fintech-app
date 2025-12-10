import AuthGuard from '@/app/components/auth/AuthGuard';
import DashboardHeader from '@/app/components/dashboard/DashboardHeader';

export default function DashboardPage() {
  return (
    <AuthGuard requireAuth>
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Your Financial Overview</h2>
            <p className="text-gray-600">
              This is your dashboard. More features coming soon!
            </p>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
