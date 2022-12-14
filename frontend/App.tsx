import React, { useState } from "react";
import { Dimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import Map from "./screens/Map";
import MyPage from "./screens/MyPage";
import SearchMeal from "./screens/SearchMeal";
import AddMeal from "./screens/AddMeal";
import MyInformation from "./screens/MyInformation";
import Toast from "@zellosoft.com/react-native-toast-message";
import { shallowEqual, useSelector } from "react-redux";
import store from "./redux/store";
import Login from "./screens/Login";
import { BaseToast } from "@zellosoft.com/react-native-toast-message";
const App = () => {
  const userId = useSelector((store: Store) => {
    return store.user.userId;
  }, shallowEqual);
  const [swipe, setSwipe] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first" },
    { key: "second" },
    { key: "myInformation" },
    { key: "searchMeal" },
    { key: "addMeal" },
  ]);

  const scene = SceneMap({
    first: Map,
    second: MyPage,
    searchMeal: SearchMeal,
    addMeal: AddMeal,
    myInformation: MyInformation,
  });

  const toastConfig = {
    /* 
      overwrite 'success' type, 
      modifying the existing `BaseToast` component
    */
    success: ({ title, props, ...rest }: any) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: "#5AC9BC" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        messageStyle={{
          fontFamily: "LeferiBaseRegular",
          color: "black",
          fontSize: 15,
        }}
      />
    ),
  };

  return (
    <>
      {userId ? (
        <>
          <TabView
            navigationState={{ index, routes }}
            renderScene={scene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get("window").width }}
            swipeEnabled={swipe}
            renderTabBar={() => {
              return <></>;
            }}
            onSwipeEnd={() => {
              index === 0 ? setSwipe(false) : setSwipe(false);
            }}
          />
          <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
