import { getRepository } from "../../db";
import { Song } from "../entity/song";

interface SongData {
    title: number;
    name: string;
    composer: string;
    dlc: string;
    dlcCode: string;
}

const deleteSongs = async () => {
    const repo = getRepository(Song);
    await repo.clear();
    console.log("Clear songs");
};

const insertSongs = async (data: SongData[]) => {
    console.log(`Insert ${data.length} songs`);
    const repo = getRepository(Song);

    if (data.length > 50) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i <= Math.ceil(data.length / 50); i++) {
            const start = i * 50;
            const end = start + 50;

            if (end >= data.length) {
                const current = data.slice(start);
                console.log(`Insert songs: ${start} - ${data.length}`);
                await repo.insert(current);
                return;
            }
            const current = data.slice(start, end);
            console.log(`Insert songs: ${start} - ${end - 1}`);
            await repo.insert(current);
        }
    } else {
        await repo.insert(data);
    }
};

const updateSongs = async (data: SongData[]) => {
    console.log("Updating songs");
    await deleteSongs();
    await insertSongs(data);
    console.log("Songs updated");
};

export { updateSongs, SongData };
