// import React, { useState } from "react";
// import { HomeScreen } from "./components/HomeScreen";
// import { CallScreen } from "./components/CallScreen";
// import {
//   StreamVideo,
//   StreamVideoClient,
// } from "@stream-io/video-react-native-sdk";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// const apiKey = "k7txasr9xj4r";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY3VpZGFkb3IxMyIsImV4cCI6MTcxNTQ5NDI5NywiaWF0IjoxNzE1NDY1NDk3fQ.-BoY8xx4yVYH0woTCVUH6xQh3A8YG8eun4dKAGfQQgY";
// const userId = "cuidador13";

// const user = {
//   id: userId,
//   name: "cuidador",
//   image: `https://getstream.io/random_png/?id=${userId}&name=Mission+Vao`,
// };
// const client = new StreamVideoClient({ apiKey, user, token });

// const Main = () => {
//   const [activeScreen, setActiveScreen] = useState("home");
//   const goToCallScreen = () => setActiveScreen("call-screen");
//   const goToHomeScreen = () => setActiveScreen("home");

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <StreamVideo client={client}>
//         {activeScreen === "call-screen" ? (
//           <CallScreen goToHomeScreen={goToHomeScreen} key={} />
//         ) : (
//           <HomeScreen goToCallScreen={goToCallScreen} />
//         )}
//       </StreamVideo>
//     </GestureHandlerRootView>
//   );
// };

// export default Main;

import React, { useState } from "react";
import { HomeScreen } from "./components/HomeScreen";
import { CallScreen } from "./components/CallScreen";
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useGetStream } from "./services/useGetStream";

const apiKey = "k7txasr9xj4r";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY3VpZGFkb3IxMyIsImV4cCI6MTcxNTQ5NDI5NywiaWF0IjoxNzE1NDY1NDk3fQ.-BoY8xx4yVYH0woTCVUH6xQh3A8YG8eun4dKAGfQQgY";
const userId = "cuidador13";

const user = {
  id: userId,
  name: "cuidador",
  image: `https://getstream.io/random_png/?id=${userId}&name=Mission+Vao`,
};
const client = new StreamVideoClient({ apiKey, user, token });

const Main = () => {
  const { data } = useGetStream();

  const [state, setState] = useState({
    activeScreen: "home",
    callKey: Date.now(), // Initialize the key based on the current timestamp
  });

  const goToCallScreen = () => {
    setState((prevState) => ({
      ...prevState,
      activeScreen: "call-screen",
      callKey: Date.now(), // Update the key with a new timestamp
    }));
  };

  const goToHomeScreen = () => {
    setState((prevState) => ({
      ...prevState,
      activeScreen: "home",
    }));
  };


  console.log("data", data)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StreamVideo client={client}>
        {state.activeScreen === "call-screen" ? (
          <CallScreen goToHomeScreen={goToHomeScreen} key={state.callKey} callId={state.callKey} agentId={data?.agentId || ""} />
        ) : (
          <HomeScreen goToCallScreen={goToCallScreen} />
        )}
      </StreamVideo>
    </GestureHandlerRootView>
  );
};

export default Main;
