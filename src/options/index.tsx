import "~style.css";
import cssText from "data-text:~style.css";
import { HeroUIProvider } from "@heroui/react";
import ArticleTab from "~components/Sync/ArticleTab";
import type { SyncData } from "~sync/common";

export function getShadowContainer() {
  return document.querySelector("#test-shadow").shadowRoot.querySelector("#plasmo-shadow-container");
}

export const getShadowHostId = () => "test-shadow";

export const getStyle = () => {
  const style = document.createElement("style");

  style.textContent = cssText;
  return style;
};

const waitForTabComplete = (tabId: number) =>
  new Promise<void>((resolve) => {
    chrome.tabs.get(tabId, (tab) => {
      if (tab?.status === "complete") {
        resolve();
        return;
      }

      chrome.tabs.onUpdated.addListener(function listener(updatedTabId, changeInfo) {
        if (updatedTabId === tabId && changeInfo.status === "complete") {
          chrome.tabs.onUpdated.removeListener(listener);
          resolve();
        }
      });
    });
  });

const Options = () => {
  const publishArticle = (data: SyncData) => {
    chrome.runtime.sendMessage({ action: "MULTIPOST_EXTENSION_PUBLISH", data });
  };

  const scrapeArticle = async (url: string) => {
    const tab = await chrome.tabs.create({ url, active: false });
    if (!tab.id) {
      throw new Error("Unable to create scraper tab");
    }

    try {
      await waitForTabComplete(tab.id);
      return await chrome.tabs.sendMessage(tab.id, { type: "MULTIPOST_EXTENSION_REQUEST_SCRAPER_START" });
    } finally {
      await chrome.tabs.remove(tab.id);
    }
  };

  return (
    <HeroUIProvider>
      <main className="min-h-screen bg-background text-foreground">
        <header className="border-b border-default-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
            <img src={chrome.runtime.getURL("assets/icon.png")} alt="" className="h-9 w-9 rounded-lg" />
            <div>
              <h1 className="text-lg font-semibold">Article Sync</h1>
              <p className="text-xs text-default-500">Zhihu, Weibo, and CSDN article drafts</p>
            </div>
          </div>
        </header>
        <section className="mx-auto max-w-6xl px-4 py-5">
          <ArticleTab funcPublish={publishArticle} funcScraper={scrapeArticle} />
        </section>
      </main>
    </HeroUIProvider>
  );
};

export default Options;
