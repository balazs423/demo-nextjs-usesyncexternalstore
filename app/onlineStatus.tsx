"use client";

import { useSyncExternalStore } from "react";

export default function OnlineStatusIndicator() {
  const isOnline = useSyncExternalStore(subscribeToOnlineStatusChange, getOnlineStatus, getServerSnapshotForOnlineStatus);

  return (
    <p>Online: {JSON.stringify(isOnline)}</p>
  );
}

function subscribeToOnlineStatusChange(callback: () => void) {
  if ( window === undefined) { return () => {}; }
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

function getOnlineStatus(): boolean {
  if (navigator === undefined) { return false };
  return navigator.onLine;
}

function getServerSnapshotForOnlineStatus() {
  return true; // Always show "Online" for server-generated HTML
}