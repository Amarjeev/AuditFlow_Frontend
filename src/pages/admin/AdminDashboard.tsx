import ReconciliationSection from "../../components/admin/admin-dashboard/charts/ReconciliationSection";
import SummaryCards from "../../components/admin/admin-dashboard/summary-cards/SummaryCards";
import AdminNavbar from "../../components/navbar/AdminNavbar";

const AdminDashboard = () => {
  return (
    <>
    <AdminNavbar/>
    <main className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Reconciliation Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of reconciliation performance and data quality
        </p>
      </header>

      {/* Summary Cards */}
      <section className="mb-10 rounded-xl bg-white p-6 shadow-sm">
        <SummaryCards />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          {/* <ReconciliationChart /> */}
          <ReconciliationSection/>
        </div>
      </section>
    </main>
    </>
  );
};

export default AdminDashboard;
