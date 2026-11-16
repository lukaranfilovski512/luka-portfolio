import type { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'
import { site } from '@/lib/site'
export default function sitemap(): MetadataRoute.Sitemap { return ['', '/about', '/contact', ...projects.map(project => `/work/${project.slug}`)].map(path => ({ url: `${site.url}${path}`, changeFrequency: 'monthly', priority: path === '' ? 1 : path.startsWith('/work/') ? 0.9 : 0.7 })) }
