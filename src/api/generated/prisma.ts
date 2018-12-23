import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    aPIKeys: <T = APIKey[]>(args: { where?: APIKeyWhereInput, orderBy?: APIKeyOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    animes: <T = Anime[]>(args: { where?: AnimeWhereInput, orderBy?: AnimeOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    characters: <T = Character[]>(args: { where?: CharacterWhereInput, orderBy?: CharacterOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    dialogues: <T = Dialogue[]>(args: { where?: DialogueWhereInput, orderBy?: DialogueOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    episodes: <T = Episode[]>(args: { where?: EpisodeWhereInput, orderBy?: EpisodeOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    files: <T = File[]>(args: { where?: FileWhereInput, orderBy?: FileOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    seasons: <T = Season[]>(args: { where?: SeasonWhereInput, orderBy?: SeasonOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    users: <T = User[]>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    archives: <T = Archive[]>(args: { where?: ArchiveWhereInput, orderBy?: ArchiveOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    anime: <T = Anime | null>(args: { where: AnimeWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    character: <T = Character | null>(args: { where: CharacterWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    dialogue: <T = Dialogue | null>(args: { where: DialogueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    episode: <T = Episode | null>(args: { where: EpisodeWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    file: <T = File | null>(args: { where: FileWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    season: <T = Season | null>(args: { where: SeasonWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    user: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    archive: <T = Archive | null>(args: { where: ArchiveWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    aPIKeysConnection: <T = APIKeyConnection>(args: { where?: APIKeyWhereInput, orderBy?: APIKeyOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    animesConnection: <T = AnimeConnection>(args: { where?: AnimeWhereInput, orderBy?: AnimeOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    charactersConnection: <T = CharacterConnection>(args: { where?: CharacterWhereInput, orderBy?: CharacterOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    dialoguesConnection: <T = DialogueConnection>(args: { where?: DialogueWhereInput, orderBy?: DialogueOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    episodesConnection: <T = EpisodeConnection>(args: { where?: EpisodeWhereInput, orderBy?: EpisodeOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    filesConnection: <T = FileConnection>(args: { where?: FileWhereInput, orderBy?: FileOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    seasonsConnection: <T = SeasonConnection>(args: { where?: SeasonWhereInput, orderBy?: SeasonOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    usersConnection: <T = UserConnection>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    archivesConnection: <T = ArchiveConnection>(args: { where?: ArchiveWhereInput, orderBy?: ArchiveOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createAPIKey: <T = APIKey>(args: { data: APIKeyCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createAnime: <T = Anime>(args: { data: AnimeCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createCharacter: <T = Character>(args: { data: CharacterCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createDialogue: <T = Dialogue>(args: { data: DialogueCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createEpisode: <T = Episode>(args: { data: EpisodeCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createFile: <T = File>(args: { data: FileCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createSeason: <T = Season>(args: { data: SeasonCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createUser: <T = User>(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createArchive: <T = Archive>(args: { data: ArchiveCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateAnime: <T = Anime | null>(args: { data: AnimeUpdateInput, where: AnimeWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateCharacter: <T = Character | null>(args: { data: CharacterUpdateInput, where: CharacterWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateDialogue: <T = Dialogue | null>(args: { data: DialogueUpdateInput, where: DialogueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateEpisode: <T = Episode | null>(args: { data: EpisodeUpdateInput, where: EpisodeWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateFile: <T = File | null>(args: { data: FileUpdateInput, where: FileWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateSeason: <T = Season | null>(args: { data: SeasonUpdateInput, where: SeasonWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUser: <T = User | null>(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateArchive: <T = Archive | null>(args: { data: ArchiveUpdateInput, where: ArchiveWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteAnime: <T = Anime | null>(args: { where: AnimeWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteCharacter: <T = Character | null>(args: { where: CharacterWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteDialogue: <T = Dialogue | null>(args: { where: DialogueWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteEpisode: <T = Episode | null>(args: { where: EpisodeWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteFile: <T = File | null>(args: { where: FileWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteSeason: <T = Season | null>(args: { where: SeasonWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUser: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteArchive: <T = Archive | null>(args: { where: ArchiveWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertAnime: <T = Anime>(args: { where: AnimeWhereUniqueInput, create: AnimeCreateInput, update: AnimeUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertCharacter: <T = Character>(args: { where: CharacterWhereUniqueInput, create: CharacterCreateInput, update: CharacterUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertDialogue: <T = Dialogue>(args: { where: DialogueWhereUniqueInput, create: DialogueCreateInput, update: DialogueUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertEpisode: <T = Episode>(args: { where: EpisodeWhereUniqueInput, create: EpisodeCreateInput, update: EpisodeUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertFile: <T = File>(args: { where: FileWhereUniqueInput, create: FileCreateInput, update: FileUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertSeason: <T = Season>(args: { where: SeasonWhereUniqueInput, create: SeasonCreateInput, update: SeasonUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertUser: <T = User>(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertArchive: <T = Archive>(args: { where: ArchiveWhereUniqueInput, create: ArchiveCreateInput, update: ArchiveUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyAPIKeys: <T = BatchPayload>(args: { data: APIKeyUpdateInput, where?: APIKeyWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyAnimes: <T = BatchPayload>(args: { data: AnimeUpdateInput, where?: AnimeWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyCharacters: <T = BatchPayload>(args: { data: CharacterUpdateInput, where?: CharacterWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyDialogues: <T = BatchPayload>(args: { data: DialogueUpdateInput, where?: DialogueWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyEpisodes: <T = BatchPayload>(args: { data: EpisodeUpdateInput, where?: EpisodeWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyFiles: <T = BatchPayload>(args: { data: FileUpdateInput, where?: FileWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManySeasons: <T = BatchPayload>(args: { data: SeasonUpdateInput, where?: SeasonWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyUsers: <T = BatchPayload>(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyArchives: <T = BatchPayload>(args: { data: ArchiveUpdateInput, where?: ArchiveWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyAPIKeys: <T = BatchPayload>(args: { where?: APIKeyWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyAnimes: <T = BatchPayload>(args: { where?: AnimeWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyCharacters: <T = BatchPayload>(args: { where?: CharacterWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyDialogues: <T = BatchPayload>(args: { where?: DialogueWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyEpisodes: <T = BatchPayload>(args: { where?: EpisodeWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyFiles: <T = BatchPayload>(args: { where?: FileWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManySeasons: <T = BatchPayload>(args: { where?: SeasonWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyUsers: <T = BatchPayload>(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyArchives: <T = BatchPayload>(args: { where?: ArchiveWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    aPIKey: <T = APIKeySubscriptionPayload | null>(args: { where?: APIKeySubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    anime: <T = AnimeSubscriptionPayload | null>(args: { where?: AnimeSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    character: <T = CharacterSubscriptionPayload | null>(args: { where?: CharacterSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    dialogue: <T = DialogueSubscriptionPayload | null>(args: { where?: DialogueSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    episode: <T = EpisodeSubscriptionPayload | null>(args: { where?: EpisodeSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    file: <T = FileSubscriptionPayload | null>(args: { where?: FileSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    season: <T = SeasonSubscriptionPayload | null>(args: { where?: SeasonSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    user: <T = UserSubscriptionPayload | null>(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    archive: <T = ArchiveSubscriptionPayload | null>(args: { where?: ArchiveSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  APIKey: (where?: APIKeyWhereInput) => Promise<boolean>
  Anime: (where?: AnimeWhereInput) => Promise<boolean>
  Character: (where?: CharacterWhereInput) => Promise<boolean>
  Dialogue: (where?: DialogueWhereInput) => Promise<boolean>
  Episode: (where?: EpisodeWhereInput) => Promise<boolean>
  File: (where?: FileWhereInput) => Promise<boolean>
  Season: (where?: SeasonWhereInput) => Promise<boolean>
  User: (where?: UserWhereInput) => Promise<boolean>
  Archive: (where?: ArchiveWhereInput) => Promise<boolean>
}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(options: BasePrismaOptions): T
}
/**
 * Type Defs
*/

const typeDefs = `type AggregateAnime {
  count: Int!
}

type AggregateAPIKey {
  count: Int!
}

type AggregateArchive {
  count: Int!
}

type AggregateCharacter {
  count: Int!
}

type AggregateDialogue {
  count: Int!
}

type AggregateEpisode {
  count: Int!
}

type AggregateFile {
  count: Int!
}

type AggregateSeason {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type Anime implements Node {
  id: ID!
  anilistId: Int
  malId: Int
  rawName: String!
  name: String
  thumbnailUrl: String
  bannerUrl: String
  characters(where: CharacterWhereInput, orderBy: CharacterOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Character!]
  episodes(where: EpisodeWhereInput, orderBy: EpisodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Episode!]
  dialogues(where: DialogueWhereInput, orderBy: DialogueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Dialogue!]
  seasons(where: SeasonWhereInput, orderBy: SeasonOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Season!]
  files(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [File!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type AnimeConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [AnimeEdge]!
  aggregate: AggregateAnime!
}

input AnimeCreateInput {
  anilistId: Int
  malId: Int
  rawName: String!
  name: String
  thumbnailUrl: String
  bannerUrl: String
  characters: CharacterCreateManyWithoutAnimesInput
  episodes: EpisodeCreateManyWithoutAnimeInput
  dialogues: DialogueCreateManyWithoutAnimeInput
  seasons: SeasonCreateManyWithoutAnimeInput
  files: FileCreateManyWithoutAnimeInput
}

input AnimeCreateManyWithoutCharactersInput {
  create: [AnimeCreateWithoutCharactersInput!]
  connect: [AnimeWhereUniqueInput!]
}

input AnimeCreateOneWithoutDialoguesInput {
  create: AnimeCreateWithoutDialoguesInput
  connect: AnimeWhereUniqueInput
}

input AnimeCreateOneWithoutEpisodesInput {
  create: AnimeCreateWithoutEpisodesInput
  connect: AnimeWhereUniqueInput
}

input AnimeCreateOneWithoutFilesInput {
  create: AnimeCreateWithoutFilesInput
  connect: AnimeWhereUniqueInput
}

input AnimeCreateOneWithoutSeasonsInput {
  create: AnimeCreateWithoutSeasonsInput
  connect: AnimeWhereUniqueInput
}

input AnimeCreateWithoutCharactersInput {
  anilistId: Int
  malId: Int
  rawName: String!
  name: String
  thumbnailUrl: String
  bannerUrl: String
  episodes: EpisodeCreateManyWithoutAnimeInput
  dialogues: DialogueCreateManyWithoutAnimeInput
  seasons: SeasonCreateManyWithoutAnimeInput
  files: FileCreateManyWithoutAnimeInput
}

input AnimeCreateWithoutDialoguesInput {
  anilistId: Int
  malId: Int
  rawName: String!
  name: String
  thumbnailUrl: String
  bannerUrl: String
  characters: CharacterCreateManyWithoutAnimesInput
  episodes: EpisodeCreateManyWithoutAnimeInput
  seasons: SeasonCreateManyWithoutAnimeInput
  files: FileCreateManyWithoutAnimeInput
}

input AnimeCreateWithoutEpisodesInput {
  anilistId: Int
  malId: Int
  rawName: String!
  name: String
  thumbnailUrl: String
  bannerUrl: String
  characters: CharacterCreateManyWithoutAnimesInput
  dialogues: DialogueCreateManyWithoutAnimeInput
  seasons: SeasonCreateManyWithoutAnimeInput
  files: FileCreateManyWithoutAnimeInput
}

input AnimeCreateWithoutFilesInput {
  anilistId: Int
  malId: Int
  rawName: String!
  name: String
  thumbnailUrl: String
  bannerUrl: String
  characters: CharacterCreateManyWithoutAnimesInput
  episodes: EpisodeCreateManyWithoutAnimeInput
  dialogues: DialogueCreateManyWithoutAnimeInput
  seasons: SeasonCreateManyWithoutAnimeInput
}

input AnimeCreateWithoutSeasonsInput {
  anilistId: Int
  malId: Int
  rawName: String!
  name: String
  thumbnailUrl: String
  bannerUrl: String
  characters: CharacterCreateManyWithoutAnimesInput
  episodes: EpisodeCreateManyWithoutAnimeInput
  dialogues: DialogueCreateManyWithoutAnimeInput
  files: FileCreateManyWithoutAnimeInput
}

"""An edge in a connection."""
type AnimeEdge {
  """The item at the end of the edge."""
  node: Anime!

  """A cursor for use in pagination."""
  cursor: String!
}

enum AnimeOrderByInput {
  id_ASC
  id_DESC
  anilistId_ASC
  anilistId_DESC
  malId_ASC
  malId_DESC
  rawName_ASC
  rawName_DESC
  name_ASC
  name_DESC
  thumbnailUrl_ASC
  thumbnailUrl_DESC
  bannerUrl_ASC
  bannerUrl_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type AnimePreviousValues {
  id: ID!
  anilistId: Int
  malId: Int
  rawName: String!
  name: String
  thumbnailUrl: String
  bannerUrl: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type AnimeSubscriptionPayload {
  mutation: MutationType!
  node: Anime
  updatedFields: [String!]
  previousValues: AnimePreviousValues
}

input AnimeSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [AnimeSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [AnimeSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [AnimeSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: AnimeWhereInput
}

input AnimeUpdateInput {
  anilistId: Int
  malId: Int
  rawName: String
  name: String
  thumbnailUrl: String
  bannerUrl: String
  characters: CharacterUpdateManyWithoutAnimesInput
  episodes: EpisodeUpdateManyWithoutAnimeInput
  dialogues: DialogueUpdateManyWithoutAnimeInput
  seasons: SeasonUpdateManyWithoutAnimeInput
  files: FileUpdateManyWithoutAnimeInput
}

input AnimeUpdateManyWithoutCharactersInput {
  create: [AnimeCreateWithoutCharactersInput!]
  connect: [AnimeWhereUniqueInput!]
  disconnect: [AnimeWhereUniqueInput!]
  delete: [AnimeWhereUniqueInput!]
  update: [AnimeUpdateWithWhereUniqueWithoutCharactersInput!]
  upsert: [AnimeUpsertWithWhereUniqueWithoutCharactersInput!]
}

input AnimeUpdateOneRequiredWithoutDialoguesInput {
  create: AnimeCreateWithoutDialoguesInput
  connect: AnimeWhereUniqueInput
  update: AnimeUpdateWithoutDialoguesDataInput
  upsert: AnimeUpsertWithoutDialoguesInput
}

input AnimeUpdateOneRequiredWithoutEpisodesInput {
  create: AnimeCreateWithoutEpisodesInput
  connect: AnimeWhereUniqueInput
  update: AnimeUpdateWithoutEpisodesDataInput
  upsert: AnimeUpsertWithoutEpisodesInput
}

input AnimeUpdateOneRequiredWithoutFilesInput {
  create: AnimeCreateWithoutFilesInput
  connect: AnimeWhereUniqueInput
  update: AnimeUpdateWithoutFilesDataInput
  upsert: AnimeUpsertWithoutFilesInput
}

input AnimeUpdateOneRequiredWithoutSeasonsInput {
  create: AnimeCreateWithoutSeasonsInput
  connect: AnimeWhereUniqueInput
  update: AnimeUpdateWithoutSeasonsDataInput
  upsert: AnimeUpsertWithoutSeasonsInput
}

input AnimeUpdateWithoutCharactersDataInput {
  anilistId: Int
  malId: Int
  rawName: String
  name: String
  thumbnailUrl: String
  bannerUrl: String
  episodes: EpisodeUpdateManyWithoutAnimeInput
  dialogues: DialogueUpdateManyWithoutAnimeInput
  seasons: SeasonUpdateManyWithoutAnimeInput
  files: FileUpdateManyWithoutAnimeInput
}

input AnimeUpdateWithoutDialoguesDataInput {
  anilistId: Int
  malId: Int
  rawName: String
  name: String
  thumbnailUrl: String
  bannerUrl: String
  characters: CharacterUpdateManyWithoutAnimesInput
  episodes: EpisodeUpdateManyWithoutAnimeInput
  seasons: SeasonUpdateManyWithoutAnimeInput
  files: FileUpdateManyWithoutAnimeInput
}

input AnimeUpdateWithoutEpisodesDataInput {
  anilistId: Int
  malId: Int
  rawName: String
  name: String
  thumbnailUrl: String
  bannerUrl: String
  characters: CharacterUpdateManyWithoutAnimesInput
  dialogues: DialogueUpdateManyWithoutAnimeInput
  seasons: SeasonUpdateManyWithoutAnimeInput
  files: FileUpdateManyWithoutAnimeInput
}

input AnimeUpdateWithoutFilesDataInput {
  anilistId: Int
  malId: Int
  rawName: String
  name: String
  thumbnailUrl: String
  bannerUrl: String
  characters: CharacterUpdateManyWithoutAnimesInput
  episodes: EpisodeUpdateManyWithoutAnimeInput
  dialogues: DialogueUpdateManyWithoutAnimeInput
  seasons: SeasonUpdateManyWithoutAnimeInput
}

input AnimeUpdateWithoutSeasonsDataInput {
  anilistId: Int
  malId: Int
  rawName: String
  name: String
  thumbnailUrl: String
  bannerUrl: String
  characters: CharacterUpdateManyWithoutAnimesInput
  episodes: EpisodeUpdateManyWithoutAnimeInput
  dialogues: DialogueUpdateManyWithoutAnimeInput
  files: FileUpdateManyWithoutAnimeInput
}

input AnimeUpdateWithWhereUniqueWithoutCharactersInput {
  where: AnimeWhereUniqueInput!
  data: AnimeUpdateWithoutCharactersDataInput!
}

input AnimeUpsertWithoutDialoguesInput {
  update: AnimeUpdateWithoutDialoguesDataInput!
  create: AnimeCreateWithoutDialoguesInput!
}

input AnimeUpsertWithoutEpisodesInput {
  update: AnimeUpdateWithoutEpisodesDataInput!
  create: AnimeCreateWithoutEpisodesInput!
}

input AnimeUpsertWithoutFilesInput {
  update: AnimeUpdateWithoutFilesDataInput!
  create: AnimeCreateWithoutFilesInput!
}

input AnimeUpsertWithoutSeasonsInput {
  update: AnimeUpdateWithoutSeasonsDataInput!
  create: AnimeCreateWithoutSeasonsInput!
}

input AnimeUpsertWithWhereUniqueWithoutCharactersInput {
  where: AnimeWhereUniqueInput!
  update: AnimeUpdateWithoutCharactersDataInput!
  create: AnimeCreateWithoutCharactersInput!
}

input AnimeWhereInput {
  """Logical AND on all given filters."""
  AND: [AnimeWhereInput!]

  """Logical OR on all given filters."""
  OR: [AnimeWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [AnimeWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  anilistId: Int

  """All values that are not equal to given value."""
  anilistId_not: Int

  """All values that are contained in given list."""
  anilistId_in: [Int!]

  """All values that are not contained in given list."""
  anilistId_not_in: [Int!]

  """All values less than the given value."""
  anilistId_lt: Int

  """All values less than or equal the given value."""
  anilistId_lte: Int

  """All values greater than the given value."""
  anilistId_gt: Int

  """All values greater than or equal the given value."""
  anilistId_gte: Int
  malId: Int

  """All values that are not equal to given value."""
  malId_not: Int

  """All values that are contained in given list."""
  malId_in: [Int!]

  """All values that are not contained in given list."""
  malId_not_in: [Int!]

  """All values less than the given value."""
  malId_lt: Int

  """All values less than or equal the given value."""
  malId_lte: Int

  """All values greater than the given value."""
  malId_gt: Int

  """All values greater than or equal the given value."""
  malId_gte: Int
  rawName: String

  """All values that are not equal to given value."""
  rawName_not: String

  """All values that are contained in given list."""
  rawName_in: [String!]

  """All values that are not contained in given list."""
  rawName_not_in: [String!]

  """All values less than the given value."""
  rawName_lt: String

  """All values less than or equal the given value."""
  rawName_lte: String

  """All values greater than the given value."""
  rawName_gt: String

  """All values greater than or equal the given value."""
  rawName_gte: String

  """All values containing the given string."""
  rawName_contains: String

  """All values not containing the given string."""
  rawName_not_contains: String

  """All values starting with the given string."""
  rawName_starts_with: String

  """All values not starting with the given string."""
  rawName_not_starts_with: String

  """All values ending with the given string."""
  rawName_ends_with: String

  """All values not ending with the given string."""
  rawName_not_ends_with: String
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  thumbnailUrl: String

  """All values that are not equal to given value."""
  thumbnailUrl_not: String

  """All values that are contained in given list."""
  thumbnailUrl_in: [String!]

  """All values that are not contained in given list."""
  thumbnailUrl_not_in: [String!]

  """All values less than the given value."""
  thumbnailUrl_lt: String

  """All values less than or equal the given value."""
  thumbnailUrl_lte: String

  """All values greater than the given value."""
  thumbnailUrl_gt: String

  """All values greater than or equal the given value."""
  thumbnailUrl_gte: String

  """All values containing the given string."""
  thumbnailUrl_contains: String

  """All values not containing the given string."""
  thumbnailUrl_not_contains: String

  """All values starting with the given string."""
  thumbnailUrl_starts_with: String

  """All values not starting with the given string."""
  thumbnailUrl_not_starts_with: String

  """All values ending with the given string."""
  thumbnailUrl_ends_with: String

  """All values not ending with the given string."""
  thumbnailUrl_not_ends_with: String
  bannerUrl: String

  """All values that are not equal to given value."""
  bannerUrl_not: String

  """All values that are contained in given list."""
  bannerUrl_in: [String!]

  """All values that are not contained in given list."""
  bannerUrl_not_in: [String!]

  """All values less than the given value."""
  bannerUrl_lt: String

  """All values less than or equal the given value."""
  bannerUrl_lte: String

  """All values greater than the given value."""
  bannerUrl_gt: String

  """All values greater than or equal the given value."""
  bannerUrl_gte: String

  """All values containing the given string."""
  bannerUrl_contains: String

  """All values not containing the given string."""
  bannerUrl_not_contains: String

  """All values starting with the given string."""
  bannerUrl_starts_with: String

  """All values not starting with the given string."""
  bannerUrl_not_starts_with: String

  """All values ending with the given string."""
  bannerUrl_ends_with: String

  """All values not ending with the given string."""
  bannerUrl_not_ends_with: String
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  characters_every: CharacterWhereInput
  characters_some: CharacterWhereInput
  characters_none: CharacterWhereInput
  episodes_every: EpisodeWhereInput
  episodes_some: EpisodeWhereInput
  episodes_none: EpisodeWhereInput
  dialogues_every: DialogueWhereInput
  dialogues_some: DialogueWhereInput
  dialogues_none: DialogueWhereInput
  seasons_every: SeasonWhereInput
  seasons_some: SeasonWhereInput
  seasons_none: SeasonWhereInput
  files_every: FileWhereInput
  files_some: FileWhereInput
  files_none: FileWhereInput
}

input AnimeWhereUniqueInput {
  id: ID
  rawName: String
}

type APIKey {
  user(where: UserWhereInput): User!
  token: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type APIKeyConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [APIKeyEdge]!
  aggregate: AggregateAPIKey!
}

input APIKeyCreateInput {
  token: String!
  user: UserCreateOneInput!
}

"""An edge in a connection."""
type APIKeyEdge {
  """The item at the end of the edge."""
  node: APIKey!

  """A cursor for use in pagination."""
  cursor: String!
}

enum APIKeyOrderByInput {
  token_ASC
  token_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  id_ASC
  id_DESC
}

type APIKeyPreviousValues {
  token: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type APIKeySubscriptionPayload {
  mutation: MutationType!
  node: APIKey
  updatedFields: [String!]
  previousValues: APIKeyPreviousValues
}

input APIKeySubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [APIKeySubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [APIKeySubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [APIKeySubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: APIKeyWhereInput
}

input APIKeyUpdateInput {
  token: String
  user: UserUpdateOneRequiredInput
}

input APIKeyWhereInput {
  """Logical AND on all given filters."""
  AND: [APIKeyWhereInput!]

  """Logical OR on all given filters."""
  OR: [APIKeyWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [APIKeyWhereInput!]
  token: String

  """All values that are not equal to given value."""
  token_not: String

  """All values that are contained in given list."""
  token_in: [String!]

  """All values that are not contained in given list."""
  token_not_in: [String!]

  """All values less than the given value."""
  token_lt: String

  """All values less than or equal the given value."""
  token_lte: String

  """All values greater than the given value."""
  token_gt: String

  """All values greater than or equal the given value."""
  token_gte: String

  """All values containing the given string."""
  token_contains: String

  """All values not containing the given string."""
  token_not_contains: String

  """All values starting with the given string."""
  token_starts_with: String

  """All values not starting with the given string."""
  token_not_starts_with: String

  """All values ending with the given string."""
  token_ends_with: String

  """All values not ending with the given string."""
  token_not_ends_with: String
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  user: UserWhereInput
}

type Archive implements Node {
  id: ID!
  linkUrl: String
  fileName: String!
  files(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [File!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type ArchiveConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ArchiveEdge]!
  aggregate: AggregateArchive!
}

input ArchiveCreateInput {
  linkUrl: String
  fileName: String!
  files: FileCreateManyWithoutArchiveInput
}

input ArchiveCreateOneInput {
  create: ArchiveCreateInput
  connect: ArchiveWhereUniqueInput
}

input ArchiveCreateOneWithoutFilesInput {
  create: ArchiveCreateWithoutFilesInput
  connect: ArchiveWhereUniqueInput
}

input ArchiveCreateWithoutFilesInput {
  linkUrl: String
  fileName: String!
}

"""An edge in a connection."""
type ArchiveEdge {
  """The item at the end of the edge."""
  node: Archive!

  """A cursor for use in pagination."""
  cursor: String!
}

enum ArchiveOrderByInput {
  id_ASC
  id_DESC
  linkUrl_ASC
  linkUrl_DESC
  fileName_ASC
  fileName_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ArchivePreviousValues {
  id: ID!
  linkUrl: String
  fileName: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ArchiveSubscriptionPayload {
  mutation: MutationType!
  node: Archive
  updatedFields: [String!]
  previousValues: ArchivePreviousValues
}

input ArchiveSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ArchiveSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ArchiveSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ArchiveSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ArchiveWhereInput
}

input ArchiveUpdateDataInput {
  linkUrl: String
  fileName: String
  files: FileUpdateManyWithoutArchiveInput
}

input ArchiveUpdateInput {
  linkUrl: String
  fileName: String
  files: FileUpdateManyWithoutArchiveInput
}

input ArchiveUpdateOneInput {
  create: ArchiveCreateInput
  connect: ArchiveWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: ArchiveUpdateDataInput
  upsert: ArchiveUpsertNestedInput
}

input ArchiveUpdateOneWithoutFilesInput {
  create: ArchiveCreateWithoutFilesInput
  connect: ArchiveWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: ArchiveUpdateWithoutFilesDataInput
  upsert: ArchiveUpsertWithoutFilesInput
}

input ArchiveUpdateWithoutFilesDataInput {
  linkUrl: String
  fileName: String
}

input ArchiveUpsertNestedInput {
  update: ArchiveUpdateDataInput!
  create: ArchiveCreateInput!
}

input ArchiveUpsertWithoutFilesInput {
  update: ArchiveUpdateWithoutFilesDataInput!
  create: ArchiveCreateWithoutFilesInput!
}

input ArchiveWhereInput {
  """Logical AND on all given filters."""
  AND: [ArchiveWhereInput!]

  """Logical OR on all given filters."""
  OR: [ArchiveWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ArchiveWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  linkUrl: String

  """All values that are not equal to given value."""
  linkUrl_not: String

  """All values that are contained in given list."""
  linkUrl_in: [String!]

  """All values that are not contained in given list."""
  linkUrl_not_in: [String!]

  """All values less than the given value."""
  linkUrl_lt: String

  """All values less than or equal the given value."""
  linkUrl_lte: String

  """All values greater than the given value."""
  linkUrl_gt: String

  """All values greater than or equal the given value."""
  linkUrl_gte: String

  """All values containing the given string."""
  linkUrl_contains: String

  """All values not containing the given string."""
  linkUrl_not_contains: String

  """All values starting with the given string."""
  linkUrl_starts_with: String

  """All values not starting with the given string."""
  linkUrl_not_starts_with: String

  """All values ending with the given string."""
  linkUrl_ends_with: String

  """All values not ending with the given string."""
  linkUrl_not_ends_with: String
  fileName: String

  """All values that are not equal to given value."""
  fileName_not: String

  """All values that are contained in given list."""
  fileName_in: [String!]

  """All values that are not contained in given list."""
  fileName_not_in: [String!]

  """All values less than the given value."""
  fileName_lt: String

  """All values less than or equal the given value."""
  fileName_lte: String

  """All values greater than the given value."""
  fileName_gt: String

  """All values greater than or equal the given value."""
  fileName_gte: String

  """All values containing the given string."""
  fileName_contains: String

  """All values not containing the given string."""
  fileName_not_contains: String

  """All values starting with the given string."""
  fileName_starts_with: String

  """All values not starting with the given string."""
  fileName_not_starts_with: String

  """All values ending with the given string."""
  fileName_ends_with: String

  """All values not ending with the given string."""
  fileName_not_ends_with: String
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  files_every: FileWhereInput
  files_some: FileWhereInput
  files_none: FileWhereInput
}

input ArchiveWhereUniqueInput {
  id: ID
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type Character implements Node {
  id: ID!
  anilistId: Int
  rawName: String!
  name: String
  certainty: Int
  thumbnailUrl: String
  animes(where: AnimeWhereInput, orderBy: AnimeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Anime!]
  episodes(where: EpisodeWhereInput, orderBy: EpisodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Episode!]
  seasons(where: SeasonWhereInput, orderBy: SeasonOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Season!]
  dialogues(where: DialogueWhereInput, orderBy: DialogueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Dialogue!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type CharacterConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [CharacterEdge]!
  aggregate: AggregateCharacter!
}

input CharacterCreateInput {
  anilistId: Int
  rawName: String!
  name: String
  certainty: Int
  thumbnailUrl: String
  animes: AnimeCreateManyWithoutCharactersInput
  episodes: EpisodeCreateManyWithoutCharactersInput
  seasons: SeasonCreateManyInput
  dialogues: DialogueCreateManyWithoutCharacterInput
}

input CharacterCreateManyWithoutAnimesInput {
  create: [CharacterCreateWithoutAnimesInput!]
  connect: [CharacterWhereUniqueInput!]
}

input CharacterCreateManyWithoutEpisodesInput {
  create: [CharacterCreateWithoutEpisodesInput!]
  connect: [CharacterWhereUniqueInput!]
}

input CharacterCreateOneWithoutDialoguesInput {
  create: CharacterCreateWithoutDialoguesInput
  connect: CharacterWhereUniqueInput
}

input CharacterCreateWithoutAnimesInput {
  anilistId: Int
  rawName: String!
  name: String
  certainty: Int
  thumbnailUrl: String
  episodes: EpisodeCreateManyWithoutCharactersInput
  seasons: SeasonCreateManyInput
  dialogues: DialogueCreateManyWithoutCharacterInput
}

input CharacterCreateWithoutDialoguesInput {
  anilistId: Int
  rawName: String!
  name: String
  certainty: Int
  thumbnailUrl: String
  animes: AnimeCreateManyWithoutCharactersInput
  episodes: EpisodeCreateManyWithoutCharactersInput
  seasons: SeasonCreateManyInput
}

input CharacterCreateWithoutEpisodesInput {
  anilistId: Int
  rawName: String!
  name: String
  certainty: Int
  thumbnailUrl: String
  animes: AnimeCreateManyWithoutCharactersInput
  seasons: SeasonCreateManyInput
  dialogues: DialogueCreateManyWithoutCharacterInput
}

"""An edge in a connection."""
type CharacterEdge {
  """The item at the end of the edge."""
  node: Character!

  """A cursor for use in pagination."""
  cursor: String!
}

enum CharacterOrderByInput {
  id_ASC
  id_DESC
  anilistId_ASC
  anilistId_DESC
  rawName_ASC
  rawName_DESC
  name_ASC
  name_DESC
  certainty_ASC
  certainty_DESC
  thumbnailUrl_ASC
  thumbnailUrl_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CharacterPreviousValues {
  id: ID!
  anilistId: Int
  rawName: String!
  name: String
  certainty: Int
  thumbnailUrl: String
  createdAt: DateTime!
  updatedAt: DateTime!
}

type CharacterSubscriptionPayload {
  mutation: MutationType!
  node: Character
  updatedFields: [String!]
  previousValues: CharacterPreviousValues
}

input CharacterSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [CharacterSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [CharacterSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CharacterSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: CharacterWhereInput
}

input CharacterUpdateInput {
  anilistId: Int
  rawName: String
  name: String
  certainty: Int
  thumbnailUrl: String
  animes: AnimeUpdateManyWithoutCharactersInput
  episodes: EpisodeUpdateManyWithoutCharactersInput
  seasons: SeasonUpdateManyInput
  dialogues: DialogueUpdateManyWithoutCharacterInput
}

input CharacterUpdateManyWithoutAnimesInput {
  create: [CharacterCreateWithoutAnimesInput!]
  connect: [CharacterWhereUniqueInput!]
  disconnect: [CharacterWhereUniqueInput!]
  delete: [CharacterWhereUniqueInput!]
  update: [CharacterUpdateWithWhereUniqueWithoutAnimesInput!]
  upsert: [CharacterUpsertWithWhereUniqueWithoutAnimesInput!]
}

input CharacterUpdateManyWithoutEpisodesInput {
  create: [CharacterCreateWithoutEpisodesInput!]
  connect: [CharacterWhereUniqueInput!]
  disconnect: [CharacterWhereUniqueInput!]
  delete: [CharacterWhereUniqueInput!]
  update: [CharacterUpdateWithWhereUniqueWithoutEpisodesInput!]
  upsert: [CharacterUpsertWithWhereUniqueWithoutEpisodesInput!]
}

input CharacterUpdateOneRequiredWithoutDialoguesInput {
  create: CharacterCreateWithoutDialoguesInput
  connect: CharacterWhereUniqueInput
  update: CharacterUpdateWithoutDialoguesDataInput
  upsert: CharacterUpsertWithoutDialoguesInput
}

input CharacterUpdateWithoutAnimesDataInput {
  anilistId: Int
  rawName: String
  name: String
  certainty: Int
  thumbnailUrl: String
  episodes: EpisodeUpdateManyWithoutCharactersInput
  seasons: SeasonUpdateManyInput
  dialogues: DialogueUpdateManyWithoutCharacterInput
}

input CharacterUpdateWithoutDialoguesDataInput {
  anilistId: Int
  rawName: String
  name: String
  certainty: Int
  thumbnailUrl: String
  animes: AnimeUpdateManyWithoutCharactersInput
  episodes: EpisodeUpdateManyWithoutCharactersInput
  seasons: SeasonUpdateManyInput
}

input CharacterUpdateWithoutEpisodesDataInput {
  anilistId: Int
  rawName: String
  name: String
  certainty: Int
  thumbnailUrl: String
  animes: AnimeUpdateManyWithoutCharactersInput
  seasons: SeasonUpdateManyInput
  dialogues: DialogueUpdateManyWithoutCharacterInput
}

input CharacterUpdateWithWhereUniqueWithoutAnimesInput {
  where: CharacterWhereUniqueInput!
  data: CharacterUpdateWithoutAnimesDataInput!
}

input CharacterUpdateWithWhereUniqueWithoutEpisodesInput {
  where: CharacterWhereUniqueInput!
  data: CharacterUpdateWithoutEpisodesDataInput!
}

input CharacterUpsertWithoutDialoguesInput {
  update: CharacterUpdateWithoutDialoguesDataInput!
  create: CharacterCreateWithoutDialoguesInput!
}

input CharacterUpsertWithWhereUniqueWithoutAnimesInput {
  where: CharacterWhereUniqueInput!
  update: CharacterUpdateWithoutAnimesDataInput!
  create: CharacterCreateWithoutAnimesInput!
}

input CharacterUpsertWithWhereUniqueWithoutEpisodesInput {
  where: CharacterWhereUniqueInput!
  update: CharacterUpdateWithoutEpisodesDataInput!
  create: CharacterCreateWithoutEpisodesInput!
}

input CharacterWhereInput {
  """Logical AND on all given filters."""
  AND: [CharacterWhereInput!]

  """Logical OR on all given filters."""
  OR: [CharacterWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [CharacterWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  anilistId: Int

  """All values that are not equal to given value."""
  anilistId_not: Int

  """All values that are contained in given list."""
  anilistId_in: [Int!]

  """All values that are not contained in given list."""
  anilistId_not_in: [Int!]

  """All values less than the given value."""
  anilistId_lt: Int

  """All values less than or equal the given value."""
  anilistId_lte: Int

  """All values greater than the given value."""
  anilistId_gt: Int

  """All values greater than or equal the given value."""
  anilistId_gte: Int
  rawName: String

  """All values that are not equal to given value."""
  rawName_not: String

  """All values that are contained in given list."""
  rawName_in: [String!]

  """All values that are not contained in given list."""
  rawName_not_in: [String!]

  """All values less than the given value."""
  rawName_lt: String

  """All values less than or equal the given value."""
  rawName_lte: String

  """All values greater than the given value."""
  rawName_gt: String

  """All values greater than or equal the given value."""
  rawName_gte: String

  """All values containing the given string."""
  rawName_contains: String

  """All values not containing the given string."""
  rawName_not_contains: String

  """All values starting with the given string."""
  rawName_starts_with: String

  """All values not starting with the given string."""
  rawName_not_starts_with: String

  """All values ending with the given string."""
  rawName_ends_with: String

  """All values not ending with the given string."""
  rawName_not_ends_with: String
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  certainty: Int

  """All values that are not equal to given value."""
  certainty_not: Int

  """All values that are contained in given list."""
  certainty_in: [Int!]

  """All values that are not contained in given list."""
  certainty_not_in: [Int!]

  """All values less than the given value."""
  certainty_lt: Int

  """All values less than or equal the given value."""
  certainty_lte: Int

  """All values greater than the given value."""
  certainty_gt: Int

  """All values greater than or equal the given value."""
  certainty_gte: Int
  thumbnailUrl: String

  """All values that are not equal to given value."""
  thumbnailUrl_not: String

  """All values that are contained in given list."""
  thumbnailUrl_in: [String!]

  """All values that are not contained in given list."""
  thumbnailUrl_not_in: [String!]

  """All values less than the given value."""
  thumbnailUrl_lt: String

  """All values less than or equal the given value."""
  thumbnailUrl_lte: String

  """All values greater than the given value."""
  thumbnailUrl_gt: String

  """All values greater than or equal the given value."""
  thumbnailUrl_gte: String

  """All values containing the given string."""
  thumbnailUrl_contains: String

  """All values not containing the given string."""
  thumbnailUrl_not_contains: String

  """All values starting with the given string."""
  thumbnailUrl_starts_with: String

  """All values not starting with the given string."""
  thumbnailUrl_not_starts_with: String

  """All values ending with the given string."""
  thumbnailUrl_ends_with: String

  """All values not ending with the given string."""
  thumbnailUrl_not_ends_with: String
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  animes_every: AnimeWhereInput
  animes_some: AnimeWhereInput
  animes_none: AnimeWhereInput
  episodes_every: EpisodeWhereInput
  episodes_some: EpisodeWhereInput
  episodes_none: EpisodeWhereInput
  seasons_every: SeasonWhereInput
  seasons_some: SeasonWhereInput
  seasons_none: SeasonWhereInput
  dialogues_every: DialogueWhereInput
  dialogues_some: DialogueWhereInput
  dialogues_none: DialogueWhereInput
}

input CharacterWhereUniqueInput {
  id: ID
  anilistId: Int
}

scalar DateTime

type Dialogue implements Node {
  id: ID!
  order: Int!
  character(where: CharacterWhereInput): Character!
  episode(where: EpisodeWhereInput): Episode!
  season(where: SeasonWhereInput): Season
  anime(where: AnimeWhereInput): Anime!
  start: Int!
  end: Int!
  text: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type DialogueConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [DialogueEdge]!
  aggregate: AggregateDialogue!
}

input DialogueCreateInput {
  order: Int!
  start: Int!
  end: Int!
  text: String!
  character: CharacterCreateOneWithoutDialoguesInput!
  episode: EpisodeCreateOneWithoutDialoguesInput!
  season: SeasonCreateOneWithoutDialoguesInput
  anime: AnimeCreateOneWithoutDialoguesInput!
}

input DialogueCreateManyWithoutAnimeInput {
  create: [DialogueCreateWithoutAnimeInput!]
  connect: [DialogueWhereUniqueInput!]
}

input DialogueCreateManyWithoutCharacterInput {
  create: [DialogueCreateWithoutCharacterInput!]
  connect: [DialogueWhereUniqueInput!]
}

input DialogueCreateManyWithoutEpisodeInput {
  create: [DialogueCreateWithoutEpisodeInput!]
  connect: [DialogueWhereUniqueInput!]
}

input DialogueCreateManyWithoutSeasonInput {
  create: [DialogueCreateWithoutSeasonInput!]
  connect: [DialogueWhereUniqueInput!]
}

input DialogueCreateWithoutAnimeInput {
  order: Int!
  start: Int!
  end: Int!
  text: String!
  character: CharacterCreateOneWithoutDialoguesInput!
  episode: EpisodeCreateOneWithoutDialoguesInput!
  season: SeasonCreateOneWithoutDialoguesInput
}

input DialogueCreateWithoutCharacterInput {
  order: Int!
  start: Int!
  end: Int!
  text: String!
  episode: EpisodeCreateOneWithoutDialoguesInput!
  season: SeasonCreateOneWithoutDialoguesInput
  anime: AnimeCreateOneWithoutDialoguesInput!
}

input DialogueCreateWithoutEpisodeInput {
  order: Int!
  start: Int!
  end: Int!
  text: String!
  character: CharacterCreateOneWithoutDialoguesInput!
  season: SeasonCreateOneWithoutDialoguesInput
  anime: AnimeCreateOneWithoutDialoguesInput!
}

input DialogueCreateWithoutSeasonInput {
  order: Int!
  start: Int!
  end: Int!
  text: String!
  character: CharacterCreateOneWithoutDialoguesInput!
  episode: EpisodeCreateOneWithoutDialoguesInput!
  anime: AnimeCreateOneWithoutDialoguesInput!
}

"""An edge in a connection."""
type DialogueEdge {
  """The item at the end of the edge."""
  node: Dialogue!

  """A cursor for use in pagination."""
  cursor: String!
}

enum DialogueOrderByInput {
  id_ASC
  id_DESC
  order_ASC
  order_DESC
  start_ASC
  start_DESC
  end_ASC
  end_DESC
  text_ASC
  text_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type DialoguePreviousValues {
  id: ID!
  order: Int!
  start: Int!
  end: Int!
  text: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type DialogueSubscriptionPayload {
  mutation: MutationType!
  node: Dialogue
  updatedFields: [String!]
  previousValues: DialoguePreviousValues
}

input DialogueSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [DialogueSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [DialogueSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DialogueSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: DialogueWhereInput
}

input DialogueUpdateInput {
  order: Int
  start: Int
  end: Int
  text: String
  character: CharacterUpdateOneRequiredWithoutDialoguesInput
  episode: EpisodeUpdateOneRequiredWithoutDialoguesInput
  season: SeasonUpdateOneWithoutDialoguesInput
  anime: AnimeUpdateOneRequiredWithoutDialoguesInput
}

input DialogueUpdateManyWithoutAnimeInput {
  create: [DialogueCreateWithoutAnimeInput!]
  connect: [DialogueWhereUniqueInput!]
  disconnect: [DialogueWhereUniqueInput!]
  delete: [DialogueWhereUniqueInput!]
  update: [DialogueUpdateWithWhereUniqueWithoutAnimeInput!]
  upsert: [DialogueUpsertWithWhereUniqueWithoutAnimeInput!]
}

input DialogueUpdateManyWithoutCharacterInput {
  create: [DialogueCreateWithoutCharacterInput!]
  connect: [DialogueWhereUniqueInput!]
  disconnect: [DialogueWhereUniqueInput!]
  delete: [DialogueWhereUniqueInput!]
  update: [DialogueUpdateWithWhereUniqueWithoutCharacterInput!]
  upsert: [DialogueUpsertWithWhereUniqueWithoutCharacterInput!]
}

input DialogueUpdateManyWithoutEpisodeInput {
  create: [DialogueCreateWithoutEpisodeInput!]
  connect: [DialogueWhereUniqueInput!]
  disconnect: [DialogueWhereUniqueInput!]
  delete: [DialogueWhereUniqueInput!]
  update: [DialogueUpdateWithWhereUniqueWithoutEpisodeInput!]
  upsert: [DialogueUpsertWithWhereUniqueWithoutEpisodeInput!]
}

input DialogueUpdateManyWithoutSeasonInput {
  create: [DialogueCreateWithoutSeasonInput!]
  connect: [DialogueWhereUniqueInput!]
  disconnect: [DialogueWhereUniqueInput!]
  delete: [DialogueWhereUniqueInput!]
  update: [DialogueUpdateWithWhereUniqueWithoutSeasonInput!]
  upsert: [DialogueUpsertWithWhereUniqueWithoutSeasonInput!]
}

input DialogueUpdateWithoutAnimeDataInput {
  order: Int
  start: Int
  end: Int
  text: String
  character: CharacterUpdateOneRequiredWithoutDialoguesInput
  episode: EpisodeUpdateOneRequiredWithoutDialoguesInput
  season: SeasonUpdateOneWithoutDialoguesInput
}

input DialogueUpdateWithoutCharacterDataInput {
  order: Int
  start: Int
  end: Int
  text: String
  episode: EpisodeUpdateOneRequiredWithoutDialoguesInput
  season: SeasonUpdateOneWithoutDialoguesInput
  anime: AnimeUpdateOneRequiredWithoutDialoguesInput
}

input DialogueUpdateWithoutEpisodeDataInput {
  order: Int
  start: Int
  end: Int
  text: String
  character: CharacterUpdateOneRequiredWithoutDialoguesInput
  season: SeasonUpdateOneWithoutDialoguesInput
  anime: AnimeUpdateOneRequiredWithoutDialoguesInput
}

input DialogueUpdateWithoutSeasonDataInput {
  order: Int
  start: Int
  end: Int
  text: String
  character: CharacterUpdateOneRequiredWithoutDialoguesInput
  episode: EpisodeUpdateOneRequiredWithoutDialoguesInput
  anime: AnimeUpdateOneRequiredWithoutDialoguesInput
}

input DialogueUpdateWithWhereUniqueWithoutAnimeInput {
  where: DialogueWhereUniqueInput!
  data: DialogueUpdateWithoutAnimeDataInput!
}

input DialogueUpdateWithWhereUniqueWithoutCharacterInput {
  where: DialogueWhereUniqueInput!
  data: DialogueUpdateWithoutCharacterDataInput!
}

input DialogueUpdateWithWhereUniqueWithoutEpisodeInput {
  where: DialogueWhereUniqueInput!
  data: DialogueUpdateWithoutEpisodeDataInput!
}

input DialogueUpdateWithWhereUniqueWithoutSeasonInput {
  where: DialogueWhereUniqueInput!
  data: DialogueUpdateWithoutSeasonDataInput!
}

input DialogueUpsertWithWhereUniqueWithoutAnimeInput {
  where: DialogueWhereUniqueInput!
  update: DialogueUpdateWithoutAnimeDataInput!
  create: DialogueCreateWithoutAnimeInput!
}

input DialogueUpsertWithWhereUniqueWithoutCharacterInput {
  where: DialogueWhereUniqueInput!
  update: DialogueUpdateWithoutCharacterDataInput!
  create: DialogueCreateWithoutCharacterInput!
}

input DialogueUpsertWithWhereUniqueWithoutEpisodeInput {
  where: DialogueWhereUniqueInput!
  update: DialogueUpdateWithoutEpisodeDataInput!
  create: DialogueCreateWithoutEpisodeInput!
}

input DialogueUpsertWithWhereUniqueWithoutSeasonInput {
  where: DialogueWhereUniqueInput!
  update: DialogueUpdateWithoutSeasonDataInput!
  create: DialogueCreateWithoutSeasonInput!
}

input DialogueWhereInput {
  """Logical AND on all given filters."""
  AND: [DialogueWhereInput!]

  """Logical OR on all given filters."""
  OR: [DialogueWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DialogueWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  order: Int

  """All values that are not equal to given value."""
  order_not: Int

  """All values that are contained in given list."""
  order_in: [Int!]

  """All values that are not contained in given list."""
  order_not_in: [Int!]

  """All values less than the given value."""
  order_lt: Int

  """All values less than or equal the given value."""
  order_lte: Int

  """All values greater than the given value."""
  order_gt: Int

  """All values greater than or equal the given value."""
  order_gte: Int
  start: Int

  """All values that are not equal to given value."""
  start_not: Int

  """All values that are contained in given list."""
  start_in: [Int!]

  """All values that are not contained in given list."""
  start_not_in: [Int!]

  """All values less than the given value."""
  start_lt: Int

  """All values less than or equal the given value."""
  start_lte: Int

  """All values greater than the given value."""
  start_gt: Int

  """All values greater than or equal the given value."""
  start_gte: Int
  end: Int

  """All values that are not equal to given value."""
  end_not: Int

  """All values that are contained in given list."""
  end_in: [Int!]

  """All values that are not contained in given list."""
  end_not_in: [Int!]

  """All values less than the given value."""
  end_lt: Int

  """All values less than or equal the given value."""
  end_lte: Int

  """All values greater than the given value."""
  end_gt: Int

  """All values greater than or equal the given value."""
  end_gte: Int
  text: String

  """All values that are not equal to given value."""
  text_not: String

  """All values that are contained in given list."""
  text_in: [String!]

  """All values that are not contained in given list."""
  text_not_in: [String!]

  """All values less than the given value."""
  text_lt: String

  """All values less than or equal the given value."""
  text_lte: String

  """All values greater than the given value."""
  text_gt: String

  """All values greater than or equal the given value."""
  text_gte: String

  """All values containing the given string."""
  text_contains: String

  """All values not containing the given string."""
  text_not_contains: String

  """All values starting with the given string."""
  text_starts_with: String

  """All values not starting with the given string."""
  text_not_starts_with: String

  """All values ending with the given string."""
  text_ends_with: String

  """All values not ending with the given string."""
  text_not_ends_with: String
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  character: CharacterWhereInput
  episode: EpisodeWhereInput
  season: SeasonWhereInput
  anime: AnimeWhereInput
}

input DialogueWhereUniqueInput {
  id: ID
}

type Episode implements Node {
  id: ID!
  anime(where: AnimeWhereInput): Anime!
  season(where: SeasonWhereInput): Season
  file(where: FileWhereInput): File!
  displayName: String
  episodeNumber: String
  length: Int!
  subGroup: String!
  language: String!
  characters(where: CharacterWhereInput, orderBy: CharacterOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Character!]
  dialogues(where: DialogueWhereInput, orderBy: DialogueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Dialogue!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type EpisodeConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [EpisodeEdge]!
  aggregate: AggregateEpisode!
}

input EpisodeCreateInput {
  displayName: String
  episodeNumber: String
  length: Int!
  subGroup: String
  language: String
  anime: AnimeCreateOneWithoutEpisodesInput!
  season: SeasonCreateOneInput
  file: FileCreateOneWithoutEpisodeInput!
  characters: CharacterCreateManyWithoutEpisodesInput
  dialogues: DialogueCreateManyWithoutEpisodeInput
}

input EpisodeCreateManyWithoutAnimeInput {
  create: [EpisodeCreateWithoutAnimeInput!]
  connect: [EpisodeWhereUniqueInput!]
}

input EpisodeCreateManyWithoutCharactersInput {
  create: [EpisodeCreateWithoutCharactersInput!]
  connect: [EpisodeWhereUniqueInput!]
}

input EpisodeCreateOneWithoutDialoguesInput {
  create: EpisodeCreateWithoutDialoguesInput
  connect: EpisodeWhereUniqueInput
}

input EpisodeCreateOneWithoutFileInput {
  create: EpisodeCreateWithoutFileInput
  connect: EpisodeWhereUniqueInput
}

input EpisodeCreateWithoutAnimeInput {
  displayName: String
  episodeNumber: String
  length: Int!
  subGroup: String
  language: String
  season: SeasonCreateOneInput
  file: FileCreateOneWithoutEpisodeInput!
  characters: CharacterCreateManyWithoutEpisodesInput
  dialogues: DialogueCreateManyWithoutEpisodeInput
}

input EpisodeCreateWithoutCharactersInput {
  displayName: String
  episodeNumber: String
  length: Int!
  subGroup: String
  language: String
  anime: AnimeCreateOneWithoutEpisodesInput!
  season: SeasonCreateOneInput
  file: FileCreateOneWithoutEpisodeInput!
  dialogues: DialogueCreateManyWithoutEpisodeInput
}

input EpisodeCreateWithoutDialoguesInput {
  displayName: String
  episodeNumber: String
  length: Int!
  subGroup: String
  language: String
  anime: AnimeCreateOneWithoutEpisodesInput!
  season: SeasonCreateOneInput
  file: FileCreateOneWithoutEpisodeInput!
  characters: CharacterCreateManyWithoutEpisodesInput
}

input EpisodeCreateWithoutFileInput {
  displayName: String
  episodeNumber: String
  length: Int!
  subGroup: String
  language: String
  anime: AnimeCreateOneWithoutEpisodesInput!
  season: SeasonCreateOneInput
  characters: CharacterCreateManyWithoutEpisodesInput
  dialogues: DialogueCreateManyWithoutEpisodeInput
}

"""An edge in a connection."""
type EpisodeEdge {
  """The item at the end of the edge."""
  node: Episode!

  """A cursor for use in pagination."""
  cursor: String!
}

enum EpisodeOrderByInput {
  id_ASC
  id_DESC
  displayName_ASC
  displayName_DESC
  episodeNumber_ASC
  episodeNumber_DESC
  length_ASC
  length_DESC
  subGroup_ASC
  subGroup_DESC
  language_ASC
  language_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type EpisodePreviousValues {
  id: ID!
  displayName: String
  episodeNumber: String
  length: Int!
  subGroup: String!
  language: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type EpisodeSubscriptionPayload {
  mutation: MutationType!
  node: Episode
  updatedFields: [String!]
  previousValues: EpisodePreviousValues
}

input EpisodeSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [EpisodeSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [EpisodeSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [EpisodeSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: EpisodeWhereInput
}

input EpisodeUpdateInput {
  displayName: String
  episodeNumber: String
  length: Int
  subGroup: String
  language: String
  anime: AnimeUpdateOneRequiredWithoutEpisodesInput
  season: SeasonUpdateOneInput
  file: FileUpdateOneRequiredWithoutEpisodeInput
  characters: CharacterUpdateManyWithoutEpisodesInput
  dialogues: DialogueUpdateManyWithoutEpisodeInput
}

input EpisodeUpdateManyWithoutAnimeInput {
  create: [EpisodeCreateWithoutAnimeInput!]
  connect: [EpisodeWhereUniqueInput!]
  disconnect: [EpisodeWhereUniqueInput!]
  delete: [EpisodeWhereUniqueInput!]
  update: [EpisodeUpdateWithWhereUniqueWithoutAnimeInput!]
  upsert: [EpisodeUpsertWithWhereUniqueWithoutAnimeInput!]
}

input EpisodeUpdateManyWithoutCharactersInput {
  create: [EpisodeCreateWithoutCharactersInput!]
  connect: [EpisodeWhereUniqueInput!]
  disconnect: [EpisodeWhereUniqueInput!]
  delete: [EpisodeWhereUniqueInput!]
  update: [EpisodeUpdateWithWhereUniqueWithoutCharactersInput!]
  upsert: [EpisodeUpsertWithWhereUniqueWithoutCharactersInput!]
}

input EpisodeUpdateOneRequiredWithoutDialoguesInput {
  create: EpisodeCreateWithoutDialoguesInput
  connect: EpisodeWhereUniqueInput
  update: EpisodeUpdateWithoutDialoguesDataInput
  upsert: EpisodeUpsertWithoutDialoguesInput
}

input EpisodeUpdateOneRequiredWithoutFileInput {
  create: EpisodeCreateWithoutFileInput
  connect: EpisodeWhereUniqueInput
  update: EpisodeUpdateWithoutFileDataInput
  upsert: EpisodeUpsertWithoutFileInput
}

input EpisodeUpdateWithoutAnimeDataInput {
  displayName: String
  episodeNumber: String
  length: Int
  subGroup: String
  language: String
  season: SeasonUpdateOneInput
  file: FileUpdateOneRequiredWithoutEpisodeInput
  characters: CharacterUpdateManyWithoutEpisodesInput
  dialogues: DialogueUpdateManyWithoutEpisodeInput
}

input EpisodeUpdateWithoutCharactersDataInput {
  displayName: String
  episodeNumber: String
  length: Int
  subGroup: String
  language: String
  anime: AnimeUpdateOneRequiredWithoutEpisodesInput
  season: SeasonUpdateOneInput
  file: FileUpdateOneRequiredWithoutEpisodeInput
  dialogues: DialogueUpdateManyWithoutEpisodeInput
}

input EpisodeUpdateWithoutDialoguesDataInput {
  displayName: String
  episodeNumber: String
  length: Int
  subGroup: String
  language: String
  anime: AnimeUpdateOneRequiredWithoutEpisodesInput
  season: SeasonUpdateOneInput
  file: FileUpdateOneRequiredWithoutEpisodeInput
  characters: CharacterUpdateManyWithoutEpisodesInput
}

input EpisodeUpdateWithoutFileDataInput {
  displayName: String
  episodeNumber: String
  length: Int
  subGroup: String
  language: String
  anime: AnimeUpdateOneRequiredWithoutEpisodesInput
  season: SeasonUpdateOneInput
  characters: CharacterUpdateManyWithoutEpisodesInput
  dialogues: DialogueUpdateManyWithoutEpisodeInput
}

input EpisodeUpdateWithWhereUniqueWithoutAnimeInput {
  where: EpisodeWhereUniqueInput!
  data: EpisodeUpdateWithoutAnimeDataInput!
}

input EpisodeUpdateWithWhereUniqueWithoutCharactersInput {
  where: EpisodeWhereUniqueInput!
  data: EpisodeUpdateWithoutCharactersDataInput!
}

input EpisodeUpsertWithoutDialoguesInput {
  update: EpisodeUpdateWithoutDialoguesDataInput!
  create: EpisodeCreateWithoutDialoguesInput!
}

input EpisodeUpsertWithoutFileInput {
  update: EpisodeUpdateWithoutFileDataInput!
  create: EpisodeCreateWithoutFileInput!
}

input EpisodeUpsertWithWhereUniqueWithoutAnimeInput {
  where: EpisodeWhereUniqueInput!
  update: EpisodeUpdateWithoutAnimeDataInput!
  create: EpisodeCreateWithoutAnimeInput!
}

input EpisodeUpsertWithWhereUniqueWithoutCharactersInput {
  where: EpisodeWhereUniqueInput!
  update: EpisodeUpdateWithoutCharactersDataInput!
  create: EpisodeCreateWithoutCharactersInput!
}

input EpisodeWhereInput {
  """Logical AND on all given filters."""
  AND: [EpisodeWhereInput!]

  """Logical OR on all given filters."""
  OR: [EpisodeWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [EpisodeWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  displayName: String

  """All values that are not equal to given value."""
  displayName_not: String

  """All values that are contained in given list."""
  displayName_in: [String!]

  """All values that are not contained in given list."""
  displayName_not_in: [String!]

  """All values less than the given value."""
  displayName_lt: String

  """All values less than or equal the given value."""
  displayName_lte: String

  """All values greater than the given value."""
  displayName_gt: String

  """All values greater than or equal the given value."""
  displayName_gte: String

  """All values containing the given string."""
  displayName_contains: String

  """All values not containing the given string."""
  displayName_not_contains: String

  """All values starting with the given string."""
  displayName_starts_with: String

  """All values not starting with the given string."""
  displayName_not_starts_with: String

  """All values ending with the given string."""
  displayName_ends_with: String

  """All values not ending with the given string."""
  displayName_not_ends_with: String
  episodeNumber: String

  """All values that are not equal to given value."""
  episodeNumber_not: String

  """All values that are contained in given list."""
  episodeNumber_in: [String!]

  """All values that are not contained in given list."""
  episodeNumber_not_in: [String!]

  """All values less than the given value."""
  episodeNumber_lt: String

  """All values less than or equal the given value."""
  episodeNumber_lte: String

  """All values greater than the given value."""
  episodeNumber_gt: String

  """All values greater than or equal the given value."""
  episodeNumber_gte: String

  """All values containing the given string."""
  episodeNumber_contains: String

  """All values not containing the given string."""
  episodeNumber_not_contains: String

  """All values starting with the given string."""
  episodeNumber_starts_with: String

  """All values not starting with the given string."""
  episodeNumber_not_starts_with: String

  """All values ending with the given string."""
  episodeNumber_ends_with: String

  """All values not ending with the given string."""
  episodeNumber_not_ends_with: String
  length: Int

  """All values that are not equal to given value."""
  length_not: Int

  """All values that are contained in given list."""
  length_in: [Int!]

  """All values that are not contained in given list."""
  length_not_in: [Int!]

  """All values less than the given value."""
  length_lt: Int

  """All values less than or equal the given value."""
  length_lte: Int

  """All values greater than the given value."""
  length_gt: Int

  """All values greater than or equal the given value."""
  length_gte: Int
  subGroup: String

  """All values that are not equal to given value."""
  subGroup_not: String

  """All values that are contained in given list."""
  subGroup_in: [String!]

  """All values that are not contained in given list."""
  subGroup_not_in: [String!]

  """All values less than the given value."""
  subGroup_lt: String

  """All values less than or equal the given value."""
  subGroup_lte: String

  """All values greater than the given value."""
  subGroup_gt: String

  """All values greater than or equal the given value."""
  subGroup_gte: String

  """All values containing the given string."""
  subGroup_contains: String

  """All values not containing the given string."""
  subGroup_not_contains: String

  """All values starting with the given string."""
  subGroup_starts_with: String

  """All values not starting with the given string."""
  subGroup_not_starts_with: String

  """All values ending with the given string."""
  subGroup_ends_with: String

  """All values not ending with the given string."""
  subGroup_not_ends_with: String
  language: String

  """All values that are not equal to given value."""
  language_not: String

  """All values that are contained in given list."""
  language_in: [String!]

  """All values that are not contained in given list."""
  language_not_in: [String!]

  """All values less than the given value."""
  language_lt: String

  """All values less than or equal the given value."""
  language_lte: String

  """All values greater than the given value."""
  language_gt: String

  """All values greater than or equal the given value."""
  language_gte: String

  """All values containing the given string."""
  language_contains: String

  """All values not containing the given string."""
  language_not_contains: String

  """All values starting with the given string."""
  language_starts_with: String

  """All values not starting with the given string."""
  language_not_starts_with: String

  """All values ending with the given string."""
  language_ends_with: String

  """All values not ending with the given string."""
  language_not_ends_with: String
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  anime: AnimeWhereInput
  season: SeasonWhereInput
  file: FileWhereInput
  characters_every: CharacterWhereInput
  characters_some: CharacterWhereInput
  characters_none: CharacterWhereInput
  dialogues_every: DialogueWhereInput
  dialogues_some: DialogueWhereInput
  dialogues_none: DialogueWhereInput
}

input EpisodeWhereUniqueInput {
  id: ID
}

type File implements Node {
  id: ID!
  anime(where: AnimeWhereInput): Anime!
  archive(where: ArchiveWhereInput): Archive
  linkUrl: String
  fileName: String!
  episode(where: EpisodeWhereInput): Episode!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type FileConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [FileEdge]!
  aggregate: AggregateFile!
}

input FileCreateInput {
  linkUrl: String
  fileName: String!
  anime: AnimeCreateOneWithoutFilesInput!
  archive: ArchiveCreateOneWithoutFilesInput
  episode: EpisodeCreateOneWithoutFileInput!
}

input FileCreateManyWithoutAnimeInput {
  create: [FileCreateWithoutAnimeInput!]
  connect: [FileWhereUniqueInput!]
}

input FileCreateManyWithoutArchiveInput {
  create: [FileCreateWithoutArchiveInput!]
  connect: [FileWhereUniqueInput!]
}

input FileCreateOneWithoutEpisodeInput {
  create: FileCreateWithoutEpisodeInput
  connect: FileWhereUniqueInput
}

input FileCreateWithoutAnimeInput {
  linkUrl: String
  fileName: String!
  archive: ArchiveCreateOneWithoutFilesInput
  episode: EpisodeCreateOneWithoutFileInput!
}

input FileCreateWithoutArchiveInput {
  linkUrl: String
  fileName: String!
  anime: AnimeCreateOneWithoutFilesInput!
  episode: EpisodeCreateOneWithoutFileInput!
}

input FileCreateWithoutEpisodeInput {
  linkUrl: String
  fileName: String!
  anime: AnimeCreateOneWithoutFilesInput!
  archive: ArchiveCreateOneWithoutFilesInput
}

"""An edge in a connection."""
type FileEdge {
  """The item at the end of the edge."""
  node: File!

  """A cursor for use in pagination."""
  cursor: String!
}

enum FileOrderByInput {
  id_ASC
  id_DESC
  linkUrl_ASC
  linkUrl_DESC
  fileName_ASC
  fileName_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type FilePreviousValues {
  id: ID!
  linkUrl: String
  fileName: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type FileSubscriptionPayload {
  mutation: MutationType!
  node: File
  updatedFields: [String!]
  previousValues: FilePreviousValues
}

input FileSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [FileSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [FileSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [FileSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: FileWhereInput
}

input FileUpdateInput {
  linkUrl: String
  fileName: String
  anime: AnimeUpdateOneRequiredWithoutFilesInput
  archive: ArchiveUpdateOneWithoutFilesInput
  episode: EpisodeUpdateOneRequiredWithoutFileInput
}

input FileUpdateManyWithoutAnimeInput {
  create: [FileCreateWithoutAnimeInput!]
  connect: [FileWhereUniqueInput!]
  disconnect: [FileWhereUniqueInput!]
  delete: [FileWhereUniqueInput!]
  update: [FileUpdateWithWhereUniqueWithoutAnimeInput!]
  upsert: [FileUpsertWithWhereUniqueWithoutAnimeInput!]
}

input FileUpdateManyWithoutArchiveInput {
  create: [FileCreateWithoutArchiveInput!]
  connect: [FileWhereUniqueInput!]
  disconnect: [FileWhereUniqueInput!]
  delete: [FileWhereUniqueInput!]
  update: [FileUpdateWithWhereUniqueWithoutArchiveInput!]
  upsert: [FileUpsertWithWhereUniqueWithoutArchiveInput!]
}

input FileUpdateOneRequiredWithoutEpisodeInput {
  create: FileCreateWithoutEpisodeInput
  connect: FileWhereUniqueInput
  update: FileUpdateWithoutEpisodeDataInput
  upsert: FileUpsertWithoutEpisodeInput
}

input FileUpdateWithoutAnimeDataInput {
  linkUrl: String
  fileName: String
  archive: ArchiveUpdateOneWithoutFilesInput
  episode: EpisodeUpdateOneRequiredWithoutFileInput
}

input FileUpdateWithoutArchiveDataInput {
  linkUrl: String
  fileName: String
  anime: AnimeUpdateOneRequiredWithoutFilesInput
  episode: EpisodeUpdateOneRequiredWithoutFileInput
}

input FileUpdateWithoutEpisodeDataInput {
  linkUrl: String
  fileName: String
  anime: AnimeUpdateOneRequiredWithoutFilesInput
  archive: ArchiveUpdateOneWithoutFilesInput
}

input FileUpdateWithWhereUniqueWithoutAnimeInput {
  where: FileWhereUniqueInput!
  data: FileUpdateWithoutAnimeDataInput!
}

input FileUpdateWithWhereUniqueWithoutArchiveInput {
  where: FileWhereUniqueInput!
  data: FileUpdateWithoutArchiveDataInput!
}

input FileUpsertWithoutEpisodeInput {
  update: FileUpdateWithoutEpisodeDataInput!
  create: FileCreateWithoutEpisodeInput!
}

input FileUpsertWithWhereUniqueWithoutAnimeInput {
  where: FileWhereUniqueInput!
  update: FileUpdateWithoutAnimeDataInput!
  create: FileCreateWithoutAnimeInput!
}

input FileUpsertWithWhereUniqueWithoutArchiveInput {
  where: FileWhereUniqueInput!
  update: FileUpdateWithoutArchiveDataInput!
  create: FileCreateWithoutArchiveInput!
}

input FileWhereInput {
  """Logical AND on all given filters."""
  AND: [FileWhereInput!]

  """Logical OR on all given filters."""
  OR: [FileWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [FileWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  linkUrl: String

  """All values that are not equal to given value."""
  linkUrl_not: String

  """All values that are contained in given list."""
  linkUrl_in: [String!]

  """All values that are not contained in given list."""
  linkUrl_not_in: [String!]

  """All values less than the given value."""
  linkUrl_lt: String

  """All values less than or equal the given value."""
  linkUrl_lte: String

  """All values greater than the given value."""
  linkUrl_gt: String

  """All values greater than or equal the given value."""
  linkUrl_gte: String

  """All values containing the given string."""
  linkUrl_contains: String

  """All values not containing the given string."""
  linkUrl_not_contains: String

  """All values starting with the given string."""
  linkUrl_starts_with: String

  """All values not starting with the given string."""
  linkUrl_not_starts_with: String

  """All values ending with the given string."""
  linkUrl_ends_with: String

  """All values not ending with the given string."""
  linkUrl_not_ends_with: String
  fileName: String

  """All values that are not equal to given value."""
  fileName_not: String

  """All values that are contained in given list."""
  fileName_in: [String!]

  """All values that are not contained in given list."""
  fileName_not_in: [String!]

  """All values less than the given value."""
  fileName_lt: String

  """All values less than or equal the given value."""
  fileName_lte: String

  """All values greater than the given value."""
  fileName_gt: String

  """All values greater than or equal the given value."""
  fileName_gte: String

  """All values containing the given string."""
  fileName_contains: String

  """All values not containing the given string."""
  fileName_not_contains: String

  """All values starting with the given string."""
  fileName_starts_with: String

  """All values not starting with the given string."""
  fileName_not_starts_with: String

  """All values ending with the given string."""
  fileName_ends_with: String

  """All values not ending with the given string."""
  fileName_not_ends_with: String
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  anime: AnimeWhereInput
  archive: ArchiveWhereInput
  episode: EpisodeWhereInput
}

input FileWhereUniqueInput {
  id: ID
  fileName: String
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createAPIKey(data: APIKeyCreateInput!): APIKey!
  createAnime(data: AnimeCreateInput!): Anime!
  createCharacter(data: CharacterCreateInput!): Character!
  createDialogue(data: DialogueCreateInput!): Dialogue!
  createEpisode(data: EpisodeCreateInput!): Episode!
  createFile(data: FileCreateInput!): File!
  createSeason(data: SeasonCreateInput!): Season!
  createUser(data: UserCreateInput!): User!
  createArchive(data: ArchiveCreateInput!): Archive!
  updateAnime(data: AnimeUpdateInput!, where: AnimeWhereUniqueInput!): Anime
  updateCharacter(data: CharacterUpdateInput!, where: CharacterWhereUniqueInput!): Character
  updateDialogue(data: DialogueUpdateInput!, where: DialogueWhereUniqueInput!): Dialogue
  updateEpisode(data: EpisodeUpdateInput!, where: EpisodeWhereUniqueInput!): Episode
  updateFile(data: FileUpdateInput!, where: FileWhereUniqueInput!): File
  updateSeason(data: SeasonUpdateInput!, where: SeasonWhereUniqueInput!): Season
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateArchive(data: ArchiveUpdateInput!, where: ArchiveWhereUniqueInput!): Archive
  deleteAnime(where: AnimeWhereUniqueInput!): Anime
  deleteCharacter(where: CharacterWhereUniqueInput!): Character
  deleteDialogue(where: DialogueWhereUniqueInput!): Dialogue
  deleteEpisode(where: EpisodeWhereUniqueInput!): Episode
  deleteFile(where: FileWhereUniqueInput!): File
  deleteSeason(where: SeasonWhereUniqueInput!): Season
  deleteUser(where: UserWhereUniqueInput!): User
  deleteArchive(where: ArchiveWhereUniqueInput!): Archive
  upsertAnime(where: AnimeWhereUniqueInput!, create: AnimeCreateInput!, update: AnimeUpdateInput!): Anime!
  upsertCharacter(where: CharacterWhereUniqueInput!, create: CharacterCreateInput!, update: CharacterUpdateInput!): Character!
  upsertDialogue(where: DialogueWhereUniqueInput!, create: DialogueCreateInput!, update: DialogueUpdateInput!): Dialogue!
  upsertEpisode(where: EpisodeWhereUniqueInput!, create: EpisodeCreateInput!, update: EpisodeUpdateInput!): Episode!
  upsertFile(where: FileWhereUniqueInput!, create: FileCreateInput!, update: FileUpdateInput!): File!
  upsertSeason(where: SeasonWhereUniqueInput!, create: SeasonCreateInput!, update: SeasonUpdateInput!): Season!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertArchive(where: ArchiveWhereUniqueInput!, create: ArchiveCreateInput!, update: ArchiveUpdateInput!): Archive!
  updateManyAPIKeys(data: APIKeyUpdateInput!, where: APIKeyWhereInput): BatchPayload!
  updateManyAnimes(data: AnimeUpdateInput!, where: AnimeWhereInput): BatchPayload!
  updateManyCharacters(data: CharacterUpdateInput!, where: CharacterWhereInput): BatchPayload!
  updateManyDialogues(data: DialogueUpdateInput!, where: DialogueWhereInput): BatchPayload!
  updateManyEpisodes(data: EpisodeUpdateInput!, where: EpisodeWhereInput): BatchPayload!
  updateManyFiles(data: FileUpdateInput!, where: FileWhereInput): BatchPayload!
  updateManySeasons(data: SeasonUpdateInput!, where: SeasonWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyArchives(data: ArchiveUpdateInput!, where: ArchiveWhereInput): BatchPayload!
  deleteManyAPIKeys(where: APIKeyWhereInput): BatchPayload!
  deleteManyAnimes(where: AnimeWhereInput): BatchPayload!
  deleteManyCharacters(where: CharacterWhereInput): BatchPayload!
  deleteManyDialogues(where: DialogueWhereInput): BatchPayload!
  deleteManyEpisodes(where: EpisodeWhereInput): BatchPayload!
  deleteManyFiles(where: FileWhereInput): BatchPayload!
  deleteManySeasons(where: SeasonWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyArchives(where: ArchiveWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Query {
  aPIKeys(where: APIKeyWhereInput, orderBy: APIKeyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [APIKey]!
  animes(where: AnimeWhereInput, orderBy: AnimeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Anime]!
  characters(where: CharacterWhereInput, orderBy: CharacterOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Character]!
  dialogues(where: DialogueWhereInput, orderBy: DialogueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Dialogue]!
  episodes(where: EpisodeWhereInput, orderBy: EpisodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Episode]!
  files(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [File]!
  seasons(where: SeasonWhereInput, orderBy: SeasonOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Season]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  archives(where: ArchiveWhereInput, orderBy: ArchiveOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Archive]!
  anime(where: AnimeWhereUniqueInput!): Anime
  character(where: CharacterWhereUniqueInput!): Character
  dialogue(where: DialogueWhereUniqueInput!): Dialogue
  episode(where: EpisodeWhereUniqueInput!): Episode
  file(where: FileWhereUniqueInput!): File
  season(where: SeasonWhereUniqueInput!): Season
  user(where: UserWhereUniqueInput!): User
  archive(where: ArchiveWhereUniqueInput!): Archive
  aPIKeysConnection(where: APIKeyWhereInput, orderBy: APIKeyOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): APIKeyConnection!
  animesConnection(where: AnimeWhereInput, orderBy: AnimeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): AnimeConnection!
  charactersConnection(where: CharacterWhereInput, orderBy: CharacterOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CharacterConnection!
  dialoguesConnection(where: DialogueWhereInput, orderBy: DialogueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DialogueConnection!
  episodesConnection(where: EpisodeWhereInput, orderBy: EpisodeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): EpisodeConnection!
  filesConnection(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FileConnection!
  seasonsConnection(where: SeasonWhereInput, orderBy: SeasonOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SeasonConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  archivesConnection(where: ArchiveWhereInput, orderBy: ArchiveOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ArchiveConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Season implements Node {
  id: ID!
  anime(where: AnimeWhereInput): Anime!
  archive(where: ArchiveWhereInput): Archive
  dialogues(where: DialogueWhereInput, orderBy: DialogueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Dialogue!]
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type SeasonConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [SeasonEdge]!
  aggregate: AggregateSeason!
}

input SeasonCreateInput {
  anime: AnimeCreateOneWithoutSeasonsInput!
  archive: ArchiveCreateOneInput
  dialogues: DialogueCreateManyWithoutSeasonInput
}

input SeasonCreateManyInput {
  create: [SeasonCreateInput!]
  connect: [SeasonWhereUniqueInput!]
}

input SeasonCreateManyWithoutAnimeInput {
  create: [SeasonCreateWithoutAnimeInput!]
  connect: [SeasonWhereUniqueInput!]
}

input SeasonCreateOneInput {
  create: SeasonCreateInput
  connect: SeasonWhereUniqueInput
}

input SeasonCreateOneWithoutDialoguesInput {
  create: SeasonCreateWithoutDialoguesInput
  connect: SeasonWhereUniqueInput
}

input SeasonCreateWithoutAnimeInput {
  archive: ArchiveCreateOneInput
  dialogues: DialogueCreateManyWithoutSeasonInput
}

input SeasonCreateWithoutDialoguesInput {
  anime: AnimeCreateOneWithoutSeasonsInput!
  archive: ArchiveCreateOneInput
}

"""An edge in a connection."""
type SeasonEdge {
  """The item at the end of the edge."""
  node: Season!

  """A cursor for use in pagination."""
  cursor: String!
}

enum SeasonOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SeasonPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type SeasonSubscriptionPayload {
  mutation: MutationType!
  node: Season
  updatedFields: [String!]
  previousValues: SeasonPreviousValues
}

input SeasonSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [SeasonSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [SeasonSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SeasonSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: SeasonWhereInput
}

input SeasonUpdateDataInput {
  anime: AnimeUpdateOneRequiredWithoutSeasonsInput
  archive: ArchiveUpdateOneInput
  dialogues: DialogueUpdateManyWithoutSeasonInput
}

input SeasonUpdateInput {
  anime: AnimeUpdateOneRequiredWithoutSeasonsInput
  archive: ArchiveUpdateOneInput
  dialogues: DialogueUpdateManyWithoutSeasonInput
}

input SeasonUpdateManyInput {
  create: [SeasonCreateInput!]
  connect: [SeasonWhereUniqueInput!]
  disconnect: [SeasonWhereUniqueInput!]
  delete: [SeasonWhereUniqueInput!]
  update: [SeasonUpdateWithWhereUniqueNestedInput!]
  upsert: [SeasonUpsertWithWhereUniqueNestedInput!]
}

input SeasonUpdateManyWithoutAnimeInput {
  create: [SeasonCreateWithoutAnimeInput!]
  connect: [SeasonWhereUniqueInput!]
  disconnect: [SeasonWhereUniqueInput!]
  delete: [SeasonWhereUniqueInput!]
  update: [SeasonUpdateWithWhereUniqueWithoutAnimeInput!]
  upsert: [SeasonUpsertWithWhereUniqueWithoutAnimeInput!]
}

input SeasonUpdateOneInput {
  create: SeasonCreateInput
  connect: SeasonWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: SeasonUpdateDataInput
  upsert: SeasonUpsertNestedInput
}

input SeasonUpdateOneWithoutDialoguesInput {
  create: SeasonCreateWithoutDialoguesInput
  connect: SeasonWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: SeasonUpdateWithoutDialoguesDataInput
  upsert: SeasonUpsertWithoutDialoguesInput
}

input SeasonUpdateWithoutAnimeDataInput {
  archive: ArchiveUpdateOneInput
  dialogues: DialogueUpdateManyWithoutSeasonInput
}

input SeasonUpdateWithoutDialoguesDataInput {
  anime: AnimeUpdateOneRequiredWithoutSeasonsInput
  archive: ArchiveUpdateOneInput
}

input SeasonUpdateWithWhereUniqueNestedInput {
  where: SeasonWhereUniqueInput!
  data: SeasonUpdateDataInput!
}

input SeasonUpdateWithWhereUniqueWithoutAnimeInput {
  where: SeasonWhereUniqueInput!
  data: SeasonUpdateWithoutAnimeDataInput!
}

input SeasonUpsertNestedInput {
  update: SeasonUpdateDataInput!
  create: SeasonCreateInput!
}

input SeasonUpsertWithoutDialoguesInput {
  update: SeasonUpdateWithoutDialoguesDataInput!
  create: SeasonCreateWithoutDialoguesInput!
}

input SeasonUpsertWithWhereUniqueNestedInput {
  where: SeasonWhereUniqueInput!
  update: SeasonUpdateDataInput!
  create: SeasonCreateInput!
}

input SeasonUpsertWithWhereUniqueWithoutAnimeInput {
  where: SeasonWhereUniqueInput!
  update: SeasonUpdateWithoutAnimeDataInput!
  create: SeasonCreateWithoutAnimeInput!
}

input SeasonWhereInput {
  """Logical AND on all given filters."""
  AND: [SeasonWhereInput!]

  """Logical OR on all given filters."""
  OR: [SeasonWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SeasonWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  anime: AnimeWhereInput
  archive: ArchiveWhereInput
  dialogues_every: DialogueWhereInput
  dialogues_some: DialogueWhereInput
  dialogues_none: DialogueWhereInput
}

input SeasonWhereUniqueInput {
  id: ID
}

type Subscription {
  aPIKey(where: APIKeySubscriptionWhereInput): APIKeySubscriptionPayload
  anime(where: AnimeSubscriptionWhereInput): AnimeSubscriptionPayload
  character(where: CharacterSubscriptionWhereInput): CharacterSubscriptionPayload
  dialogue(where: DialogueSubscriptionWhereInput): DialogueSubscriptionPayload
  episode(where: EpisodeSubscriptionWhereInput): EpisodeSubscriptionPayload
  file(where: FileSubscriptionWhereInput): FileSubscriptionPayload
  season(where: SeasonSubscriptionWhereInput): SeasonSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  archive(where: ArchiveSubscriptionWhereInput): ArchiveSubscriptionPayload
}

type User implements Node {
  name: String!
  email: String!
  anilistName: String
  malName: String
  profilePicture: String
  description: String
  id: ID!
  hash: String!
  salt: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

"""A connection to a list of items."""
type UserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  email: String!
  anilistName: String
  malName: String
  profilePicture: String
  description: String
  hash: String!
  salt: String!
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserOrderByInput {
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  anilistName_ASC
  anilistName_DESC
  malName_ASC
  malName_DESC
  profilePicture_ASC
  profilePicture_DESC
  description_ASC
  description_DESC
  id_ASC
  id_DESC
  hash_ASC
  hash_DESC
  salt_ASC
  salt_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  name: String!
  email: String!
  anilistName: String
  malName: String
  profilePicture: String
  description: String
  id: ID!
  hash: String!
  salt: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [UserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateDataInput {
  name: String
  email: String
  anilistName: String
  malName: String
  profilePicture: String
  description: String
  hash: String
  salt: String
}

input UserUpdateInput {
  name: String
  email: String
  anilistName: String
  malName: String
  profilePicture: String
  description: String
  hash: String
  salt: String
}

input UserUpdateOneRequiredInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  email: String

  """All values that are not equal to given value."""
  email_not: String

  """All values that are contained in given list."""
  email_in: [String!]

  """All values that are not contained in given list."""
  email_not_in: [String!]

  """All values less than the given value."""
  email_lt: String

  """All values less than or equal the given value."""
  email_lte: String

  """All values greater than the given value."""
  email_gt: String

  """All values greater than or equal the given value."""
  email_gte: String

  """All values containing the given string."""
  email_contains: String

  """All values not containing the given string."""
  email_not_contains: String

  """All values starting with the given string."""
  email_starts_with: String

  """All values not starting with the given string."""
  email_not_starts_with: String

  """All values ending with the given string."""
  email_ends_with: String

  """All values not ending with the given string."""
  email_not_ends_with: String
  anilistName: String

  """All values that are not equal to given value."""
  anilistName_not: String

  """All values that are contained in given list."""
  anilistName_in: [String!]

  """All values that are not contained in given list."""
  anilistName_not_in: [String!]

  """All values less than the given value."""
  anilistName_lt: String

  """All values less than or equal the given value."""
  anilistName_lte: String

  """All values greater than the given value."""
  anilistName_gt: String

  """All values greater than or equal the given value."""
  anilistName_gte: String

  """All values containing the given string."""
  anilistName_contains: String

  """All values not containing the given string."""
  anilistName_not_contains: String

  """All values starting with the given string."""
  anilistName_starts_with: String

  """All values not starting with the given string."""
  anilistName_not_starts_with: String

  """All values ending with the given string."""
  anilistName_ends_with: String

  """All values not ending with the given string."""
  anilistName_not_ends_with: String
  malName: String

  """All values that are not equal to given value."""
  malName_not: String

  """All values that are contained in given list."""
  malName_in: [String!]

  """All values that are not contained in given list."""
  malName_not_in: [String!]

  """All values less than the given value."""
  malName_lt: String

  """All values less than or equal the given value."""
  malName_lte: String

  """All values greater than the given value."""
  malName_gt: String

  """All values greater than or equal the given value."""
  malName_gte: String

  """All values containing the given string."""
  malName_contains: String

  """All values not containing the given string."""
  malName_not_contains: String

  """All values starting with the given string."""
  malName_starts_with: String

  """All values not starting with the given string."""
  malName_not_starts_with: String

  """All values ending with the given string."""
  malName_ends_with: String

  """All values not ending with the given string."""
  malName_not_ends_with: String
  profilePicture: String

  """All values that are not equal to given value."""
  profilePicture_not: String

  """All values that are contained in given list."""
  profilePicture_in: [String!]

  """All values that are not contained in given list."""
  profilePicture_not_in: [String!]

  """All values less than the given value."""
  profilePicture_lt: String

  """All values less than or equal the given value."""
  profilePicture_lte: String

  """All values greater than the given value."""
  profilePicture_gt: String

  """All values greater than or equal the given value."""
  profilePicture_gte: String

  """All values containing the given string."""
  profilePicture_contains: String

  """All values not containing the given string."""
  profilePicture_not_contains: String

  """All values starting with the given string."""
  profilePicture_starts_with: String

  """All values not starting with the given string."""
  profilePicture_not_starts_with: String

  """All values ending with the given string."""
  profilePicture_ends_with: String

  """All values not ending with the given string."""
  profilePicture_not_ends_with: String
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  hash: String

  """All values that are not equal to given value."""
  hash_not: String

  """All values that are contained in given list."""
  hash_in: [String!]

  """All values that are not contained in given list."""
  hash_not_in: [String!]

  """All values less than the given value."""
  hash_lt: String

  """All values less than or equal the given value."""
  hash_lte: String

  """All values greater than the given value."""
  hash_gt: String

  """All values greater than or equal the given value."""
  hash_gte: String

  """All values containing the given string."""
  hash_contains: String

  """All values not containing the given string."""
  hash_not_contains: String

  """All values starting with the given string."""
  hash_starts_with: String

  """All values not starting with the given string."""
  hash_not_starts_with: String

  """All values ending with the given string."""
  hash_ends_with: String

  """All values not ending with the given string."""
  hash_not_ends_with: String
  salt: String

  """All values that are not equal to given value."""
  salt_not: String

  """All values that are contained in given list."""
  salt_in: [String!]

  """All values that are not contained in given list."""
  salt_not_in: [String!]

  """All values less than the given value."""
  salt_lt: String

  """All values less than or equal the given value."""
  salt_lte: String

  """All values greater than the given value."""
  salt_gt: String

  """All values greater than or equal the given value."""
  salt_gte: String

  """All values containing the given string."""
  salt_contains: String

  """All values not containing the given string."""
  salt_not_contains: String

  """All values starting with the given string."""
  salt_starts_with: String

  """All values not starting with the given string."""
  salt_not_starts_with: String

  """All values ending with the given string."""
  salt_ends_with: String

  """All values not ending with the given string."""
  salt_not_ends_with: String
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
}

input UserWhereUniqueInput {
  email: String
  id: ID
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type SeasonOrderByInput =   'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type AnimeOrderByInput =   'id_ASC' |
  'id_DESC' |
  'anilistId_ASC' |
  'anilistId_DESC' |
  'malId_ASC' |
  'malId_DESC' |
  'rawName_ASC' |
  'rawName_DESC' |
  'name_ASC' |
  'name_DESC' |
  'thumbnailUrl_ASC' |
  'thumbnailUrl_DESC' |
  'bannerUrl_ASC' |
  'bannerUrl_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type CharacterOrderByInput =   'id_ASC' |
  'id_DESC' |
  'anilistId_ASC' |
  'anilistId_DESC' |
  'rawName_ASC' |
  'rawName_DESC' |
  'name_ASC' |
  'name_DESC' |
  'certainty_ASC' |
  'certainty_DESC' |
  'thumbnailUrl_ASC' |
  'thumbnailUrl_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type EpisodeOrderByInput =   'id_ASC' |
  'id_DESC' |
  'displayName_ASC' |
  'displayName_DESC' |
  'episodeNumber_ASC' |
  'episodeNumber_DESC' |
  'length_ASC' |
  'length_DESC' |
  'subGroup_ASC' |
  'subGroup_DESC' |
  'language_ASC' |
  'language_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type FileOrderByInput =   'id_ASC' |
  'id_DESC' |
  'linkUrl_ASC' |
  'linkUrl_DESC' |
  'fileName_ASC' |
  'fileName_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type DialogueOrderByInput =   'id_ASC' |
  'id_DESC' |
  'order_ASC' |
  'order_DESC' |
  'start_ASC' |
  'start_DESC' |
  'end_ASC' |
  'end_DESC' |
  'text_ASC' |
  'text_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export type APIKeyOrderByInput =   'token_ASC' |
  'token_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'id_ASC' |
  'id_DESC'

export type UserOrderByInput =   'name_ASC' |
  'name_DESC' |
  'email_ASC' |
  'email_DESC' |
  'anilistName_ASC' |
  'anilistName_DESC' |
  'malName_ASC' |
  'malName_DESC' |
  'profilePicture_ASC' |
  'profilePicture_DESC' |
  'description_ASC' |
  'description_DESC' |
  'id_ASC' |
  'id_DESC' |
  'hash_ASC' |
  'hash_DESC' |
  'salt_ASC' |
  'salt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type ArchiveOrderByInput =   'id_ASC' |
  'id_DESC' |
  'linkUrl_ASC' |
  'linkUrl_DESC' |
  'fileName_ASC' |
  'fileName_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export interface CharacterUpdateManyWithoutAnimesInput {
  create?: CharacterCreateWithoutAnimesInput[] | CharacterCreateWithoutAnimesInput
  connect?: CharacterWhereUniqueInput[] | CharacterWhereUniqueInput
  disconnect?: CharacterWhereUniqueInput[] | CharacterWhereUniqueInput
  delete?: CharacterWhereUniqueInput[] | CharacterWhereUniqueInput
  update?: CharacterUpdateWithWhereUniqueWithoutAnimesInput[] | CharacterUpdateWithWhereUniqueWithoutAnimesInput
  upsert?: CharacterUpsertWithWhereUniqueWithoutAnimesInput[] | CharacterUpsertWithWhereUniqueWithoutAnimesInput
}

export interface APIKeyWhereInput {
  AND?: APIKeyWhereInput[] | APIKeyWhereInput
  OR?: APIKeyWhereInput[] | APIKeyWhereInput
  NOT?: APIKeyWhereInput[] | APIKeyWhereInput
  token?: String
  token_not?: String
  token_in?: String[] | String
  token_not_in?: String[] | String
  token_lt?: String
  token_lte?: String
  token_gt?: String
  token_gte?: String
  token_contains?: String
  token_not_contains?: String
  token_starts_with?: String
  token_not_starts_with?: String
  token_ends_with?: String
  token_not_ends_with?: String
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  user?: UserWhereInput
}

export interface AnimeUpdateOneRequiredWithoutEpisodesInput {
  create?: AnimeCreateWithoutEpisodesInput
  connect?: AnimeWhereUniqueInput
  update?: AnimeUpdateWithoutEpisodesDataInput
  upsert?: AnimeUpsertWithoutEpisodesInput
}

export interface EpisodeWhereInput {
  AND?: EpisodeWhereInput[] | EpisodeWhereInput
  OR?: EpisodeWhereInput[] | EpisodeWhereInput
  NOT?: EpisodeWhereInput[] | EpisodeWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  displayName?: String
  displayName_not?: String
  displayName_in?: String[] | String
  displayName_not_in?: String[] | String
  displayName_lt?: String
  displayName_lte?: String
  displayName_gt?: String
  displayName_gte?: String
  displayName_contains?: String
  displayName_not_contains?: String
  displayName_starts_with?: String
  displayName_not_starts_with?: String
  displayName_ends_with?: String
  displayName_not_ends_with?: String
  episodeNumber?: String
  episodeNumber_not?: String
  episodeNumber_in?: String[] | String
  episodeNumber_not_in?: String[] | String
  episodeNumber_lt?: String
  episodeNumber_lte?: String
  episodeNumber_gt?: String
  episodeNumber_gte?: String
  episodeNumber_contains?: String
  episodeNumber_not_contains?: String
  episodeNumber_starts_with?: String
  episodeNumber_not_starts_with?: String
  episodeNumber_ends_with?: String
  episodeNumber_not_ends_with?: String
  length?: Int
  length_not?: Int
  length_in?: Int[] | Int
  length_not_in?: Int[] | Int
  length_lt?: Int
  length_lte?: Int
  length_gt?: Int
  length_gte?: Int
  subGroup?: String
  subGroup_not?: String
  subGroup_in?: String[] | String
  subGroup_not_in?: String[] | String
  subGroup_lt?: String
  subGroup_lte?: String
  subGroup_gt?: String
  subGroup_gte?: String
  subGroup_contains?: String
  subGroup_not_contains?: String
  subGroup_starts_with?: String
  subGroup_not_starts_with?: String
  subGroup_ends_with?: String
  subGroup_not_ends_with?: String
  language?: String
  language_not?: String
  language_in?: String[] | String
  language_not_in?: String[] | String
  language_lt?: String
  language_lte?: String
  language_gt?: String
  language_gte?: String
  language_contains?: String
  language_not_contains?: String
  language_starts_with?: String
  language_not_starts_with?: String
  language_ends_with?: String
  language_not_ends_with?: String
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  anime?: AnimeWhereInput
  season?: SeasonWhereInput
  file?: FileWhereInput
  characters_every?: CharacterWhereInput
  characters_some?: CharacterWhereInput
  characters_none?: CharacterWhereInput
  dialogues_every?: DialogueWhereInput
  dialogues_some?: DialogueWhereInput
  dialogues_none?: DialogueWhereInput
}

export interface AnimeUpdateWithoutEpisodesDataInput {
  anilistId?: Int
  malId?: Int
  rawName?: String
  name?: String
  thumbnailUrl?: String
  bannerUrl?: String
  characters?: CharacterUpdateManyWithoutAnimesInput
  dialogues?: DialogueUpdateManyWithoutAnimeInput
  seasons?: SeasonUpdateManyWithoutAnimeInput
  files?: FileUpdateManyWithoutAnimeInput
}

export interface ArchiveWhereInput {
  AND?: ArchiveWhereInput[] | ArchiveWhereInput
  OR?: ArchiveWhereInput[] | ArchiveWhereInput
  NOT?: ArchiveWhereInput[] | ArchiveWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  linkUrl?: String
  linkUrl_not?: String
  linkUrl_in?: String[] | String
  linkUrl_not_in?: String[] | String
  linkUrl_lt?: String
  linkUrl_lte?: String
  linkUrl_gt?: String
  linkUrl_gte?: String
  linkUrl_contains?: String
  linkUrl_not_contains?: String
  linkUrl_starts_with?: String
  linkUrl_not_starts_with?: String
  linkUrl_ends_with?: String
  linkUrl_not_ends_with?: String
  fileName?: String
  fileName_not?: String
  fileName_in?: String[] | String
  fileName_not_in?: String[] | String
  fileName_lt?: String
  fileName_lte?: String
  fileName_gt?: String
  fileName_gte?: String
  fileName_contains?: String
  fileName_not_contains?: String
  fileName_starts_with?: String
  fileName_not_starts_with?: String
  fileName_ends_with?: String
  fileName_not_ends_with?: String
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  files_every?: FileWhereInput
  files_some?: FileWhereInput
  files_none?: FileWhereInput
}

export interface DialogueUpdateManyWithoutAnimeInput {
  create?: DialogueCreateWithoutAnimeInput[] | DialogueCreateWithoutAnimeInput
  connect?: DialogueWhereUniqueInput[] | DialogueWhereUniqueInput
  disconnect?: DialogueWhereUniqueInput[] | DialogueWhereUniqueInput
  delete?: DialogueWhereUniqueInput[] | DialogueWhereUniqueInput
  update?: DialogueUpdateWithWhereUniqueWithoutAnimeInput[] | DialogueUpdateWithWhereUniqueWithoutAnimeInput
  upsert?: DialogueUpsertWithWhereUniqueWithoutAnimeInput[] | DialogueUpsertWithWhereUniqueWithoutAnimeInput
}

export interface DialogueWhereInput {
  AND?: DialogueWhereInput[] | DialogueWhereInput
  OR?: DialogueWhereInput[] | DialogueWhereInput
  NOT?: DialogueWhereInput[] | DialogueWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  order?: Int
  order_not?: Int
  order_in?: Int[] | Int
  order_not_in?: Int[] | Int
  order_lt?: Int
  order_lte?: Int
  order_gt?: Int
  order_gte?: Int
  start?: Int
  start_not?: Int
  start_in?: Int[] | Int
  start_not_in?: Int[] | Int
  start_lt?: Int
  start_lte?: Int
  start_gt?: Int
  start_gte?: Int
  end?: Int
  end_not?: Int
  end_in?: Int[] | Int
  end_not_in?: Int[] | Int
  end_lt?: Int
  end_lte?: Int
  end_gt?: Int
  end_gte?: Int
  text?: String
  text_not?: String
  text_in?: String[] | String
  text_not_in?: String[] | String
  text_lt?: String
  text_lte?: String
  text_gt?: String
  text_gte?: String
  text_contains?: String
  text_not_contains?: String
  text_starts_with?: String
  text_not_starts_with?: String
  text_ends_with?: String
  text_not_ends_with?: String
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  character?: CharacterWhereInput
  episode?: EpisodeWhereInput
  season?: SeasonWhereInput
  anime?: AnimeWhereInput
}

export interface AnimeCreateOneWithoutFilesInput {
  create?: AnimeCreateWithoutFilesInput
  connect?: AnimeWhereUniqueInput
}

export interface EpisodeUpsertWithoutDialoguesInput {
  update: EpisodeUpdateWithoutDialoguesDataInput
  create: EpisodeCreateWithoutDialoguesInput
}

export interface AnimeCreateWithoutFilesInput {
  anilistId?: Int
  malId?: Int
  rawName: String
  name?: String
  thumbnailUrl?: String
  bannerUrl?: String
  characters?: CharacterCreateManyWithoutAnimesInput
  episodes?: EpisodeCreateManyWithoutAnimeInput
  dialogues?: DialogueCreateManyWithoutAnimeInput
  seasons?: SeasonCreateManyWithoutAnimeInput
}

export interface DialogueUpdateWithWhereUniqueWithoutAnimeInput {
  where: DialogueWhereUniqueInput
  data: DialogueUpdateWithoutAnimeDataInput
}

export interface SeasonCreateManyWithoutAnimeInput {
  create?: SeasonCreateWithoutAnimeInput[] | SeasonCreateWithoutAnimeInput
  connect?: SeasonWhereUniqueInput[] | SeasonWhereUniqueInput
}

export interface SeasonSubscriptionWhereInput {
  AND?: SeasonSubscriptionWhereInput[] | SeasonSubscriptionWhereInput
  OR?: SeasonSubscriptionWhereInput[] | SeasonSubscriptionWhereInput
  NOT?: SeasonSubscriptionWhereInput[] | SeasonSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: SeasonWhereInput
}

export interface SeasonCreateWithoutAnimeInput {
  archive?: ArchiveCreateOneInput
  dialogues?: DialogueCreateManyWithoutSeasonInput
}

export interface EpisodeSubscriptionWhereInput {
  AND?: EpisodeSubscriptionWhereInput[] | EpisodeSubscriptionWhereInput
  OR?: EpisodeSubscriptionWhereInput[] | EpisodeSubscriptionWhereInput
  NOT?: EpisodeSubscriptionWhereInput[] | EpisodeSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: EpisodeWhereInput
}

export interface ArchiveCreateOneInput {
  create?: ArchiveCreateInput
  connect?: ArchiveWhereUniqueInput
}

export interface CharacterSubscriptionWhereInput {
  AND?: CharacterSubscriptionWhereInput[] | CharacterSubscriptionWhereInput
  OR?: CharacterSubscriptionWhereInput[] | CharacterSubscriptionWhereInput
  NOT?: CharacterSubscriptionWhereInput[] | CharacterSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: CharacterWhereInput
}

export interface ArchiveCreateInput {
  linkUrl?: String
  fileName: String
  files?: FileCreateManyWithoutArchiveInput
}

export interface APIKeySubscriptionWhereInput {
  AND?: APIKeySubscriptionWhereInput[] | APIKeySubscriptionWhereInput
  OR?: APIKeySubscriptionWhereInput[] | APIKeySubscriptionWhereInput
  NOT?: APIKeySubscriptionWhereInput[] | APIKeySubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: APIKeyWhereInput
}

export interface FileCreateManyWithoutArchiveInput {
  create?: FileCreateWithoutArchiveInput[] | FileCreateWithoutArchiveInput
  connect?: FileWhereUniqueInput[] | FileWhereUniqueInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  NOT?: UserWhereInput[] | UserWhereInput
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  anilistName?: String
  anilistName_not?: String
  anilistName_in?: String[] | String
  anilistName_not_in?: String[] | String
  anilistName_lt?: String
  anilistName_lte?: String
  anilistName_gt?: String
  anilistName_gte?: String
  anilistName_contains?: String
  anilistName_not_contains?: String
  anilistName_starts_with?: String
  anilistName_not_starts_with?: String
  anilistName_ends_with?: String
  anilistName_not_ends_with?: String
  malName?: String
  malName_not?: String
  malName_in?: String[] | String
  malName_not_in?: String[] | String
  malName_lt?: String
  malName_lte?: String
  malName_gt?: String
  malName_gte?: String
  malName_contains?: String
  malName_not_contains?: String
  malName_starts_with?: String
  malName_not_starts_with?: String
  malName_ends_with?: String
  malName_not_ends_with?: String
  profilePicture?: String
  profilePicture_not?: String
  profilePicture_in?: String[] | String
  profilePicture_not_in?: String[] | String
  profilePicture_lt?: String
  profilePicture_lte?: String
  profilePicture_gt?: String
  profilePicture_gte?: String
  profilePicture_contains?: String
  profilePicture_not_contains?: String
  profilePicture_starts_with?: String
  profilePicture_not_starts_with?: String
  profilePicture_ends_with?: String
  profilePicture_not_ends_with?: String
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  hash?: String
  hash_not?: String
  hash_in?: String[] | String
  hash_not_in?: String[] | String
  hash_lt?: String
  hash_lte?: String
  hash_gt?: String
  hash_gte?: String
  hash_contains?: String
  hash_not_contains?: String
  hash_starts_with?: String
  hash_not_starts_with?: String
  hash_ends_with?: String
  hash_not_ends_with?: String
  salt?: String
  salt_not?: String
  salt_in?: String[] | String
  salt_not_in?: String[] | String
  salt_lt?: String
  salt_lte?: String
  salt_gt?: String
  salt_gte?: String
  salt_contains?: String
  salt_not_contains?: String
  salt_starts_with?: String
  salt_not_starts_with?: String
  salt_ends_with?: String
  salt_not_ends_with?: String
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
}

export interface FileCreateWithoutArchiveInput {
  linkUrl?: String
  fileName: String
  anime: AnimeCreateOneWithoutFilesInput
  episode: EpisodeCreateOneWithoutFileInput
}

export interface CharacterWhereUniqueInput {
  id?: ID_Input
  anilistId?: Int
}

export interface DialogueCreateManyWithoutSeasonInput {
  create?: DialogueCreateWithoutSeasonInput[] | DialogueCreateWithoutSeasonInput
  connect?: DialogueWhereUniqueInput[] | DialogueWhereUniqueInput
}

export interface EpisodeWhereUniqueInput {
  id?: ID_Input
}

export interface DialogueCreateWithoutSeasonInput {
  order: Int
  start: Int
  end: Int
  text: String
  character: CharacterCreateOneWithoutDialoguesInput
  episode: EpisodeCreateOneWithoutDialoguesInput
  anime: AnimeCreateOneWithoutDialoguesInput
}

export interface SeasonWhereUniqueInput {
  id?: ID_Input
}

export interface AnimeCreateOneWithoutDialoguesInput {
  create?: AnimeCreateWithoutDialoguesInput
  connect?: AnimeWhereUniqueInput
}

export interface ArchiveWhereUniqueInput {
  id?: ID_Input
}

export interface AnimeCreateWithoutDialoguesInput {
  anilistId?: Int
  malId?: Int
  rawName: String
  name?: String
  thumbnailUrl?: String
  bannerUrl?: String
  characters?: CharacterCreateManyWithoutAnimesInput
  episodes?: EpisodeCreateManyWithoutAnimeInput
  seasons?: SeasonCreateManyWithoutAnimeInput
  files?: FileCreateManyWithoutAnimeInput
}

export interface UserUpdateOneRequiredInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
  update?: UserUpdateDataInput
  upsert?: UserUpsertNestedInput
}

export interface SeasonCreateOneWithoutDialoguesInput {
  create?: SeasonCreateWithoutDialoguesInput
  connect?: SeasonWhereUniqueInput
}

export interface ArchiveUpdateInput {
  linkUrl?: String
  fileName?: String
  files?: FileUpdateManyWithoutArchiveInput
}

export interface SeasonCreateWithoutDialoguesInput {
  anime: AnimeCreateOneWithoutSeasonsInput
  archive?: ArchiveCreateOneInput
}

export interface SeasonUpdateInput {
  anime?: AnimeUpdateOneRequiredWithoutSeasonsInput
  archive?: ArchiveUpdateOneInput
  dialogues?: DialogueUpdateManyWithoutSeasonInput
}

export interface DialogueCreateManyWithoutEpisodeInput {
  create?: DialogueCreateWithoutEpisodeInput[] | DialogueCreateWithoutEpisodeInput
  connect?: DialogueWhereUniqueInput[] | DialogueWhereUniqueInput
}

export interface EpisodeUpdateInput {
  displayName?: String
  episodeNumber?: String
  length?: Int
  subGroup?: String
  language?: String
  anime?: AnimeUpdateOneRequiredWithoutEpisodesInput
  season?: SeasonUpdateOneInput
  file?: FileUpdateOneRequiredWithoutEpisodeInput
  characters?: CharacterUpdateManyWithoutEpisodesInput
  dialogues?: DialogueUpdateManyWithoutEpisodeInput
}

export interface DialogueCreateWithoutEpisodeInput {
  order: Int
  start: Int
  end: Int
  text: String
  character: CharacterCreateOneWithoutDialoguesInput
  season?: SeasonCreateOneWithoutDialoguesInput
  anime: AnimeCreateOneWithoutDialoguesInput
}

export interface CharacterUpdateInput {
  anilistId?: Int
  rawName?: String
  name?: String
  certainty?: Int
  thumbnailUrl?: String
  animes?: AnimeUpdateManyWithoutCharactersInput
  episodes?: EpisodeUpdateManyWithoutCharactersInput
  seasons?: SeasonUpdateManyInput
  dialogues?: DialogueUpdateManyWithoutCharacterInput
}

export interface CharacterCreateInput {
  anilistId?: Int
  rawName: String
  name?: String
  certainty?: Int
  thumbnailUrl?: String
  animes?: AnimeCreateManyWithoutCharactersInput
  episodes?: EpisodeCreateManyWithoutCharactersInput
  seasons?: SeasonCreateManyInput
  dialogues?: DialogueCreateManyWithoutCharacterInput
}

export interface EpisodeUpsertWithWhereUniqueWithoutCharactersInput {
  where: EpisodeWhereUniqueInput
  update: EpisodeUpdateWithoutCharactersDataInput
  create: EpisodeCreateWithoutCharactersInput
}

export interface DialogueCreateInput {
  order: Int
  start: Int
  end: Int
  text: String
  character: CharacterCreateOneWithoutDialoguesInput
  episode: EpisodeCreateOneWithoutDialoguesInput
  season?: SeasonCreateOneWithoutDialoguesInput
  anime: AnimeCreateOneWithoutDialoguesInput
}

export interface DialogueUpsertWithWhereUniqueWithoutAnimeInput {
  where: DialogueWhereUniqueInput
  update: DialogueUpdateWithoutAnimeDataInput
  create: DialogueCreateWithoutAnimeInput
}

export interface EpisodeCreateInput {
  displayName?: String
  episodeNumber?: String
  length: Int
  subGroup?: String
  language?: String
  anime: AnimeCreateOneWithoutEpisodesInput
  season?: SeasonCreateOneInput
  file: FileCreateOneWithoutEpisodeInput
  characters?: CharacterCreateManyWithoutEpisodesInput
  dialogues?: DialogueCreateManyWithoutEpisodeInput
}

export interface AnimeUpsertWithWhereUniqueWithoutCharactersInput {
  where: AnimeWhereUniqueInput
  update: AnimeUpdateWithoutCharactersDataInput
  create: AnimeCreateWithoutCharactersInput
}

export interface FileCreateInput {
  linkUrl?: String
  fileName: String
  anime: AnimeCreateOneWithoutFilesInput
  archive?: ArchiveCreateOneWithoutFilesInput
  episode: EpisodeCreateOneWithoutFileInput
}

export interface SeasonUpsertNestedInput {
  update: SeasonUpdateDataInput
  create: SeasonCreateInput
}

export interface AnimeUpdateInput {
  anilistId?: Int
  malId?: Int
  rawName?: String
  name?: String
  thumbnailUrl?: String
  bannerUrl?: String
  characters?: CharacterUpdateManyWithoutAnimesInput
  episodes?: EpisodeUpdateManyWithoutAnimeInput
  dialogues?: DialogueUpdateManyWithoutAnimeInput
  seasons?: SeasonUpdateManyWithoutAnimeInput
  files?: FileUpdateManyWithoutAnimeInput
}

export interface FileUpsertWithWhereUniqueWithoutAnimeInput {
  where: FileWhereUniqueInput
  update: FileUpdateWithoutAnimeDataInput
  create: FileCreateWithoutAnimeInput
}

export interface SeasonUpdateOneWithoutDialoguesInput {
  create?: SeasonCreateWithoutDialoguesInput
  connect?: SeasonWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: SeasonUpdateWithoutDialoguesDataInput
  upsert?: SeasonUpsertWithoutDialoguesInput
}

export interface DialogueUpsertWithWhereUniqueWithoutEpisodeInput {
  where: DialogueWhereUniqueInput
  update: DialogueUpdateWithoutEpisodeDataInput
  create: DialogueCreateWithoutEpisodeInput
}

export interface CharacterUpdateWithWhereUniqueWithoutAnimesInput {
  where: CharacterWhereUniqueInput
  data: CharacterUpdateWithoutAnimesDataInput
}

export interface DialogueUpdateWithWhereUniqueWithoutEpisodeInput {
  where: DialogueWhereUniqueInput
  data: DialogueUpdateWithoutEpisodeDataInput
}

export interface CharacterUpdateWithoutAnimesDataInput {
  anilistId?: Int
  rawName?: String
  name?: String
  certainty?: Int
  thumbnailUrl?: String
  episodes?: EpisodeUpdateManyWithoutCharactersInput
  seasons?: SeasonUpdateManyInput
  dialogues?: DialogueUpdateManyWithoutCharacterInput
}

export interface CharacterUpsertWithWhereUniqueWithoutEpisodesInput {
  where: CharacterWhereUniqueInput
  update: CharacterUpdateWithoutEpisodesDataInput
  create: CharacterCreateWithoutEpisodesInput
}

export interface EpisodeUpdateManyWithoutCharactersInput {
  create?: EpisodeCreateWithoutCharactersInput[] | EpisodeCreateWithoutCharactersInput
  connect?: EpisodeWhereUniqueInput[] | EpisodeWhereUniqueInput
  disconnect?: EpisodeWhereUniqueInput[] | EpisodeWhereUniqueInput
  delete?: EpisodeWhereUniqueInput[] | EpisodeWhereUniqueInput
  update?: EpisodeUpdateWithWhereUniqueWithoutCharactersInput[] | EpisodeUpdateWithWhereUniqueWithoutCharactersInput
  upsert?: EpisodeUpsertWithWhereUniqueWithoutCharactersInput[] | EpisodeUpsertWithWhereUniqueWithoutCharactersInput
}

export interface SeasonUpsertWithoutDialoguesInput {
  update: SeasonUpdateWithoutDialoguesDataInput
  create: SeasonCreateWithoutDialoguesInput
}

export interface EpisodeUpdateWithWhereUniqueWithoutCharactersInput {
  where: EpisodeWhereUniqueInput
  data: EpisodeUpdateWithoutCharactersDataInput
}

export interface APIKeyCreateInput {
  token: String
  user: UserCreateOneInput
}

export interface EpisodeUpdateWithoutCharactersDataInput {
  displayName?: String
  episodeNumber?: String
  length?: Int
  subGroup?: String
  language?: String
  anime?: AnimeUpdateOneRequiredWithoutEpisodesInput
  season?: SeasonUpdateOneInput
  file?: FileUpdateOneRequiredWithoutEpisodeInput
  dialogues?: DialogueUpdateManyWithoutEpisodeInput
}

export interface UserCreateInput {
  name: String
  email: String
  anilistName?: String
  malName?: String
  profilePicture?: String
  description?: String
  hash: String
  salt: String
}

export interface SeasonWhereInput {
  AND?: SeasonWhereInput[] | SeasonWhereInput
  OR?: SeasonWhereInput[] | SeasonWhereInput
  NOT?: SeasonWhereInput[] | SeasonWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  anime?: AnimeWhereInput
  archive?: ArchiveWhereInput
  dialogues_every?: DialogueWhereInput
  dialogues_some?: DialogueWhereInput
  dialogues_none?: DialogueWhereInput
}

export interface CharacterCreateManyWithoutAnimesInput {
  create?: CharacterCreateWithoutAnimesInput[] | CharacterCreateWithoutAnimesInput
  connect?: CharacterWhereUniqueInput[] | CharacterWhereUniqueInput
}

export interface FileWhereInput {
  AND?: FileWhereInput[] | FileWhereInput
  OR?: FileWhereInput[] | FileWhereInput
  NOT?: FileWhereInput[] | FileWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  linkUrl?: String
  linkUrl_not?: String
  linkUrl_in?: String[] | String
  linkUrl_not_in?: String[] | String
  linkUrl_lt?: String
  linkUrl_lte?: String
  linkUrl_gt?: String
  linkUrl_gte?: String
  linkUrl_contains?: String
  linkUrl_not_contains?: String
  linkUrl_starts_with?: String
  linkUrl_not_starts_with?: String
  linkUrl_ends_with?: String
  linkUrl_not_ends_with?: String
  fileName?: String
  fileName_not?: String
  fileName_in?: String[] | String
  fileName_not_in?: String[] | String
  fileName_lt?: String
  fileName_lte?: String
  fileName_gt?: String
  fileName_gte?: String
  fileName_contains?: String
  fileName_not_contains?: String
  fileName_starts_with?: String
  fileName_not_starts_with?: String
  fileName_ends_with?: String
  fileName_not_ends_with?: String
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  anime?: AnimeWhereInput
  archive?: ArchiveWhereInput
  episode?: EpisodeWhereInput
}

export interface EpisodeCreateManyWithoutCharactersInput {
  create?: EpisodeCreateWithoutCharactersInput[] | EpisodeCreateWithoutCharactersInput
  connect?: EpisodeWhereUniqueInput[] | EpisodeWhereUniqueInput
}

export interface CharacterWhereInput {
  AND?: CharacterWhereInput[] | CharacterWhereInput
  OR?: CharacterWhereInput[] | CharacterWhereInput
  NOT?: CharacterWhereInput[] | CharacterWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  anilistId?: Int
  anilistId_not?: Int
  anilistId_in?: Int[] | Int
  anilistId_not_in?: Int[] | Int
  anilistId_lt?: Int
  anilistId_lte?: Int
  anilistId_gt?: Int
  anilistId_gte?: Int
  rawName?: String
  rawName_not?: String
  rawName_in?: String[] | String
  rawName_not_in?: String[] | String
  rawName_lt?: String
  rawName_lte?: String
  rawName_gt?: String
  rawName_gte?: String
  rawName_contains?: String
  rawName_not_contains?: String
  rawName_starts_with?: String
  rawName_not_starts_with?: String
  rawName_ends_with?: String
  rawName_not_ends_with?: String
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  certainty?: Int
  certainty_not?: Int
  certainty_in?: Int[] | Int
  certainty_not_in?: Int[] | Int
  certainty_lt?: Int
  certainty_lte?: Int
  certainty_gt?: Int
  certainty_gte?: Int
  thumbnailUrl?: String
  thumbnailUrl_not?: String
  thumbnailUrl_in?: String[] | String
  thumbnailUrl_not_in?: String[] | String
  thumbnailUrl_lt?: String
  thumbnailUrl_lte?: String
  thumbnailUrl_gt?: String
  thumbnailUrl_gte?: String
  thumbnailUrl_contains?: String
  thumbnailUrl_not_contains?: String
  thumbnailUrl_starts_with?: String
  thumbnailUrl_not_starts_with?: String
  thumbnailUrl_ends_with?: String
  thumbnailUrl_not_ends_with?: String
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  animes_every?: AnimeWhereInput
  animes_some?: AnimeWhereInput
  animes_none?: AnimeWhereInput
  episodes_every?: EpisodeWhereInput
  episodes_some?: EpisodeWhereInput
  episodes_none?: EpisodeWhereInput
  seasons_every?: SeasonWhereInput
  seasons_some?: SeasonWhereInput
  seasons_none?: SeasonWhereInput
  dialogues_every?: DialogueWhereInput
  dialogues_some?: DialogueWhereInput
  dialogues_none?: DialogueWhereInput
}

export interface AnimeCreateOneWithoutEpisodesInput {
  create?: AnimeCreateWithoutEpisodesInput
  connect?: AnimeWhereUniqueInput
}

export interface AnimeWhereInput {
  AND?: AnimeWhereInput[] | AnimeWhereInput
  OR?: AnimeWhereInput[] | AnimeWhereInput
  NOT?: AnimeWhereInput[] | AnimeWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  anilistId?: Int
  anilistId_not?: Int
  anilistId_in?: Int[] | Int
  anilistId_not_in?: Int[] | Int
  anilistId_lt?: Int
  anilistId_lte?: Int
  anilistId_gt?: Int
  anilistId_gte?: Int
  malId?: Int
  malId_not?: Int
  malId_in?: Int[] | Int
  malId_not_in?: Int[] | Int
  malId_lt?: Int
  malId_lte?: Int
  malId_gt?: Int
  malId_gte?: Int
  rawName?: String
  rawName_not?: String
  rawName_in?: String[] | String
  rawName_not_in?: String[] | String
  rawName_lt?: String
  rawName_lte?: String
  rawName_gt?: String
  rawName_gte?: String
  rawName_contains?: String
  rawName_not_contains?: String
  rawName_starts_with?: String
  rawName_not_starts_with?: String
  rawName_ends_with?: String
  rawName_not_ends_with?: String
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  thumbnailUrl?: String
  thumbnailUrl_not?: String
  thumbnailUrl_in?: String[] | String
  thumbnailUrl_not_in?: String[] | String
  thumbnailUrl_lt?: String
  thumbnailUrl_lte?: String
  thumbnailUrl_gt?: String
  thumbnailUrl_gte?: String
  thumbnailUrl_contains?: String
  thumbnailUrl_not_contains?: String
  thumbnailUrl_starts_with?: String
  thumbnailUrl_not_starts_with?: String
  thumbnailUrl_ends_with?: String
  thumbnailUrl_not_ends_with?: String
  bannerUrl?: String
  bannerUrl_not?: String
  bannerUrl_in?: String[] | String
  bannerUrl_not_in?: String[] | String
  bannerUrl_lt?: String
  bannerUrl_lte?: String
  bannerUrl_gt?: String
  bannerUrl_gte?: String
  bannerUrl_contains?: String
  bannerUrl_not_contains?: String
  bannerUrl_starts_with?: String
  bannerUrl_not_starts_with?: String
  bannerUrl_ends_with?: String
  bannerUrl_not_ends_with?: String
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  characters_every?: CharacterWhereInput
  characters_some?: CharacterWhereInput
  characters_none?: CharacterWhereInput
  episodes_every?: EpisodeWhereInput
  episodes_some?: EpisodeWhereInput
  episodes_none?: EpisodeWhereInput
  dialogues_every?: DialogueWhereInput
  dialogues_some?: DialogueWhereInput
  dialogues_none?: DialogueWhereInput
  seasons_every?: SeasonWhereInput
  seasons_some?: SeasonWhereInput
  seasons_none?: SeasonWhereInput
  files_every?: FileWhereInput
  files_some?: FileWhereInput
  files_none?: FileWhereInput
}

export interface DialogueCreateManyWithoutAnimeInput {
  create?: DialogueCreateWithoutAnimeInput[] | DialogueCreateWithoutAnimeInput
  connect?: DialogueWhereUniqueInput[] | DialogueWhereUniqueInput
}

export interface DialogueUpdateWithoutAnimeDataInput {
  order?: Int
  start?: Int
  end?: Int
  text?: String
  character?: CharacterUpdateOneRequiredWithoutDialoguesInput
  episode?: EpisodeUpdateOneRequiredWithoutDialoguesInput
  season?: SeasonUpdateOneWithoutDialoguesInput
}

export interface CharacterCreateOneWithoutDialoguesInput {
  create?: CharacterCreateWithoutDialoguesInput
  connect?: CharacterWhereUniqueInput
}

export interface CharacterUpdateOneRequiredWithoutDialoguesInput {
  create?: CharacterCreateWithoutDialoguesInput
  connect?: CharacterWhereUniqueInput
  update?: CharacterUpdateWithoutDialoguesDataInput
  upsert?: CharacterUpsertWithoutDialoguesInput
}

export interface AnimeCreateManyWithoutCharactersInput {
  create?: AnimeCreateWithoutCharactersInput[] | AnimeCreateWithoutCharactersInput
  connect?: AnimeWhereUniqueInput[] | AnimeWhereUniqueInput
}

export interface CharacterUpdateWithoutDialoguesDataInput {
  anilistId?: Int
  rawName?: String
  name?: String
  certainty?: Int
  thumbnailUrl?: String
  animes?: AnimeUpdateManyWithoutCharactersInput
  episodes?: EpisodeUpdateManyWithoutCharactersInput
  seasons?: SeasonUpdateManyInput
}

export interface EpisodeCreateManyWithoutAnimeInput {
  create?: EpisodeCreateWithoutAnimeInput[] | EpisodeCreateWithoutAnimeInput
  connect?: EpisodeWhereUniqueInput[] | EpisodeWhereUniqueInput
}

export interface AnimeUpdateManyWithoutCharactersInput {
  create?: AnimeCreateWithoutCharactersInput[] | AnimeCreateWithoutCharactersInput
  connect?: AnimeWhereUniqueInput[] | AnimeWhereUniqueInput
  disconnect?: AnimeWhereUniqueInput[] | AnimeWhereUniqueInput
  delete?: AnimeWhereUniqueInput[] | AnimeWhereUniqueInput
  update?: AnimeUpdateWithWhereUniqueWithoutCharactersInput[] | AnimeUpdateWithWhereUniqueWithoutCharactersInput
  upsert?: AnimeUpsertWithWhereUniqueWithoutCharactersInput[] | AnimeUpsertWithWhereUniqueWithoutCharactersInput
}

export interface SeasonCreateOneInput {
  create?: SeasonCreateInput
  connect?: SeasonWhereUniqueInput
}

export interface AnimeUpdateWithWhereUniqueWithoutCharactersInput {
  where: AnimeWhereUniqueInput
  data: AnimeUpdateWithoutCharactersDataInput
}

export interface AnimeCreateOneWithoutSeasonsInput {
  create?: AnimeCreateWithoutSeasonsInput
  connect?: AnimeWhereUniqueInput
}

export interface AnimeUpdateWithoutCharactersDataInput {
  anilistId?: Int
  malId?: Int
  rawName?: String
  name?: String
  thumbnailUrl?: String
  bannerUrl?: String
  episodes?: EpisodeUpdateManyWithoutAnimeInput
  dialogues?: DialogueUpdateManyWithoutAnimeInput
  seasons?: SeasonUpdateManyWithoutAnimeInput
  files?: FileUpdateManyWithoutAnimeInput
}

export interface FileCreateManyWithoutAnimeInput {
  create?: FileCreateWithoutAnimeInput[] | FileCreateWithoutAnimeInput
  connect?: FileWhereUniqueInput[] | FileWhereUniqueInput
}

export interface EpisodeUpdateManyWithoutAnimeInput {
  create?: EpisodeCreateWithoutAnimeInput[] | EpisodeCreateWithoutAnimeInput
  connect?: EpisodeWhereUniqueInput[] | EpisodeWhereUniqueInput
  disconnect?: EpisodeWhereUniqueInput[] | EpisodeWhereUniqueInput
  delete?: EpisodeWhereUniqueInput[] | EpisodeWhereUniqueInput
  update?: EpisodeUpdateWithWhereUniqueWithoutAnimeInput[] | EpisodeUpdateWithWhereUniqueWithoutAnimeInput
  upsert?: EpisodeUpsertWithWhereUniqueWithoutAnimeInput[] | EpisodeUpsertWithWhereUniqueWithoutAnimeInput
}

export interface ArchiveCreateOneWithoutFilesInput {
  create?: ArchiveCreateWithoutFilesInput
  connect?: ArchiveWhereUniqueInput
}

export interface EpisodeUpdateWithWhereUniqueWithoutAnimeInput {
  where: EpisodeWhereUniqueInput
  data: EpisodeUpdateWithoutAnimeDataInput
}

export interface EpisodeCreateOneWithoutFileInput {
  create?: EpisodeCreateWithoutFileInput
  connect?: EpisodeWhereUniqueInput
}

export interface EpisodeUpdateWithoutAnimeDataInput {
  displayName?: String
  episodeNumber?: String
  length?: Int
  subGroup?: String
  language?: String
  season?: SeasonUpdateOneInput
  file?: FileUpdateOneRequiredWithoutEpisodeInput
  characters?: CharacterUpdateManyWithoutEpisodesInput
  dialogues?: DialogueUpdateManyWithoutEpisodeInput
}

export interface CharacterCreateManyWithoutEpisodesInput {
  create?: CharacterCreateWithoutEpisodesInput[] | CharacterCreateWithoutEpisodesInput
  connect?: CharacterWhereUniqueInput[] | CharacterWhereUniqueInput
}

export interface SeasonUpdateOneInput {
  create?: SeasonCreateInput
  connect?: SeasonWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: SeasonUpdateDataInput
  upsert?: SeasonUpsertNestedInput
}

export interface SeasonCreateManyInput {
  create?: SeasonCreateInput[] | SeasonCreateInput
  connect?: SeasonWhereUniqueInput[] | SeasonWhereUniqueInput
}

export interface SeasonUpdateDataInput {
  anime?: AnimeUpdateOneRequiredWithoutSeasonsInput
  archive?: ArchiveUpdateOneInput
  dialogues?: DialogueUpdateManyWithoutSeasonInput
}

export interface DialogueCreateWithoutCharacterInput {
  order: Int
  start: Int
  end: Int
  text: String
  episode: EpisodeCreateOneWithoutDialoguesInput
  season?: SeasonCreateOneWithoutDialoguesInput
  anime: AnimeCreateOneWithoutDialoguesInput
}

export interface AnimeUpdateOneRequiredWithoutSeasonsInput {
  create?: AnimeCreateWithoutSeasonsInput
  connect?: AnimeWhereUniqueInput
  update?: AnimeUpdateWithoutSeasonsDataInput
  upsert?: AnimeUpsertWithoutSeasonsInput
}

export interface EpisodeCreateWithoutDialoguesInput {
  displayName?: String
  episodeNumber?: String
  length: Int
  subGroup?: String
  language?: String
  anime: AnimeCreateOneWithoutEpisodesInput
  season?: SeasonCreateOneInput
  file: FileCreateOneWithoutEpisodeInput
  characters?: CharacterCreateManyWithoutEpisodesInput
}

export interface AnimeUpdateWithoutSeasonsDataInput {
  anilistId?: Int
  malId?: Int
  rawName?: String
  name?: String
  thumbnailUrl?: String
  bannerUrl?: String
  characters?: CharacterUpdateManyWithoutAnimesInput
  episodes?: EpisodeUpdateManyWithoutAnimeInput
  dialogues?: DialogueUpdateManyWithoutAnimeInput
  files?: FileUpdateManyWithoutAnimeInput
}

export interface FileCreateWithoutEpisodeInput {
  linkUrl?: String
  fileName: String
  anime: AnimeCreateOneWithoutFilesInput
  archive?: ArchiveCreateOneWithoutFilesInput
}

export interface FileUpdateManyWithoutAnimeInput {
  create?: FileCreateWithoutAnimeInput[] | FileCreateWithoutAnimeInput
  connect?: FileWhereUniqueInput[] | FileWhereUniqueInput
  disconnect?: FileWhereUniqueInput[] | FileWhereUniqueInput
  delete?: FileWhereUniqueInput[] | FileWhereUniqueInput
  update?: FileUpdateWithWhereUniqueWithoutAnimeInput[] | FileUpdateWithWhereUniqueWithoutAnimeInput
  upsert?: FileUpsertWithWhereUniqueWithoutAnimeInput[] | FileUpsertWithWhereUniqueWithoutAnimeInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface FileUpdateWithWhereUniqueWithoutAnimeInput {
  where: FileWhereUniqueInput
  data: FileUpdateWithoutAnimeDataInput
}

export interface DialogueSubscriptionWhereInput {
  AND?: DialogueSubscriptionWhereInput[] | DialogueSubscriptionWhereInput
  OR?: DialogueSubscriptionWhereInput[] | DialogueSubscriptionWhereInput
  NOT?: DialogueSubscriptionWhereInput[] | DialogueSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: DialogueWhereInput
}

export interface FileUpdateWithoutAnimeDataInput {
  linkUrl?: String
  fileName?: String
  archive?: ArchiveUpdateOneWithoutFilesInput
  episode?: EpisodeUpdateOneRequiredWithoutFileInput
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface ArchiveUpdateOneWithoutFilesInput {
  create?: ArchiveCreateWithoutFilesInput
  connect?: ArchiveWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: ArchiveUpdateWithoutFilesDataInput
  upsert?: ArchiveUpsertWithoutFilesInput
}

export interface DialogueWhereUniqueInput {
  id?: ID_Input
}

export interface ArchiveUpdateWithoutFilesDataInput {
  linkUrl?: String
  fileName?: String
}

export interface UserWhereUniqueInput {
  email?: String
  id?: ID_Input
}

export interface ArchiveUpsertWithoutFilesInput {
  update: ArchiveUpdateWithoutFilesDataInput
  create: ArchiveCreateWithoutFilesInput
}

export interface APIKeyUpdateInput {
  token?: String
  user?: UserUpdateOneRequiredInput
}

export interface EpisodeUpdateOneRequiredWithoutFileInput {
  create?: EpisodeCreateWithoutFileInput
  connect?: EpisodeWhereUniqueInput
  update?: EpisodeUpdateWithoutFileDataInput
  upsert?: EpisodeUpsertWithoutFileInput
}

export interface FileUpdateInput {
  linkUrl?: String
  fileName?: String
  anime?: AnimeUpdateOneRequiredWithoutFilesInput
  archive?: ArchiveUpdateOneWithoutFilesInput
  episode?: EpisodeUpdateOneRequiredWithoutFileInput
}

export interface EpisodeUpdateWithoutFileDataInput {
  displayName?: String
  episodeNumber?: String
  length?: Int
  subGroup?: String
  language?: String
  anime?: AnimeUpdateOneRequiredWithoutEpisodesInput
  season?: SeasonUpdateOneInput
  characters?: CharacterUpdateManyWithoutEpisodesInput
  dialogues?: DialogueUpdateManyWithoutEpisodeInput
}

export interface CharacterUpsertWithWhereUniqueWithoutAnimesInput {
  where: CharacterWhereUniqueInput
  update: CharacterUpdateWithoutAnimesDataInput
  create: CharacterCreateWithoutAnimesInput
}

export interface CharacterUpdateManyWithoutEpisodesInput {
  create?: CharacterCreateWithoutEpisodesInput[] | CharacterCreateWithoutEpisodesInput
  connect?: CharacterWhereUniqueInput[] | CharacterWhereUniqueInput
  disconnect?: CharacterWhereUniqueInput[] | CharacterWhereUniqueInput
  delete?: CharacterWhereUniqueInput[] | CharacterWhereUniqueInput
  update?: CharacterUpdateWithWhereUniqueWithoutEpisodesInput[] | CharacterUpdateWithWhereUniqueWithoutEpisodesInput
  upsert?: CharacterUpsertWithWhereUniqueWithoutEpisodesInput[] | CharacterUpsertWithWhereUniqueWithoutEpisodesInput
}

export interface CharacterUpsertWithoutDialoguesInput {
  update: CharacterUpdateWithoutDialoguesDataInput
  create: CharacterCreateWithoutDialoguesInput
}

export interface CharacterUpdateWithWhereUniqueWithoutEpisodesInput {
  where: CharacterWhereUniqueInput
  data: CharacterUpdateWithoutEpisodesDataInput
}

export interface AnimeUpsertWithoutSeasonsInput {
  update: AnimeUpdateWithoutSeasonsDataInput
  create: AnimeCreateWithoutSeasonsInput
}

export interface CharacterUpdateWithoutEpisodesDataInput {
  anilistId?: Int
  rawName?: String
  name?: String
  certainty?: Int
  thumbnailUrl?: String
  animes?: AnimeUpdateManyWithoutCharactersInput
  seasons?: SeasonUpdateManyInput
  dialogues?: DialogueUpdateManyWithoutCharacterInput
}

export interface DialogueUpdateWithoutEpisodeDataInput {
  order?: Int
  start?: Int
  end?: Int
  text?: String
  character?: CharacterUpdateOneRequiredWithoutDialoguesInput
  season?: SeasonUpdateOneWithoutDialoguesInput
  anime?: AnimeUpdateOneRequiredWithoutDialoguesInput
}

export interface SeasonUpdateManyInput {
  create?: SeasonCreateInput[] | SeasonCreateInput
  connect?: SeasonWhereUniqueInput[] | SeasonWhereUniqueInput
  disconnect?: SeasonWhereUniqueInput[] | SeasonWhereUniqueInput
  delete?: SeasonWhereUniqueInput[] | SeasonWhereUniqueInput
  update?: SeasonUpdateWithWhereUniqueNestedInput[] | SeasonUpdateWithWhereUniqueNestedInput
  upsert?: SeasonUpsertWithWhereUniqueNestedInput[] | SeasonUpsertWithWhereUniqueNestedInput
}

export interface DialogueUpsertWithWhereUniqueWithoutCharacterInput {
  where: DialogueWhereUniqueInput
  update: DialogueUpdateWithoutCharacterDataInput
  create: DialogueCreateWithoutCharacterInput
}

export interface SeasonUpdateWithWhereUniqueNestedInput {
  where: SeasonWhereUniqueInput
  data: SeasonUpdateDataInput
}

export interface UserCreateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
}

export interface SeasonUpsertWithWhereUniqueNestedInput {
  where: SeasonWhereUniqueInput
  update: SeasonUpdateDataInput
  create: SeasonCreateInput
}

export interface CharacterCreateWithoutAnimesInput {
  anilistId?: Int
  rawName: String
  name?: String
  certainty?: Int
  thumbnailUrl?: String
  episodes?: EpisodeCreateManyWithoutCharactersInput
  seasons?: SeasonCreateManyInput
  dialogues?: DialogueCreateManyWithoutCharacterInput
}

export interface DialogueUpdateManyWithoutCharacterInput {
  create?: DialogueCreateWithoutCharacterInput[] | DialogueCreateWithoutCharacterInput
  connect?: DialogueWhereUniqueInput[] | DialogueWhereUniqueInput
  disconnect?: DialogueWhereUniqueInput[] | DialogueWhereUniqueInput
  delete?: DialogueWhereUniqueInput[] | DialogueWhereUniqueInput
  update?: DialogueUpdateWithWhereUniqueWithoutCharacterInput[] | DialogueUpdateWithWhereUniqueWithoutCharacterInput
  upsert?: DialogueUpsertWithWhereUniqueWithoutCharacterInput[] | DialogueUpsertWithWhereUniqueWithoutCharacterInput
}

export interface AnimeCreateWithoutEpisodesInput {
  anilistId?: Int
  malId?: Int
  rawName: String
  name?: String
  thumbnailUrl?: String
  bannerUrl?: String
  characters?: CharacterCreateManyWithoutAnimesInput
  dialogues?: DialogueCreateManyWithoutAnimeInput
  seasons?: SeasonCreateManyWithoutAnimeInput
  files?: FileCreateManyWithoutAnimeInput
}

export interface DialogueUpdateWithWhereUniqueWithoutCharacterInput {
  where: DialogueWhereUniqueInput
  data: DialogueUpdateWithoutCharacterDataInput
}

export interface CharacterCreateWithoutDialoguesInput {
  anilistId?: Int
  rawName: String
  name?: String
  certainty?: Int
  thumbnailUrl?: String
  animes?: AnimeCreateManyWithoutCharactersInput
  episodes?: EpisodeCreateManyWithoutCharactersInput
  seasons?: SeasonCreateManyInput
}

export interface DialogueUpdateWithoutCharacterDataInput {
  order?: Int
  start?: Int
  end?: Int
  text?: String
  episode?: EpisodeUpdateOneRequiredWithoutDialoguesInput
  season?: SeasonUpdateOneWithoutDialoguesInput
  anime?: AnimeUpdateOneRequiredWithoutDialoguesInput
}

export interface EpisodeCreateWithoutAnimeInput {
  displayName?: String
  episodeNumber?: String
  length: Int
  subGroup?: String
  language?: String
  season?: SeasonCreateOneInput
  file: FileCreateOneWithoutEpisodeInput
  characters?: CharacterCreateManyWithoutEpisodesInput
  dialogues?: DialogueCreateManyWithoutEpisodeInput
}

export interface EpisodeUpdateOneRequiredWithoutDialoguesInput {
  create?: EpisodeCreateWithoutDialoguesInput
  connect?: EpisodeWhereUniqueInput
  update?: EpisodeUpdateWithoutDialoguesDataInput
  upsert?: EpisodeUpsertWithoutDialoguesInput
}

export interface AnimeCreateWithoutSeasonsInput {
  anilistId?: Int
  malId?: Int
  rawName: String
  name?: String
  thumbnailUrl?: String
  bannerUrl?: String
  characters?: CharacterCreateManyWithoutAnimesInput
  episodes?: EpisodeCreateManyWithoutAnimeInput
  dialogues?: DialogueCreateManyWithoutAnimeInput
  files?: FileCreateManyWithoutAnimeInput
}

export interface EpisodeUpdateWithoutDialoguesDataInput {
  displayName?: String
  episodeNumber?: String
  length?: Int
  subGroup?: String
  language?: String
  anime?: AnimeUpdateOneRequiredWithoutEpisodesInput
  season?: SeasonUpdateOneInput
  file?: FileUpdateOneRequiredWithoutEpisodeInput
  characters?: CharacterUpdateManyWithoutEpisodesInput
}

export interface ArchiveCreateWithoutFilesInput {
  linkUrl?: String
  fileName: String
}

export interface FileUpdateOneRequiredWithoutEpisodeInput {
  create?: FileCreateWithoutEpisodeInput
  connect?: FileWhereUniqueInput
  update?: FileUpdateWithoutEpisodeDataInput
  upsert?: FileUpsertWithoutEpisodeInput
}

export interface CharacterCreateWithoutEpisodesInput {
  anilistId?: Int
  rawName: String
  name?: String
  certainty?: Int
  thumbnailUrl?: String
  animes?: AnimeCreateManyWithoutCharactersInput
  seasons?: SeasonCreateManyInput
  dialogues?: DialogueCreateManyWithoutCharacterInput
}

export interface FileUpdateWithoutEpisodeDataInput {
  linkUrl?: String
  fileName?: String
  anime?: AnimeUpdateOneRequiredWithoutFilesInput
  archive?: ArchiveUpdateOneWithoutFilesInput
}

export interface EpisodeCreateOneWithoutDialoguesInput {
  create?: EpisodeCreateWithoutDialoguesInput
  connect?: EpisodeWhereUniqueInput
}

export interface AnimeUpdateOneRequiredWithoutFilesInput {
  create?: AnimeCreateWithoutFilesInput
  connect?: AnimeWhereUniqueInput
  update?: AnimeUpdateWithoutFilesDataInput
  upsert?: AnimeUpsertWithoutFilesInput
}

export interface ArchiveSubscriptionWhereInput {
  AND?: ArchiveSubscriptionWhereInput[] | ArchiveSubscriptionWhereInput
  OR?: ArchiveSubscriptionWhereInput[] | ArchiveSubscriptionWhereInput
  NOT?: ArchiveSubscriptionWhereInput[] | ArchiveSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ArchiveWhereInput
}

export interface AnimeUpdateWithoutFilesDataInput {
  anilistId?: Int
  malId?: Int
  rawName?: String
  name?: String
  thumbnailUrl?: String
  bannerUrl?: String
  characters?: CharacterUpdateManyWithoutAnimesInput
  episodes?: EpisodeUpdateManyWithoutAnimeInput
  dialogues?: DialogueUpdateManyWithoutAnimeInput
  seasons?: SeasonUpdateManyWithoutAnimeInput
}

export interface AnimeSubscriptionWhereInput {
  AND?: AnimeSubscriptionWhereInput[] | AnimeSubscriptionWhereInput
  OR?: AnimeSubscriptionWhereInput[] | AnimeSubscriptionWhereInput
  NOT?: AnimeSubscriptionWhereInput[] | AnimeSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: AnimeWhereInput
}

export interface SeasonUpdateManyWithoutAnimeInput {
  create?: SeasonCreateWithoutAnimeInput[] | SeasonCreateWithoutAnimeInput
  connect?: SeasonWhereUniqueInput[] | SeasonWhereUniqueInput
  disconnect?: SeasonWhereUniqueInput[] | SeasonWhereUniqueInput
  delete?: SeasonWhereUniqueInput[] | SeasonWhereUniqueInput
  update?: SeasonUpdateWithWhereUniqueWithoutAnimeInput[] | SeasonUpdateWithWhereUniqueWithoutAnimeInput
  upsert?: SeasonUpsertWithWhereUniqueWithoutAnimeInput[] | SeasonUpsertWithWhereUniqueWithoutAnimeInput
}

export interface FileWhereUniqueInput {
  id?: ID_Input
  fileName?: String
}

export interface SeasonUpdateWithWhereUniqueWithoutAnimeInput {
  where: SeasonWhereUniqueInput
  data: SeasonUpdateWithoutAnimeDataInput
}

export interface UserUpdateInput {
  name?: String
  email?: String
  anilistName?: String
  malName?: String
  profilePicture?: String
  description?: String
  hash?: String
  salt?: String
}

export interface SeasonUpdateWithoutAnimeDataInput {
  archive?: ArchiveUpdateOneInput
  dialogues?: DialogueUpdateManyWithoutSeasonInput
}

export interface AnimeUpsertWithoutEpisodesInput {
  update: AnimeUpdateWithoutEpisodesDataInput
  create: AnimeCreateWithoutEpisodesInput
}

export interface ArchiveUpdateOneInput {
  create?: ArchiveCreateInput
  connect?: ArchiveWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: ArchiveUpdateDataInput
  upsert?: ArchiveUpsertNestedInput
}

export interface EpisodeUpsertWithoutFileInput {
  update: EpisodeUpdateWithoutFileDataInput
  create: EpisodeCreateWithoutFileInput
}

export interface ArchiveUpdateDataInput {
  linkUrl?: String
  fileName?: String
  files?: FileUpdateManyWithoutArchiveInput
}

export interface SeasonUpdateWithoutDialoguesDataInput {
  anime?: AnimeUpdateOneRequiredWithoutSeasonsInput
  archive?: ArchiveUpdateOneInput
}

export interface FileUpdateManyWithoutArchiveInput {
  create?: FileCreateWithoutArchiveInput[] | FileCreateWithoutArchiveInput
  connect?: FileWhereUniqueInput[] | FileWhereUniqueInput
  disconnect?: FileWhereUniqueInput[] | FileWhereUniqueInput
  delete?: FileWhereUniqueInput[] | FileWhereUniqueInput
  update?: FileUpdateWithWhereUniqueWithoutArchiveInput[] | FileUpdateWithWhereUniqueWithoutArchiveInput
  upsert?: FileUpsertWithWhereUniqueWithoutArchiveInput[] | FileUpsertWithWhereUniqueWithoutArchiveInput
}

export interface EpisodeCreateWithoutCharactersInput {
  displayName?: String
  episodeNumber?: String
  length: Int
  subGroup?: String
  language?: String
  anime: AnimeCreateOneWithoutEpisodesInput
  season?: SeasonCreateOneInput
  file: FileCreateOneWithoutEpisodeInput
  dialogues?: DialogueCreateManyWithoutEpisodeInput
}

export interface FileUpdateWithWhereUniqueWithoutArchiveInput {
  where: FileWhereUniqueInput
  data: FileUpdateWithoutArchiveDataInput
}

export interface AnimeCreateWithoutCharactersInput {
  anilistId?: Int
  malId?: Int
  rawName: String
  name?: String
  thumbnailUrl?: String
  bannerUrl?: String
  episodes?: EpisodeCreateManyWithoutAnimeInput
  dialogues?: DialogueCreateManyWithoutAnimeInput
  seasons?: SeasonCreateManyWithoutAnimeInput
  files?: FileCreateManyWithoutAnimeInput
}

export interface FileUpdateWithoutArchiveDataInput {
  linkUrl?: String
  fileName?: String
  anime?: AnimeUpdateOneRequiredWithoutFilesInput
  episode?: EpisodeUpdateOneRequiredWithoutFileInput
}

export interface FileCreateWithoutAnimeInput {
  linkUrl?: String
  fileName: String
  archive?: ArchiveCreateOneWithoutFilesInput
  episode: EpisodeCreateOneWithoutFileInput
}

export interface FileUpsertWithWhereUniqueWithoutArchiveInput {
  where: FileWhereUniqueInput
  update: FileUpdateWithoutArchiveDataInput
  create: FileCreateWithoutArchiveInput
}

export interface DialogueCreateManyWithoutCharacterInput {
  create?: DialogueCreateWithoutCharacterInput[] | DialogueCreateWithoutCharacterInput
  connect?: DialogueWhereUniqueInput[] | DialogueWhereUniqueInput
}

export interface ArchiveUpsertNestedInput {
  update: ArchiveUpdateDataInput
  create: ArchiveCreateInput
}

export interface FileSubscriptionWhereInput {
  AND?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  OR?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  NOT?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: FileWhereInput
}

export interface DialogueUpdateManyWithoutSeasonInput {
  create?: DialogueCreateWithoutSeasonInput[] | DialogueCreateWithoutSeasonInput
  connect?: DialogueWhereUniqueInput[] | DialogueWhereUniqueInput
  disconnect?: DialogueWhereUniqueInput[] | DialogueWhereUniqueInput
  delete?: DialogueWhereUniqueInput[] | DialogueWhereUniqueInput
  update?: DialogueUpdateWithWhereUniqueWithoutSeasonInput[] | DialogueUpdateWithWhereUniqueWithoutSeasonInput
  upsert?: DialogueUpsertWithWhereUniqueWithoutSeasonInput[] | DialogueUpsertWithWhereUniqueWithoutSeasonInput
}

export interface UserUpdateDataInput {
  name?: String
  email?: String
  anilistName?: String
  malName?: String
  profilePicture?: String
  description?: String
  hash?: String
  salt?: String
}

export interface DialogueUpdateWithWhereUniqueWithoutSeasonInput {
  where: DialogueWhereUniqueInput
  data: DialogueUpdateWithoutSeasonDataInput
}

export interface EpisodeUpsertWithWhereUniqueWithoutAnimeInput {
  where: EpisodeWhereUniqueInput
  update: EpisodeUpdateWithoutAnimeDataInput
  create: EpisodeCreateWithoutAnimeInput
}

export interface DialogueUpdateWithoutSeasonDataInput {
  order?: Int
  start?: Int
  end?: Int
  text?: String
  character?: CharacterUpdateOneRequiredWithoutDialoguesInput
  episode?: EpisodeUpdateOneRequiredWithoutDialoguesInput
  anime?: AnimeUpdateOneRequiredWithoutDialoguesInput
}

export interface AnimeCreateInput {
  anilistId?: Int
  malId?: Int
  rawName: String
  name?: String
  thumbnailUrl?: String
  bannerUrl?: String
  characters?: CharacterCreateManyWithoutAnimesInput
  episodes?: EpisodeCreateManyWithoutAnimeInput
  dialogues?: DialogueCreateManyWithoutAnimeInput
  seasons?: SeasonCreateManyWithoutAnimeInput
  files?: FileCreateManyWithoutAnimeInput
}

export interface AnimeUpdateOneRequiredWithoutDialoguesInput {
  create?: AnimeCreateWithoutDialoguesInput
  connect?: AnimeWhereUniqueInput
  update?: AnimeUpdateWithoutDialoguesDataInput
  upsert?: AnimeUpsertWithoutDialoguesInput
}

export interface SeasonCreateInput {
  anime: AnimeCreateOneWithoutSeasonsInput
  archive?: ArchiveCreateOneInput
  dialogues?: DialogueCreateManyWithoutSeasonInput
}

export interface AnimeUpdateWithoutDialoguesDataInput {
  anilistId?: Int
  malId?: Int
  rawName?: String
  name?: String
  thumbnailUrl?: String
  bannerUrl?: String
  characters?: CharacterUpdateManyWithoutAnimesInput
  episodes?: EpisodeUpdateManyWithoutAnimeInput
  seasons?: SeasonUpdateManyWithoutAnimeInput
  files?: FileUpdateManyWithoutAnimeInput
}

export interface FileCreateOneWithoutEpisodeInput {
  create?: FileCreateWithoutEpisodeInput
  connect?: FileWhereUniqueInput
}

export interface AnimeUpsertWithoutDialoguesInput {
  update: AnimeUpdateWithoutDialoguesDataInput
  create: AnimeCreateWithoutDialoguesInput
}

export interface DialogueUpdateInput {
  order?: Int
  start?: Int
  end?: Int
  text?: String
  character?: CharacterUpdateOneRequiredWithoutDialoguesInput
  episode?: EpisodeUpdateOneRequiredWithoutDialoguesInput
  season?: SeasonUpdateOneWithoutDialoguesInput
  anime?: AnimeUpdateOneRequiredWithoutDialoguesInput
}

export interface FileUpsertWithoutEpisodeInput {
  update: FileUpdateWithoutEpisodeDataInput
  create: FileCreateWithoutEpisodeInput
}

export interface AnimeUpsertWithoutFilesInput {
  update: AnimeUpdateWithoutFilesDataInput
  create: AnimeCreateWithoutFilesInput
}

export interface SeasonUpsertWithWhereUniqueWithoutAnimeInput {
  where: SeasonWhereUniqueInput
  update: SeasonUpdateWithoutAnimeDataInput
  create: SeasonCreateWithoutAnimeInput
}

export interface DialogueUpsertWithWhereUniqueWithoutSeasonInput {
  where: DialogueWhereUniqueInput
  update: DialogueUpdateWithoutSeasonDataInput
  create: DialogueCreateWithoutSeasonInput
}

export interface DialogueUpdateManyWithoutEpisodeInput {
  create?: DialogueCreateWithoutEpisodeInput[] | DialogueCreateWithoutEpisodeInput
  connect?: DialogueWhereUniqueInput[] | DialogueWhereUniqueInput
  disconnect?: DialogueWhereUniqueInput[] | DialogueWhereUniqueInput
  delete?: DialogueWhereUniqueInput[] | DialogueWhereUniqueInput
  update?: DialogueUpdateWithWhereUniqueWithoutEpisodeInput[] | DialogueUpdateWithWhereUniqueWithoutEpisodeInput
  upsert?: DialogueUpsertWithWhereUniqueWithoutEpisodeInput[] | DialogueUpsertWithWhereUniqueWithoutEpisodeInput
}

export interface AnimeWhereUniqueInput {
  id?: ID_Input
  rawName?: String
}

export interface EpisodeCreateWithoutFileInput {
  displayName?: String
  episodeNumber?: String
  length: Int
  subGroup?: String
  language?: String
  anime: AnimeCreateOneWithoutEpisodesInput
  season?: SeasonCreateOneInput
  characters?: CharacterCreateManyWithoutEpisodesInput
  dialogues?: DialogueCreateManyWithoutEpisodeInput
}

export interface DialogueCreateWithoutAnimeInput {
  order: Int
  start: Int
  end: Int
  text: String
  character: CharacterCreateOneWithoutDialoguesInput
  episode: EpisodeCreateOneWithoutDialoguesInput
  season?: SeasonCreateOneWithoutDialoguesInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface ArchivePreviousValues {
  id: ID_Output
  linkUrl?: String
  fileName: String
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface Episode extends Node {
  id: ID_Output
  anime: Anime
  season?: Season
  file: File
  displayName?: String
  episodeNumber?: String
  length: Int
  subGroup: String
  language: String
  characters?: Character[]
  dialogues?: Dialogue[]
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface APIKeyConnection {
  pageInfo: PageInfo
  edges: APIKeyEdge[]
  aggregate: AggregateAPIKey
}

export interface Anime extends Node {
  id: ID_Output
  anilistId?: Int
  malId?: Int
  rawName: String
  name?: String
  thumbnailUrl?: String
  bannerUrl?: String
  characters?: Character[]
  episodes?: Episode[]
  dialogues?: Dialogue[]
  seasons?: Season[]
  files?: File[]
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateArchive {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface ArchiveConnection {
  pageInfo: PageInfo
  edges: ArchiveEdge[]
  aggregate: AggregateArchive
}

export interface BatchPayload {
  count: Long
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface Character extends Node {
  id: ID_Output
  anilistId?: Int
  rawName: String
  name?: String
  certainty?: Int
  thumbnailUrl?: String
  animes?: Anime[]
  episodes?: Episode[]
  seasons?: Season[]
  dialogues?: Dialogue[]
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateSeason {
  count: Int
}

export interface UserPreviousValues {
  name: String
  email: String
  anilistName?: String
  malName?: String
  profilePicture?: String
  description?: String
  id: ID_Output
  hash: String
  salt: String
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface SeasonConnection {
  pageInfo: PageInfo
  edges: SeasonEdge[]
  aggregate: AggregateSeason
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

/*
 * An edge in a connection.

 */
export interface FileEdge {
  node: File
  cursor: String
}

export interface APIKeySubscriptionPayload {
  mutation: MutationType
  node?: APIKey
  updatedFields?: String[]
  previousValues?: APIKeyPreviousValues
}

export interface AggregateEpisode {
  count: Int
}

export interface APIKeyPreviousValues {
  token: String
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface EpisodeConnection {
  pageInfo: PageInfo
  edges: EpisodeEdge[]
  aggregate: AggregateEpisode
}

export interface Dialogue extends Node {
  id: ID_Output
  order: Int
  character: Character
  episode: Episode
  season?: Season
  anime: Anime
  start: Int
  end: Int
  text: String
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * An edge in a connection.

 */
export interface DialogueEdge {
  node: Dialogue
  cursor: String
}

export interface AnimeSubscriptionPayload {
  mutation: MutationType
  node?: Anime
  updatedFields?: String[]
  previousValues?: AnimePreviousValues
}

export interface AggregateCharacter {
  count: Int
}

export interface AnimePreviousValues {
  id: ID_Output
  anilistId?: Int
  malId?: Int
  rawName: String
  name?: String
  thumbnailUrl?: String
  bannerUrl?: String
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface CharacterConnection {
  pageInfo: PageInfo
  edges: CharacterEdge[]
  aggregate: AggregateCharacter
}

export interface APIKey {
  user: User
  token: String
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * An edge in a connection.

 */
export interface AnimeEdge {
  node: Anime
  cursor: String
}

export interface CharacterSubscriptionPayload {
  mutation: MutationType
  node?: Character
  updatedFields?: String[]
  previousValues?: CharacterPreviousValues
}

export interface AggregateAPIKey {
  count: Int
}

export interface CharacterPreviousValues {
  id: ID_Output
  anilistId?: Int
  rawName: String
  name?: String
  certainty?: Int
  thumbnailUrl?: String
  createdAt: DateTime
  updatedAt: DateTime
}

export interface ArchiveSubscriptionPayload {
  mutation: MutationType
  node?: Archive
  updatedFields?: String[]
  previousValues?: ArchivePreviousValues
}

export interface File extends Node {
  id: ID_Output
  anime: Anime
  archive?: Archive
  linkUrl?: String
  fileName: String
  episode: Episode
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateUser {
  count: Int
}

export interface DialogueSubscriptionPayload {
  mutation: MutationType
  node?: Dialogue
  updatedFields?: String[]
  previousValues?: DialoguePreviousValues
}

/*
 * An edge in a connection.

 */
export interface SeasonEdge {
  node: Season
  cursor: String
}

export interface DialoguePreviousValues {
  id: ID_Output
  order: Int
  start: Int
  end: Int
  text: String
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface FileConnection {
  pageInfo: PageInfo
  edges: FileEdge[]
  aggregate: AggregateFile
}

export interface User extends Node {
  name: String
  email: String
  anilistName?: String
  malName?: String
  profilePicture?: String
  description?: String
  id: ID_Output
  hash: String
  salt: String
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateDialogue {
  count: Int
}

export interface EpisodeSubscriptionPayload {
  mutation: MutationType
  node?: Episode
  updatedFields?: String[]
  previousValues?: EpisodePreviousValues
}

/*
 * An edge in a connection.

 */
export interface CharacterEdge {
  node: Character
  cursor: String
}

export interface EpisodePreviousValues {
  id: ID_Output
  displayName?: String
  episodeNumber?: String
  length: Int
  subGroup: String
  language: String
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * A connection to a list of items.

 */
export interface AnimeConnection {
  pageInfo: PageInfo
  edges: AnimeEdge[]
  aggregate: AggregateAnime
}

export interface Archive extends Node {
  id: ID_Output
  linkUrl?: String
  fileName: String
  files?: File[]
  createdAt: DateTime
  updatedAt: DateTime
}

/*
 * An edge in a connection.

 */
export interface ArchiveEdge {
  node: Archive
  cursor: String
}

export interface FileSubscriptionPayload {
  mutation: MutationType
  node?: File
  updatedFields?: String[]
  previousValues?: FilePreviousValues
}

export interface AggregateFile {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface DialogueConnection {
  pageInfo: PageInfo
  edges: DialogueEdge[]
  aggregate: AggregateDialogue
}

export interface SeasonPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
}

export interface SeasonSubscriptionPayload {
  mutation: MutationType
  node?: Season
  updatedFields?: String[]
  previousValues?: SeasonPreviousValues
}

export interface Season extends Node {
  id: ID_Output
  anime: Anime
  archive?: Archive
  dialogues?: Dialogue[]
  createdAt: DateTime
  updatedAt: DateTime
}

export interface FilePreviousValues {
  id: ID_Output
  linkUrl?: String
  fileName: String
  createdAt: DateTime
  updatedAt: DateTime
}

export interface AggregateAnime {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface EpisodeEdge {
  node: Episode
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

/*
 * An edge in a connection.

 */
export interface APIKeyEdge {
  node: APIKey
  cursor: String
}

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

export type DateTime = Date | string