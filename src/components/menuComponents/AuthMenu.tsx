import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import DashboardScreen from "../../screens/DashboardScreen";
import {colors} from "../../utils/globalStyles";
import Icon from "../UI/Icon";
import {ParamListBase} from "@react-navigation/native";
import SearchScreen from "../../screens/SearchScreen";
import CreatePostScreen from "../../screens/CreatePostScreen";
import OwnProfileScreen from "../../screens/OwnProfileScreen";
import PostDetailScreen from "../../screens/PostDetailScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import EditUserDataScreen from "../../screens/EditUserDataScreen";

export const queryClient = new QueryClient()
const Stack = createStackNavigator<ParamListBase>()
const Tabs = createBottomTabNavigator<ParamListBase>()

const AuthMenu = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Stack.Navigator initialRouteName="Tabs">
                <Stack.Screen name="Tabs" component={TabsMenu} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="PostDetail" component={PostDetailScreen} options={{
                    headerTransparent: true,
                    title: ""
                }}/>
                <Stack.Screen name="Profile" component={ProfileScreen} options={{
                    headerTransparent: true,
                    title: ""
                }}/>
                <Stack.Screen name="UpdateOwnProfile" component={EditUserDataScreen} options={{
                    headerTransparent: true,
                    title: ""
                }}/>
            </Stack.Navigator>
        </QueryClientProvider>
    )
}

export default AuthMenu

const TabsMenu = () => {
    return (
        <Tabs.Navigator initialRouteName="Dashboard" screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveTintColor: colors.lightBlue
        }}>
            <Tabs.Screen name="Dashboard" component={DashboardScreen} options={{
                tabBarIcon: ({size, color}) => <Icon name="home-outline" size={size} color={color}/>
            }}/>
            <Tabs.Screen name="Search" component={SearchScreen} options={{
                tabBarIcon: ({size, color}) => <Icon name="search" size={size} color={color}/>
            }}/>
            <Tabs.Screen name="CreatePost" component={CreatePostScreen} options={{
                tabBarIcon: ({size, color}) => <Icon name="ios-add-circle-outline" size={size} color={color}/>
            }}/>
            <Tabs.Screen name="OwnProfile" component={OwnProfileScreen} options={{
                tabBarIcon: ({size, color}) => <Icon name="person-outline" size={size} color={color}/>
            }}/>
        </Tabs.Navigator>
    )
}

