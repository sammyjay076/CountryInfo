import {
  View,
  Text,
  SectionList,
  TextInput,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  SectionListData,
  Alert,
} from "react-native";
import { useState, useMemo, useCallback, useRef } from "react";
import useFetchCountries from "@/hooks/useFetchCountries";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import Feather from "@expo/vector-icons/Feather";

// Types for country data
interface Name {
  official: string;
  common?: string;
}

interface Flags {
  png: string;
  svg?: string;
  alt?: string;
}

interface Country {
  name: Name;
  capital?: string[];
  flags: Flags;
  [key: string]: any;
}

// Type for section data
interface Section {
  title: string;
  data: Country[];
}

// Type for theme
type ThemeType = "light" | "dark";

// Props types for components
interface SectionHeaderProps {
  section: SectionListData<Country, Section>;
  theme: ThemeType;
}

interface CountryItemProps {
  item: Country;
  theme: ThemeType;
  onPress: () => void;
}

// Component for rendering country items
const CountryItem: React.FC<CountryItemProps> = ({ item, theme, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.countryItem}>
    <Image
      source={{ uri: item.flags.png }}
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.countryInfo}>
      <Text
        style={[
          styles.countryName,
          { color: theme === "dark" ? "#fff" : "#000" },
        ]}
      >
        {item?.name?.official}
      </Text>
      <Text
        style={[
          styles.capitalText,
          { color: theme === "dark" ? "#98a2b3" : "#666" },
        ]}
      >
        {item?.capital?.[0] || "No capital"}
      </Text>
    </View>
  </TouchableOpacity>
);

// Component for rendering section headers
const SectionHeader: React.FC<SectionHeaderProps> = ({ section, theme }) => (
  <View
    style={[
      styles.sectionHeader,
      { backgroundColor: theme === "dark" ? "#000F24" : "#fff" },
    ]}
  >
    <Text
      style={[
        styles.sectionHeaderText,
        { color: theme === "dark" ? "#fff" : "#000" },
      ]}
    >
      {section.title}
    </Text>
  </View>
);

