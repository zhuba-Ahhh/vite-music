export interface SerachSuggestResult {
  albums: AlbumElement[];
  artists: ResultArtist[];
  order: orderEnum[];
  playlists: Playlist[];
  songs: Song[];
}

export enum orderEnum {
  albums = 'albums',
  artists = 'artists',
  songs = 'songs',
  playlists = 'playlists'
}

export type ResultItemMap = {
  [K in orderEnum]: SerachSuggestResult[K];
};

export enum listType {
  songs = '单曲',
  artists = '歌手',
  albums = '专辑',
  playlists = '歌单'
}
export interface AlbumElement {
  artist: PurpleArtist;
  copyrightId: number;
  id: number;
  mark: number;
  name: string;
  picId: number;
  publishTime: number;
  size: number;
  status: number;
}

export interface PurpleArtist {
  albumSize: number;
  alia: string[];
  alias: string[];
  fansGroup: null;
  id: number;
  img1V1: number;
  img1V1Url: string;
  name: string;
  picId: number;
  picUrl: string;
  trans: null | string;
  transNames?: string[];
}

export interface ResultArtist {
  accountId?: number;
  albumSize?: number;
  alias?: any[];
  fansGroup?: null;
  id?: number;
  img1V1?: number;
  img1V1Url?: string;
  name?: string;
  picId?: number;
  picUrl?: string;
  trans?: null;
}

export interface Playlist {
  action: null;
  actionType: null;
  bookCount: number;
  coverImgUrl: string;
  creator: null;
  description: string;
  highQuality: boolean;
  id: number;
  name: string;
  officialTags: null;
  playCount: number;
  recommendText: null;
  score: null;
  specialType: number;
  subscribed: boolean;
  trackCount: number;
  userId: number;
}

export interface Song {
  album: SongAlbum;
  alias: any[];
  artists: SongArtist[];
  copyrightId: number;
  duration: number;
  fee: number;
  ftype: number;
  id: number;
  mark: number;
  mvid: number;
  name: string;
  rtype: number;
  rUrl: null;
  status: number;
}

export interface SongAlbum {
  alia: string[];
  artist: FluffyArtist;
  copyrightId: number;
  id: number;
  mark: number;
  name: string;
  picId: number;
  publishTime: number;
  size: number;
  status: number;
}

export interface FluffyArtist {
  albumSize: number;
  alias: any[];
  fansGroup: null;
  id: number;
  img1V1: number;
  img1V1Url: string;
  name: string;
  picId: number;
  picUrl: null;
  trans: null;
}

export interface SongArtist {
  albumSize: number;
  alias: any[];
  fansGroup: null;
  id: number;
  img1V1: number;
  img1V1Url: string;
  name: string;
  picId: number;
  picUrl: null;
  trans: null;
}

export interface SerachHotResult {
  hots: Hot[];
}

export interface Hot {
  first: string;
  iconType: number;
  second: number;
  third: null;
}

export interface MVResult {
  code: number;
  count: number;
  data: Datum[];
  hasMore: boolean;
}

export interface Datum {
  artistId: number;
  artistName: string;
  artists: Artist[];
  briefDesc: null;
  cover: string;
  desc: null;
  duration: number;
  id: number;
  mark: number;
  name: string;
  playCount: number;
  subed: boolean;
}

export interface Artist {
  alias: string[];
  id: number;
  name: string;
  transNames: null;
}

export interface HotListResult {
  code: number;
  tags: Tag[];
}

export interface Tag {
  activity: boolean;
  category: number;
  createTime: number;
  hot: boolean;
  id: number;
  name: string;
  playlistTag: PlaylistTag;
  position: number;
  type: number;
  usedCount: number;
}

export interface PlaylistTag {
  category: number;
  createTime: number;
  highQuality: number;
  highQualityPos: number;
  id: number;
  name: string;
  officialPos: number;
  position: number;
  type: number;
  usedCount: number;
}

export interface PlayListResult {
  cat: string;
  code: number;
  more: boolean;
  playlists: Playlist1[];
  total: number;
}

