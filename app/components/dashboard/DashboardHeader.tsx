// 'use client';
// import { useAuth } from '@/app/lib/auth-context';
// export default function DashboardHeader() {
//   const { user, signOut } = useAuth();
//   return (
//     <header className="bg-white shadow">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//         <div className="flex items-center gap-4">
//           <span className="text-gray-700">Welcome, {user?.name}!</span>
//           <button
//             onClick={signOut}
//             className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//           >
//             Sign Out
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }
