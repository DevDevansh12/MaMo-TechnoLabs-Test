# Schema.org Integration Guide for Blog Posts

## What is Schema Markup?

Schema markup (JSON-LD) is structured data that helps search engines understand your content better. It can lead to:
- Rich snippets in search results
- Better SEO rankings
- Enhanced visibility with featured snippets
- Improved click-through rates

## What's Been Integrated

✅ **BlogPosting Schema** - The main article schema type
✅ **Author Information** - Organization details
✅ **Publisher Information** - With logo
✅ **Publication Dates** - Created and modified dates
✅ **Keywords** - From focus keywords
✅ **Canonical URL** - Main page identifier
✅ **Image** - Featured banner image
✅ **Description** - Meta description

## Schema Fields Included

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Blog Title",
  "description": "Meta description",
  "image": "Banner image URL",
  "author": {
    "@type": "Organization",
    "name": "MaMo TechnoLabs"
  },
  "publisher": {
    "@type": "Organization",
    "name": "MaMo TechnoLabs",
    "logo": {
      "@type": "ImageObject",
      "url": "Logo URL"
    }
  },
  "datePublished": "2024-01-01T00:00:00.000Z",
  "dateModified": "2024-01-01T00:00:00.000Z",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "Canonical URL"
  },
  "keywords": "keyword1, keyword2, keyword3"
}
```

## How to Verify Schema

### Method 1: Google Rich Results Test
1. Visit: https://search.google.com/test/rich-results
2. Enter your blog post URL
3. Click "Test URL"
4. Check for valid BlogPosting schema

### Method 2: Schema Markup Validator
1. Visit: https://validator.schema.org/
2. Enter your blog post URL
3. Verify no errors

### Method 3: View Page Source
1. Open your blog post
2. Right-click → View Page Source
3. Search for `application/ld+json`
4. You should see the schema markup

## Testing Your Schema

1. Create a new blog post at `/admin/dashboard`
2. Fill in all fields (especially meta description and keywords)
3. Publish the blog
4. Visit the blog post page
5. View page source (Ctrl+U)
6. Look for `<script type="application/ld+json">`
7. Copy the JSON and validate at https://validator.schema.org/

## Customization Options

### Change Author Name
Edit in `app.js` line where blog is created:
```javascript
author: 'Your Author Name',
```

### Change Publisher Info
Edit in `app.js`:
```javascript
publisher: {
  name: 'Your Company Name',
  logo: '/path/to/your/logo.png'
}
```

### Add More Schema Fields

You can add additional fields like:
- `wordCount`: Number of words in the article
- `articleBody`: Full text content
- `articleSection`: Category/section
- `inLanguage`: "en-US"

## SEO Benefits

✅ **Rich Snippets**: Your blog may appear with enhanced information
✅ **Knowledge Graph**: Better chance of appearing in Google's knowledge panel
✅ **Voice Search**: Improved discoverability for voice assistants
✅ **Social Sharing**: Better previews when shared on social media
✅ **Search Rankings**: Indirect SEO benefit through better CTR

## Important Notes

⚠️ **Update URLs in Production**
- Replace `http://localhost:3001` with your actual domain
- Update in `views/blogdetails.pug` schema section

⚠️ **Logo Image**
- Make sure `/images/logo.png` exists
- Recommended size: 600x60px or 1:1 ratio
- Must be accessible publicly

⚠️ **Banner Images**
- Should be high quality (1200x630px recommended)
- Must be publicly accessible
- Include alt text for accessibility

## Next Steps

1. ✅ Schema is already integrated
2. Test with Google Rich Results Test
3. Update logo path if needed
4. Replace localhost URLs with production domain
5. Monitor Google Search Console for rich results

## Additional Schema Types (Future Enhancement)

Consider adding:
- **BreadcrumbList**: For navigation breadcrumbs
- **WebSite**: For site-wide search
- **Organization**: For company information
- **FAQPage**: If you add FAQ sections
- **HowTo**: For tutorial-style posts

## Resources

- Schema.org Documentation: https://schema.org/BlogPosting
- Google Search Central: https://developers.google.com/search/docs/appearance/structured-data/article
- Rich Results Test: https://search.google.com/test/rich-results
- Schema Validator: https://validator.schema.org/
