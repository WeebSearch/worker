from typing import Optional


class CharacterName:
    first: str
    last: str
    native: str


class AnilistCharacter:
    id: int
    name: CharacterName


"""Internal API Definition"""


class GQLNode:
    id: str


class GQLCreateArchiveRequest:
    fileName: str
    linkUrl: Optional[str]


class GQLCreateArchiveResponse(GQLNode):
    ...


class GQLCreateAnimeRequest:
    class _Data:
        rawName: str
        name: Optional[str]
        anilistId: Optional[int]
        thumbnailUrl: Optional[str]

    data: _Data


class GQLCreateAnimeResponse(GQLNode):
    ...


class GQLCreateFileRequest:
    class _Data:
        ...
