import { UploadJobDetailsView } from "../../components/upload-jobs/ui/UploadJobDetails.view";
import { useUploadJobDetails } from "../../components/upload-jobs/hooks/useUploadJobDetails";

const UploadJobDetailsPage = () => {
  const { data, loading } = useUploadJobDetails();

  return <UploadJobDetailsView data={data} loading={loading} />;
};

export default UploadJobDetailsPage;