export interface Playlist1 {
  adType: number;
  alg: string;
  anonimous: boolean;
  cloudTrackCount: number;
  commentCount: number;
  commentThreadId: string;
  coverImgId: number;
  coverImgIdStr: string;
  coverImgUrl: string;
  coverStatus: number;
  coverText: null;
  createTime: number;
  creator: Creator | null;
  description: string;
  highQuality: boolean;
  iconImgUrl: null;
  id: number;
  name: string;
  newImported: boolean;
  ordered: boolean;
  playCount: number;
  privacy: number;
  recommendInfo: null;
  recommendText: null;
  relateResId: null;
  relateResType: null;
  shareCount: number;
  socialPlaylistCover: null;
  specialType: number;
  status: number;
  subscribed: null | boolean;
  subscribedCount: number;
  subscribers: Subscriber[];
  tags: string[];
  totalDuration: number;
  trackCount: number;
  trackNumberUpdateTime: number;
  tracks: null;
  trackUpdateTime: number;
  updateTime: number;
  userId: number;
}

export interface Creator {
  accountStatus: number;
  anchor: boolean;
  authenticationTypes: number;
  authority: number;
  authStatus: number;
  avatarDetail: AvatarDetail;
  avatarImgId: number;
  avatarImgIdStr: string;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundImgIdStr: string;
  backgroundUrl: string;
  birthday: number;
  city: number;
  defaultAvatar: boolean;
  description: string;
  detailDescription: string;
  djStatus: number;
  experts: null | Experts;
  expertTags: string[];
  followed: boolean;
  gender: number;
  mutual: boolean;
  nickname: string;
  province: number;
  remarkName: null;
  signature: string;
  userId: number;
  userType: number;
  vipType: number;
}

export interface AvatarDetail {
  identityIconUrl: string;
  identityLevel: number;
  userType: number;
}

export interface Experts {
  the1: string;
  the2: string;
}

export interface Subscriber {
  accountStatus: number;
  anchor: boolean;
  authenticationTypes: number;
  authority: number;
  authStatus: number;
  avatarDetail: null;
  avatarImgId: number;
  avatarImgIdStr: string;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundImgIdStr: string;
  backgroundUrl: string;
  birthday: number;
  city: number;
  defaultAvatar: boolean;
  description: string;
  detailDescription: string;
  djStatus: number;
  experts: null;
  expertTags: null;
  followed: boolean;
  gender: number;
  mutual: boolean;
  nickname: string;
  province: number;
  remarkName: null;
  signature: string;
  userId: number;
  userType: number;
  vipType: number;
}

export interface TopAlbumResult {
  code: number;
  hasMore: boolean;
  monthData: MonthDatum[];
}

export interface MonthDatum {
  alias: string[];
  areaId: number;
  artist: PurpleArtist1;
  artists: ArtistElement[];
  blurPicUrl: string;
  briefDesc: string;
  commentThreadId: string;
  company: null | string;
  companyId: number;
  copyrightId: number;
  description: string;
  exclusive: boolean;
  id: number;
  isSub: boolean;
  name: string;
  onSale: boolean;
  paid: boolean;
  pic: number;
  picId: number;
  picIdStr: string;
  picUrl: string;
  publishTime: number;
  size: number;
  songs: string[];
  status: number;
  subType: string;
  tags: string;
  transNames: string[];
  type: string;
}

export interface PurpleArtist1 {
  albumSize: number;
  alias: string[];
  briefDesc: string;
  followed: boolean;
  id: number;
  img1V1Id: number;
  img1V1IdStr: string;
  img1V1Url: string;
  musicSize: number;
  name: string;
  picId: number;
  picIdStr: string;
  picUrl: string;
  topicPerson: number;
  trans: string;
  transNames?: string[];
}

export interface ArtistElement {
  albumSize: number;
  alias: string[];
  briefDesc: string;
  followed: boolean;
  id: number;
  img1V1Id: number;
  img1V1IdStr: string;
  img1V1Url: string;
  musicSize: number;
  name: string;
  picId: number;
  picUrl: string;
  topicPerson: number;
  trans: string;
}

export interface GetUserInfoResult {
  adValid: boolean;
  bindings: Binding[];
  code: number;
  createDays: number;
  createTime: number;
  level: number;
  listenSongs: number;
  mobileSign: boolean;
  newUser: boolean;
  pcSign: boolean;
  peopleCanSeeMyPlayRecord: boolean;
  profile: Profile;
  profileVillageInfo: ProfileVillageInfo;
  recallUser: boolean;
  userPoint: UserPoint;
  villageCard: VillageCard;
}

export interface Binding {
  bindingTime: number;
  expired: boolean;
  expiresIn: number;
  id: number;
  refreshTime: number;
  tokenJsonStr: null;
  type: number;
  url: string;
  userId: number;
}

