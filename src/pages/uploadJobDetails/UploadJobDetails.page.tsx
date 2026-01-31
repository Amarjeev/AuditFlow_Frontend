import { UploadJobDetailsView } from "../../components/upload-jobs/ui/UploadJobDetails.view";
import { useGetUploadJobDetails } from "../../components/upload-jobs/hooks/useGetUploadJobDetails";

const UploadJobDetailsPage = () => {
  const { data, loading } = useGetUploadJobDetails();

  return <UploadJobDetailsView data={data} loading={loading} />;
};

export default UploadJobDetailsPage;
