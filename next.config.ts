import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  devIndicators: process.env.NODE_ENV !== "production" ? undefined : false,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
