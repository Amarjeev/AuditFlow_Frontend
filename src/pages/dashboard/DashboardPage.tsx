import ReconciliationSection from "../../components/dashboard/charts/ui/ReconciliationSection";
import ReconciliationSummarySection from "../../components/dashboard/summary-cards/ui/ReconciliationSummarySection";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import { useParams } from "react-router-dom";
import ViewerNavbar from "../../components/navbar/ViewerNavbar";

//sharing component admin and viewer
const DashboardPage = () => {
  const { role } = useParams();
  return (
    <>
      {role?.trim().toLowerCase() === "admin" ? (
        <AdminNavbar />
      ) : (
        <ViewerNavbar />
      )}

      <main className="min-h-screen bg-gray-50 p-6">
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Reconciliation Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of reconciliation performance and data quality
          </p>
        </header>

        {/* Summary Section */}
        <section className="mb-10 rounded-xl bg-white p-6 shadow-sm">
          <ReconciliationSummarySection />
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <ReconciliationSection />
          </div>
        </section>
      </main>
    </>
  );
};

export default DashboardPage;
