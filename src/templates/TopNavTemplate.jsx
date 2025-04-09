import { View, StyleSheet, ScrollView } from "react-native";
import TopBannerNav from "../components/TopBannerNav";
import { Colors } from "../util/constants";


const TopNavTemplate = ({ title, subtitle, navBackgroudImage, hasBackButton, children, pillText }) => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <TopBannerNav title={title} subtitle={subtitle} backgroundImage={navBackgroudImage} hasBackButton={hasBackButton} pillText={pillText} />
            <View style={{ flex: 1, marginTop: -80 }}>
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

export default TopNavTemplate;
