import { View, StyleSheet, ScrollView } from "react-native";
import TopBannerNav from "../components/TopBannerNav";
import { Colors } from "../util/constants";
import CopyrightText from "../components/CopyrightText";


const TopNavTemplate = ({ title, subtitle, navBackgroudImage, hasBackButton, children, pillText, showCopyright = true }) => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
            <TopBannerNav title={title} subtitle={subtitle} backgroundImage={navBackgroudImage} hasBackButton={hasBackButton} pillText={pillText} />
            <View style={{ flex: 1, marginTop: -80 }}>
                {children}
                {showCopyright && <CopyrightText style={{ padding: 20 }} />}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.jokerBlack1100,
    }
});

export default TopNavTemplate;
