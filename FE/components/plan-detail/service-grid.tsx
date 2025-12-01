import { Pressable, Text, View } from "react-native";
import {
  Calendar as CalendarIcon,
  Clock,
  ClockCheck,
} from "lucide-react-native";
import { styles } from "@/commons/styles/planDetail";
import { colors } from "@/commons/enums/color";

type StatusIcon = "clock" | "clockCheck" | "calendar" | null;

interface ServiceCard {
  type: string;
  name: string;
  statusText: string;
  statusIcon: StatusIcon;
  isSelected: boolean;
}

interface ServiceGridProps {
  services: ServiceCard[];
  onSelect: (index: number) => void;
}

const gridPositionStyles = [
  styles["service-grid-item-top-left"],
  styles["service-grid-item-top-right"],
  styles["service-grid-item-bottom-left"],
  styles["service-grid-item-bottom-right"],
];

const StatusIconRenderer = ({
  icon,
  isActive,
}: {
  icon: StatusIcon;
  isActive: boolean;
}) => {
  if (!icon) return null;
  const iconColor = isActive ? colors.root.text : colors.brown["brown-3"];

  switch (icon) {
    case "clock":
      return <Clock size={12} color={iconColor} />;
    case "clockCheck":
      return <ClockCheck size={12} color={iconColor} />;
    case "calendar":
      return <CalendarIcon size={12} color={iconColor} />;
    default:
      return null;
  }
};

export function ServiceGrid({ services, onSelect }: ServiceGridProps) {
  return (
    <View style={styles["service-grid-card"]}>
      {services.map((service, index) => {
        const positionStyle = gridPositionStyles[index];
        const isInactive = service.statusText === "업체 저장 전";

        return (
          <Pressable
            key={`${service.type}-${index}`}
            onPress={() => onSelect(index)}
            style={[
              styles["service-grid-item"],
              positionStyle,
              isInactive && styles["service-grid-item-inactive"],
            ]}
          >
            <Text
              style={[
                styles["service-grid-type"],
                isInactive && styles["service-grid-type-inactive"],
              ]}
            >
              {service.type}
            </Text>

            <View style={styles["service-grid-content"]}>
              <Text
                style={[
                  styles["service-grid-name"],
                  isInactive && styles["service-grid-name-inactive"],
                ]}
              >
                {service.name}
              </Text>
              <View style={styles["service-grid-status"]}>
                <StatusIconRenderer
                  icon={service.statusIcon}
                  isActive={!isInactive}
                />
                <Text
                  style={[
                    styles["service-grid-status-text"],
                    isInactive && styles["service-grid-status-text-inactive"],
                  ]}
                >
                  {service.statusText}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      })}

      <View style={styles["service-grid-divider-horizontal"]} />
      <View style={styles["service-grid-divider-vertical"]} />
    </View>
  );
}


