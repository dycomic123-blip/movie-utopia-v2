import { VideoItem } from '../types/video'

const genres = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Horror', 'Romance', 'Thriller'] as const

// 从缩略图检测到的真实比例
const videoAspectRatios: Record<string, number> = {
  "video-1": 1.7877,
  "video-2": 1.7877,
  "video-3": 1.8551,
  "video-4": 1.8551,
  "video-5": 2.406,
  "video-6": 1.7877,
  "video-7": 1.9048,
  "video-8": 1.7877,
  "video-9": 1.8551,
  "video-10": 2.3616,
  "video-11": 1.7877,
  "video-12": 1.7877,
  "video-13": 1.671,
  "video-14": 2.3881,
  "video-15": 1.7877,
  "video-16": 1.7877,
  "video-17": 1.7778,
  "video-18": 1.8551,
  "video-19": 1.7778,
  "video-20": 1.7778,
  "video-21": 1.7778,
  "video-22": 1.7778,
  "video-23": 1.7778,
  "video-24": 1.7778,
  "video-25": 2.3529,
  "video-26": 1.6754,
  "video-27": 1.8497,
  "video-28": 2.406,
  "video-29": 2.2378,
  "video-30": 1.9394,
  "video-31": 2.4,
  "video-32": 1.7778
}

const authors = [
  { id: 'a1', name: '菠萝头', avatar: 'https://i.pravatar.cc/150?img=1', followers: 125400 },
  { id: 'a2', name: '希希叔叔', avatar: 'https://i.pravatar.cc/150?img=13', followers: 98700 },
  { id: 'a3', name: 'Jane', avatar: 'https://i.pravatar.cc/150?img=5', followers: 87300 },
  { id: 'a4', name: '就扶墙老师', avatar: 'https://i.pravatar.cc/150?img=12', followers: 76500 },
  { id: 'a5', name: 'KK不设限', avatar: 'https://i.pravatar.cc/150?img=9', followers: 64200 },
  { id: 'a6', name: '黄浦江三文鱼', avatar: 'https://i.pravatar.cc/150?img=15', followers: 53800 },
  { id: 'a7', name: 'Drizzt', avatar: 'https://i.pravatar.cc/150?img=20', followers: 45600 },
  { id: 'a8', name: '沃霍尔', avatar: 'https://i.pravatar.cc/150?img=47', followers: 38900 },
  { id: 'a9', name: 'Doyos', avatar: 'https://i.pravatar.cc/150?img=33', followers: 32100 },
  { id: 'a10', name: '南子佚', avatar: 'https://i.pravatar.cc/150?img=26', followers: 28400 },
  { id: 'a11', name: 'Dogma高远', avatar: 'https://i.pravatar.cc/150?img=8', followers: 24800 }
]

const titles = [
  'Neon Dreams',
  'The Last Horizon',
  'Whispers in the Dark',
  'City of Glass',
  'Eternal Summer',
  'The Forgotten Path',
  'Midnight Reverie',
  'Echo Chamber',
  'Celestial Dance',
  'The Silent Observer',
  'Crimson Tide',
  'Digital Awakening',
  'Shadows of Tomorrow',
  'The Infinite Loop',
  'Borrowed Time',
  'Velvet Underground',
  'The Memory Keeper',
  'Fractured Reality',
  'Beyond the Veil',
  'The Last Frame',
  'Neon Nights',
  'Urban Symphony',
  'Lost in Translation',
  'Parallel Universe',
  'Time Capsule',
  'The Great Unknown',
  'Abstract Dreams',
  'Golden Hour',
  'Cyber Paradise',
  'The Wanderer',
  'Electric Soul',
  'Distant Memories'
]

const unsplashIds = [
  '1527603746920-5f51b0c5e3f9',
  '1536440136628-849c177e76a1',
  '1485846234538-4b3b4f7d8e9a',
  '1574267432553-4b4628081c31',
  '1478720568477-152d9b164e26',
  '1579546929518-9e396f3cc809',
  '1518676590629-3dcbd9c5a5c9',
  '1535016120720-40c646be5580',
  '1440404653325-ab127d49abc1',
  '1485846234538-4b3b4f7d8e9a',
  '1518676590629-3dcbd9c5a5c9',
  '1524985069026-dd778a71c7b4',
  '1485095826508-48e5e8e8c13a',
  '1512070679279-8988d32161b5',
  '1489599849927-2ee91cede3ba',
  '1536440136628-849c177e76a1',
  '1574267432553-4b4628081c31',
  '1478720568477-152d9b164e26',
  '1579546929518-9e396f3cc809',
  '1518676590629-3dcbd9c5a5c9',
  '1527603746920-5f51b0c5e3f9',
  '1535016120720-40c646be5580',
  '1440404653325-ab127d49abc1',
  '1524985069026-dd778a71c7b4',
  '1485095826508-48e5e8e8c13a',
  '1512070679279-8988d32161b5',
  '1489599849927-2ee91cede3ba',
  '1574267432553-4b4628081c31',
  '1478720568477-152d9b164e26',
  '1579546929518-9e396f3cc809',
  '1518676590629-3dcbd9c5a5c9',
  '1527603746920-5f51b0c5e3f9'
]

