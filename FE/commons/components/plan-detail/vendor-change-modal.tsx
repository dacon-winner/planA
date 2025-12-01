import { ErrorModal } from "@/commons/components/modal/ErrorModal";

interface PlanVendorChangeModalProps {
  visible: boolean;
  planName: string;
  serviceType: string;
  serviceName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function PlanVendorChangeModal({
  visible,
  planName,
  serviceType,
  serviceName,
  onConfirm,
  onCancel,
}: PlanVendorChangeModalProps) {
  if (!visible) {
    return null;
  }

  return (
    <ErrorModal
      planAName={planName}
      serviceType={serviceType}
      serviceName={serviceName}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}


