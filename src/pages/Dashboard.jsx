import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/layouts/Layout";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      {/* CONTENT */}
      <div className="max-w-5xl mx-auto mt-6 px-6">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Welcome back, {user?.name} 👋
          </h2>
          <p className="text-gray-600">
            This is your dashboard. You can place your analytics, charts, or menu here.
          </p>
        </div>

        {/* Example Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Users</h3>
            <p className="text-3xl font-bold text-indigo-600">120</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Orders</h3>
            <p className="text-3xl font-bold text-indigo-600">45</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-indigo-600">$3,200</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
