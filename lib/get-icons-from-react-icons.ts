"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { IconType } from "react-icons";

async function importIconFamily(
  family: string
): Promise<Record<string, IconType>> {
  switch (family) {
    case "ai":
      return import("react-icons/ai").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "bi":
      return import("react-icons/bi").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "bs":
      return import("react-icons/bs").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "cg":
      return import("react-icons/cg").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "ci":
      return import("react-icons/ci").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "di":
      return import("react-icons/di").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "fa":
      return import("react-icons/fa").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "fa6":
      return import("react-icons/fa6").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "fc":
      return import("react-icons/fc").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "fi":
      return import("react-icons/fi").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "gi":
      return import("react-icons/gi").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "go":
      return import("react-icons/go").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "gr":
      return import("react-icons/gr").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "hi":
      return import("react-icons/hi").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "hi2":
      return import("react-icons/hi2").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "im":
      return import("react-icons/im").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "io":
      return import("react-icons/io").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "io5":
      return import("react-icons/io5").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "lia":
      return import("react-icons/lia").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "lu":
      return import("react-icons/lu").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "md":
      return import("react-icons/md").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "pi":
      return import("react-icons/pi").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "ri":
      return import("react-icons/ri").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "rx":
      return import("react-icons/rx").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "si":
      return import("react-icons/si").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "sl":
      return import("react-icons/sl").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "tb":
      return import("react-icons/tb").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "tfi":
      return import("react-icons/tfi").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "ti":
      return import("react-icons/ti").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "vsc":
      return import("react-icons/vsc").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    case "wi":
      return import("react-icons/wi").then((module) => {
        const { default: _default, ...icons } = module;
        return icons as Record<string, IconType>;
      });
    default:
      throw new Error("Unknown react icons family : " + family);
  }
}

function detectIconFamily(iconName: string): string | null {
  if (!iconName || iconName.length < 2) {
    return null;
  }

  let prefixEnd = 1;

  for (let i = 1; i < iconName.length; i++) {
    if (iconName[i] >= "A" && iconName[i] <= "Z") {
      prefixEnd = i;
      break;
    }
    if (iconName[i] >= "0" && iconName[i] <= "9") {
      continue;
    }
    if (iconName[i] >= "a" && iconName[i] <= "z") {
      continue;
    }
    break;
  }

  const prefix = iconName.substring(0, prefixEnd).toLowerCase();

  if (prefix.length < 2) {
    console.warn(`Prefix too short for ${iconName}: "${prefix}"`);
    return null;
  }

  return prefix;
}

class IconCache {
  private cache = new Map<string, IconType>();
  private maxSize = 1000;

  get(key: string): IconType | undefined {
    return this.cache.get(key);
  }

  set(key: string, value: IconType): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value!;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

const iconsCache = new IconCache();

export const getIconsFromReactIcons = async (
  iconsNames: string[]
): Promise<Map<string, IconType | null>> => {
  const iconsMapping = new Map<string, IconType | null>();

  const iconsByFamily = new Map<string, string[]>();

  for (const iconName of iconsNames) {
    const iconFromCache = iconsCache.get(iconName);
    if (iconFromCache) {
      iconsMapping.set(iconName, iconFromCache);
      continue;
    }

    const family = detectIconFamily(iconName);
    if (!family) {
      console.warn(`Cannot determine family for ${iconName}`);
      iconsMapping.set(iconName, null);
      continue;
    }

    if (!iconsByFamily.has(family)) {
      iconsByFamily.set(family, []);
    }
    iconsByFamily.get(family)!.push(iconName);
  }

  const importPromises = Array.from(iconsByFamily.entries()).map(
    async ([family, icons]) => {
      try {
        const iconModule = await importIconFamily(family);
        return { family, icons, iconModule };
      } catch (error) {
        console.warn(`Failed to load family "${family}":`, error);
        return { family, icons, iconModule: null };
      }
    }
  );

  const results = await Promise.all(importPromises);

  for (const { icons, iconModule } of results) {
    for (const iconName of icons) {
      if (!iconModule) {
        console.warn(`No family module for ${iconName}`);
        iconsMapping.set(iconName, null);
        continue;
      }

      const icon = iconModule[iconName];
      if (icon) {
        iconsCache.set(iconName, icon);
        iconsMapping.set(iconName, icon);
      } else {
        console.warn(`Icon "${iconName}" not found in its family`);
        iconsMapping.set(iconName, null);
      }
    }
  }

  return iconsMapping;
};
