import {FlatList, StyleSheet, View} from 'react-native'
import {fetchAllUsersData} from "../../../hooks/fetchAllUsersData";
import SingleUser from "./SingleUser";
import {useContext} from "react";
import {AuthContext} from "../../../store/auth-context";
import {colors} from "../../../utils/globalStyles";
import {screenWidth} from "../../../utils/dimension";

const UsersList = () => {
    const authCtx = useContext(AuthContext)
    const {
        users
    } = fetchAllUsersData(true)

    users?.forEach((item, i) => {
        if (item.uuid === authCtx.loggedUserId) {
            users?.splice(i, 1)
            users?.unshift(item)
        }
    })

    const renderUser = (itemData: any) => {
        const item = itemData.item
        const userProps = {
            name: item.first_name,
            surname: item.last_name,
            imageUrl: item.image_url
        }
        const pressHandler = () => {
            console.log(item.uuid)
        }
        return <SingleUser onPress={pressHandler} {...userProps} />
    }

    return (
        <View style={styles.container}>
            <FlatList data={users} keyExtractor={(item: any) => item.uuid} renderItem={renderUser}
                      horizontal={true} showsHorizontalScrollIndicator={false}/>
        </View>
    )
}

export default UsersList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: screenWidth,
        alignSelf: "flex-start",
        borderBottomWidth: 1,
        borderBottomColor: colors.grey
    }
})
