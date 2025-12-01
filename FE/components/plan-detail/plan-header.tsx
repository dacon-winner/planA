import { View, Text } from "react-native";
import {
  Calendar as CalendarIcon,
  MapPin,
  Wallet,
} from "lucide-react-native";
import { styles } from "@/commons/styles/planDetail";
import { colors } from "@/commons/enums/color";

interface PlanHeaderProps {
  planName: string;
  daysLeft: string | number;
  date: string;
  location: string;
  budget: string;
  isCompact: boolean;
}

export function PlanHeader({
  planName,
  daysLeft,
  date,
  location,
  budget,
  isCompact,
}: PlanHeaderProps) {
  return (
    <View
      style={[
        styles["header-section"],
        isCompact && styles["header-section-compact"],
      ]}
    >
      <View style={styles["header-content"]}>
        {!isCompact && (
          <Text style={styles["header-subtitle"]}>
            결혼식까지 {daysLeft}일 남았어요
          </Text>
        )}
        <Text
          style={[
            styles["header-title"],
            isCompact && styles["header-title-compact"],
          ]}
        >
          {planName}
        </Text>
      </View>

      <View style={styles["basic-info"]}>
        <View style={styles["info-row"]}>
          <CalendarIcon size={14} color={colors.root.text} />
          <Text style={styles["info-text"]}>{date}</Text>
        </View>
        <View style={styles["info-row"]}>
          <MapPin size={14} color={colors.root.text} />
          <Text style={styles["info-text"]}>{location}</Text>
        </View>
        <View style={styles["info-row"]}>
          <Wallet size={14} color={colors.root.text} />
          <Text style={styles["info-text"]}>{budget}</Text>
        </View>
      </View>
    </View>
  );
}


