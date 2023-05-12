CREATE TABLE PATTERN (
    SONG_TITLE INTEGER NOT NULL,
    BUTTON INTEGER NOT NULL,
    PATTERN TEXT NOT NULL,
    LEVEL INTEGER NOT NULL,
    FLOOR REAL,
    CONSTRAINT BUTTON_CHECK CHECK (BUTTON >= 4 AND BUTTON <= 8 AND BUTTON != 7),
    CONSTRAINT PATTERN_CHECK CHECK (PATTERN = 'NORMAL' OR PATTERN = 'HARD' OR PATTERN = 'MAXIMUM' OR PATTERN = 'SC'),
    CONSTRAINT PATTERN_PK PRIMARY KEY (SONG_TITLE, BUTTON, PATTERN),
    FOREIGN KEY (SONG_TITLE) REFERENCES SONG(TITLE) ON DELETE CASCADE
)