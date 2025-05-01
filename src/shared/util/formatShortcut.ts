type ModifierKey = "Meta" | "Shift" | "Alt" | "Control" | "Backspace";

const keyMapMac: Record<ModifierKey, string> = {
  Meta: "⌘",
  Shift: "⇧",
  Alt: "⌥",
  Control: "⌃",
  Backspace: "⌫",
};

const keyMapPC: Record<ModifierKey, string> = {
  Meta: "Win",
  Shift: "Shift",
  Alt: "Alt",
  Control: "Ctrl",
  Backspace: "Backspace",
};

const isMacOS = (): boolean => {
  return (
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad|iPod/.test(navigator.userAgent)
  );
};

export const formatShortcut = (shortcut: string) => {
  const isMac = isMacOS();
  const keyMap = isMacOS() ? keyMapMac : keyMapPC;

  return shortcut
    .split("+")
    .map((key) =>
      key in keyMap ? keyMap[key as ModifierKey] : key.toUpperCase(),
    )
    .join(isMac ? "" : "+");
};