// Remix relationships (child -> parent)
// Fixed author assignment for each video (by index, 0-31 for video-1 to video-32)
const videoAuthorIds = [
  'a1',  // video-1 → 菠萝头
  'a1',  // video-2 → 菠萝头 (指定)
  'a3',  // video-3 → Jane
  'a4',  // video-4 → 就扶墙老师
  'a5',  // video-5 → KK不设限
  'a1',  // video-6 → 菠萝头 (指定)
  'a7',  // video-7 → Drizzt
  'a1',  // video-8 → 菠萝头 (指定)
  'a9',  // video-9 → Doyos
  'a10', // video-10 → 南子佚
  'a11', // video-11 → Dogma高远
  'a1',  // video-12 → 菠萝头 (指定)
  'a2',  // video-13 → 希希叔叔
  'a6',  // video-14 → 黄浦江三文鱼
  'a8',  // video-15 → 沃霍尔
  'a1',  // video-16 → 菠萝头 (指定)
  'a3',  // video-17 → Jane
  'a4',  // video-18 → 就扶墙老师
  'a5',  // video-19 → KK不设限
  'a2',  // video-20 → 希希叔叔
  'a7',  // video-21 → Drizzt
  'a6',  // video-22 → 黄浦江三文鱼
  'a9',  // video-23 → Doyos
  'a8',  // video-24 → 沃霍尔
  'a10', // video-25 → 南子佚
  'a11', // video-26 → Dogma高远
  'a2',  // video-27 → 希希叔叔
  'a3',  // video-28 → Jane
  'a4',  // video-29 → 就扶墙老师
  'a5',  // video-30 → KK不设限
  'a7',  // video-31 → Drizzt
  'a9',  // video-32 → Doyos
]

// Fixed likes for each video
const videoLikes = [
  8934, 7621, 5432, 9123, 6754, 8234, 4567, 7890, 5678, 6234,
  4890, 7345, 6123, 5890, 7654, 8456, 5234, 6789, 7123, 5567,
  6890, 7234, 5901, 6456, 7890, 5123, 6567, 7012, 5789, 6345,
  7456, 5634
]

// Fixed tips for each video
const videoTips = [
  456, 321, 234, 489, 312, 398, 189, 367, 245, 289,
  212, 345, 278, 256, 378, 412, 223, 298, 334, 245,
  312, 356, 267, 289, 389, 198, 298, 323, 256, 278,
  367, 234
]

// Fixed durations (in seconds)
const videoDurations = [
  124, 198, 156, 223, 187, 145, 167, 201, 178, 189,
  156, 234, 167, 145, 198, 212, 145, 189, 201, 167,
  178, 198, 156, 189, 234, 145, 178, 201, 167, 189,
  212, 178
]

// Fixed genres for each video
const videoGenres = [
  'Sci-Fi', 'Drama', 'Action', 'Thriller', 'Comedy', 'Sci-Fi', 'Action', 'Drama',
  'Horror', 'Romance', 'Sci-Fi', 'Action', 'Drama', 'Thriller', 'Comedy', 'Sci-Fi',
  'Action', 'Drama', 'Horror', 'Romance', 'Thriller', 'Comedy', 'Sci-Fi', 'Action',
  'Drama', 'Horror', 'Romance', 'Thriller', 'Comedy', 'Sci-Fi', 'Action', 'Drama'
]

const remixRelationships = [
  { childId: 'video-5', parentId: 'video-2' },
  { childId: 'video-12', parentId: 'video-7' },
  { childId: 'video-18', parentId: 'video-5' },
  { childId: 'video-9', parentId: 'video-3' },
  { childId: 'video-14', parentId: 'video-9' },
  { childId: 'video-16', parentId: 'video-1' },
  { childId: 'video-19', parentId: 'video-10' },
  { childId: 'video-25', parentId: 'video-15' },
  { childId: 'video-30', parentId: 'video-20' },
]

export function generateMockVideos(): VideoItem[] {
  // Generate 32 videos based on actual files
  const videos = titles.map((title, index) => {
    const videoNumber = index + 1
    const authorId = videoAuthorIds[index]
    const author = authors.find(a => a.id === authorId) || authors[0]
    const genre = videoGenres[index]
    const actualAspectRatio = videoAspectRatios[`video-${videoNumber}`] || 16/9
    const likes = videoLikes[index]
    const tips = videoTips[index]
    const duration = videoDurations[index]
    // video-32 使用 png 格式
    const thumbnailExt = videoNumber === 32 ? 'png' : 'jpg'
    // Fixed created date based on index (newer videos have higher index)
    const daysAgo = 30 - index
    const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString()

    return {
      id: `video-${videoNumber}`,
      title,
      author: author,
      // Use local video files
      thumbnail: `/videos/thumbnails/video-${videoNumber}.${thumbnailExt}`,
      videoUrl: `/videos/video-${videoNumber}.mp4`,
      genre: genre,
      likes: likes,
      tips: tips,
      aspectRatio: actualAspectRatio,
      duration: duration,
      createdAt: createdAt
    } as VideoItem
  })

  // Apply remix relationships
  remixRelationships.forEach(({ childId, parentId }) => {
    const childVideo = videos.find(v => v.id === childId)
    const parentVideo = videos.find(v => v.id === parentId)

    if (childVideo && parentVideo) {
      childVideo.remixParent = {
        videoId: parentVideo.id,
        authorId: parentVideo.author.id,
        authorName: parentVideo.author.name
      }
    }
  })

  return videos
}

export const mockVideos = generateMockVideos()
