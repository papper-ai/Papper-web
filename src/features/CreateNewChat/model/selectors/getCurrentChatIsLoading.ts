import { StateSchema } from "app/providers/StoreProvider"

export const getCurrentChatIsLoading = (state: StateSchema) => state.currentChat.isLoading
