import { useEntity } from "@backstage/plugin-catalog-react";

export const useServiceName = () => {
  const { entity } = useEntity();
  const serviceName = entity.metadata.annotations?.["getport.io/service-name"];
  return serviceName;
};
