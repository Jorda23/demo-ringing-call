import axios from "axios";
import { useQuery } from "react-query";

interface responseData {
  agentId: string;
}

export const useGetStream = () => {
  const getAlertList = useQuery<responseData, Error>(
    ["alert"],
    () => getstreamService(),
    {
      staleTime: Infinity, 
      cacheTime: Infinity,
      enabled: true, 
    }
  );

  return getAlertList;
};

const getstreamService = async () => {
  try {
    const response = await axios.get<responseData>(
      `https://9ddd-2803-2d60-1042-a03b-41b9-6d7e-f6d2-6625.ngrok-free.app/getStream/getAgent`,
      {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijp7InVzdWFyaW9JZCI6MywiZW1haWwiOiJjdWlkYWRvckBlbWFpbC5jb20iLCJub21icmUiOiJjdWlkYWRvcjEiLCJpbWFnZW5QZXJmaWxTcmMiOiJodHRwczovL3F1aW5wdS5jb20vdXBsb2Fkcy9kZWZhdWx0L29yaWdpbmFsLzFYLzFmZGVmZTY4ZjI1MDkzOWUxZmM5ZTU1OGIzMWRjM2U2NjQ2ZDg5NTguanBlZyIsInRpcG9Vc3VhcmlvIjoiY3VpZGFkb3IiLCJ1c3VhcmlvUGVybWlzc2lvbnMiOm51bGwsImJ1c2luZXNzUGFydG5lcnNJZCI6IjYiLCJnZXRTdHJlYW1JZCI6ImN1aWRhZG9yMTMifSwiaWF0IjoxNzE1NDg4MzU2LCJleHAiOjE3MTU1MTcxNTZ9.2SnReqldL6stbGhrSF4dqxeC2MPEhOCd9zMEZe0gCgQ"}`,
          'apikey': "abcd1234",
        },
      }
    );

    if (!response) {
      throw new Error("Failed to get agent");
    }

    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
