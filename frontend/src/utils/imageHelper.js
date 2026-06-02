// Helper function to safely get first image from product/item data
export const getFirstImage = (images) => {
  if (!images) return '/public/images/default.jpeg';
  
  // If it's an array
  if (Array.isArray(images) && images.length > 0) {
    return images[0];
  }
  
  // If it's a comma-separated string
  if (typeof images === 'string' && images.length > 0) {
    return images.split(',')[0].trim();
  }
  
  return '/public/images/default.jpeg';
};