export interface Profile {
  accountStatus: number;
  allSubscribedCount: number;
  artistIdentity: string[];
  authority: number;
  authStatus: number;
  avatarDetail: null;
  avatarImgId: number;
  avatarImgIdStr: string;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundImgIdStr: string;
  backgroundUrl: string;
  birthday: number;
  blacklist: boolean;
  cCount: number;
  city: number;
  createTime: number;
  defaultAvatar: boolean;
  description: string;
  detailDescription: string;
  djStatus: number;
  eventCount: number;
  experts: { [key: string]: any };
  expertTags: null;
  followed: boolean;
  followeds: number;
  followMe: boolean;
  follows: number;
  followTime: null;
  gender: number;
  inBlacklist: boolean;
  mutual: boolean;
  newFollows: number;
  nickname: string;
  playlistBeSubscribedCount: number;
  playlistCount: number;
  privacyItemUnlimit: PrivacyItemUnlimit;
  province: number;
  remarkName: null;
  sCount: number;
  sDJPCount: number;
  signature: string;
  userId: number;
  userType: number;
  vipType: number;
}

export type PartialProfile = Partial<Profile>;

export interface PrivacyItemUnlimit {
  age: boolean;
  area: boolean;
  college: boolean;
  gender: boolean;
  villageAge: boolean;
}

export interface ProfileVillageInfo {
  imageUrl: null;
  targetUrl: string;
  title: string;
}

export interface UserPoint {
  balance: number;
  blockBalance: number;
  status: number;
  updateTime: number;
  userId: number;
  version: number;
}

export interface VillageCard {
  imageUrl: string;
  name: string;
  privacyKey: string;
  targetUrl: string;
  type: string;
  villageCardTabExtensionVO: VillageCardTabExtensionVO;
}

export interface VillageCardTabExtensionVO {
  backgroundPic: null;
  encodedUserId: string;
  encodedUserIdV2: string;
  hasPlayedV1: boolean;
  hasPlayedV2: boolean;
  isSelf: boolean;
  lastedReceived: null;
  lastedUrl: null;
  received: boolean;
  url: string;
  urlV2: string;
}

export interface BannerResult {
  banners: Banner[];
  code: number;
}

export interface Banner {
  adDispatchJson: null;
  adid: null;
  adLocation: null;
  adSource: null;
  bannerBizType: string;
  encodeId: string;
  event: null;
  exclusive: boolean;
  extMonitor: null;
  extMonitorInfo: null;
  imageUrl: string;
  monitorBlackList: null;
  monitorClick: null;
  monitorClickList: null;
  monitorImpress: null;
  monitorImpressList: null;
  monitorType: null;
  program: null;
  scm: string;
  song: null;
  targetId: number;
  targetType: number;
  titleColor: string;
  typeTitle: string;
  url: null | string;
  video: null;
}

export interface TopArtistsResult {
  artists: Artist1[];
  code: number;
  more: boolean;
}

export interface Artist1 {
  accountId: number | null;
  albumSize: number;
  alg: null;
  alias: string[];
  briefDesc: string;
  fansCount: null;
  followed: boolean;
  id: number | string;
  identifyTag: null;
  img1V1Id: number;
  img1V1IdStr: null | string;
  img1V1Url: string;
  isSubed: null;
  musicSize: number;
  mvSize: null;
  name: string;
  picId: number;
  picIdStr: null | string;
  picUrl: string;
  publishTime: null;
  showPrivateMsg: null;
  topicPerson: number;
  trans: string;
  transNames: string[] | null;
}

export interface GetHotDjResult {
  code: number;
  djRadios: DjRadio[];
  hasMore: boolean;
}

export interface DjRadio {
  category: string;
  categoryId: number;
  copywriter: string;
  createTime: number;
  dj: Dj;
  feeScope: number;
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
  programCount: number;
  radioFeeType: number;
  rcmdtext: string;
  subCount: number;
}

export interface Dj {
  accountStatus: number;
  anchor: boolean;
  authenticationTypes: number;
  authority: number;
  authStatus: number;
  avatarDetail: null;
  avatarImgId: number;
  djAvatarImgIdStr: string;
  avatarImgIdStr: string;
  avatarUrl: string;
  backgroundImgId: number;
  backgroundImgIdStr: string;
  backgroundUrl: string;
  birthday: number;
  city: number;
  defaultAvatar: boolean;
  description: string;
  detailDescription: string;
  djStatus: number;
  experts: Experts;
  expertTags: null;
  followed: boolean;
  gender: number;
  mutual: boolean;
  nickname: string;
  province: number;
  remarkName: null;
  signature: string;
  userId: number;
  userType: number;
  vipType: number;
}

export interface Experts {
  the1: string;
}
