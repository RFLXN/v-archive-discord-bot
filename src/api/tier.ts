type TierName = "Grand Master" | "Master I" | "Master II" | "Master III"
| "Diamond I" | "Diamond II" | "Diamond III" | "Diamond IV"
| "Platinum I" | "Platinum II" | "Platinum III" | "Platinum IV"
| "Gold I" | "Gold II" | "Gold III" | "Gold IV"
| "Silver I" | "Silver II" | "Silver III" | "Silver IV"
| "Bronze I" | "Bronze II" | "Bronze III" | "Bronze IV"
| "Iron I" | "Iron II" | "Iron III" | "Iron IV"
| "Amateur I" | "Amateur II" | "Amateur III" | "Amateur IV"
| "Beginner";

const tierScore: Record<TierName, number> = {
    "Grand Master": 9950,
    "Master I": 9900,
    "Master II": 9800,
    "Master III": 9700,
    "Diamond I": 9600,
    "Diamond II": 9400,
    "Diamond III": 9200,
    "Diamond IV": 9000,
    "Platinum I": 8800,
    "Platinum II": 8600,
    "Platinum III": 8400,
    "Platinum IV": 8200,
    "Gold I": 8000,
    "Gold II": 7800,
    "Gold III": 7600,
    "Gold IV": 7200,
    "Silver I": 7200,
    "Silver II": 7000,
    "Silver III": 6800,
    "Silver IV": 6600,
    "Bronze I": 6300,
    "Bronze II": 6000,
    "Bronze III": 5650,
    "Bronze IV": 5300,
    "Iron I": 4900,
    "Iron II": 4600,
    "Iron III": 4300,
    "Iron IV": 4000,
    "Amateur I": 3000,
    "Amateur II": 2000,
    "Amateur III": 1000,
    "Amateur IV": 500,
    Beginner: 0
};

const levelPoint = {
    1: 40,
    2: 50,
    3: 60,
    4: 70,
    5: 80,
    6: 90,
    7: 100,
    8: 110,
    9: 120,
    10: 130,
    11: 140
};

const floorPoint = {
    0.1: 126,
    0.2: 128,
    0.3: 130,
    1.1: 132,
    1.2: 134,
    1.3: 136,
    2.1: 138,
    2.2: 140,
    2.3: 142,
    3.1: 144,
    3.2: 146,
    3.3: 148,
    4.1: 150,
    4.2: 152,
    4.3: 154,
    4.4: 152.2,
    4.5: 152.4,
    4.6: 162.6,
    5.1: 153,
    5.2: 154,
    5.3: 155,
    6.1: 156,
    6.2: 157,
    6.3: 158,
    7.1: 159,
    7.2: 160,
    7.3: 161,
    8.1: 162,
    8.2: 163,
    8.3: 164,
    9.1: 165,
    9.2: 166,
    9.3: 167,
    10.1: 168,
    10.2: 169,
    10.3: 170,
    11.1: 172,
    11.2: 174,
    11.3: 176,
    12.1: 178,
    12.2: 180,
    12.3: 176,
    13.1: 177,
    13.2: 178,
    13.3: 179,
    14.1: 180

};

const tierSeq: TierName[] = [
    "Beginner",
    "Amateur IV",
    "Amateur III",
    "Amateur II",
    "Amateur I",
    "Iron IV",
    "Iron III",
    "Iron II",
    "Iron I",
    "Bronze IV",
    "Bronze III",
    "Bronze II",
    "Bronze I",
    "Silver IV",
    "Silver III",
    "Silver II",
    "Silver I",
    "Gold IV",
    "Gold III",
    "Gold II",
    "Gold I",
    "Platinum IV",
    "Platinum III",
    "Platinum II",
    "Platinum I",
    "Diamond IV",
    "Diamond III",
    "Diamond II",
    "Diamond I",
    "Master III",
    "Master II",
    "Master I",
    "Grand Master"
];

const getTierFromScore = (score: number) => {
    let current: TierName = "Beginner";

    for (const tierName of tierSeq) {
        if (score >= tierScore[tierName]) {
            current = tierName;
        } else {
            break;
        }
    }

    return current;
};

export { TierName, getTierFromScore };
