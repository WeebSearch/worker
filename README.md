<div align="center">
    <h2><b>An open source database of anime episode and character transcripts.</b></h2>
</div>


<div align="center">
    <img src="https://images.gr-assets.com/hostedimages/1502722027ra/23588364.gif">
</div>

<hr>

#### Why?

Anime is great, and while there's a lot of information out there on anime metadata
on great sites like [Anilist](http://anilist.co/), there's no
way to know what your favorite characters have said without going through
all the episodes yourself. What exactly did Aoba say in S1 E1
of [New Game!](https://anilist.co/anime/21455)? How often did Louise speak
in the first season of [Familiar of Zero](https://anilist.co/anime/1195/The-Familiar-of-Zero/)
compared to the last? ¯\\\_(ツ)\_/¯

These are interesting things to be able to answer. Why do I want to answer
them? Stop asking so many questions.

#### How does (will) it work?

- Crawlers fetch subtitles from websites

- Subs that don't match one of the handful of known and consistent formats are filtered out

- **Some** subtitles have information on speakers, those are parsed as well

- Anime, episode and character information is looked up on `MAL` and `Anilist`

- Data is given structure and saved on Postgres

- Solr is updated with new information as they get added to Postgres

- GraphQL is used as an API to interface with Elasticsearch

- Requests are checked and cached on Redis for each query

## Todo and Planned Features

### Workers (Python)

- [x] Support multiple sub groups

- [ ] Switch to non-blocking co-routines

- [ ] Support multiple file types **(rar, zip, 7z, tar.gz)**

- [ ] Support Japanese subtitles

- [ ] Add more sub websites to crawl


### Backend (Typescript)

- [x] ~~Integrate Hifumi's API~~ or start the API from scratch with Prisma

- [x] User authentication, JWT?

- [x] Internal Graphql to expose ORM features to the workers

- [ ] Solr integration for indexing dialogues

- [ ] Redis integration for caching user queries

### Frontend (React & TS)

- [ ] Start a website with React

- [ ] Create a web-based transcript editor to fix parsing mistakes or add new information

    - Available to users designated as data mods

    - Supports:

        - Marking lines with the correct speakers [color coded]

        - Editing existing character information

        - Editing episode and character metadata

        - Deleting unnecessary dialogues and characters (which there are a lot of)

        - Merging animes, dialogues, characters and more


<div align="center">
    <img src="http://www.typescriptlang.org/assets/images/icons/apple-touch-icon-180x180.png" height="64">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2000px-Python-logo-notext.svg.png" height="64">
    <img src="https://redislabs.com/wp-content/themes/redislabs/assets/images/redis-logo-stack.png" height="64">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/2000px-GraphQL_Logo.svg.png" height="64">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" height="64">
    <img src="https://burner.bonanza.com/background_masks/100887573.png?composite=true&transparent=true" height="64">
</div>


## Getting Started

1. install pipenv `pip install pipenv`
2. install all dependencies `pipenv install`
3. activate environment `pipenv shell`

#### Tools

- `pipenv run start` generic start command

- `pipenv run crawl` starts the crawler to fetch subtitle files

- `pipenv run migrate` performs migrations to get the database up-to-date with latest revisions

- `pipenv run lint` checks the code for pep8 violations

  - Note: You will **not** be able to commit code that has linter errors.

- `pipenv run test` runs pytest against the __tests__ files
  - Remember to include __tests__ for new changes


<hr>

**Note:**

This service is still a work in progress, meaning any documentation
or service component may change or get added _literally_ overnight
