# Anime Transcript Indexing Process

1) **Scrape the anime subtitles download website**, eventually this will lead to downloading the entire database of the website and doing scheduled checks to look for newer files. http://subs.com.ru/list.php?c=enganime

    * The scraping will be done with scrapy on 2 spiders. One for downloading ALL the content incrementally (which will become obsolete once we have the entire website's subs on our DB), and another that will be called on a cron job to check for new subs.

    * The parsers will be called by the spiders themselves, so as long as there are no spiders crawlers running, the database doesn't get updated. Ideally the entire unpacking process should be done in memory to save an unnecessary middle process of writing to disk (which pysubs2 doesn't let us do atm so that'll be fun to fork and edit). 

2) **Download the file zip folder of the anime and extract its contents**. Zipped folders sometimes contain subtitle files directly at the root OR sometimes they have nested folders for different types of subs, or subs in different languages. This all needs to be accounted for.

3) **Parse the file names of the download**. This is probably one of the trickiest parts of this entire process. Unlike subtitle file contents, (which do not consistently contain metadata about the anime itself) file names have no set standard for how they're structured, different translators have different ways of naming things. We will need to be able to extract of "clean" the names of the downloaded files to be able to save it for later identifying the anime. As with every other parsed data, the raw filename will also need to be saved along with the parsed version to make sure we don't lose any information if something goes wrong while interpreting raw data.

4)  **Go through the sub using pysubs2 and divide the transcripts into characters lines**.

    * Some subs have no information on characters. Ideally we should be throwing this away, it's wasted space. There might be ways to get information on this later but not right now.

    * Due to the nature of TV, subtitles are created on a per-frame basis which means continuous lines of speech are unnecessarily divided into different sections. We should be chunking these into the same object while parsing and saving them in the same place (row) to save on _significant_ amount of space.

    * There _must_ be a way to go through an entire episode (possibly an entire Anime through the sequential episodes itself, although that information can be supplied by AniList too, it depends on how well we can parse the filename and look for patterns). This will be achieved by identifying chunks of `Character` speech with UUID4 as a Foreign Key. Each speech will be, in a way, a linked list connecting one chunk to another.

        * The current implementation of this connects speeches to each other on the chronological order of the anime which means the character speech sequence is not preserved directly. It would be possible to get this data from an API by going through the linked list but it might be worth it to consider connecting a characters speech in an anime with a separate incrementing column to make it easier to sort by order on PostgreSQL.

5) **Look up the anime on AniList using Hifumi's search function**. This will actually be offered as a part of the API later. Essentially we'll be using MAL's hinting endpoint to lookup MAL IDs and get the information from AniList by fetching MAL IDs. Depending on how good we can the parsing of the filenames, we might end up with unreadable or unsearchable file names which must be accounted for.

6) **Fetch ALL characters of the found anime from AniList**. Fan subs tend to shorten character names and don't have it in a proper `Lastname Firstname` format so in order to match character information to searches, we need to be able to reference it to an AniList and MAL ID. I don't know how much information you're allowed to persist from AniList (persisting data could actually not even be allowed so that needs to be kept in mind when implementing), but ideally we'd just need columns like `anilist_id`, `thumbnail_url` and `anime_name`. Everything else can be fetched from AniList when (if) needed. 

    * In order to map the parsed characters to AniList IDs, we'll be using some sort of fuzzy matching, will have to play around with the settings to get it right.

7) **Commit episode information to the DB, ready for the API to serve it**

