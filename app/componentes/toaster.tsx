"use client";

import { Toaster } from "sonner";

export default function AppToaster() {
  return (
    <Toaster
      richColors
      position="top-right"
      toastOptions={{
        style: {
          background: "rgba(15, 23, 42, 0.92)",
          color: "#f8fafc",
          border: "1px solid rgba(148, 163, 184, 0.18)",
        },
      }}
    />
  );
}
