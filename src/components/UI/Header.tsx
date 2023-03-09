import {StyleSheet, Text} from 'react-native'

interface HeaderProps {
    title: string
}

const Header = ({title}: HeaderProps) => {
    return <Text style={styles.text}>{title}</Text>

}

export default Header

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: "600"
    }
})
