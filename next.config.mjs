/** @type {import('next').NextConfig} */
const nextConfig = {
  // 强行关闭构建时的静态强迫症，全部走动态运行时
  typescript: {
    ignoreBuildErrors: true, // 忽略代码类型检测的小报错
  },
  eslint: {
    ignoreDuringBuilds: true, // 忽略代码格式检查
  },
  // 强制将所有包含动静态混合的页面，在打包时作为动态服务器渲染处理
  output: 'standalone'
};

export default nextConfig;
