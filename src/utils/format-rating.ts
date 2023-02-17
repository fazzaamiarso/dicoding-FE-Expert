export const formatRatingDisplay = (rating: number) =>
  new Intl.NumberFormat("en-US", { minimumFractionDigits: 1 }).format(rating);
