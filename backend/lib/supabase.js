import { createClient } from "@supabase/supabase-js";
import { ENV } from "./env.js";

const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_SERVICE_ROLE_KEY);

const testStorage = async () => {
  const { data, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error("Storage connection failed:", error.message);
  } else {
    console.log("Supabase Storage Connected");
  }
};

export { supabase, testStorage };
