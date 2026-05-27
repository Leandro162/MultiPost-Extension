import { ArticleCSDN } from "./article/csdn";
import { ArticleWeibo } from "./article/weibo";
import { ArticleZhihu } from "./article/zhihu";
import type { PlatformInfo } from "./common";

export const ArticleInfoMap: Record<string, PlatformInfo> = {
  ARTICLE_CSDN: {
    type: "ARTICLE",
    name: "ARTICLE_CSDN",
    homeUrl: "https://mp.csdn.net/mp_blog/creation/editor",
    faviconUrl: "https://g.csdnimg.cn/static/logo/favicon32.ico",
    platformName: chrome.i18n.getMessage("platformCSDN"),
    injectUrl: "https://mp.csdn.net/mp_blog/creation/editor",
    injectFunction: ArticleCSDN,
    tags: ["CN"],
    accountKey: "csdn",
  },
  ARTICLE_ZHIHU: {
    type: "ARTICLE",
    name: "ARTICLE_ZHIHU",
    homeUrl: "https://zhuanlan.zhihu.com/write",
    faviconUrl: "https://www.zhihu.com/favicon.ico",
    platformName: chrome.i18n.getMessage("platformZhihu"),
    injectUrl: "https://zhuanlan.zhihu.com/write",
    injectFunction: ArticleZhihu,
    tags: ["CN"],
    accountKey: "zhihu",
  },
  ARTICLE_WEIBO: {
    type: "ARTICLE",
    name: "ARTICLE_WEIBO",
    homeUrl: "https://weibo.com/",
    faviconUrl: "https://weibo.com/favicon.ico",
    platformName: chrome.i18n.getMessage("platformWeibo"),
    injectUrl: "https://card.weibo.com/article/v3/editor",
    injectFunction: ArticleWeibo,
    tags: ["CN"],
    accountKey: "weibo",
  },
};
