import  dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

export const loadEnv = () => {
  const path = 
    process.env.NODE_ENV = ".env";

  const currentEnvs = dotenv.config({ path });
  dotenvExpand.expand(currentEnvs);
};
