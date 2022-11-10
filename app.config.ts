import "dotenv/config";

export default ({ config }: any) => {
  return {
    ...config,
    extra: {
      googleExpoClientId: process.env.GOOGLE_EXPO_CLIENT_ID,
      googleWebClientId: process.env.GOOGLE_WEB_CLIENT_ID,
      googleApiKey: process.env.GOOGLE_API_KEY,
      revenueCatApiKey: process.env.REVENUECAT_KEY,
      eas: {
        projectId: "9a6b8650-58c4-4924-ae45-ca05452387f1",
      },
    },
  };
};
