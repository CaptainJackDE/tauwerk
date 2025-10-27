/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'X-Frame-Options', value: 'DENY' },
					{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
					{ key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
					{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
					// Minimal CSP (adjust if you add external origins)
					{
						key: 'Content-Security-Policy',
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
							"style-src 'self' 'unsafe-inline'",
							"img-src 'self' data: blob:",
							"font-src 'self' data:",
							"connect-src 'self'",
							"frame-ancestors 'none'",
						].join('; '),
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
