import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import Prelogin from "./src/screens/PreloginScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import Login from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import EmailConfig from "./src/screens/EmailConfigScreen";
import MyAccount from "./src/screens/MyAccountScreen";
import ChangePassword from "./src/screens/ChangePasswordScreen";
import AccountInfo from "./src/screens/AccountInformationScreen";
import BasketScreen from "./src/screens/BasketScreen";
import Logout from "./src/screens/LogoutScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import ProductsScreen from "./src/screens/ProductsScreen";
import ProductDetails from "./src/screens/ProductDetails";
import Checkout from "./src/screens/CheckoutScreen";
import CommentScreen from "./src/screens/CommentScreen";
import PostComment from "./src/screens/PostCommentScreen";
import AfterCheckout from "./src/screens/AfterCheckoutScreen";
import Orders from "./src/screens/OrdersScreen.js";
import OrderProducts from "./src/screens/OrderProductDetailScreen";

const navigator = createStackNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    Home: { screen: HomeScreen },
    Prelogin: { screen: Prelogin },
    Login: { screen: Login },
    Register: { screen: RegisterScreen },
    EmailConfig: { screen: EmailConfig },
    MyAccount: { screen: MyAccount },
    ChangePassword: { screen: ChangePassword },
    AccountInfo: { screen: AccountInfo },
    Basket: { screen: BasketScreen },
    Logout: { screen: Logout },
    Category: { screen: CategoryScreen },
    Products: { screen: ProductsScreen },
    ProductDetail: { screen: ProductDetails },
    Checkout: { screen: Checkout },
    CommentScreen: { screen: CommentScreen },
    PostComment: { screen: PostComment },
    AfterCheckout: { screen: AfterCheckout },
    Orders: { screen: Orders },
    OrderProducts: { screen: OrderProducts },
  },
  {
    initialRouteName: "Welcome",
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

export default createAppContainer(navigator);

/*const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};*/
