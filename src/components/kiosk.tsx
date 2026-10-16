"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "miniverse:kiosk";

/**
 * 描画前に <html data-kiosk> を設定するインラインスクリプト。
 * ?kiosk=1 で ON、?kiosk=0 で OFF。設定は localStorage に保存される。
 */
export const kioskBootScript = `(function(){try{var q=new URLSearchParams(location.search).get("kiosk");var k="${STORAGE_KEY}";if(q==="1")localStorage.setItem(k,"1");if(q==="0")localStorage.removeItem(k);if(localStorage.getItem(k)==="1")document.documentElement.dataset.kiosk="true";}catch(e){}})();`;

type KioskContextValue = { kiosk: boolean; setKiosk: (on: boolean) => void };

const KioskContext = createContext<KioskContextValue>({ kiosk: false, setKiosk: () => {} });

export const useKiosk = () => useContext(KioskContext);

export function KioskProvider({ children }: { children: React.ReactNode }) {
  const [kiosk, setKioskState] = useState(false);

  useEffect(() => {
    // boot スクリプトが付けた属性を React 側の状態に反映する（外部状態との同期）
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setKioskState(document.documentElement.dataset.kiosk === "true");
  }, []);

  const setKiosk = useCallback((on: boolean) => {
    try {
      if (on) localStorage.setItem(STORAGE_KEY, "1");
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
    if (on) document.documentElement.dataset.kiosk = "true";
    else delete document.documentElement.dataset.kiosk;
    setKioskState(on);
  }, []);

  useEffect(() => {
    if (!kiosk) return;
    const prevent = (e: Event) => e.preventDefault();
    // 最初の操作で全画面にする（ブラウザはユーザー操作なしの全画面化を許可しないため）
    const goFullscreen = () => {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    };
    document.addEventListener("contextmenu", prevent);
    document.addEventListener("gesturestart", prevent);
    document.addEventListener("pointerdown", goFullscreen, { once: true });
    return () => {
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("gesturestart", prevent);
      document.removeEventListener("pointerdown", goFullscreen);
    };
  }, [kiosk]);

  return <KioskContext.Provider value={{ kiosk, setKiosk }}>{children}</KioskContext.Provider>;
}

/** iframe 内など、window に届かない操作を放置タイマーに知らせる */
export const ACTIVITY_EVENT = "miniverse:activity";
export const reportActivity = () => window.dispatchEvent(new Event(ACTIVITY_EVENT));
