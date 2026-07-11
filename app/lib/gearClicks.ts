import { supabase } from "@/lib/supabase";

export type GearClickParams = {
  gearName: string;
  manufacturer: string;
  targetUrl: string;
  sourcePage: string;
  category?: string;
};

const MANUFACTURER_URLS: Record<string, string> = {
  "Pioneer DJ": "https://www.pioneerdj.com/ja/",
  "Denon DJ": "https://www.denondj.com/jp/",
  "Native Instruments": "https://www.native-instruments.com/jp/",
};

export function getTargetUrl(brand: string): string {
  return MANUFACTURER_URLS[brand] ?? "";
}

export async function logGearClick(params: GearClickParams): Promise<void> {
  try {
    await supabase.from("gear_clicks").insert({
      gear_name: params.gearName,
      manufacturer: params.manufacturer,
      target_url: params.targetUrl,
      source_page: params.sourcePage,
      category: params.category ?? null,
    });
  } catch (error) {
    console.error("Failed to log gear click:", error);
  }
}
