CREATE TABLE SCORE (
    USER_ID INTEGER NOT NULL,
    SONG_TITLE INTEGER NOT NULL,
    BUTTON INTEGER NOT NULL,
    PATTERN TEXT NOT NULL,
    SCORE REAL NOT NULL,
    FULL_COMBO INTEGER NOT NULL,
    CONSTRAINT FULL_COMBO_CHECK CHECK ( FULL_COMBO = 0 OR FULL_COMBO = 1 ),
    CONSTRAINT SCORE_PK PRIMARY KEY (USER_ID, SONG_TITLE, BUTTON, PATTERN),
    FOREIGN KEY (USER_ID) REFERENCES USER (ID) ON DELETE CASCADE,
    FOREIGN KEY (SONG_TITLE) REFERENCES SONG (TITLE) ON DELETE CASCADE
)