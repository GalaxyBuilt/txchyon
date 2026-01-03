import { defineCollection, z } from 'astro:content';

// Your 11 pillar categories
const blogCategories = [
  'getting-started',
  'security-privacy', 
  'trading-investing',
  'defi-yield',
  'airdrop-farming',
  'infrastructure-tech',
  'tools-automation',
  'research-analysis',
  'regulatory-tax',
  'portfolio-management',
  'prediction-markets'
] as const;

const blogCollection = defineCollection({
  type: 'content',
  
  schema: z.object({
    // Required fields with defaults
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    
    // Category system
    category: z.enum(blogCategories),
    subcategory: z.string().optional(),
    
    // Tags & draft
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    
    // ======================
    // GATING FIELDS - ADDED
    // ======================
    hasGatedContent: z.boolean().default(false),
    isFullyGated: z.boolean().default(false),
    // ======================
    
    // Image fields
    image: z.string().optional(),
    heroImageAlt: z.string().optional(),
    
    // Authors
    author: z.string().optional(),
    authors: z.array(z.string()).optional(),
    authorTwitter: z.string().optional(),
    
    updatedDate: z.coerce.date().optional(),
    
    // Total freedom for anything else
  }).passthrough(),
});

export const collections = {
  posts: blogCollection,
  pages: defineCollection({ type: 'content' }),
  authors: defineCollection({ 
    type: 'content',
    schema: z.object({ 
      title: z.string(),
      image: z.string().optional(),
      description: z.string().optional(),
      meta_title: z.string().optional(),
      social: z.object({
        github: z.string().url().optional(),
        x: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        facebook: z.string().url().optional(),
      }).optional(),
    }).passthrough(),
  }),
  about: defineCollection({ type: 'content' }),
  contact: defineCollection({ type: 'content' }),
  blog: defineCollection({ type: 'content' }),
};