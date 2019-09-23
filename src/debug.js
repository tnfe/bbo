if (process.env.NODE_ENV !== 'production') {
  console.log(`当前运行环境: ${process.env.NODE_ENV}`);
}

// 开发环境加载播放器
if (process.env.NODE_ENV !== 'production') {
  require('./ppo.js');
}
