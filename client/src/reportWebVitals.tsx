import { ReportHandler } from "web-vitals/dist/modules/types";

const reportWebVitals = (onPerfEntry: ReportHandler | null = null) => {
  if (onPerfEntry) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
