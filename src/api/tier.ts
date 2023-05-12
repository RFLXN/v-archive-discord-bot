import vArchiveApi, { DjmaxButton, TierResponse } from "v-archive-api-client";

const fetchTier = async (username: string, button: DjmaxButton) => {
    console.log(`Fetching tier: ${username} / ${button}B`);
    return vArchiveApi.tier({ nickname: username, button });
};

const fetchAllTier = async (username: string) => {
    const buttons: DjmaxButton[] = [4, 5, 6, 8];

    const tiers: Record<DjmaxButton, TierResponse | undefined> = {
        4: undefined, 5: undefined, 6: undefined, 8: undefined
    };
    for (const button of buttons) {
        try {
            tiers[button] = await fetchTier(username, button);
        } catch (e) {
            // ignore for invalid tier data
        }
    }

    return tiers;
};

export { fetchTier, fetchAllTier };
