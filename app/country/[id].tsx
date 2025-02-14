import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/contexts/ThemeContext";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, ArrowRight } from "iconsax-react-native";
import { getThemeStyles } from "@/constants/themeStyles";

type Props = {};

const Country = (props: Props) => {
  const { id } = useLocalSearchParams();
  const { theme, toggleTheme } = useTheme();
  const style = getThemeStyles(theme);
  const [country, setCountry] = useState<any>(null);
  const [selectedContinent, setSelectedContinent] = useState<string>("All");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  const toggleBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  }, [isBottomSheetOpen]);

  const handleContinentSelect = useCallback((continent: string) => {
    setSelectedContinent(continent);
    setIsBottomSheetOpen(false);
  }, []);

  useEffect(() => {
    const fetchCountry = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/capital/${id}`
      );
      const data = await response.json();
      setCountry(data[0]);
    };
    fetchCountry();
  }, [id]);

  // if (!country) return <Text>Loading...</Text>;
  if (!country)
    return (
      <View
        style={[
          styles.loadingContainer,
          theme === "dark" ? styles.darkBackground : styles.lightBackground,
        ]}
      >
        <ActivityIndicator
          size="large"
          color={theme === "dark" ? "#fff" : "#000"}
        />
      </View>
    );

  console.log("what is id", JSON.stringify(country, null, 3));

  return (
    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor: theme === "dark" ? "#000F24" : "#fff",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 16,
          alignItems: "center",
          // gap: 80,
        }}
      >
        <TouchableOpacity
          style={[style.button]}
          onPress={() => {
            router.back();
          }}
        >
          <ArrowLeft
            color={theme === "dark" ? "#FFD700" : "#000000"}
            size={32}
          />
        </TouchableOpacity>
        <Text
          style={[
            style.text,
            {
              fontSize: 20,
              fontWeight: "700",
              lineHeight: 32.9,
            },
          ]}
        >
          {country?.name?.common}
        </Text>
        <View />
      </View>
      <ScrollView
        style={{
          paddingHorizontal: 20,
          paddingBottom: 16,
        }}
      >
        <View
          style={{
            padding: 16,
            width: "100%",
          }}
        >
          <Image
            source={{ uri: country.flags.png }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            gap: 24,
          }}
        >
          <View>
            <Text
              style={[
                style?.text,
                { fontSize: 16, fontWeight: "500", lineHeight: 25.6 },
              ]}
            >
              Population: {country.population?.toLocaleString()}
            </Text>
            <Text
              style={[
                style?.text,
                { fontSize: 16, fontWeight: "500", lineHeight: 25.6 },
              ]}
            >
              Region: {country?.region}
            </Text>
            <Text
              style={[
                style?.text,
                { fontSize: 16, fontWeight: "500", lineHeight: 25.6 },
              ]}
            >
              Capital: {country?.capital}
            </Text>
            <Text
              style={[
                style?.text,
                { fontSize: 16, fontWeight: "500", lineHeight: 25.6 },
              ]}
            >
              Motto: {country?.motto}
            </Text>
          </View>

          <View>
            <Text
              style={[
                style?.text,
                { fontSize: 16, fontWeight: "500", lineHeight: 25.6 },
              ]}
            >
              Official language:{JSON.stringify(country?.languages, null, 3)}
            </Text>
            <Text
              style={[
                style?.text,
                { fontSize: 16, fontWeight: "500", lineHeight: 25.6 },
              ]}
            >
              Ethnic group: {country?.region}
            </Text>
            <Text
              style={[
                style?.text,
                { fontSize: 16, fontWeight: "500", lineHeight: 25.6 },
              ]}
            >
              Religion: {country?.capital}
            </Text>
            <Text
              style={[
                style?.text,
                { fontSize: 16, fontWeight: "500", lineHeight: 25.6 },
              ]}
            >
              Government: {country?.independent.toString().toUpperCase()}
            </Text>
          </View>

          <View>
            <Text
              style={[
                style?.text,
                { fontSize: 16, fontWeight: "500", lineHeight: 25.6 },
              ]}
            >
              Independence: {country?.independent.toString().toUpperCase()}
            </Text>
            <Text
              style={[
                style?.text,
                { fontSize: 16, fontWeight: "500", lineHeight: 25.6 },
              ]}
            >
              Area: {country?.area?.toLocaleString()}
            </Text>
            {/* <Text>Currency: {country?.currencies?.GHS?.name}</Text> */}
            <Text
              style={[
                style?.text,
                { fontSize: 16, fontWeight: "500", lineHeight: 25.6 },
              ]}
            >
              Currency:{JSON.stringify(country?.currencies, null, 3)}
            </Text>
            <Text
              style={[
                style?.text,
                { fontSize: 16, fontWeight: "500", lineHeight: 25.6 },
              ]}
            >
              GDP: {JSON.stringify(country?.gini, null, 3)}
            </Text>
          </View>

          <View>
            <Text
              style={[
                style?.text,
                { fontSize: 16, fontWeight: "500", lineHeight: 25.6 },
              ]}
            >
              Time zone: {country?.timezones}
            </Text>
            <Text
              style={[
                style?.text,
                { fontSize: 16, fontWeight: "500", lineHeight: 25.6 },
              ]}
            >
              Date format: {country?.timezones}
            </Text>
            <Text
              style={[
                style?.text,
                { fontSize: 16, fontWeight: "500", lineHeight: 25.6 },
              ]}
            >
              Dialing code: {country?.ccn3}
            </Text>
            <Text
              style={[
                style?.text,
                { fontSize: 16, fontWeight: "500", lineHeight: 25.6 },
              ]}
            >
              Driving side:{" "}
              {country?.car?.side?.charAt(0).toUpperCase() +
                country?.car?.side?.slice(1)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Country;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 200,
    borderRadius: 10,
  },
  countryItem: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  countryInfo: {
    marginLeft: 16,
    justifyContent: "center",
  },
  countryName: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },
  capitalText: {
    fontSize: 14,
    lineHeight: 19,
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
  lightBackground: {
    backgroundColor: "#fff",
  },
  darkBackground: {
    backgroundColor: "#000F24",
  },
});
