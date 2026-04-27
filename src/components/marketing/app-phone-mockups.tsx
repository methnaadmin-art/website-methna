"use client";

import { Fragment, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  BarChart3,
  Bell,
  CalendarDays,
  Compass,
  Crown,
  Flame,
  Flag,
  Heart,
  HeartHandshake,
  Image as ImageIcon,
  Lock,
  MapPin,
  MessageCircle,
  MessageSquare,
  Pencil,
  RotateCcw,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserCircle2,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const appFontStyle = {
  fontFamily: '"Poppins", "Aptos", "Segoe UI", "Inter", Arial, sans-serif',
} as const;

const cast = {
  fatima: {
    name: "Fatima Zahra",
    handle: "@fatimaz",
    location: "DZ Algiers, Algeria",
    nationality: "Algeria",
    photo:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80",
  },
  omar: {
    name: "Omar",
    age: 29,
    location: "MA Casablanca, Morocco",
    faith: "Practicing Muslim / Sunni",
    interests: "Reading / Travel / Football",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  },
  amina: {
    name: "Amina",
    age: 27,
    job: "Architect",
    line: "Oran, Algeria / 2 h ago",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
  },
  youssef: {
    name: "Youssef",
    age: 31,
    job: "Engineer",
    line: "Rabat, Morocco / 1 h ago",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
  },
  leila: {
    name: "Leila",
    age: 26,
    job: "Pharmacist",
    line: "Doha, Qatar / 5 h ago",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
  },
  noor: {
    name: "Noor",
    age: 29,
    job: "Dentist",
    line: "Dubai, UAE / 1 d ago",
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  },
  mariam: {
    name: "Mariam",
    preview: "Wa alaikum salam. I loved your answer about family values.",
    time: "10:32",
    unread: 2,
    premium: true,
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  },
  samir: {
    name: "Samir",
    preview: "Would you like to continue after Maghrib?",
    time: "09:18",
    unread: 0,
    premium: false,
    photo:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80",
  },
} as const;

interface AppPhoneMockupsProps {
  className?: string;
  compact?: boolean;
}

interface ShowcaseScreen {
  id: string;
  label: string;
  detail: string;
  mockupClassName?: string;
  content: ReactNode;
}

export function AppPhoneMockups({
  className,
  compact = false,
}: AppPhoneMockupsProps) {
  const screens: ShowcaseScreen[] = [
    {
      id: "home",
      label: "HomeScreen",
      detail:
        "Discovery card, top chrome, swipe hint, and the four-action dock taken from the Flutter Home screen.",
      mockupClassName: "md:-rotate-[4deg] md:translate-y-3",
      content: <HomePreview />,
    },
    {
      id: "users",
      label: "UsersScreen",
      detail:
        "Profiles header, horizontal interaction tabs, and the same two-column grid used in the app.",
      mockupClassName: "md:rotate-[3deg] md:-translate-y-2",
      content: <UsersPreview />,
    },
    {
      id: "chats",
      label: "ChatListScreen",
      detail:
        "Live Today panel, quick actions, avatar bubbles, and conversation rows mirrored from chat list.",
      mockupClassName: "md:-rotate-[2deg] md:translate-y-2",
      content: <ChatsPreview />,
    },
    {
      id: "profile",
      label: "ProfileScreen",
      detail:
        "Own-profile bar, hero card, verification, completion, engagement, boost, and gallery cards from profile.",
      mockupClassName: "md:rotate-[4deg] md:translate-y-4",
      content: <ProfilePreview />,
    },
  ];

  return (
    <div className={cn("grid gap-x-8 gap-y-10 md:grid-cols-2", className)}>
      {screens.map((screen, index) => (
        <Fragment key={screen.id}>
          <motion.article
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: index * 0.06 }}
            viewport={{ once: true, amount: 0.28 }}
          >
            <div className="relative">
              <div className="absolute inset-6 rounded-[44px] bg-[radial-gradient(circle_at_center,rgba(108,59,255,0.24),rgba(108,59,255,0))] blur-3xl" />
              <IPhone17ProMockup
                className={cn(
                  "transition-transform duration-500 md:hover:rotate-0 md:hover:translate-y-0",
                  screen.mockupClassName,
                )}
                compact={compact}
              >
                {screen.content}
              </IPhone17ProMockup>
            </div>
            <div className="mt-5 max-w-[24rem] text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent-strong/70">
                {screen.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{screen.detail}</p>
            </div>
          </motion.article>

          {index === 1 ? (
            <motion.div
              className="flex items-center gap-4 md:col-span-2"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, delay: 0.08 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(108,59,255,0),rgba(108,59,255,0.34))]" />
              <div className="max-w-[24rem] text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-accent-strong/70">
                  Core App Flow
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  The website now shows the same four light-mode surfaces users actually
                  move through inside Methna.
                </p>
              </div>
              <div className="h-px flex-1 bg-[linear-gradient(90deg,rgba(108,59,255,0.34),rgba(108,59,255,0))]" />
            </motion.div>
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}

function IPhone17ProMockup({
  children,
  compact,
  className,
}: {
  children: ReactNode;
  compact: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("relative mx-auto w-[306px]", compact ? "md:w-[280px]" : "", className)}
      style={{ aspectRatio: "402 / 874" }}
    >
      <div className="absolute left-[-3px] top-[140px] h-14 w-[3px] rounded-full bg-[#111115]" />
      <div className="absolute left-[-3px] top-[212px] h-24 w-[3px] rounded-full bg-[#111115]" />
      <div className="absolute right-[-3px] top-[192px] h-28 w-[3px] rounded-full bg-[#111115]" />

      <div className="absolute inset-0 rounded-[48px] bg-[#08090D] shadow-[0_42px_98px_-44px_rgba(8,9,13,0.72)]">
        <div className="absolute inset-[8px] rounded-[40px] bg-[linear-gradient(180deg,#16181e,#0f1015)]">
          <div className="absolute inset-[4px] overflow-hidden rounded-[36px] bg-white">
            <div className="absolute inset-0 overflow-hidden bg-white text-[#111111]" style={appFontStyle}>
              <PhoneStatusBar />
              {children}
              <div className="absolute bottom-[9px] left-1/2 h-1.5 w-28 -translate-x-1/2 rounded-full bg-[#121318]/14" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhoneStatusBar() {
  return (
    <>
      <div className="absolute left-1/2 top-2.5 z-30 h-7 w-[126px] -translate-x-1/2 rounded-full bg-[#0B0B10]" />
      <div className="absolute inset-x-0 top-0 z-20 flex h-12 items-center justify-between px-7 text-[11px] font-semibold text-[#0F1320]">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="flex items-end gap-[2px]">
            <span className="h-[4px] w-[2px] rounded-full bg-[#0F1320]" />
            <span className="h-[6px] w-[2px] rounded-full bg-[#0F1320]" />
            <span className="h-[8px] w-[2px] rounded-full bg-[#0F1320]" />
            <span className="h-[10px] w-[2px] rounded-full bg-[#0F1320]" />
          </div>
          <div className="h-[7px] w-[11px] rounded-[3px] border border-[#0F1320]" />
          <div className="relative h-[10px] w-[18px] rounded-[3px] border border-[#0F1320]">
            <div className="absolute left-[2px] top-[2px] h-[4px] w-[11px] rounded-[2px] bg-[#0F1320]" />
            <div className="absolute right-[-3px] top-[2px] h-[4px] w-[2px] rounded-r-[2px] bg-[#0F1320]" />
          </div>
        </div>
      </div>
    </>
  );
}

function HomePreview() {
  return (
    <div className="relative h-full overflow-hidden bg-white pt-12">
      <div className="absolute left-4 right-4 top-[56px] z-20 flex items-center justify-between">
        <AvatarButton image={cast.fatima.photo} />
        <div className="flex items-center gap-2">
          <GlassTopButton icon={<Bell className="h-[18px] w-[18px]" />} badge />
          <GlassTopButton icon={<Settings2 className="h-[18px] w-[18px]" />} />
        </div>
      </div>

      <div className="px-3 pb-[138px] pt-8">
        <section className="relative h-[622px] overflow-hidden rounded-[34px] bg-[#11141C]">
          <img
            alt={cast.omar.name}
            className="absolute inset-0 h-full w-full object-cover"
            src={cast.omar.photo}
          />
          <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(0,0,0,0.42),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.34),rgba(0,0,0,0.88))]" />

          <div className="absolute left-3 right-3 top-3 flex gap-1.5">
            {[true, false, false, false].map((active, index) => (
              <span
                className={cn("h-1.5 flex-1 rounded-full", active ? "bg-white" : "bg-white/40")}
                key={`home-progress-${index}`}
              />
            ))}
          </div>

          <div className="absolute left-4 top-12 rounded-full bg-black/34 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
            92% match
          </div>

          <div className="absolute bottom-[136px] left-4 right-4 text-white">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-[35px] font-bold tracking-[-0.05em] text-[#FFC95A]">
                {cast.omar.name}
              </h3>
              <span className="text-[24px] font-semibold text-white/95">{cast.omar.age}</span>
              <Crown className="h-[18px] w-[18px] text-[#FFD166]" />
              <BadgeCheck className="h-[18px] w-[18px] text-white" />
            </div>
            <p className="mt-1 text-[14px] font-medium text-white/93">{cast.omar.location}</p>
            <p className="mt-1 text-[13px] font-medium text-white/88">{cast.omar.faith}</p>
            <p className="mt-1 text-[12px] font-medium text-white/82">{cast.omar.interests}</p>
          </div>
        </section>
      </div>

      <div className="pointer-events-none absolute bottom-[148px] left-0 right-0 flex justify-center">
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
          <Zap className="h-3.5 w-3.5 text-white" />
          Swipe up for a compliment
        </span>
      </div>

      <div className="absolute bottom-[95px] left-6 right-6 z-20 flex items-center justify-between">
        <ActionButton kind="rewind" />
        <ActionButton kind="pass" />
        <ActionButton kind="compliment" />
        <ActionButton kind="like" />
      </div>

      <BottomTabs active="home" />
    </div>
  );
}

function UsersPreview() {
  return (
    <div className="relative h-full overflow-hidden bg-[#F6F1FF] pt-12">
      <div className="px-4 pb-[126px] pt-4">
        <section className="rounded-[22px] border border-[#E2D5FF] bg-[linear-gradient(135deg,#FFFFFF,#F2EBFF)] p-[14px] shadow-[0_16px_32px_-24px_rgba(108,59,255,0.3)]">
          <div className="flex items-center gap-[11px]">
            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[rgba(108,59,255,0.16)]">
              <Heart className="h-[19px] w-[19px] text-[#6C3BFF]" />
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-semibold text-[#6A6780]">Profiles</p>
              <p className="text-[15px] font-semibold text-[#1A1626]">Liked Me</p>
            </div>
            <div className="rounded-full bg-[rgba(108,59,255,0.16)] px-3 py-1.5 text-[12px] font-bold text-[#6C3BFF]">
              12
            </div>
          </div>
        </section>

        <div className="mt-3 flex gap-2 overflow-hidden">
          {[
            { label: "Liked By Me", active: false, icon: Heart },
            { label: "Liked Me", active: true, icon: BadgeCheck },
            { label: "Passed", active: false, icon: X },
            { label: "Matches", active: false, icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;

            return (
              <div
                className={cn(
                  "flex min-w-0 flex-1 items-center gap-1.5 rounded-[14px] border px-3 py-2",
                  tab.active
                    ? "border-[rgba(108,59,255,0.56)] bg-[rgba(108,59,255,0.16)]"
                    : "border-[#E2D5FF] bg-white",
                )}
                key={tab.label}
              >
                <Icon
                  className={cn(
                    "h-3.5 w-3.5 shrink-0",
                    tab.active ? "text-[#6C3BFF]" : "text-[#6A6780]",
                  )}
                />
                <span
                  className={cn(
                    "truncate text-[11px] font-semibold",
                    tab.active ? "text-[#6C3BFF]" : "text-[#6A6780]",
                  )}
                >
                  {tab.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-[10px]">
          <UsersGridCard
            badge="like"
            country="DZ"
            image={cast.amina.photo}
            job={cast.amina.job}
            line={cast.amina.line}
            name={`${cast.amina.name} (${cast.amina.age})`}
          />
          <UsersGridCard
            badge="locked"
            blurred
            country="MA"
            image={cast.youssef.photo}
            job={cast.youssef.job}
            line={cast.youssef.line}
            name={`${cast.youssef.name} (${cast.youssef.age})`}
          />
          <UsersGridCard
            badge="match"
            country="QA"
            image={cast.leila.photo}
            job={cast.leila.job}
            line={cast.leila.line}
            name={`${cast.leila.name} (${cast.leila.age})`}
          />
          <UsersGridCard
            badge="pass"
            country="AE"
            image={cast.noor.photo}
            job={cast.noor.job}
            line={cast.noor.line}
            name={`${cast.noor.name} (${cast.noor.age})`}
            quickAction="Like"
          />
        </div>
      </div>

      <BottomTabs active="matches" />
    </div>
  );
}

function ChatsPreview() {
  return (
    <div className="relative h-full overflow-hidden bg-white pt-12">
      <div className="px-4 pb-[126px] pt-3">
        <section className="rounded-[26px] border border-[rgba(108,59,255,0.22)] bg-[linear-gradient(135deg,#E9DDFF,#D8C6FF)] p-[14px] shadow-[0_18px_34px_-24px_rgba(108,59,255,0.3)]">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="truncate text-[17px] font-bold text-[#22183F]">Hi Fatima.</p>
              <p className="mt-0.5 text-[12px] font-medium text-[#22183F]/72">
                Here are your Connections
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <button className="text-[12px] font-semibold text-[#6C3BFF]">View List</button>
              <div className="flex gap-1.5">
                <SoftUtility icon={<Search className="h-[17px] w-[17px]" />} />
                <SoftUtility icon={<Settings2 className="h-[17px] w-[17px]" />} />
              </div>
            </div>
          </div>

          <div className="mt-3 flex gap-2.5 overflow-hidden">
            {[cast.mariam, cast.youssef, cast.noor, cast.samir].map((user) => (
              <div className="w-[58px] shrink-0 text-center" key={`chat-active-${user.name}`}>
                <OnlineAvatar image={user.photo} />
                <p className="mt-1.5 truncate text-[10px] font-semibold text-[#22183F]">
                  {user.name.split(" ")[0]}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-4 rounded-[28px] border border-[rgba(108,59,255,0.12)] bg-white p-[12px] shadow-[0_20px_38px_-28px_rgba(16,24,31,0.18)]">
          <div className="flex items-center gap-2">
            <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[8px] bg-[rgba(108,59,255,0.12)]">
              <MessageSquare className="h-[14px] w-[14px] text-[#6C3BFF]" />
            </div>
            <span className="text-[15px] font-semibold text-[#1A1626]">Messages</span>
            <span className="rounded-full bg-[rgba(108,59,255,0.1)] px-2.5 py-1 text-[11px] font-bold text-[#6C3BFF]">
              3
            </span>
          </div>

          <div className="mt-3 space-y-[10px]">
            <ConversationRow
              premium={cast.mariam.premium}
              preview={cast.mariam.preview}
              time={cast.mariam.time}
              unread={cast.mariam.unread}
              user={{ name: cast.mariam.name, photo: cast.mariam.photo }}
            />
            <ConversationRow
              premium={cast.samir.premium}
              preview={cast.samir.preview}
              time={cast.samir.time}
              unread={cast.samir.unread}
              user={{ name: cast.samir.name, photo: cast.samir.photo }}
            />
            <ConversationRow
              premium={false}
              preview="Say hi to start your conversation."
              time="Yesterday"
              unread={0}
              user={{ name: cast.noor.name, photo: cast.noor.photo }}
            />
          </div>
        </section>
      </div>

      <BottomTabs active="chats" />
    </div>
  );
}

function ProfilePreview() {
  return (
    <div className="relative h-full overflow-hidden bg-white pt-12">
      <div className="px-3.5 pb-[126px] pt-2.5">
        <div className="relative flex h-[46px] items-center justify-center">
          <button className="absolute left-0 inline-flex h-7 items-center rounded-full bg-[linear-gradient(90deg,#A020F9,#7C1EFF)] px-3 text-[9px] font-bold uppercase tracking-[0.16em] text-white">
            Upgrade
          </button>
          <h3 className="text-[22px] font-bold tracking-[-0.03em] text-[#25163D]">My Profile</h3>
          <button className="absolute right-0 flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#E8DEFB] bg-white text-[#7046F8]">
            <Settings2 className="h-[18px] w-[18px]" />
          </button>
        </div>

        <section className="mt-3 overflow-hidden rounded-[28px] border border-[#E7DDF8] bg-white shadow-[0_24px_40px_-32px_rgba(15,6,36,0.22)]">
          <div className="relative h-[176px] bg-[linear-gradient(135deg,#B27BFF,#6C3BFF)]">
            <div className="absolute left-5 top-5 rounded-full bg-white/16 px-3 py-1 text-[11px] font-semibold text-white">
              Premium
            </div>
            <div className="absolute right-5 top-5 rounded-full bg-white/16 px-3 py-1 text-[11px] font-semibold text-white">
              Identity verified
            </div>
            <div className="absolute left-1/2 bottom-[-58px] h-[122px] w-[122px] -translate-x-1/2 overflow-hidden rounded-full border-[4px] border-white bg-white shadow-[0_20px_40px_-28px_rgba(108,59,255,0.42)]">
              <img alt={cast.fatima.name} className="h-full w-full object-cover" src={cast.fatima.photo} />
            </div>
          </div>
          <div className="px-5 pb-5 pt-[72px] text-center">
            <h3 className="text-[28px] font-bold tracking-[-0.04em] text-[#25163D]">
              {cast.fatima.name}
            </h3>
            <p className="mt-1 text-[14px] font-medium text-[#8B7AA8]">{cast.fatima.handle}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <MetaPill color="#7E57FF" icon={<CalendarDays className="h-3 w-3" />} text="28" />
              <MetaPill
                color="#4D9CFF"
                icon={<MapPin className="h-3 w-3" />}
                text={cast.fatima.location}
              />
              <MetaPill
                color="#FF7E7E"
                icon={<Flag className="h-3 w-3" />}
                text={cast.fatima.nationality}
              />
              <MetaPill
                color="#31C48D"
                icon={<ShieldCheck className="h-3 w-3" />}
                text="Identity verified"
              />
            </div>
          </div>
        </section>

        <section className="mt-3 rounded-[20px] border border-[#E7DDF8] bg-[linear-gradient(135deg,#FFFFFF,#F8F4FF)] p-4 shadow-[0_20px_30px_-26px_rgba(15,6,36,0.2)]">
          <div className="flex items-start gap-3">
            <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[16px] bg-[linear-gradient(135deg,#B576FF,#12805C)]">
              <ShieldCheck className="h-5 w-5 text-[#12805C]" />
            </div>
            <div className="flex-1">
              <p className="text-[13.5px] font-bold text-[#232129]">Verification Center</p>
              <p className="mt-1 text-[10.8px] leading-[1.45] text-[#6F697B]">
                Trusted profile with approved identity checks and document review status.
              </p>
              <p className="mt-2 inline-flex rounded-full bg-[rgba(18,128,92,0.12)] px-2.5 py-1 text-[9.2px] font-bold text-[#12805C]">
                Identity verified
              </p>
            </div>
          </div>
        </section>

        <section className="mt-3 rounded-[14px] bg-[linear-gradient(90deg,#A020F9,#7C1EFF)] px-3 py-2.5 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/20 bg-white/16 text-[12px] font-bold">
              82%
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold">Complete your profile</p>
              <p className="mt-0.5 text-[9px] text-white/90">18% more to get noticed</p>
            </div>
            <Sparkles className="h-4 w-4 text-white/90" />
          </div>
        </section>

        <section className="mt-3 rounded-[16px] border border-[#EFE3FF] bg-[linear-gradient(135deg,#F8F1FF,#FFF3FA)] p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-[rgba(108,59,255,0.14)]">
                <BarChart3 className="h-4 w-4 text-[#6C3BFF]" />
              </div>
              <p className="text-[12px] font-bold text-[#2A223B]">Profile Engagement</p>
            </div>
            <span className="rounded-full bg-[rgba(108,59,255,0.14)] px-2.5 py-1 text-[10px] font-bold text-[#4C20CF]">
              82%
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <MetricTile color="#FF5AA6" icon={<Send className="h-4 w-4 text-[#FF5AA6]" />} label="Likes Sent" value="48" />
            <MetricTile
              color="#45B7FF"
              icon={<HeartHandshake className="h-4 w-4 text-[#45B7FF]" />}
              label="Likes Received"
              value="21"
            />
            <MetricTile
              color="#8E2CFF"
              icon={<MessageSquare className="h-4 w-4 text-[#8E2CFF]" />}
              label="Compliments Sent"
              value="9"
            />
            <MetricTile
              color="#FFB938"
              icon={<Sparkles className="h-4 w-4 text-[#FFB938]" />}
              label="Matches"
              value="6"
            />
          </div>
        </section>

        <section className="mt-3 rounded-[16px] bg-[linear-gradient(135deg,#8E2CFF,#6C3BFF,#FF5AA6)] p-3 text-white shadow-[0_22px_40px_-30px_rgba(46,14,103,0.38)]">
          <div className="flex items-center gap-3">
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[13px] border border-white/25 bg-white/16">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[12.5px] font-bold">Boost your visibility</p>
              <p className="mt-1 text-[9.5px] leading-[1.4] text-white/90">
                Get highlighted in discovery and reach more matches faster.
              </p>
              <p className="mt-1 text-[9.5px] font-semibold text-white/95">Boosts: 3</p>
            </div>
            <button className="rounded-full bg-white px-3 py-2 text-[10px] font-bold text-[#6227E8]">
              Boost
            </button>
          </div>
        </section>

        <section className="mt-3 rounded-[16px] border border-[#F0ECF7] bg-white p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[rgba(108,59,255,0.12)]">
              <ImageIcon className="h-4 w-4 text-[#6C3BFF]" />
            </div>
            <div>
              <p className="text-[12.5px] font-bold text-[#232129]">My Photos</p>
              <p className="text-[10px] text-[#7D748F]">Your visible photos</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[cast.fatima.photo, cast.noor.photo, cast.mariam.photo].map((image) => (
              <img
                alt="Profile gallery preview"
                className="h-[68px] w-full rounded-[12px] object-cover"
                key={image}
                src={image}
              />
            ))}
          </div>
        </section>
      </div>

      <button className="absolute bottom-[106px] right-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-[#E7DDF8] bg-white/95 text-[#5A3C8D] shadow-[0_18px_30px_-24px_rgba(34,15,68,0.35)]">
        <Pencil className="h-[18px] w-[18px]" />
      </button>

      <BottomTabs active="profile" />
    </div>
  );
}

function AvatarButton({ image }: { image: string }) {
  return (
    <button className="h-[34px] w-[34px] overflow-hidden rounded-full border border-[#E2DAF1] bg-[#F2EEFA]">
      <img alt="Current user avatar" className="h-full w-full object-cover" src={image} />
    </button>
  );
}

function GlassTopButton({
  icon,
  badge = false,
}: {
  icon: ReactNode;
  badge?: boolean;
}) {
  return (
    <button className="relative flex h-8 w-8 items-center justify-center rounded-full border border-white/16 bg-black/16 text-white backdrop-blur-md">
      {icon}
      {badge ? (
        <span className="absolute right-[5px] top-[5px] h-[7px] w-[7px] rounded-full border border-white bg-[#6C3BFF]" />
      ) : null}
    </button>
  );
}

function ActionButton({
  kind,
}: {
  kind: "rewind" | "pass" | "compliment" | "like";
}) {
  if (kind === "rewind") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2A9D6A] shadow-[0_16px_26px_-20px_rgba(42,157,106,0.62)]">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <RotateCcw className="h-[15px] w-[15px] text-[#2A9D6A]" />
        </div>
      </div>
    );
  }

  if (kind === "pass") {
    return (
      <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#232228] shadow-[0_18px_34px_-24px_rgba(17,18,24,0.52)]">
        <div className="flex h-[62px] w-[62px] items-center justify-center rounded-full border-2 border-[#FF4D4F] bg-white">
          <X className="h-6 w-6 text-[#FF4D4F]" strokeWidth={2.8} />
        </div>
      </div>
    );
  }

  if (kind === "compliment") {
    return (
      <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#6C3BFF,#9E5BFF)] shadow-[0_22px_38px_-22px_rgba(108,59,255,0.68)]">
        <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white/12 text-white backdrop-blur-md">
          <Zap className="h-7 w-7" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-[#232228] shadow-[0_18px_34px_-24px_rgba(17,18,24,0.52)]">
      <div className="flex h-[62px] w-[62px] items-center justify-center rounded-full border-2 border-[#2ED47A] bg-white">
        <Heart className="h-6 w-6 fill-[rgba(46,212,122,0.14)] text-[#2ED47A]" />
      </div>
    </div>
  );
}

function BottomTabs({
  active,
}: {
  active: "home" | "matches" | "chats" | "profile";
}) {
  const tabs = [
    { id: "home", icon: Flame, label: "Home" },
    { id: "matches", icon: Compass, label: "Matches" },
    { id: "chats", icon: MessageCircle, label: "Chats" },
    { id: "profile", icon: UserCircle2, label: "Profile" },
  ] as const;

  return (
    <div className="absolute bottom-4 left-3.5 right-3.5 rounded-[30px] border border-white/90 bg-white/78 px-1.5 py-1.5 shadow-[0_24px_42px_-30px_rgba(42,29,22,0.28)] backdrop-blur-xl">
      <div className="relative flex">
        <div
          className="absolute bottom-0 h-1 w-[30px] rounded-full bg-[#6C3BFF] shadow-[0_8px_16px_-10px_rgba(108,59,255,0.7)] transition-all"
          style={{
            left:
              active === "home"
                ? "calc(12.5% - 15px)"
                : active === "matches"
                  ? "calc(37.5% - 15px)"
                  : active === "chats"
                    ? "calc(62.5% - 15px)"
                    : "calc(87.5% - 15px)",
          }}
        />

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === active;

          return (
            <div className="flex flex-1 flex-col items-center justify-center py-2 text-center" key={tab.id}>
              <div className="relative flex h-6 w-6 items-center justify-center">
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isActive ? "scale-[1.08] text-[#6C3BFF]" : "text-[#8E8A96]",
                  )}
                />
                {tab.id === "chats" ? (
                  <span className="absolute right-0 top-0 h-2 w-2 rounded-full border border-white bg-[#E24D67]" />
                ) : null}
              </div>
              <span
                className={cn(
                  "mt-1 text-[10px] leading-none",
                  isActive ? "font-semibold text-[#6C3BFF]" : "font-normal text-[#8E8A96]",
                )}
              >
                {tab.label}
              </span>
              <span
                className={cn(
                  "mt-1 h-[5px] w-[5px] rounded-full transition-all",
                  isActive ? "bg-[#6C3BFF]" : "bg-transparent",
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function UsersGridCard({
  image,
  name,
  job,
  line,
  country,
  badge,
  blurred = false,
  quickAction,
}: {
  image: string;
  name: string;
  job: string;
  line: string;
  country: string;
  badge: "like" | "locked" | "match" | "pass";
  blurred?: boolean;
  quickAction?: string;
}) {
  const badgeIcon =
    badge === "match" ? (
      <Sparkles className="h-3.5 w-3.5 text-[#6C3BFF]" />
    ) : badge === "pass" ? (
      <X className="h-3.5 w-3.5 text-[#6C3BFF]" strokeWidth={2.5} />
    ) : badge === "locked" ? (
      <Lock className="h-3.5 w-3.5 text-[#6C3BFF]" />
    ) : (
      <Heart className="h-3.5 w-3.5 text-[#6C3BFF]" />
    );

  return (
    <div className="relative h-[196px] overflow-hidden rounded-[20px] border border-[#E2D5FF] shadow-[0_16px_30px_-24px_rgba(108,59,255,0.3)]">
      <img
        alt={name}
        className={cn("absolute inset-0 h-full w-full object-cover", blurred ? "blur-[10px]" : "")}
        src={image}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.18),rgba(0,0,0,0.88))]" />

      <div className="absolute left-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full border border-[#6C3BFF]/65 bg-black/32 text-[10px] font-bold text-white">
        {country}
      </div>
      <div className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full border border-[#6C3BFF]/65 bg-black/32">
        {badgeIcon}
      </div>

      <div className="absolute bottom-3 left-3 right-3 text-white">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-[18px] font-bold tracking-[-0.03em]">{name}</p>
          {badge === "match" ? <Crown className="h-3.5 w-3.5 text-[#FFD166]" /> : null}
        </div>
        <p className="mt-0.5 truncate text-[12px] font-semibold text-white/95">{job}</p>
        <p className="mt-0.5 truncate text-[10.5px] font-medium text-white/82">{line}</p>
        {quickAction ? (
          <div className="mt-2 flex justify-end">
            <span className="rounded-full bg-[#6C3BFF] px-2.5 py-1 text-[10px] font-bold text-white">
              {quickAction}
            </span>
          </div>
        ) : null}
      </div>

      {blurred ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/24">
          <div className="flex items-center gap-1 rounded-full border border-white/18 bg-black/34 px-3 py-1.5 text-[11px] font-semibold text-white">
            <Lock className="h-3.5 w-3.5" />
            Premium
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SoftUtility({ icon }: { icon: ReactNode }) {
  return (
    <button className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-white/86 text-[#6C3BFF]">
      {icon}
    </button>
  );
}

function OnlineAvatar({ image }: { image: string }) {
  return (
    <div className="relative mx-auto h-14 w-14">
      <div className="overflow-hidden rounded-full border-2 border-[#6C3BFF] bg-[#F1E8FF]">
        <img alt="Online user" className="h-14 w-14 object-cover" src={image} />
      </div>
      <span className="absolute bottom-1 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#9E5BFF]" />
    </div>
  );
}

function ConversationRow({
  user,
  preview,
  time,
  unread,
  premium,
}: {
  user: { name: string; photo: string };
  preview: string;
  time: string;
  unread: number;
  premium: boolean;
}) {
  return (
    <div className="rounded-[16px] bg-white px-3 py-[11px]">
      <div className="flex items-center gap-3">
        <div className="relative h-[54px] w-[54px] shrink-0">
          <div className="overflow-hidden rounded-full border-2 border-[#6C3BFF] bg-[#F1E8FF]">
            <img alt={user.name} className="h-[54px] w-[54px] object-cover" src={user.photo} />
          </div>
          <span className="absolute bottom-1 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#9E5BFF]" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-[14px] font-semibold text-[#1A1626]">{user.name}</p>
            {premium ? <Crown className="h-[13px] w-[13px] text-[#FFD166]" /> : null}
          </div>
          <p className="mt-1 truncate text-[12px] text-[#6A6780]">{preview}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className={cn("text-[11px]", unread > 0 ? "text-[#6C3BFF]" : "text-[#6A6780]")}>
            {time}
          </span>
          {unread > 0 ? (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#6C3BFF] px-1.5 text-[10px] font-bold text-white">
              {unread}
            </span>
          ) : (
            <span className="h-5 w-5" />
          )}
        </div>
      </div>
    </div>
  );
}

function MetaPill({
  icon,
  text,
  color,
}: {
  icon: ReactNode;
  text: string;
  color: string;
}) {
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10.4px] font-semibold text-[#4B3967]"
      style={{
        borderColor: `${color}33`,
        backgroundColor: `${color}1f`,
      }}
    >
      <span style={{ color }}>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function MetricTile({
  icon,
  value,
  label,
  color,
}: {
  icon: ReactNode;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="rounded-[12px] border border-[#EDE5FB] bg-white px-3 py-2.5">
      <div className="flex items-center gap-2">
        <div
          className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px]"
          style={{ backgroundColor: `${color}24` }}
        >
          {icon}
        </div>
        <div>
          <p className="text-[14px] font-bold text-[#231A38]">{value}</p>
          <p className="text-[9.6px] text-[#6E6485]">{label}</p>
        </div>
      </div>
    </div>
  );
}
