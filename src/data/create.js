import { useEffect } from "react";
import { createVenueHeader } from "./fetchHeaders/venueFetchHead";

export function useCreateData(userInput, userData) {
  useEffect(() => {
    async function createVenue() {
      try {
        const response = await createVenueHeader(
          userInput,
          userData.accessToken
        );
        if (response.ok) {
          return await response.json();
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    }
    createVenue();
  }, [userInput, userData.accessToken]);
}
