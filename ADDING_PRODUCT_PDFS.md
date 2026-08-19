# Adding PDFs to Product Pages - Quick Start Guide

## Overview

This system allows you to easily add multiple PDF downloads to any software product page on the website. Each product can have up to 8 different types of PDF resources (brochure, datasheet, user guide, case studies, white paper, release notes, training materials, and technical specs).

## Quick Setup (3 Steps)

### 1. Add Your PDF Files

Place your PDF files in the product-specific folder:

```
public/pdfs/products/[product-name]/
```

Example for MSC Nastran:
```
public/pdfs/products/msc-nastran/
├── msc-nastran-brochure.pdf
├── msc-nastran-datasheet.pdf
├── msc-nastran-user-guide.pdf
└── ...
```

### 2. Update the Configuration

Open `src/config/productPdfResources.js` and verify/update the paths for your product:

```javascript
'msc-nastran': {
  brochure: '/pdfs/products/msc-nastran/msc-nastran-brochure.pdf',
  datasheet: '/pdfs/products/msc-nastran/msc-nastran-datasheet.pdf',
  userGuide: '/pdfs/products/msc-nastran/msc-nastran-user-guide.pdf',
  // Add only the PDFs you have available
}
```

### 3. Add to Your Product Page

Import and use the component in your Vue product page:

```vue
<template>
  <div>
    <!-- Your existing hero, features, etc. -->
    
    <!-- Add the PDF resources section -->
    <ProductResourcesSection :resources="pdfResources" />
    
    <!-- CTA section -->
  </div>
</template>

<script setup>
import ProductResourcesSection from '@/components/ProductResourcesSection.vue'
import { getProductResources } from '@/config/productPdfResources.js'

// Get PDF resources for this product
const pdfResources = getProductResources('msc-nastran')
</script>
```

That's it! The resources section will automatically display all available PDFs for your product.

## Available Product Folders

The following product directories are ready for PDF files:

- ✅ msc-nastran
- ✅ adams
- ✅ marc
- ✅ patran
- ✅ actran
- ✅ apex
- ✅ dytran
- ✅ caefatigue
- ✅ fti-formingsuite
- ✅ msc-cosim
- ✅ msc-cradle-cfd
- ✅ simufact
- ✅ romax
- ✅ msc-one

## PDF Resource Types

| Type | Description | Icon Color |
|------|-------------|------------|
| **Brochure** | Product overview and marketing material | Blue |
| **Datasheet** | Technical specifications summary | Purple |
| **User Guide** | Getting started documentation | Green |
| **Case Studies** | Real-world application examples | Orange |
| **White Paper** | In-depth technical analysis | Indigo |
| **Release Notes** | Latest version updates | Yellow |
| **Training Materials** | Training guides and tutorials | Teal |
| **Technical Specs** | Detailed technical specifications | Rose |

## Component Features

The `ProductResourcesSection` component provides:

✨ **Automatic Display**: Only shows PDFs that are available
✨ **Responsive Design**: Works on all screen sizes
✨ **Beautiful Cards**: Color-coded cards with hover effects
✨ **Download Icons**: Clear download indicators
✨ **External Links**: Opens PDFs in new tab
✨ **Help Text**: Includes contact link for assistance

## Example: Adding PDFs to ADAMS Product

1. **Add PDF files:**
   ```
   public/pdfs/products/adams/
   ├── adams-brochure.pdf
   ├── adams-datasheet.pdf
   └── adams-user-guide.pdf
   ```

2. **Configuration is already set** in `productPdfResources.js`

3. **Add to product page** (`adams.vue`):
   ```vue
   <template>
     <div>
       <!-- Hero Section -->
       <!-- Features Section -->
       <!-- Benefits Section -->
       
       <!-- Add this before CTA -->
       <ProductResourcesSection :resources="pdfResources" />
       
       <!-- CTA Section -->
     </div>
   </template>

   <script setup>
   import ProductResourcesSection from '@/components/ProductResourcesSection.vue'
   import { getProductResources } from '@/config/productPdfResources.js'
   
   const pdfResources = getProductResources('adams')
   </script>
   ```

## Customization Options

### Show Only Specific PDFs

If you only want to show certain PDF types, filter them:

```javascript
const allResources = getProductResources('msc-nastran')
const pdfResources = {
  brochure: allResources.brochure,
  datasheet: allResources.datasheet,
  userGuide: allResources.userGuide
}
```

### Custom Section Title

The component uses default titles. To customize, you can modify the component or create a wrapper.

### Different Layout

For a different layout, you can:
1. Copy `ProductResourcesSection.vue` and modify it
2. Or create your own custom implementation

## Testing Your PDFs

After adding PDFs:

1. **Start dev server**: `npm run dev`
2. **Navigate to product page**
3. **Check each download link**:
   - ✅ Link is visible
   - ✅ Click opens PDF in new tab
   - ✅ PDF displays correctly
   - ✅ File size is reasonable

## Troubleshooting

### PDF link shows but doesn't work
- Check file path in `productPdfResources.js`
- Verify file exists in correct folder
- Check filename matches exactly (case-sensitive)
- Path should start with `/pdfs/` not `public/pdfs/`

### PDF card not showing
- Make sure the PDF path is added in `productPdfResources.js`
- Check that you're passing the correct product ID to `getProductResources()`
- Verify the component is imported correctly

### 404 Error
- Files in `public` folder are served from root
- Use `/pdfs/products/...` not `public/pdfs/products/...`
- Check for typos in path

## Best Practices

1. **Optimize PDFs**: Compress images, reduce file size
2. **Consistent Naming**: Follow the naming convention
3. **Test Downloads**: Always test before deploying
4. **Update Regularly**: Keep PDFs current
5. **Provide Value**: Ensure PDFs contain useful information

## File Size Guidelines

- **Brochure**: 1-5 MB
- **Datasheet**: 500 KB - 2 MB
- **User Guide**: 2-10 MB
- **Case Studies**: 2-8 MB
- **White Paper**: 1-5 MB
- **Release Notes**: 500 KB - 2 MB

## Reference Files

- **Component**: `src/components/ProductResourcesSection.vue`
- **Configuration**: `src/config/productPdfResources.js`
- **Example Implementation**: `src/pages/Products_and_services/Software_Sales/products/msc-nastran.vue`
- **Full Documentation**: `public/pdfs/README.md`

## Getting Help

If you encounter issues:
1. Check the example in `msc-nastran.vue`
2. Review configuration in `productPdfResources.js`
3. Verify files exist in correct location
4. Check browser console for errors

---

**Need to add a new product?**
1. Create folder in `public/pdfs/products/`
2. Add entry to `productPdfResources.js`
3. Use `getProductResources('product-name')` in your page

**That's it! Your PDF resources are now ready for download!** 🎉
