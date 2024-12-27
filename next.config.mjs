import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')]
  },
  images: {
    domains: ['flagcdn.com', 'scolarbee-bucket.s3.amazonaws.com']
  },
  output: 'standalone'
};

export default withNextIntl(nextConfig);
