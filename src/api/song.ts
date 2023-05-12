import vArchiveApi from "v-archive-api-client";

const fetchSongs = async () => {
    console.log("Fetching songs");
    return vArchiveApi.songs();
};

export { fetchSongs };
