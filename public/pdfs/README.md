# Product PDF Resources Setup

This directory contains PDF resources for all software products displayed on the website.

## Directory Structure

```
public/pdfs/products/
├── msc-nastran/
│   ├── msc-nastran-brochure.pdf
│   ├── msc-nastran-datasheet.pdf
│   ├── msc-nastran-user-guide.pdf
│   ├── msc-nastran-case-studies.pdf
│   ├── msc-nastran-white-paper.pdf
│   └── msc-nastran-release-notes.pdf
├── adams/
├── marc/
├── patran/
├── actran/
├── apex/
├── dytran/
├── caefatigue/
├── fti-formingsuite/
├── msc-cosim/
├── msc-cradle-cfd/
├── simufact/
├── romax/
└── msc-one/
```

## How to Add PDF Files for a Product

### Step 1: Create Product Directory
Create a new folder under `public/pdfs/products/` with the product name:
```bash
mkdir public/pdfs/products/your-product-name
```

### Step 2: Add PDF Files
Place your PDF files in the product folder. Recommended file types:

- **Product Brochure** (`product-name-brochure.pdf`)
  - Overview of features, capabilities, and applications
  - Marketing-focused document
  - Typically 2-8 pages

- **Technical Datasheet** (`product-name-datasheet.pdf`)
  - Technical specifications summary
  - System requirements
  - Key features list
  - Typically 1-4 pages

- **User Guide** (`product-name-user-guide.pdf`)
  - Getting started documentation
  - Installation instructions
  - Basic usage tutorials
  - Can be comprehensive (10-100+ pages)

- **Case Studies** (`product-name-case-studies.pdf`)
  - Real-world application examples
  - Customer success stories
  - Industry-specific use cases
  - Typically 5-20 pages

- **White Paper** (`product-name-white-paper.pdf`)
  - In-depth technical analysis
  - Methodology explanations
  - Research findings
  - Typically 10-30 pages

- **Release Notes** (`product-name-release-notes.pdf`)
  - Latest version updates
  - New features
  - Bug fixes and improvements
  - Typically 3-15 pages

- **Training Materials** (`product-name-training.pdf`) [Optional]
  - Training guides and tutorials
  - Exercise files documentation
  - Workshop materials

- **Technical Specifications** (`product-name-specs.pdf`) [Optional]
  - Detailed technical specifications
  - API documentation
  - Integration guides

### Step 3: Update Configuration File
Edit `src/config/productPdfResources.js` and add your product:

```javascript
'your-product-name': {
  brochure: '/pdfs/products/your-product-name/your-product-name-brochure.pdf',
  datasheet: '/pdfs/products/your-product-name/your-product-name-datasheet.pdf',
  userGuide: '/pdfs/products/your-product-name/your-product-name-user-guide.pdf',
  caseStudies: '/pdfs/products/your-product-name/your-product-name-case-studies.pdf',
  whitePaper: '/pdfs/products/your-product-name/your-product-name-white-paper.pdf',
  releaseNotes: '/pdfs/products/your-product-name/your-product-name-release-notes.pdf'
}
```

**Note**: You only need to add the PDFs that are available. If you don't have a white paper, just omit that line.

### Step 4: Add to Product Page

#### Option A: Using the Reusable Component (Recommended)

Import and use the `ProductResourcesSection` component in your product page:

```vue
<template>
  <div>
    <!-- Your existing product content -->
    
    <!-- Add the resources section -->
    <ProductResourcesSection :resources="pdfResources" />
    
    <!-- CTA Section -->
  </div>
</template>

<script setup>
import ProductResourcesSection from '@/components/ProductResourcesSection.vue'
import { getProductResources } from '@/config/productPdfResources.js'

const pdfResources = getProductResources('your-product-name')
</script>
```

#### Option B: Custom Implementation

If you want to customize the resources section, you can create your own implementation following the example in `msc-nastran.vue`.

## PDF File Guidelines

### File Naming Convention
Use lowercase with hyphens for consistency:
- ✅ `msc-nastran-brochure.pdf`
- ❌ `MSC Nastran Brochure.pdf`
- ❌ `msc_nastran_brochure.pdf`

### File Size Recommendations
- Keep PDFs optimized for web (compress images)
- Recommended maximum size: 10MB per file
- Larger files may slow down downloads

### PDF Optimization Tips
1. Use PDF compression tools (Adobe Acrobat, online tools)
2. Reduce image quality to 150-300 DPI for web
3. Remove embedded fonts when possible
4. Consider splitting very large documents

### PDF Metadata
Ensure PDFs have proper metadata:
- Title
- Author
- Subject
- Keywords

## Testing

After adding PDFs, test the download links:
1. Start the development server: `npm run dev`
2. Navigate to the product page
3. Click each download link to verify:
   - File downloads correctly
   - File opens without errors
   - Content is readable

## Troubleshooting

### PDF not downloading
- Check file path in `productPdfResources.js`
- Verify file exists in `public/pdfs/products/`
- Check file name matches exactly (case-sensitive)

### 404 Error
- Ensure the path starts with `/pdfs/` not `public/pdfs/`
- Verify the file is in the `public` directory
- Clear browser cache and try again

### PDF not displaying
- Check PDF file is not corrupted
- Try opening in different PDF viewer
- Re-export/regenerate the PDF file

## Example Product Setup

Here's a complete example for adding PDFs for "MSC Nastran":

1. **Create directory:**
   ```bash
   mkdir public/pdfs/products/msc-nastran
   ```

2. **Add files:**
   ```
   public/pdfs/products/msc-nastran/
   ├── msc-nastran-brochure.pdf
   ├── msc-nastran-datasheet.pdf
   └── msc-nastran-user-guide.pdf
   ```

3. **Update config:**
   ```javascript
   'msc-nastran': {
     brochure: '/pdfs/products/msc-nastran/msc-nastran-brochure.pdf',
     datasheet: '/pdfs/products/msc-nastran/msc-nastran-datasheet.pdf',
     userGuide: '/pdfs/products/msc-nastran/msc-nastran-user-guide.pdf'
   }
   ```

4. **Add to page:**
   ```vue
   <ProductResourcesSection :resources="getProductResources('msc-nastran')" />
   ```

## Need Help?

If you need assistance:
1. Check the example implementation in `src/pages/Products_and_services/Software_Sales/products/msc-nastran.vue`
2. Review the reusable component: `src/components/ProductResourcesSection.vue`
3. Contact the development team

## Future Enhancements

Potential improvements to consider:
- Add file size display next to download links
- Add preview/thumbnail images
- Add download analytics tracking
- Add multi-language PDF support
- Add PDF viewer within the website
