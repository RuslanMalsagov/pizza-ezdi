import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#d5cdcd"
    foregroundColor="#888181"
  >
    <circle cx="136" cy="127" r="120" />
    <rect x="0" y="263" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="310" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="424" rx="10" ry="10" width="95" height="27" />
    <rect x="127" y="415" rx="10" ry="10" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
