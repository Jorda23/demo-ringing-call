import React, { useEffect } from "react";
import {
  Call,
  StreamCall,
  useStreamVideoClient,
  CallContent,
} from "@stream-io/video-react-native-sdk";
import { Button, Text, View, StyleSheet } from "react-native";
import { CallStateValue } from "./CallStateValue";

type Props = { goToHomeScreen: () => void; callId: number, agentId: string  };

export const CallScreen = ({ goToHomeScreen, callId, agentId }: Props) => {
  const [call, setCall] = React.useState<Call | null>(null);
  const client = useStreamVideoClient();



  useEffect(() => {
    const call = client.call("default", callId.toString());
    call
      .getOrCreate({
        ring: true,
        data: {
          members: [
            { user_id: "cuidador13" }, // Include self
            { user_id: agentId }, // Include the userId of the callee
          ],
        },
      })
      .then(() => setCall(call));
  }, [client]);

  if (!call) {
    return <Text>Joining call...</Text>;
  }

  return (
    <StreamCall call={call}>
      <View style={styles.container}>
        <Text style={styles.text}>Here we will add Video Calling UI</Text>
        <CallStateValue />
        <Button
          title="Go back"
          onPress={() => {
            goToHomeScreen(), call.endCall();
          }}
        />
        <CallContent onHangupCallHandler={goToHomeScreen} />
      </View>
    </StreamCall>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
});
