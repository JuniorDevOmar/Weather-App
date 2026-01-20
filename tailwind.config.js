module.exports = {
  theme: {
    extend: {
      screens: {
        xs: '475px',
        sm: '640px', // Override default sm
        md: '768px', // Keep default md
        lg: '1024px', // Keep default lg
        xl: '1280px', // Keep default xl
        '2xl': '1536px', // Keep default 2xl
        '3xl': '1920px', // Add new

        'xs-only': { min: '475px', max: '639px' }, // Only xs
        'sm-only': { min: '640px', max: '767px' }, // Only sm
        'md-only': { min: '768px', max: '1023px' }, // Only md
        'lg-only': { min: '1024px', max: '1279px' }, // Only lg
        'xl-only': { min: '1280px', max: '1535px' }, // Only xl
      },
    },
  },
};