export default function HomeScreen(): JSX.Element {
  const { theme, toggleTheme } = useTheme();
  const { countries, loading } = useFetchCountries();
  const [search, setSearch] = useState<string>("");
  const [selectedContinent, setSelectedContinent] = useState<string>("All");
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["69%", "70%", "80%"];

  const continents = useMemo(() => {
    const allContinents = countries.reduce(
      (acc: string[], country: Country) => {
        country.continents?.forEach((continent: string) => {
          if (!acc.includes(continent)) {
            acc.push(continent);
          }
        });
        return acc;
      },
      []
    );
    return ["All", ...allContinents];
  }, [countries]);

  const toggleBottomSheet = useCallback(() => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  }, [isBottomSheetOpen]);

  const handleContinentSelect = useCallback((continent: string) => {
    setSelectedContinent(continent);
    setIsBottomSheetOpen(false);
  }, []);

  const sections = useMemo<Section[]>(() => {
    if (!countries?.length) return [];

    let filteredData = countries;

    // Apply continent filter
    if (selectedContinent !== "All") {
      filteredData = filteredData.filter((country: Country) =>
        country.continents?.includes(selectedContinent)
      );
    }

    // Apply search filter
    if (search.trim()) {
      const searchTerm = search.toLowerCase().trim();
      filteredData = filteredData.filter((country: Country) => {
        const name = country?.name?.official?.toLowerCase() || "";
        const capital = country?.capital?.[0]?.toLowerCase() || "";
        return name.includes(searchTerm) || capital.includes(searchTerm);
      });
    }

    // Sort countries alphabetically
    const sortedCountries = [...filteredData].sort((a: Country, b: Country) =>
      (a?.name?.official || "").localeCompare(b?.name?.official || "")
    );

    // Group by first letter
    const groupedData: { [key: string]: Country[] } = sortedCountries.reduce(
      (acc: { [key: string]: Country[] }, country: Country) => {
        const firstLetter =
          country?.name?.official?.charAt(0).toUpperCase() || "#";
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(country);
        return acc;
      },
      {}
    );

    return Object.keys(groupedData)
      .sort()
      .map((letter) => ({
        title: letter,
        data: groupedData[letter],
      }));
  }, [countries, search, selectedContinent]);

  if (loading)
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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme === "dark" ? "#000F24" : "#fff",
      }}
    >
      <View
        style={[
          styles.container,
          theme === "dark" ? styles.darkBackground : styles.lightBackground,
        ]}
      >
        <View style={styles.header}>
          <Text
            style={[
              styles.title,
              { color: theme === "dark" ? "#fff" : "#000" },
            ]}
          >
            Explore
          </Text>
          <TouchableOpacity onPress={toggleTheme}>
            {theme === "dark" ? (
              <Ionicons name="sunny" size={28} color="yellow" />
            ) : (
              <Ionicons name="moon" size={28} color="black" />
            )}
          </TouchableOpacity>
        </View>

        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: theme === "dark" ? "#98a2b333" : "#F2F4F7",
              borderColor: theme === "dark" ? "#98a2b333" : "#000",
              color: theme === "dark" ? "#fff" : "#000",
            },
          ]}
          placeholder="Search country or capital"
          placeholderTextColor={theme === "dark" ? "#98a2b3" : "#666"}
          value={search}
          onChangeText={setSearch}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          {/* filter by language */}
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: theme === "dark" ? "#98a2b333" : "#F2F4F7" },
            ]}
            onPress={() => {
              Alert.alert("Language", "This feature is coming soon!");
            }}
          >
            {/* <MaterialIcons
              name="filter-1"
              size={24}
              color={theme === "dark" ? "#fff" : "#000"}
            /> */}
            <MaterialCommunityIcons
              name="web"
              size={24}
              color={theme === "dark" ? "#fff" : "#000"}
            />
            <Text
              style={[
                styles.filterText,
                { color: theme === "dark" ? "#fff" : "#000" },
              ]}
            >
              EN
            </Text>
          </TouchableOpacity>

          {/* filter by continents */}
          <TouchableOpacity
            style={[
              styles.filterButton,
              { backgroundColor: theme === "dark" ? "#98a2b333" : "#F2F4F7" },
            ]}
            onPress={() => {
              bottomSheetRef.current?.expand();
            }}
          >
            <Feather
              name="filter"
              size={24}
              color={theme === "dark" ? "#fff" : "#000"}
            />
            <Text
              style={[
                styles.filterText,
                { color: theme === "dark" ? "#fff" : "#000" },
              ]}
            >
              Filter
            </Text>
          </TouchableOpacity>
        </View>

        <SectionList<Country, Section>
          sections={sections}
          keyExtractor={(item) =>
            item?.name?.official || Math.random().toString()
          }
          renderItem={({ item }) => (
            <CountryItem
              item={item}
              theme={theme}
              onPress={() => {
                router.navigate({
                  pathname: "/country/[id]",
                  params: { id: item?.capital?.[0] || "No capital" },
                });
              }}
            />
          )}
          renderSectionHeader={({ section }) => (
            <SectionHeader section={section} theme={theme} />
          )}
          ListEmptyComponent={() => (
            <Text
              style={[
                styles.emptyText,
                { color: theme === "dark" ? "#fff" : "#000" },
              ]}
            >
              No countries found
            </Text>
          )}
          stickySectionHeadersEnabled={true}
        />
      </View>

      <BottomSheet
        handleStyle={{
          backgroundColor: theme === "dark" ? "#000F24" : "#fff",
        }}
        handleIndicatorStyle={{
          backgroundColor: theme === "dark" ? "#98a2b3" : "#666",
        }}
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            opacity={0.7}
          />
        )}
      >
        <BottomSheetScrollView
          style={{
            flex: 1,
            backgroundColor: theme === "dark" ? "#000F24" : "#fff",
          }}
        >
          <View style={styles.bottomSheetContent}>
            <Text
              style={[
                styles.bottomSheetTitle,
                { color: theme === "dark" ? "#fff" : "#000" },
              ]}
            >
              Filter by Continent
            </Text>
            {continents?.map((continent) => (
              <TouchableOpacity
                key={continent}
                style={[
                  styles.continentItem,
                  selectedContinent === continent &&
                    styles.selectedContinentItem,
                ]}
                onPress={() => {
                  handleContinentSelect(continent);
                  bottomSheetRef.current?.close();
                }}
              >
                <Text
                  style={[
                    styles.continentText,
                    { color: theme === "dark" ? "#fff" : "#000" },
                    selectedContinent === continent &&
                      styles.selectedContinentText,
                  ]}
                >
                  {continent}
                </Text>
                {selectedContinent === continent && (
                  <MaterialIcons name="check" size={20} color="#4CAF50" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  lightBackground: {
    backgroundColor: "#fff",
  },
  darkBackground: {
    backgroundColor: "#000F24",
  },
  textInput: {
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    fontSize: 16,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#98a2b333",
    marginBottom: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  countryInfo: {
    marginLeft: 15,
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  capitalText: {
    fontSize: 14,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  sectionHeader: {
    padding: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#98a2b333",
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "600",
  },
  searchFilterContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  // textInput: {
  //   flex: 1,
  //   padding: 15,
  //   borderRadius: 10,
  //   borderWidth: 1,
  //   fontSize: 16,
  // },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    gap: 8,
    width: 86,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
  },
  bottomSheetContent: {
    padding: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  continentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectedContinentItem: {
    backgroundColor: "#4CAF5020",
  },
  continentText: {
    fontSize: 16,
  },
  selectedContinentText: {
    fontWeight: "600",
  },
});
