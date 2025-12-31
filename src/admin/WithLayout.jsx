// withLayout.js
import AdminLayout from "./AdminLayout";

const withLayout = (WrappedComponent) => {
  return function EnhancedComponent(props) {
    return (
      <AdminLayout>
        <WrappedComponent {...props} />
      </AdminLayout>
    );
  };
};

export default withLayout;
