CREATE TABLE "custom_theme" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"main" text NOT NULL,
	"card" text NOT NULL,
	"card_border" text NOT NULL,
	"text" text NOT NULL,
	"primary" text NOT NULL,
	"accent" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "custom_theme" ADD CONSTRAINT "custom_theme_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;