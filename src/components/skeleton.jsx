import ContentLoader from "react-content-loader";

export const Skeleton = () => (
  <ContentLoader speed={3}>
    <rect x="0" y="0" rx="15" ry="15" width="380" height="200"></rect>
  </ContentLoader>
);
