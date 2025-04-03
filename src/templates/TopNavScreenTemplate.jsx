import { View, StyleSheet, ScrollView } from "react-native";
import TopBannerNav from "../components/TopBannerNav";
import { Colors } from "../util/constants";


const TopNavScreenTemplate = ({ title, subtitle, navBackgroudImage, hasBackButton, children }) => {
    return (
        <ScrollView style={styles.container}>
            <TopBannerNav title={title} subtitle={subtitle} backgroundImage={navBackgroudImage} hasBackButton={hasBackButton} />
            <View style={{ marginTop: -70 }}>
                {children}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    }
});

export default TopNavScreenTemplate;
