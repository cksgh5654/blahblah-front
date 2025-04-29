const prefixCls = "chanho";

const getBaseCls = (suffix: string) => {
  return `${prefixCls}-${suffix}`;
};

export const carouselXscrollBaseCls = getBaseCls("carouselXscroll");
export const carouselXscrollItemContainerCls = getBaseCls(
  "carouselXscroll-item-container"
);
export const carouselXscrollItemsCls = getBaseCls("carouselXscroll-items");
export const carouselXscrollNavigatorCls = getBaseCls(
  "carouselXscroll-navigator"
);
