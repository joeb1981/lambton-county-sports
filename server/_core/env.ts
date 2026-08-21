import { config } from "dotenv";

config();
config({ path: ".env.local", override: true });

export const ENV = {
  databaseUrl: process.env.DATABASE_URL ?? "",
  supabaseUrl: process.env.SUPABASE_URL ?? "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  ownerEmail: process.env.OWNER_EMAIL ?? "",
  cronSecret: process.env.CRON_SECRET ?? "",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  notificationEmail: process.env.NOTIFICATION_EMAIL ?? "",
  isProduction: process.env.NODE_ENV === "production",
  port: parseInt(process.env.PORT ?? "3000"),
};
