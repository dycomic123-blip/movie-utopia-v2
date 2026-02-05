export const translations = {
  en: {
    // Common
    pleaseLogin: 'Please login first',
    insufficientBalance: 'Insufficient balance',
    tipFailed: 'Tip failed',
    likeFailed: 'Like failed',
    followFailed: 'Follow failed',
    commentFailed: 'Comment failed',
    featureComingSoon: 'Feature coming soon',

    // Video Page
    videoDescription: 'This is a video description showcasing the story background and creative highlights. AI-generated short films take you into a brand new visual world, experiencing unprecedented creativity and imagination.',

    // Author Bar
    message: 'Message',
    followers: 'followers',

    // Comments
    comments: 'Comments',
    loading: 'Loading',
    writeComment: 'Write a comment...',
    you: 'You',
    send: 'Send',
    noComments: 'No comments yet, be the first!',
    justNow: 'just now',
    minutesAgo: 'min ago',
    hoursAgo: 'hr ago',
    daysAgo: 'd ago',

    // Top 10
    top10Recommendations: 'Top 10 Recommendations',
    likes: 'likes',

    // Actions
    like: 'Like',
    tip: 'Tip',
    share: 'Share',
    remix: 'Remix',
    more: 'More',
    sendTip: 'Send Tip',
    cancel: 'Cancel',
    confirm: 'Confirm',
    report: 'Report',
    copyLink: 'Copy Link',

    // Upload
    upload: 'Upload',

    create: 'create',

    // Credits
    credits: 'Credits',

    // Language
    language: 'Language',
    english: 'English',
    chinese: '中文',
    following: 'Following',
    follow: 'Follow',
    AboutUs: 'About Us',
    Profile: 'Profile',
    Settings: 'Settings',
    Logout: 'Logout',
    reply: 'Reply',
    delete: 'Delete',
    writeReply: 'Write a reply...',
    commentPosted: 'Comment posted successfully',
    failedToPostComment: 'Failed to post comment',
    failedToLoadComments: 'Failed to load comments',
    replyPosted: 'Reply posted successfully',
    failedToPostReply: 'Failed to post reply',
    commentDeleted: 'Comment deleted successfully',
    failedToDeleteComment: 'Failed to delete comment',
    confirmDeleteComment: 'Are you sure you want to delete this comment?',
  },
  zh: {
    // Common
    pleaseLogin: '请先登录',
    insufficientBalance: '余额不足',
    tipFailed: '打赏失败',
    likeFailed: '点赞操作失败',
    followFailed: '关注操作失败',
    commentFailed: '评论失败',
    featureComingSoon: '功能开发中',

    // Video Page
    videoDescription: '这是一段视频简介，用于展示故事背景与创作亮点。AI 生成的短片带你进入一个全新的视觉世界，体验前所未有的创意与想象力。',

    // Author Bar
    message: '私信',
    followers: '粉丝',

    // Comments
    comments: '评论',
    loading: '加载中',
    writeComment: '说点什么…',
    you: '你',
    send: '发布',
    noComments: '还没有评论，快来抢沙发',
    justNow: '刚刚',
    minutesAgo: '分钟前',
    hoursAgo: '小时前',
    daysAgo: '天前',

    // Top 10
    top10Recommendations: 'Top 10 推荐',
    likes: '点赞',

    // Actions
    like: '喜欢',
    tip: '打赏',
    share: '分享',
    remix: '混剪',
    more: '更多',
    sendTip: '发送打赏',
    cancel: '取消',
    confirm: '确认',
    report: '举报',
    copyLink: '复制链接',

    // Upload
    upload: '上传',

    create: '创建',

    // Credits
    credits: '积分',

    // Language
    language: '语言',
    english: 'English',
    chinese: '中文',
    following: '已关注',
    follow: '关注',
    AboutUs: '关于我们',
    Profile: '个人资料',
    Settings: '设置',
    Logout: '退出登录',
    reply: '回复',
    delete: '删除',
    writeReply: '回复...',
    commentPosted: '评论发布成功',
    failedToPostComment: '评论发布失败',
    failedToLoadComments: '加载评论失败',
    replyPosted: '回复发布成功',
    failedToPostReply: '回复发布失败',
    commentDeleted: '评论删除成功',
    failedToDeleteComment: '评论删除失败',
    confirmDeleteComment: '确定要删除这条评论吗？',
  },
} as const

export type Locale = keyof typeof translations
export type TranslationKey = keyof typeof translations.en
