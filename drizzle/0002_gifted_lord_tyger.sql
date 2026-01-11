ALTER TABLE "plan" ALTER COLUMN "features" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "social_links" SET DATA TYPE jsonb;--> statement-breakpoint
CREATE INDEX "analytics_link_id_idx" ON "analytics" USING btree ("link_id");--> statement-breakpoint
CREATE INDEX "analytics_user_id_idx" ON "analytics" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "analytics_clicked_at_idx" ON "analytics" USING btree ("clicked_at");--> statement-breakpoint
ALTER TABLE "custom_theme" ADD CONSTRAINT "custom_theme_user_id_name_unique" UNIQUE("user_id","name");