-- ============================================================
-- Lambton County Sports Directory — Supabase Seed Data
-- PostgreSQL-compatible migration from MySQL export
-- Run this AFTER drizzle-kit push to populate all programs
-- ============================================================

-- Create enums (drizzle-kit push will create these, but just in case)
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('user', 'admin');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE change_status AS ENUM ('pending', 'approved', 'dismissed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE ad_position AS ENUM ('banner_top', 'banner_bottom', 'sidebar_card', 'inline_card');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ============================================================
-- Ad Slots (2 sponsors)
-- ============================================================
INSERT INTO ad_slots (title, image_url, image_key, destination_url, position, sort_order, is_active)
VALUES
  ('Ironworks Health & Wellness', '/ironworks-sponsor-banner.png', 'ironworks-sponsor-banner.png', 'https://ironworksfitness.ca/', 'banner_top', 0, true),
  ('Tangs China House', '/tangs-china-house-sponsor.png', 'tangs-china-house-sponsor.png', 'https://tangschinahouse.com/', 'inline_card', 1, true)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Sports Programs (61+ programs)
-- ============================================================
INSERT INTO sports_programs (sport_name, organization, town_area, age_groups, age_min, age_max, registration_open_date, registration_close_date, program_start_date, registration_url, notes, is_active) VALUES

-- ICE HOCKEY
('Ice Hockey', 'Sarnia Hockey Association', 'Sarnia', 'U7, U9, U11, U13, U15, U18', 4, 18, '2026-04-01', '2026-06-30', '2026-09-01', 'https://sarniahockey.com/Pages/14852/General_Information_and_Rep_and_Rec_Registration_Links/', 'Sarnia Hockey Association offers both recreational (house league) and representative hockey for boys and girls from U7 through U18. Registration opens in spring for the upcoming fall/winter season.', true),
('Ice Hockey', 'Mooretown Minor Hockey Association', 'Mooretown', 'U7, U9, U11, U13, U15, U18', 4, 18, '2026-05-01', '2026-06-15', '2026-09-01', 'https://mooretownminorhockey.com/Articles/16650/2026_2027_Registration_Cost_and_Financial_Plan/', 'Mooretown Minor Hockey Association serves the Mooretown and St. Clair area, offering house league and rep hockey for all age groups. Financial assistance plans are available.', true),
('Ice Hockey', 'Lambton Shores Minor Hockey Association', 'Forest', 'U7, U9, U11, U13, U15, U18', 4, 18, '2026-04-15', '2026-05-20', '2026-09-01', 'https://lambtonshoresminorhockey.ca/Pages/1010/General_Information/', 'Lambton Shores Minor Hockey Association (the Predators) serves the Forest, Grand Bend, and Thedford area. Early bird registration deadline is May 20, 2026.', true),
('Ice Hockey', 'East Lambton Minor Hockey Association', 'Watford', 'U7, U9, U11, U13, U15, U18', 4, 18, '2026-04-01', '2026-06-30', '2026-09-01', 'https://eastlambtonminorhockey.ca/Pages/1142/REGISTER_HERE_U-7_to_U-18/', 'East Lambton Minor Hockey Association serves the Watford, Alvinston, and surrounding area. Registration is open for all divisions from U7 to U18.', true),
('Ice Hockey', 'Petrolia Minor Hockey Association', 'Petrolia', 'U7, U9, U11, U13, U15, U18', 4, 18, '2026-04-01', '2026-06-30', '2026-09-01', 'https://petroliaminorhockey.com/', 'Petrolia Minor Hockey Association offers recreational and competitive hockey for youth in the Petrolia and Oil Springs area.', true),
('Ice Hockey (Girls / AAA)', 'Lambton Attack Girls Hockey', 'Sarnia', 'U9, U11, U13, U15, U18', 6, 18, '2026-03-01', '2026-05-31', '2026-08-01', 'https://lambtonattack.com/Pages/1010/Registration_Info/', 'Lambton Attack is an all-girls AAA hockey program offering elite-level development for girls across Lambton County. Tryouts are held in the spring.', true),
('Ice Hockey (AAA)', 'Lambton Jr. Sting', 'Sarnia', 'U15, U18', 15, 20, '2026-03-01', '2026-05-15', '2026-08-01', 'https://lambtonjrsting.ca/Articles/13520/Tryout_Registration_Now_Open_/', 'Lambton Jr. Sting is a AAA minor hockey program offering elite competition at the U15 and U18 levels. Tryout registration is now open for the 2026-27 season.', true),
('Ice Hockey', 'Point Edward Minor Athletic Association (PEMAA)', 'Point Edward', 'U5, U7, U9, U11, U13, U15, U18', 4, 18, '2026-05-08', '2026-06-30', '2026-09-01', 'https://page.spordle.com/point-edward/register/1f1438a7-4127-61f6-9f68-0233802c013f', 'Registration now open to everyone as of May 8, 2026. Players trying out for travel teams in another centre should NOT register here. $200 volunteer fee/cheque required before first ice time.', true),
('Ice Hockey', 'Huron Lakers', 'Huron', '6-18', 6, 18, NULL, NULL, NULL, 'https://huronlakers.com/', NULL, true),

-- SOCCER
('Soccer', 'Sarnia FC (Football Club)', 'Sarnia', 'U4, U5, U6, U7, U8, U9, U10, U11, U12, U13, U14, U15, U16, U17, U18', 4, 18, '2026-01-01', '2026-04-30', '2026-05-01', 'https://www.sarniafc.ca/devinfo/', 'Sarnia FC provides recreational and development soccer for boys and girls from U4 through U18. The Development League registration cost is $235. Financial assistance through Jumpstart and YRASP is available.', true),
('Soccer (Girls)', 'Sarnia Girls Soccer Club', 'Sarnia', 'U4/5, U6, U7, U8, U9, U10/11, U12, U13+', 4, 18, '2026-01-01', '2026-04-30', '2026-05-11', 'https://sarniagirlssoccer.powerupsports.com/', 'Sarnia Girls Soccer Club offers all-female recreational soccer programs. The 2026 outdoor season starts the week of May 11. First Kicks (18 mos to age 3) run Saturdays at 10am.', true),
('Soccer', 'Point Edward Minor Athletic Association (PEMAA)', 'Point Edward', 'U5 (Mite), U8 (Hot Shots), U10 (Tyke), U13 (Junior)', 4, 18, '2026-02-01', '2026-04-15', '2026-05-14', 'https://pointminor.ca/Register/', '2026 outdoor soccer season is currently underway (started mid-May 2026). Age groups: U5 Mite, U8 Hot Shots, U10 Tyke, U13 Junior. Shin guards mandatory; cleats optional.', true),

-- LACROSSE
('Lacrosse', 'Sarnia Minor Lacrosse Association', 'Sarnia', 'U7, U9, U11, U13, U15, U17, U21', 5, 18, '2026-02-01', '2026-04-15', '2026-05-01', 'https://sarnialacrosse.com/Pages/1010/2026_Lacrosse_Registration/', 'Sarnia Minor Lacrosse Association offers box lacrosse for youth from U7 through U21. Registration for the 2026 season is open now.', true),

-- BASEBALL
('Baseball', 'SMAA Hawks Baseball (Sarnia Minor Athletic Association)', 'Sarnia', 'T-Ball (ages 4-6), Rookie (7-8), Mosquito (9-10), Peewee (11-12), Bantam (13-14), Midget (15-18)', 4, 18, '2026-02-01', '2026-04-30', '2026-05-01', 'https://smaa.powerupsports.com/', 'SMAA Hawks Baseball offers recreational baseball for youth from T-Ball through Midget divisions. Register at smaa.powerupsports.com.', true),
('Baseball', 'Sarnia Brigade Minor Baseball', 'Sarnia', 'U9, U11, U13, U15, U18', 9, 18, '2026-01-15', '2026-03-31', '2026-05-01', 'https://sarniabrigade.ca/Articles/3214/2026_Registration_Now_Live/', 'Sarnia Brigade is a competitive minor baseball program offering rep-level play for youth across Lambton County. 2026 registration is now live.', true),
('Baseball', 'Lambton Shores Minor Baseball', 'Forest', 'T-Ball, Rookie, Mosquito, Peewee, Bantam, Midget', 4, 18, '2026-02-01', '2026-04-30', '2026-05-01', 'https://lambtonshoresminorball.ca/Forms/1847/2026_Registration/', 'Lambton Shores Minor Baseball serves the Forest and Grand Bend area. Registration for the 2026 season is now closed; contact the association for late placement.', true),
('Baseball', 'Corunna Minor Baseball', 'Corunna', 'T-Ball (ages 4-6), Rookie, Mosquito, Peewee, Bantam', 4, 14, '2026-02-01', '2026-05-01', '2026-05-15', 'https://corunnaminorbaseball.com/Forms/17592/2026_Registration/', 'Corunna Minor Baseball serves the Corunna and St. Clair area. T-Ball registration (birth years 2021-2022) is still open.', true),
('Baseball', 'Wyoming Minor Ball Association (Wranglers / Lady Wranglers)', 'Wyoming', '4U T-Ball (born 2022), 6U, 7U, 9U, 11U, 13U, 15U, 18U', 4, 18, '2025-09-19', '2026-04-03', '2026-05-10', 'https://wyomingminorball.ca/Forms/2229/', 'Wyoming Minor Ball Association runs house league instructional baseball from T-Ball up and competitive rep teams. All age groups full for 2026; waitlist closed. 2027 registration opens September 2026.', true),
('Baseball', 'Camlachie Athletic Association (Cougars)', 'Camlachie', 'T-Ball, Rookie, Mosquito, Peewee, Bantam (ages 4-16)', 4, 16, '2026-01-02', '2026-04-06', '2026-05-01', 'https://camlachieathleticassociation.ca/Forms/5460/2026_Registration/', 'Camlachie Athletic Association runs community youth ball (Cougar Ball) for the Camlachie and Plympton-Wyoming area. 2026 registration is now closed.', true),
('Baseball', 'Port Lambton Pirates (Port Lambton Athletic Association)', 'Port Lambton', 'T-Ball through Midget / Junior; U9, U11, U13, U15, U18', 4, 18, '2025-08-28', '2025-12-31', '2026-05-01', 'https://portlambtonpirates.ca', 'The Port Lambton Pirates run summer baseball and softball for youth. Registration opens August 28 each year for the following summer season. $75 late fee applies after December 31.', true),
('Baseball', 'Petrolia Athletics 18U', 'Petrolia', '18U (ages 15-18)', 15, 18, '2026-01-01', '2026-05-31', '2026-05-01', 'https://www.htosports.com/teams/registration.asp?u=PETROLIAATHLETICS&s=baseball&p=registration&soloPage=1', 'Competitive rep baseball for players ages 15-18 based in Petrolia. Registration fee: $350. Cheques payable to Petrolia Athletics 18U Baseball Team.', true),

-- GYMNASTICS
('Gymnastics', 'Bluewater Gymnastics Club', 'Sarnia', 'Ages 18 months and up', 1, 17, '2026-03-01', '2026-08-31', '2026-09-01', 'https://bluewatergymnastics.uplifterinc.com/registration/', 'Bluewater Gymnastics Club offers recreational and competitive gymnastics programs for children from 18 months through teen years. Programs include GymTots, recreational gymnastics, and competitive streams.', true),
('Gymnastics', 'Platinum Gymnastics Studio', 'Sarnia', 'Toddlers (ages 3-5); Classes (ages 5+); Competitive team', 3, 17, NULL, NULL, NULL, 'https://www.facebook.com/PlatinumGymnasticsBabyGym', 'Sarnia gymnastics studio at 873 Phillip St E. Offers toddler classes, recreational gymnastics and competitive team training. Free trial class available. Rolling enrollment throughout the year.', true),

-- FOOTBALL
('Football', 'SMAA Football (Sarnia Minor Athletic Association)', 'Sarnia', 'Tyke (ages 5-7), Atom (8-9), Novice (10-11), Peewee (12-13), Bantam (14-15)', 4, 18, '2026-03-01', '2026-05-31', '2026-06-15', 'https://smaa.powerupsports.com/', 'SMAA Football is a Football Ontario member program focused on player development and safety. Divisions run from Tyke through Bantam.', true),
('Flag Football', 'Bluewater Flag Football', 'Sarnia', 'Ages 5-14', 5, 17, '2026-03-01', '2026-05-31', '2026-06-01', 'https://www.bluewaterflagfootball.ca/youth-league', 'Bluewater Flag Football offers non-contact flag football for youth ages 5-14 in the Sarnia-Lambton area.', true),

-- BASKETBALL
('Basketball', 'Hoops Allstar Basketball', 'Sarnia', 'Ages 5-17', 5, 17, '2026-08-01', '2026-10-31', '2026-11-01', 'https://hoopsallstar.ca/news-and-start-dates-here/', 'Hoops Allstar Basketball offers recreational and development basketball programs for youth in the Sarnia-Lambton area. Fall/winter season registration opens in August.', true),
('Basketball', 'Rep Up Basketball Sarnia', 'Sarnia', 'Grades 1-9 (ages approx 6-15)', 6, 15, '2026-01-01', NULL, '2026-07-01', 'https://www.facebook.com/groups/505066908364241', 'Facebook-primary rolling monthly registration program. Group training sessions for boys and girls ages 6+. July/August 2026 summer registration open. Sessions at Lakeside Childcare and Les Rapides School Sarnia.', true),
('Basketball', 'Sarnia Valhalla Youth Basketball Association', 'Sarnia', 'Camp Olympic (born 2014-2017); Camp NBA (born 2012-2013)', 9, 15, '2026-05-01', NULL, '2026-07-06', 'https://docs.google.com/forms/d/e/1FAIpQLSfG_6YXn9XSCcayKPLZ-5xBqx7fjt-C5FZbn-5hyoqZ3vs8jA/viewform', 'Established 1983 club. Two-week summer basketball camp at Northern Collegiate Sarnia. Week 1: July 6-10; Week 2: July 13-17. Spots limited.', true),
('Basketball', 'Nike Basketball Camp Sarnia (MPG Sports)', 'Sarnia', 'Ages 9-17 (co-ed)', 9, 17, '2026-02-01', NULL, '2026-07-06', 'https://www.sportscampscanada.com/camps/nike-basketball-camp-sarnia', 'Nike Basketball Camp at Holy Trinity Catholic School Sarnia (60 Lorne Crescent). Full day Mon-Fri 9 am-3 pm. Co-ed; intermediate to advanced skill levels. Cost: $350 + HST.', true),

-- BALL HOCKEY
('Ball Hockey', 'Sarnia Minor Ball Hockey League (SMBHL)', 'Sarnia', 'Learn to Play (ages 3-6), House League (ages 6-17)', 3, 17, '2026-03-01', '2026-04-25', '2026-04-18', 'https://app.teamlinkt.com/register/find/sarniaminorballhockeyleague', 'Sarnia Minor Ball Hockey League offers a Learn to Play program for ages 3-6 and a house league for ages 6-17. The 2026 Spring/Summer season is currently open for registration.', true),
('Ball Hockey', 'Wyoming Ball Hockey League', 'Wyoming', 'Ages 4-12 (Pre-K to Grade 7)', 4, 12, '2026-01-01', '2026-04-01', '2026-04-21', 'https://wyomingballhockey.ca/registration', 'Non-contact ball hockey for kids ages 4-12 in Plympton-Wyoming. Two sessions per night at McKay Park Wyoming. 10-week season running April to June on Mondays. Cost: $40. Registration for 2026 is closed; watch for January 2027 opening.', true),

-- TENNIS
('Tennis', 'Sarnia Tennis Club', 'Sarnia', 'Ages 4-18', 5, 18, '2026-03-01', '2026-06-30', '2026-05-01', 'https://www.sarniatennisclub.com/juniors', 'Sarnia Tennis Club offers junior tennis programs for ages 4 through 18, including Red, Orange, and Green Ball programs following Tennis Canada guidelines.', true),

-- GOLF
('Golf', 'SMAA Junior Golf Tour (Lambton Junior Golf Tour)', 'Sarnia', 'Development (born 2010-2016), U13, U15, U17, U19', 8, 18, '2026-02-01', '2026-04-20', '2026-04-26', 'https://www.sarniaminorathletic.com/golf/', 'SMAA Junior Golf Tour runs five Sunday tournaments at courses across Lambton County. Cost is $300. First event: April 26 at Sawmill Creek, Camlachie. Tour Championship: July 5 at St. Clair Parkway, Mooretown.', true),

-- SWIMMING
('Swimming', 'YMCA Sarnia-Lambton (Jerry McCaw Family Centre)', 'Sarnia', 'Parent & Tot (0-3), Preschool (3-5), Learn to Swim (6-13), Teen (13-17), Adult', 1, 17, '2026-04-01', '2026-05-31', '2026-05-01', 'https://www.ymcaswo.ca/jmfc-aquatics', 'YMCA Sarnia-Lambton offers swim lessons for all ages from Parent & Tot through teen levels, including the YMCA Star program. Spring session registration is open with limited spots available.', true),

-- RINGETTE
('Ringette', 'Forest Xtreme Ringette', 'Forest', 'U10, U12, U14, U16, U19', 5, 18, '2026-05-04', '2026-07-31', '2026-09-01', 'https://forestringette.com/content/registration-2026-2027', 'Forest Xtreme Ringette registration for the 2026-2027 season is now open. Two registration periods are offered this season. Serves the Forest and surrounding area.', true),

-- VOLLEYBALL
('Volleyball', 'Twin Bridges Volleyball Club', 'Sarnia', 'U12, U14, U16, U18', 10, 18, '2026-09-01', '2026-10-31', '2026-11-01', 'https://www.twinbridgesvbc.ca/', 'Twin Bridges Volleyball Club offers competitive volleyball for youth in Lambton County. Fall/winter season registration opens in September. Spring skill development clinics are also available.', true),

-- CURLING
('Curling', 'Sarnia Golf and Curling Club (Little Rockers Junior Curling)', 'Sarnia', 'Ages 7-17', 5, 18, '2026-08-01', '2026-10-15', '2026-10-01', 'https://sarniagcc.clubhouseonline-e3.com/Join/Little_Rocker_Program_Junior_Curling', 'The Little Rockers Junior Curling program at Sarnia Golf and Curling Club introduces youth ages 7-17 to the sport of curling in a fun and welcoming environment.', true),

-- SAILING
('Sailing', 'Sarnia Yacht Club', 'Sarnia', 'Ages 7-17', 8, 18, '2026-04-01', '2026-06-15', '2026-07-01', 'https://sarniayachtclub.ca/learn-to-sail/', 'Sarnia Yacht Club offers Learn to Sail programs for youth ages 7-17 on Lake Huron. Summer programs run in July and August.', true),

-- WRESTLING
('Wrestling', 'Sarnia Bluewater Wrestling Club', 'Sarnia', 'Tykes (7-8), Novice (9-10), Kids (11-12), Cadet (13-15), Junior (16-18)', 6, 18, '2026-09-01', '2026-10-31', '2026-11-01', 'https://www.facebook.com/groups/95004813674/', 'Sarnia Bluewater Wrestling Club offers youth wrestling from Tykes through Junior divisions. The club co-hosted the 2026 Ontario Senior Open and Youth Wrestling Festival at Lambton College.', true),
('Wrestling', 'Ontario Amateur Wrestling Association (OAWA) – Summer Camp at Lambton College', 'Sarnia', 'Ages 10-18 (youth and senior wrestlers)', 10, 18, '2026-05-01', '2026-07-08', '2026-07-01', 'https://www.oawa.ca/events/oawa-summer-development-camp', 'OAWA Summer Development Camp hosted at Lambton College Athletics Complex (1457 London Rd Sarnia). Includes 5 on-mat sessions and overnight stay. Register by June 27 for guaranteed pricing of $200.', true),

-- FASTBALL
('Fastball (Girls)', 'Sarnia Heat Girls Fastball (SMAA)', 'Sarnia', 'Peewee (11-12), Bantam (13-14), Midget (15-18)', 8, 18, '2026-02-01', '2026-04-30', '2026-05-01', 'https://smaa.powerupsports.com/', 'Sarnia Heat Girls Fastball is run through SMAA and offers competitive girls fastball at Peewee, Bantam, and Midget levels. Register at smaa.powerupsports.com.', true),

-- CHALLENGER BALL
('Challenger Ball (Adaptive Baseball)', 'SMAA Challenger Ball', 'Sarnia', 'Ages 5-18 (athletes with disabilities)', 5, 18, '2026-02-01', '2026-04-30', '2026-05-01', 'https://smaa.powerupsports.com/', 'SMAA Challenger Ball is an adaptive baseball program for youth with physical and intellectual disabilities, ages 5-18. Register at smaa.powerupsports.com.', true),

-- DANCE
('Dance', 'Bluewater Dance Academy (BDA)', 'Sarnia', 'Ages 4-18+', 4, 18, '2026-05-19', NULL, '2026-09-01', 'https://app.gostudiopro.com/online/classes.php?account_id=7181', 'Sarnia dance studio at 500 Exmouth St Unit 14 and 15. Offers Jazz, Contemporary, Hip Hop, Acrobatics, Lyrical, Ballet, Tap and Musical Theatre. Competitive company auditions for ages 4-5. 2026-27 registration opens May 19.', true),
('Dance', 'Great Lakes Dance Academy (GLDA)', 'Sarnia', 'Ages 3-18', 3, 18, NULL, NULL, '2026-09-01', 'https://greatlakesdanceacademy.com/class-schedule/', 'Recreational and competitive dance in Sarnia. Annual recital at Imperial Theatre. 34-week season (September to mid-June). Download the app to register. Auditions for Intensive Study and Company: May 24, 2026.', true),
('Dance', 'Steppin'' Up Dance Co. – Sarnia Studio', 'Sarnia', 'Ages 2.5-18', 2, 18, '2026-09-01', NULL, '2026-09-01', 'https://steppinupdanceco.ca/registration/', 'Sarnia studio located at 805 Christina St N Unit 001 (South Entrance, Point Edward). Offers Ballet, Tap, Jazz, Hip Hop, Acrobatics, Lyrical and competitive teams. Season runs September-June.', true),
('Dance', 'Steppin'' Up Dance Co. – Petrolia Studio', 'Petrolia', 'Ages 2.5-18', 2, 18, '2026-07-06', NULL, '2026-07-06', 'https://steppinupdanceco.ca/registration/', 'Petrolia studio at 4163 Petrolia Line. Same programming as Sarnia studio. Summer camps July 2026 including K-Pop Camp and Swiftie Summer Camp July 6-10. Summer camp cost: $150 + HST half day.', true),
('Dance', 'Apex Dance Industry', 'Sarnia', 'Ages 3-18', 3, 18, '2026-01-15', NULL, '2026-06-01', 'https://www.apexdanceindustry.ca/pricing', 'Sarnia''s only aerial arts dance studio at 873 Phillip St E. Year-round classes plus summer 2026 day camps (registration open). Offers Ballet, Aerial Arts, Hip Hop, Contemporary and summer camps.', true),
('Dance', 'The Dance Centre Sarnia (TDC)', 'Sarnia', 'Ages 3-18', 3, 18, NULL, NULL, '2026-09-01', 'https://www.thedancecentresarnia.com', 'Sarnia''s newest dance studio located in Finch Plaza near Lambton College. Recreational and competitive dance programs. Check website for 2026-27 schedule.', true),

-- FIGURE SKATING
('Figure Skating', 'Skate Sarnia', 'Sarnia', 'Ages 3-17 (CanSkate and competitive streams)', 3, 17, '2025-09-01', NULL, '2025-09-01', 'https://www.skatesarnia.net', 'Sarnia figure skating club offering CanSkate learn-to-skate and competitive skating programs. 2025-26 registration open via email; returning members have priority. Contact: skatesarniaregistrar@gmail.com.', true),
('Figure Skating', 'Point Edward Skating Club (PESC)', 'Point Edward', 'All ages, beginner to competitive', 3, 17, '2026-09-01', NULL, '2026-09-01', 'https://pesc.uplifterinc.com/registration/', 'Point Edward Skating Club incorporated 1961. Located at Point Edward Arena, 210 Monk Street. Hosted Ice Reflections 2026 show April 12 featuring Madeline Schizas. 2026-27 registration opens September 2026.', true),
('Skating (Power Skating)', 'Forest Skating Club', 'Forest', 'Junior (born 2015-2018); Senior group (ages approx 6-13)', 6, 13, '2026-03-16', NULL, '2026-03-30', 'https://www.forestskatingclub.ca', 'Forest power skating spring 2026 at Lambton Shores Arena. Registration opened March 16; classes began March 30. Junior Power Skating Thursdays 3:30-4:20 pm. Limited spots (10-15 skaters per session). Cost: $175.', true),

-- CHEERLEADING
('Cheerleading', 'Bluewater Cheer Athletics (BCA)', 'Sarnia', 'Ages 3-19 (Novice/Rec and all-star competitive teams)', 3, 19, '2026-02-01', NULL, '2026-09-01', 'https://app.amilia.com/store/bluewater-cheer-athletics/shop', 'Only all-star cheer gym in Lambton County, established 2013. Competitive teams at all levels competing locally, nationally and internationally. Novice/Rec program for beginners. Register via Amilia store.', true),

-- MARTIAL ARTS
('Martial Arts (Karate)', 'Sarnia Karate – Santoku-Ryu Bujutsu Kai', 'Sarnia', 'Ages 7-15 (kids and teens)', 7, 15, NULL, NULL, NULL, 'https://www.sarniakarate.ca/Classes/', 'Okinawan Karate school serving Sarnia and greater Lambton County since 2024. Classes at 824 Phillip St Unit B and Lambton College. First class is free. Rolling enrollment year-round.', true),
('Martial Arts (Taekwondo)', 'Bluewater Taekwondo Sarnia', 'Sarnia', 'Little Ninjas (ages 4-6); Kids Class (ages 6+); Teens', 4, 17, NULL, NULL, NULL, 'https://www.bluewatertaekwondo.com', 'Serving Sarnia since 1970 at 142 Front St N. Little Ninjas (ages 4-6) Mon/Wed or Tue/Thu 5:15-5:45 pm. Kids Class (ages 6+) Mon-Thu 6-7 pm. Three sessions per year: Fall, Winter, Spring. Free trial pass available.', true),
('Martial Arts (Taekwondo)', 'Petrolia Bluewater Taekwondo Club', 'Petrolia', 'Ages 5-17 (all levels; competitive stream available)', 5, 17, NULL, NULL, NULL, 'https://www.petroliabluewatertkd.ca', 'Non-profit Taekwondo club in Petrolia serving all ages and abilities. Beginner classes Monday nights and Saturday mornings. Advanced and competitive classes also available. Low rates (non-profit).', true),
('Martial Arts (Brazilian Jiu-Jitsu / Kickboxing)', 'The Butcher Shop Jiu-Jitsu and Kickboxing', 'Sarnia', 'Ages 6-9 and ages 10-15', 6, 15, '2026-03-01', NULL, '2026-04-01', 'https://www.butchershopjiujitsu.ca', 'Sarnia martial arts academy devoted to Brazilian Jiu-Jitsu and Kickboxing. Kids spring session 2026 now open with spots still available in the 6-9 age group. 7-day free trial available.', true),
('Martial Arts (Brazilian Jiu-Jitsu / Kickboxing)', 'Forge Training Centre', 'Sarnia', 'Kids Jiu-Jitsu ages 6-10 and 11-15; Kids Kickboxing ages 6-10 and 11-15', 6, 15, NULL, NULL, NULL, 'https://forgetrainingcentre.com', 'MMA and BJJ facility at 1880 London Line Sarnia. Kids Jiu-Jitsu Tue/Thu 5:00-5:30 pm (ages 6-10) and 5:30-6:15 pm (ages 11-15). Rolling enrollment; kids can start anytime.', true),
('Martial Arts (Karate)', 'YMCA of Southwestern Ontario – Karate Programs', 'Sarnia', 'Children and youth ages 5-17', 5, 17, '2026-04-15', NULL, '2026-04-30', 'https://www.ymcaswo.ca/programming', 'YMCA SWO offers karate and active martial arts-style youth programs at both the Sarnia Jerry McCaw Family Centre and Petrolia YMCA (360 Tank St). Spring 2026 session registration opened April 15.', true),

-- MULTI-SPORT / CAMPS
('Multi-Sport / Summer Day Camp', 'BGC Sarnia-Lambton (Boys and Girls Club)', 'Sarnia', 'School-age children ages 5-13', 5, 13, '2026-01-01', NULL, '2026-07-01', 'https://app.amilia.com/store/en/BGCSarnia-Lambton/shop/programs', 'BGC Sarnia-Lambton Summer Day Camp runs July and August Mon-Fri 9 am-5 pm. Multiple Sarnia locations: St. Luke''s United Church and Lochiel Kiwanis Community Centre. Social and recreational activities including sports and outings. Cost: $40/day per child.', true),
('Multi-Sport / Summer Camp', 'Lambton Centre (United Church)', 'Forest', 'Ages 5+ (day camp); leadership programs for teens', 5, 17, '2026-01-01', NULL, '2026-07-06', 'https://lambtoncentre.com/summer-camp/', 'Lambton Centre summer camp near Forest offering day camps and overnight camp experiences. SPLASH Day Camp sessions available Mon-Fri 9 am-4 pm. Camp starts July 6, 2026. Cost: $280 + HST per week.', true),
('Multi-Sport / Summer Day Camp', 'YMCA of Southwestern Ontario – Lambton Shores Camp', 'Grand Bend', 'Ages 4-12', 4, 12, '2026-01-19', NULL, '2026-07-01', 'https://www.ymcaswo.ca/lambton-shores-camp', 'YMCA Summer Day Camp in the Grand Bend/Lambton Shores area. Registration for 2026 opened January 19. Mon-Fri weekly. Cost: Members $105-$175/week; Non-members $120-$200/week. Financial assistance available.', true);
