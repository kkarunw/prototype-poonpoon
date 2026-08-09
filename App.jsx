import React, { useState, useRef, useEffect } from "react";
import {
  Home, Compass, MessageCircle, Image as ImageIcon, User, Camera, Upload,
  MapPin, Clock, Star, ChevronLeft, ChevronRight, X, Send, Check, Navigation,
  UtensilsCrossed, Waves, Heart, Share2, Lock, Sparkles, QrCode, Bell,
  Bookmark, ArrowRight, Plus, Flag, Aperture, Filter, Search, ThumbsUp,
Sun, Volume2, Palette, PartyPopper, ShieldPlus, DoorOpen, Bus, Info,
CalendarDays, ChevronDown, Loader2, Shirt
} from "lucide-react";
import poonpoonHero from "./poonpoon-hero.png";
import kanchanaburiMap from "./kanchanaburi-map.png";
import posterRegister from "./Poster-Rigister.png";
import poonpoonBackground from "./poonpoon-background.png";
import poonpoonLogo from "./poonpoon-logo.png";
import package35 from "./package-35.png";
import package5 from "./package-5.png";
import package10 from "./package-10.png";
import race35bg from "./race35bg.png";
import race5bg from "./race5bg.png";
import race10bg from "./race10bg.png";

/* ============================================================
   IMAGE ASSET CONFIG
   Replace the values below with real image URLs / imports once
   final assets are ready. Nothing else in the app needs to change.
   ============================================================ */
const IMAGES = {
  poonpoonMascot: poonpoonHero,
  poonpoonFace: null, // small round face used in headers/chat
  anotherLens: { cover: null },
  mabokkan: { covers: [null, null, null, null, null, null, null, null] },
  relaxkan: { cover: null },
  sup: { cover: null },
  restaurants: { covers: [null, null, null, null, null, null] },
  map: { base: kanchanaburiMap },
};

/* ============================================================
   DESIGN TOKENS (derived from the POONPOON brand reference)
   ============================================================ */
const heroGradient = "linear-gradient(160deg,#0B2E6B 0%,#123E8C 30%,#1D63C9 60%,#2FB6D9 100%)";
const rainbowText = "linear-gradient(90deg,#3FD1E0 0%,#7FD9A6 25%,#FFC53D 55%,#FF7A3D 85%)";

/* ============================================================
   MOCK DATA
   ============================================================ */
const MISSIONS = [
  {
    id: 1,
    title: "ท้องฟ้าของคุณวันนี้เป็นอย่างไร?",
    tag: "ท้องฟ้า",
    icon: Sun,
    status: "available",
    description:
      "ลองหยุดมองท้องฟ้าของกาญจนบุรี เก็บภาพช่วงเวลาที่คุณเห็น และเล่าให้เราฟังว่าท้องฟ้าวันนี้รู้สึกอย่างไรสำหรับคุณ",
  },
  {
    id: 2,
    title: "เสียงของกาญที่คุณได้ยิน",
    tag: "ผู้คน",
    icon: Volume2,
    status: "locked",
    description: "ฟังเสียงรอบตัวคุณ แล้วบันทึกช่วงเวลาที่มีความหมายที่สุด",
  },
  {
    id: 3,
    title: "สีที่คุณพบระหว่างทาง",
    tag: "ธรรมชาติ",
    icon: Palette,
    status: "locked",
    description: "สีสันของกาญจนบุรีซ่อนอยู่ทุกมุม ลองมองหาสีที่โดดเด่นที่สุดในสายตาคุณ",
  },
  {
    id: 4,
    title: "Freedom ในมุมของคุณ",
    tag: "Freedom",
    icon: PartyPopper,
    status: "locked",
    description: "อิสระของคุณหน้าตาเป็นแบบไหน บันทึกช่วงเวลานั้นไว้ด้วยกัน",
  },
];

const INITIAL_GALLERY = [
  { id: 1, caption: "วันนี้ฟ้าเหนือแม่น้ำแควสงบกว่าที่คิด", name: "มิว", location: "สะพานข้ามแม่น้ำแคว", tag: "AnotherLens01", category: "ท้องฟ้า", hue: "from-blue-400 to-cyan-300" },
  { id: 2, caption: "รอยยิ้มของลุงขายของริมทาง ทำให้เช้านี้อบอุ่นขึ้นเยอะ", name: "Anonymous", location: "ตลาดริมน้ำกาญจนบุรี", tag: "AnotherLens02", category: "ผู้คน", hue: "from-amber-400 to-orange-300" },
  { id: 3, caption: "สีเขียวของนาข้าวสดใสมากตอนเช้า", name: "แนน", location: "ทุ่งนาแม่น้ำแคว", tag: "AnotherLens03", category: "ธรรมชาติ", hue: "from-emerald-400 to-lime-300" },
  { id: 4, caption: "อิสระคือการวิ่งโดยไม่มองนาฬิกา", name: "ต้น", location: "เส้นทางวิ่งริมเขื่อน", tag: "AnotherLens04", category: "Freedom", hue: "from-fuchsia-400 to-pink-300" },
  { id: 5, caption: "เมฆลอยผ่านภูเขาเหมือนฉากในหนัง", name: "พลอย", location: "จุดชมวิวเขาแหลม", tag: "AnotherLens01", category: "ท้องฟ้า", hue: "from-sky-400 to-indigo-300" },
  { id: 6, caption: "เด็ก ๆ วิ่งเล่นข้างสนามด้วยรอยยิ้มไม่หยุด", name: "Anonymous", location: "ลานกิจกรรมหลัก", tag: "AnotherLens02", category: "ผู้คน", hue: "from-rose-400 to-red-300" },
  { id: 7, caption: "หมอกยามเช้าคลุมแม่น้ำแควบางเบาแบบพอดี", name: "เจได", location: "ริมแม่น้ำแคว", tag: "AnotherLens03", category: "ธรรมชาติ", hue: "from-teal-400 to-emerald-300" },
  { id: 8, caption: "ปล่อยให้ลมพัดผ่านแล้วก็แค่รู้สึก", name: "มายด์", location: "จุดสตาร์ท 10K", tag: "AnotherLens04", category: "Freedom", hue: "from-yellow-400 to-amber-300" },
];

const GALLERY_FILTERS = [
  { id: "all", label: "ทั้งหมด" },
  { id: "ท้องฟ้า", label: "ท้องฟ้า" },
  { id: "ผู้คน", label: "ผู้คน" },
  { id: "ธรรมชาติ", label: "ธรรมชาติ" },
  { id: "Freedom", label: "Freedom" },
];

const RESTAURANTS = [
  { id: 1, name: "ครัวริมแคว", category: "อาหารท้องถิ่น", distance: "850 เมตร", closes: "21:00", menu: "แกงป่าปลาแม่น้ำแคว, ผัดไทยกุ้งสด", badge: "ร้านเด็ดเมืองกาญ", hue: "from-orange-400 to-amber-300", x: 28, y: 62 },
  { id: 2, name: "คาเฟ่เขาแหลม", category: "คาเฟ่", distance: "1.1 กม.", closes: "20:00", menu: "ลาเต้เย็น, เค้กกล้วยหอม", badge: null, hue: "from-amber-300 to-yellow-200", x: 68, y: 40 },
  { id: 3, name: "ก๋วยเตี๋ยวเรือป้านิด", category: "อาหารท้องถิ่น", distance: "400 เมตร", closes: "22:00", menu: "ก๋วยเตี๋ยวเรือเนื้อ, ก๋วยเตี๋ยวเรือหมู", badge: "ร้านเด็ดเมืองกาญ", hue: "from-red-400 to-orange-300", x: 45, y: 75 },
  { id: 4, name: "ของหวานยายเล็ก", category: "ของหวาน", distance: "600 เมตร", closes: "19:30", menu: "ข้าวเหนียวมะม่วง, ลอดช่องสิงคโปร์", badge: null, hue: "from-pink-400 to-rose-300", x: 55, y: 55 },
  { id: 5, name: "ส้มตำริมทาง ป้าแดง", category: "อาหารท้องถิ่น", distance: "1.3 กม.", closes: "21:30", menu: "ส้มตำปูปลาร้า, ไก่ย่างเขาสวนกวาง", badge: "ร้านเด็ดเมืองกาญ", hue: "from-lime-400 to-green-300", x: 20, y: 45 },
  { id: 6, name: "กาแฟท่าน้ำ", category: "คาเฟ่", distance: "300 เมตร", closes: "18:00", menu: "อเมริกาโน่, ชาเย็น", badge: null, hue: "from-cyan-400 to-blue-300", x: 78, y: 65 },
];

const FOOD_FILTERS = [
  { id: "all", label: "ร้านเด็ด" },
  { id: "local", label: "อาหารท้องถิ่น" },
  { id: "cafe", label: "คาเฟ่" },
  { id: "dessert", label: "ของหวาน" },
  { id: "near", label: "ใกล้ฉัน" },
];

const MAP_MARKERS = [
  { id: "relaxkan", name: "RelaxKAN", type: "wellness", icon: Waves, x: 38, y: 30 },
  { id: "sup", name: "SUP Experience", type: "activity", icon: Navigation, x: 62, y: 22 },
  { id: "stage", name: "Main Stage", type: "activity", icon: PartyPopper, x: 50, y: 50 },
  { id: "medical", name: "Medical", type: "service", icon: ShieldPlus, x: 30, y: 55 },
  { id: "toilet", name: "Toilet", type: "service", icon: DoorOpen, x: 70, y: 55 },
  { id: "shuttle", name: "Shuttle", type: "service", icon: Bus, x: 15, y: 75 },
  { id: "info", name: "Information", type: "service", icon: Info, x: 85, y: 30 },
  ...RESTAURANTS.map((r) => ({ id: `food-${r.id}`, name: r.name, type: "food", icon: UtensilsCrossed, x: r.x, y: r.y, restaurant: r })),
];

const MAP_FILTERS = [
  { id: "all", label: "ทั้งหมด" },
  { id: "wellness", label: "Wellness" },
  { id: "activity", label: "Activity" },
  { id: "food", label: "Food" },
  { id: "service", label: "Service" },
];

const SCHEDULE = [
  { time: "06:00", title: "ปล่อยตัวนักวิ่ง 10 KM Heritage", icon: Flag },
  { time: "09:00", title: "RelaxKAN เปิดให้บริการ", icon: Waves },
  { time: "10:00", title: "SUP Experience รอบแรก", icon: Navigation },
  { time: "17:00", title: "การแสดงดนตรีเปิดเวทีหลัก", icon: PartyPopper },
];

const SUP_SLOTS = ["10:00", "13:00", "16:00"];

const AI_QUICK_QUESTIONS = [
  "หิวแล้ว กินอะไรดี?",
  "RelaxKAN อยู่ตรงไหน?",
  "SUP รอบต่อไปกี่โมง?",
  "ห้องน้ำใกล้ฉันอยู่ไหน?",
  "วันนี้มีอะไรน่าสนใจ?",
  "ไปสะพานข้ามแม่น้ำแควยังไง?",
];

function botReply(text) {
  const t = text.toLowerCase().trim();

  // ==============================
  // HELPERS
  // ==============================
  const hasAny = (words) => words.some((word) => t.includes(word));

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // ==============================
  // GREETING
  // ==============================
  if (
    hasAny([
      "สวัสดี",
      "หวัดดี",
      "hello",
      "hi",
      "ดีครับ",
      "ดีค่ะ",
      "ปูนปูน",
      "poonpoon",
    ])
  ) {
    return {
      text: pick([
        "สวัสดีค่ะ 👋 ปูนปูนพร้อมพาเที่ยวงานตลอดกาญแล้ว อยากรู้เรื่องกิจกรรม เส้นทาง ของกิน หรือกำหนดการ ถามได้เลย!",
        "ฮัลโหล 👋 วันนี้ให้ปูนปูนช่วยอะไรดีคะ? จะถามเรื่องวิ่ง กิจกรรม ร้านอาหาร หรือเส้นทางในงานก็ได้เลย",
        "สวัสดีค่ะ 💙 ปูนปูนเป็นผู้ช่วยประจำงาน อยากไปไหนหรืออยากรู้เรื่องอะไรในงาน ถามมาได้เลยนะ",
      ]),
    };
  }

  // ==============================
  // EVENT OVERVIEW
  // ==============================
  if (
    hasAny([
      "งานนี้คืออะไร",
      "งานอะไร",
      "เกี่ยวกับอะไร",
      "ตลอดกาญคือ",
      "ตลอดกาญ",
      "concept",
      "คอนเซป",
      "แนวคิด",
      "ธีม",
      "theme",
      "peace",
      "freedom",
      "สันติภาพ",
      "อิสรภาพ",
      "สงคราม",
    ])
  ) {
    return {
      text: pick([
        "ตลอดกาญ คือเทศกาลที่เล่าเรื่องกาญจนบุรีจากพื้นที่แห่งประวัติศาสตร์สงคราม สู่พื้นที่แห่งสันติภาพและอิสรภาพ ผ่านการวิ่ง กิจกรรม ประสบการณ์ และเรื่องราวของเมือง 🌈",
        "แนวคิดหลักของงานคือ “จากสงคราม...สู่สันติภาพ” ค่ะ เราใช้การวิ่งและกิจกรรมตลอดวันเป็นตัวเชื่อมอดีตของกาญจนบุรีกับภาพของเมืองในอนาคต",
        "งานนี้ไม่ได้มีแค่งานวิ่งนะคะ แต่เป็น Sport & Peace Festival ที่รวมการวิ่ง Wellness กิจกรรมทางน้ำ อาหาร เรื่องราวของเมือง และความบันเทิงไว้ด้วยกัน",
      ]),
      cta: {
        label: "ดูว่ามีกิจกรรมอะไรบ้าง",
        action: { type: "home" },
      },
    };
  }

  // ==============================
  // DATE
  // ==============================
  if (
    hasAny([
      "วันไหน",
      "วันที่",
      "จัดเมื่อไหร่",
      "เมื่อไหร่",
      "กี่โมง",
      "13 สิงหาคม",
      "13 ส.ค",
      "2570",
    ])
  ) {
    return {
      text: "งานจัดวันที่ 13 สิงหาคม 2570 ที่จังหวัดกาญจนบุรีค่ะ 🗓️ กิจกรรมเริ่มตั้งแต่ช่วงเช้าด้วยการวิ่ง และต่อเนื่องไปตลอดวันจนถึงกิจกรรมช่วงเย็น",
      cta: {
        label: "ดูกิจกรรมวันนี้",
        action: { type: "home" },
      },
    };
  }

  // ==============================
  // RUN / RACE
  // ==============================
  if (
    hasAny([
      "วิ่ง",
      "สมัคร",
      "ระยะ",
      "3.5",
      "5 km",
      "5km",
      "10 km",
      "10km",
      "race",
      "run",
      "runner",
      "เส้นทางวิ่ง",
    ])
  ) {
    return {
      text: pick([
        "งานมี 3 ระยะค่ะ 🏃 3.5 KM Freedom, 5 KM City และ 10 KM Heritage แต่ละระยะถูกออกแบบให้พาไปเจอกาญจนบุรีในมุมที่ต่างกัน",
        "เลือกได้ 3 ระยะเลยค่ะ: 3.5 KM Freedom สำหรับบรรยากาศสนุก ๆ, 5 KM City สำหรับสัมผัสเมือง และ 10 KM Heritage สำหรับเส้นทางที่เชื่อมเรื่องราวประวัติศาสตร์",
      ]),
      cta: {
        label: "ไปหน้าสมัครวิ่ง",
        action: { type: "register" },
      },
    };
  }

  // ==============================
  // FOOD
  // ==============================
  if (
    hasAny([
      "หิว",
      "กิน",
      "อาหาร",
      "ของกิน",
      "ร้าน",
      "ร้านอาหาร",
      "อร่อย",
      "กาแฟ",
      "คาเฟ่",
      "ข้าว",
      "มื้อ",
    ])
  ) {
    return {
      text: pick([
        "หิวแล้วใช่ไหม 😋 ปูนปูนมีร้านใกล้งานให้เลือกทั้งอาหารท้องถิ่น คาเฟ่ และของหวาน ลองดูร้านแนะนำได้เลย",
        "ของกินมีหลายแบบเลยค่ะ 🍜 ถ้าอยากลองรสชาติเมืองกาญ ปูนปูนแนะนำเริ่มจากร้านอาหารท้องถิ่นก่อน",
        "ได้เลย! ปูนปูนเลือกร้านใกล้ ๆ มาให้ก่อน 3 ร้านนะ 👇",
      ]),
      restaurantCards: RESTAURANTS.slice(0, 3),
      cta: {
        label: "ดูทั้งหมดในอร่อยเมืองกาญ",
        action: { type: "foodList" },
      },
    };
  }

  // ==============================
  // RELAXKAN / WELLNESS
  // ==============================
  if (
    hasAny([
      "relax",
      "relaxkan",
      "เมื่อย",
      "เหนื่อย",
      "นวด",
      "โยคะ",
      "yoga",
      "ice bath",
      "icebath",
      "stretch",
      "พัก",
      "wellness",
      "รีคัฟ",
      "ฟื้นฟู",
    ])
  ) {
    return {
      text: pick([
        "ถ้าวิ่งมาแล้วเมื่อย แนะนำ RelaxKAN เลยค่ะ 💆 มี Massage, Stretching, Yoga, Ice Bath และ Recovery Session",
        "RelaxKAN คือโซนพักและฟื้นฟูร่างกายค่ะ เปิดประมาณ 09:00–20:00 เหมาะมากหลังวิ่งเสร็จ",
        "ไป RelaxKAN กันไหมคะ 🌿 มีทั้งกิจกรรมเบา ๆ และ Recovery สำหรับคนที่อยากพักหลังจากเดินหรือวิ่งในงาน",
      ]),
      cta: {
        label: "ดู RelaxKAN บนแผนที่",
        action: { type: "marker", id: "relaxkan" },
      },
    };
  }

  // ==============================
  // SUP
  // ==============================
  if (
    hasAny([
      "sup",
      "พาย",
      "พายบอร์ด",
      "paddle",
      "น้ำ",
      "กิจกรรมทางน้ำ",
      "ริมน้ำ",
    ])
  ) {
    return {
      text: pick([
        `SUP Experience มีวันนี้ 3 รอบค่ะ 🛶 เวลา ${SUP_SLOTS.join(
          ", "
        )} น. มีอุปกรณ์และเจ้าหน้าที่ดูแล`,
        `ถ้าอยากสัมผัสกาญจนบุรีจากมุมแม่น้ำ ลอง SUP Experience ได้เลยค่ะ รอบวันนี้คือ ${SUP_SLOTS.join(
          ", "
        )} น.`,
      ]),
      cta: {
        label: "ดู SUP บนแผนที่",
        action: { type: "marker", id: "sup" },
      },
    };
  }

  // ==============================
  // TOILET
  // ==============================
  if (
    hasAny([
      "ห้องน้ำ",
      "toilet",
      "wc",
      "สุขา",
      "เข้าห้องน้ำ",
    ])
  ) {
    return {
      text: "มีจุดห้องน้ำภายในพื้นที่งานค่ะ 🚻 ปูนปูนพาไปดูตำแหน่งบนแผนที่ได้เลย",
      cta: {
        label: "ดูห้องน้ำบนแผนที่",
        action: { type: "marker", id: "toilet" },
      },
    };
  }

  // ==============================
  // MEDICAL
  // ==============================
  if (
    hasAny([
      "หมอ",
      "พยาบาล",
      "เจ็บ",
      "บาดเจ็บ",
      "ปฐมพยาบาล",
      "medical",
      "ไม่ไหว",
      "หน้ามืด",
      "ฉุกเฉิน",
    ])
  ) {
    return {
      text: "ภายในงานมีจุด Medical และทีมปฐมพยาบาลประจำพื้นที่ค่ะ 🏥 ถ้ามีอาการผิดปกติควรไปที่จุด Medical ทันที",
      cta: {
        label: "ดูจุด Medical",
        action: { type: "marker", id: "medical" },
      },
    };
  }

  // ==============================
  // SHUTTLE / TRANSPORT
  // ==============================
  if (
    hasAny([
      "รถ",
      "shuttle",
      "เดินทาง",
      "ไปยังไง",
      "ไปยัง",
      "ขนส่ง",
      "รับส่ง",
      "จอดรถ",
      "รถรับส่ง",
    ])
  ) {
    return {
      text: "ภายในงานมีจุด Shuttle สำหรับช่วยเชื่อมพื้นที่กิจกรรมค่ะ 🚌 ถ้าไม่อยากเดินไกล ปูนปูนพาไปดูจุดขึ้นรถให้ได้",
      cta: {
        label: "ดูจุด Shuttle",
        action: { type: "marker", id: "shuttle" },
      },
    };
  }

  // ==============================
  // BRIDGE
  // ==============================
  if (
    hasAny([
      "สะพาน",
      "แม่น้ำแคว",
      "bridge",
      "river kwai",
      "สะพานข้ามแม่น้ำแคว",
    ])
  ) {
    return {
      text: pick([
        "สะพานข้ามแม่น้ำแควเป็นหนึ่งในพื้นที่สำคัญของเรื่องราวงานค่ะ 🌉 เพราะเชื่อมจากอดีตช่วงสงครามมาสู่การตีความเรื่อง Peace & Freedom ในปัจจุบัน",
        "อยากไปสะพานข้ามแม่น้ำแควใช่ไหมคะ 🌉 สามารถใช้ Shuttle ของงานหรือเดินทางตามเส้นทางที่กำหนดได้",
      ]),
      cta: {
        label: "ดูจุด Shuttle",
        action: { type: "marker", id: "shuttle" },
      },
    };
  }

  // ==============================
  // CONCERT / EVENING
  // ==============================
  if (
    hasAny([
      "คอนเสิร์ต",
      "concert",
      "เพลง",
      "ดนตรี",
      "ศิลปิน",
      "เย็น",
      "กลางคืน",
      "เวที",
      "main stage",
    ])
  ) {
    return {
      text: pick([
        "ช่วงเย็นจะเข้าสู่บรรยากาศ Main Stage ค่ะ 🎶 ตามตารางตัวอย่างของ Prototype มีการแสดงดนตรีเริ่มประมาณ 17:00 น.",
        "ถ้าอยู่ต่อช่วงเย็น มีการแสดงบน Main Stage ค่ะ 🎤 เป็นส่วนหนึ่งของประสบการณ์งานที่ต่อเนื่องจากกิจกรรมกลางวัน",
      ]),
      cta: {
        label: "ดู Main Stage บนแผนที่",
        action: { type: "marker", id: "stage" },
      },
    };
  }

  // ==============================
  // DRONE / CLOSING SHOW
  // ==============================
  if (
    hasAny([
      "โดรน",
      "drone",
      "projection",
      "mapping",
      "ไฟ",
      "closing",
      "ปิดงาน",
    ])
  ) {
    return {
      text: "แนวคิดช่วง Closing ของงานคือ The Bridge of Hope ค่ะ ✨ ใช้ประสบการณ์แสง สี และสื่อสร้างบรรยากาศจากเรื่องราวในอดีตไปสู่ความหวัง สันติภาพ และอิสรภาพ",
    };
  }

  // ==============================
  // ANOTHER LENS
  // ==============================
  if (
    hasAny([
      "another lens",
      "anotherlens",
      "ภารกิจ",
      "ถ่ายรูป",
      "ถ่ายภาพ",
      "mission",
      "มิชชั่น",
    ])
  ) {
    return {
      text: "Another Lens คือภารกิจให้ผู้ร่วมงานลองมองกาญจนบุรีในมุมใหม่ค่ะ 📸 เช่น ท้องฟ้า ผู้คน ธรรมชาติ และความหมายของ Freedom แล้วแชร์เรื่องราวของตัวเองเข้าสู่ MABOKKAN",
    };
  }

  // ==============================
  // MABOKKAN
  // ==============================
  if (
    hasAny([
      "mabokkan",
      "มาบอกกาญ",
      "แกลเลอรี",
      "gallery",
      "แชร์รูป",
      "โพสต์",
      "เรื่องราว",
    ])
  ) {
    return {
      text: "MABOKKAN คือพื้นที่รวมเรื่องราวจากผู้ร่วมงานค่ะ 💙 ภาพและข้อความจาก Another Lens สามารถถูกรวบรวมเป็น Community Gallery เพื่อให้คนอื่นเห็นกาญจนบุรีผ่านสายตาของผู้ร่วมงานจริง",
    };
  }

  // ==============================
  // SHARE TO CHANCE
  // ==============================
  if (
    hasAny([
      "share to chance",
      "sharetochance",
      "ส่งต่อโอกาส",
      "บริจาค",
      "เด็ก",
      "เยาวชน",
      "การศึกษา",
      "สังคม",
    ])
  ) {
    return {
      text: "Share to Chance คือแนวคิดที่เชื่อมการเข้าร่วมงานกับการส่งต่อโอกาสทางการเรียนรู้ให้เยาวชนค่ะ 💛 เพื่อให้งานไม่ได้จบแค่ความสนุก แต่สร้างผลลัพธ์เชิงสังคมต่อไปด้วย",
    };
  }

  // ==============================
  // WHAT TO DO / RECOMMENDATION
  // ==============================
  if (
    hasAny([
      "ทำอะไรดี",
      "มีอะไร",
      "แนะนำ",
      "น่าสนใจ",
      "เที่ยวอะไร",
      "ไปไหนดี",
      "กิจกรรมอะไร",
      "วันนี้",
    ])
  ) {
    return {
      text: pick([
        "ถ้ามีเวลาทั้งวัน ปูนปูนแนะนำเริ่มจากวิ่งตอนเช้า → แวะ RelaxKAN → หาอะไรกิน → ลอง SUP → ทำ Another Lens → แล้วไป Main Stage ช่วงเย็นค่ะ ✨",
        "วันนี้เลือกได้หลายแบบเลยค่ะ จะสาย Active ไป SUP, สายพักไป RelaxKAN, สายกินไปอร่อยเมืองกาญ หรือสายถ่ายรูปไปทำ Another Lens ก็ได้",
        "ถ้าไม่รู้จะเริ่มตรงไหน ปูนปูนแนะนำ Explore Map ก่อนค่ะ จะเห็นกิจกรรมและจุดบริการรอบพื้นที่งานทั้งหมด",
      ]),
      cta: {
        label: "เปิด Explore Map",
        action: { type: "marker", id: "info" },
      },
    };
  }

  // ==============================
  // INFORMATION
  // ==============================
  if (
    hasAny([
      "ข้อมูล",
      "ประชาสัมพันธ์",
      "information",
      "สอบถาม",
      "ช่วย",
      "ไม่รู้",
    ])
  ) {
    return {
      text: "ได้เลยค่ะ 😊 ปูนปูนช่วยตอบเรื่องกิจกรรม ตารางงาน ร้านอาหาร เส้นทาง จุดบริการ RelaxKAN, SUP และข้อมูลเกี่ยวกับแนวคิดของงานได้",
      cta: {
        label: "ดูจุด Information",
        action: { type: "marker", id: "info" },
      },
    };
  }

  // ==============================
  // THANK YOU
  // ==============================
  if (
    hasAny([
      "ขอบคุณ",
      "thank",
      "โอเค",
      "เค",
      "เข้าใจแล้ว",
      "ดีมาก",
    ])
  ) {
    return {
      text: pick([
        "ยินดีมากค่ะ 💙 ถ้าอยากรู้อะไรในงานถามปูนปูนต่อได้เลย",
        "ด้วยความยินดีค่ะ 😊 ปูนปูนอยู่ช่วยตลอดงานเลย",
        "ได้เลย! ถ้ามีคำถามต่อ ส่งมาได้เลยนะ 🐟✨",
      ]),
    };
  }

  // ==============================
  // UNKNOWN QUESTION
  // ==============================
  return {
    text: pick([
      `ปูนปูนยังไม่มีข้อมูลเฉพาะเรื่อง “${text}” ใน Prototype ตอนนี้ค่ะ 😅 แต่ถามเรื่องกิจกรรม วิ่ง ร้านอาหาร เส้นทาง RelaxKAN, SUP หรือกำหนดการของงานได้เลย`,
      "คำถามนี้น่าสนใจค่ะ 🤔 แต่ข้อมูลใน Prototype ตอนนี้ยังไม่ได้ใส่เรื่องนี้ไว้ ลองถามปูนปูนเกี่ยวกับกิจกรรม เส้นทาง ของกิน หรือกำหนดการในงานได้นะ",
      "เรื่องนี้ปูนปูนยังตอบแบบชัวร์ ๆ ไม่ได้ค่ะ เลยไม่อยากเดา 😅 แต่ถ้าเป็นข้อมูลเกี่ยวกับงานตลอดกาญ ปูนปูนพร้อมช่วยเลย",
    ]),
  };
}
/* ============================================================
   SHARED UI PRIMITIVES
   ============================================================ */
function ImagePlaceholder({ src, hue = "from-blue-400 to-cyan-300", icon: Icon = ImageIcon, label, className = "", rounded = "rounded-2xl" }) {
  if (src) {
    return <img src={src} alt={label || ""} className={`object-cover ${rounded} ${className}`} />;
  }
  return (
    <div className={`bg-gradient-to-br ${hue} ${rounded} ${className} flex flex-col items-center justify-center text-white/90 relative overflow-hidden`}>
      <Icon size={28} className="mb-1 opacity-90" strokeWidth={1.75} />
      {label && <span className="text-[10px] font-medium opacity-90 px-2 text-center leading-tight">{label}</span>}
    </div>
  );
}

function PoonpoonMascot({ size = 140, className = "" }) {
  if (IMAGES.poonpoonMascot) {
    return <img src={IMAGES.poonpoonMascot} alt="POONPOON mascot" style={{ width: size, height: size }} className={`object-contain ${className}`} />;
  }
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 220" width={size} height={size}>
        <defs>
          <linearGradient id="poonBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#BFEFFB" />
            <stop offset="100%" stopColor="#5FB8E8" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="140" rx="70" ry="66" fill="url(#poonBody)" />
        <circle cx="100" cy="70" r="55" fill="url(#poonBody)" />
        <ellipse cx="150" cy="95" rx="20" ry="14" fill="#3F86C9" transform="rotate(20 150 95)" />
        <circle cx="80" cy="65" r="9" fill="#0B2E6B" />
        <circle cx="118" cy="65" r="9" fill="#0B2E6B" />
        <circle cx="83" cy="61" r="2.5" fill="white" />
        <circle cx="121" cy="61" r="2.5" fill="white" />
        <path d="M92 85 Q100 92 108 85" stroke="#0B2E6B" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M45 40 Q100 5 155 40 Q100 55 45 40 Z" fill="#123E8C" />
        <circle cx="100" cy="22" r="9" fill="#F5A623" />
        <rect x="55" y="130" width="90" height="70" rx="20" fill="#123E8C" />
        <rect x="55" y="130" width="90" height="14" rx="7" fill="#F5A623" />
        <line x1="150" y1="150" x2="150" y2="110" stroke="#333" strokeWidth="3" />
        <path d="M150 110 L182 120 L150 130 Z" fill="#F97316" />
      </svg>
    </div>
  );
}

function BottomSheet({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-40 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className="relative bg-white w-full rounded-t-3xl px-5 pt-3 pb-6 overflow-y-auto animate-[slideUp_0.25s_ease-out]"
        style={{ maxHeight: "82%" }}
      >
        <div className="w-10 h-1.5 bg-slate-300 rounded-full mx-auto mb-3" />
        {title && (
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-slate-800">{title}</h3>
            <button onClick={onClose} className="p-1.5 rounded-full bg-slate-100 text-slate-500">
              <X size={16} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

function ScreenHeader({ title, subtitle, onBack, right }) {
  return (
    <div className="flex items-center gap-3 px-5 pt-5 pb-3 bg-white sticky top-0 z-20">
      {onBack && (
        <button onClick={onBack} className="p-2 -ml-2 rounded-full active:bg-slate-100">
          <ChevronLeft size={22} className="text-slate-700" />
        </button>
      )}
      <div className="flex-1">
        <h1 className="text-lg font-bold text-slate-800 leading-tight">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-[fadeIn_0.2s_ease-out]">
      <Check size={14} className="text-emerald-400" />
      {message}
    </div>
  );
}

/* ============================================================
   FEATURE / ACTIVITY / RESTAURANT / MISSION / GALLERY CARDS
   ============================================================ */
function FeatureCard({ icon: Icon, titleEn, titleTh, hue, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-br ${hue} rounded-3xl p-4 flex flex-col items-start gap-6 text-white shadow-md active:scale-[0.97] transition-transform text-left`}
    >
      <div className="w-11 h-11 rounded-2xl bg-white/25 flex items-center justify-center backdrop-blur-sm">
        <Icon size={22} strokeWidth={2} />
      </div>
      <div>
        <p className="font-bold text-sm leading-tight">{titleEn}</p>
        <p className="text-[11px] opacity-90 leading-tight mt-0.5">{titleTh}</p>
      </div>
    </button>
  );
}

function ActivityCard({ title, subtitle, hue, icon, onClick }) {
  return (
    <button onClick={onClick} className="min-w-[150px] bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden text-left active:scale-[0.97] transition-transform">
      <ImagePlaceholder hue={hue} icon={icon} className="h-24 w-full" rounded="rounded-none" />
      <div className="p-3">
        <p className="font-semibold text-sm text-slate-800">{title}</p>
        <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>
      </div>
    </button>
  );
}

function RestaurantCard({ r, onClick, saved, onToggleSave }) {
  return (
    <button onClick={onClick} className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden text-left active:scale-[0.98] transition-transform flex gap-3 p-2.5">
      <ImagePlaceholder hue={r.hue} icon={UtensilsCrossed} className="w-24 h-24 shrink-0" />
      <div className="flex-1 min-w-0 py-0.5">
        <div className="flex items-start justify-between gap-1">
          <p className="font-semibold text-sm text-slate-800 truncate">{r.name}</p>
          {onToggleSave && (
            <span onClick={(e) => { e.stopPropagation(); onToggleSave(r.id); }} className="p-1 -mt-1 -mr-1 shrink-0">
              <Bookmark size={16} className={saved ? "fill-amber-400 text-amber-400" : "text-slate-300"} />
            </span>
          )}
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">{r.category}</p>
        {r.badge && (
          <span className="inline-block mt-1.5 text-[10px] font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
            {r.badge}
          </span>
        )}
        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
          <span className="flex items-center gap-0.5"><MapPin size={11} />{r.distance}</span>
          <span className="flex items-center gap-0.5"><Clock size={11} />ถึง {r.closes}</span>
        </div>
      </div>
    </button>
  );
}

function MissionCard({ mission, onClick }) {
  const Icon = mission.icon;
  const locked = mission.status === "locked";
  const done = mission.status === "completed";
  return (
    <button
      onClick={() => !locked && onClick(mission)}
      className={`w-full rounded-2xl p-4 flex items-center gap-3.5 text-left border transition-transform ${
        locked ? "bg-slate-50 border-slate-100 opacity-70" : "bg-white border-slate-100 shadow-sm active:scale-[0.98]"
      }`}
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${done ? "bg-emerald-100 text-emerald-600" : locked ? "bg-slate-200 text-slate-400" : "bg-gradient-to-br from-cyan-400 to-blue-500 text-white"}`}>
        {locked ? <Lock size={18} /> : done ? <Check size={20} /> : <Icon size={20} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-wide">ภารกิจที่ {String(mission.id).padStart(2, "0")}</p>
        <p className={`text-sm font-semibold leading-snug ${locked ? "text-slate-400" : "text-slate-800"}`}>{mission.title}</p>
      </div>
      {!locked && !done && <ChevronRight size={18} className="text-slate-300 shrink-0" />}
    </button>
  );
}

function GalleryCard({ post, onClick }) {
  return (
    <button onClick={() => onClick(post)} className="text-left active:scale-[0.97] transition-transform">
      <ImagePlaceholder hue={post.hue} icon={ImageIcon} className="w-full aspect-[3/4]" />
      <p className="text-[11px] font-medium text-slate-700 mt-1.5 leading-snug line-clamp-2">{post.caption}</p>
      <p className="text-[10px] text-slate-400 mt-0.5">{post.name === "Anonymous" ? "Anonymous" : post.name} · 📍{post.location}</p>
    </button>
  );
}

/* ============================================================
   BOTTOM NAVIGATION
   ============================================================ */
function NavigationBar({ screen, onNavigate }) {
  const items = [
    { id: "home", label: "Home", icon: Home },
    { id: "exploreMap", label: "Explore", icon: Compass },
    { id: "ai", label: "POONPOON", icon: MessageCircle, center: true },
    { id: "mabokkan", label: "MABOKKAN", icon: ImageIcon },
    { id: "profile", label: "Profile", icon: User },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-100 px-2 pt-2 pb-safe" style={{ paddingBottom: "10px" }}>
      <div className="flex items-end justify-between px-1">
        {items.map((it) => {
          const active = screen === it.id || (it.id === "anotherLens" && screen === "anotherLens");
          if (it.center) {
            return (
              <button key={it.id} onClick={() => onNavigate(it.id)} className="flex flex-col items-center -mt-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg text-white ${active ? "bg-gradient-to-br from-amber-400 to-orange-500" : "bg-gradient-to-br from-blue-600 to-cyan-400"}`}>
                  <it.icon size={24} />
                </div>
                <span className={`text-[10px] font-semibold mt-1 ${active ? "text-orange-500" : "text-blue-600"}`}>{it.label}</span>
              </button>
            );
          }
          return (
            <button key={it.id} onClick={() => onNavigate(it.id)} className="flex flex-col items-center gap-1 py-1 px-2 flex-1">
              <it.icon size={21} className={active ? "text-blue-600" : "text-slate-400"} strokeWidth={active ? 2.4 : 2} />
              <span className={`text-[10px] font-medium ${active ? "text-blue-600" : "text-slate-400"}`}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
LANDING SCREEN
============================================================ */
function LandingScreen({
  onRegisterRace,
  onAsk,
  onLogin,
  showPoster,
  setShowPoster
}) {
  return (
    <div
      className="h-full w-full flex flex-col relative overflow-hidden"
      style={{
        backgroundImage: `url(${poonpoonBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* ================= LOGO ================= */}
      <div className="relative z-10 flex justify-center pt-6 px-6 shrink-0">
        <img
          src={poonpoonLogo}
          alt="POONPOON Kanchanaburi"
          className="object-contain"
          style={{
            width: "290px",
            height: "82px",
          }}
        />
      </div>

      {/* ================= MASCOT ================= */}
      <div className="relative flex-1 min-h-0 overflow-visible">
        <div className="absolute w-60 h-60 rounded-full bg-white/20 blur-3xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

        <PoonpoonMascot
          size={720}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none"
        />
      </div>

      {/* ================= CTA AREA ================= */}
      <div className="relative z-20 px-5 pb-6 shrink-0">

        {/* MAIN AI CTA */}
        <button
          onClick={onAsk}
          className="
            w-full
            rounded-[22px]
            px-5 py-4
            text-left
            text-white
            shadow-xl
            active:scale-[0.98]
            transition-transform
            border border-white/40
          "
          style={{
            background:
              "linear-gradient(110deg,#123E8C 0%,#1D63C9 48%,#2FB6D9 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <MessageCircle size={25} strokeWidth={2.3} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-cyan-100">
                  ✨ POONPOON AI
                </span>
              </div>

              <p className="font-extrabold text-[17px] leading-tight mt-0.5">
                ถาม POONPOON เกี่ยวกับงาน
              </p>

              <p className="text-[11px] text-white/80 mt-1">
                กิจกรรม • ร้านอาหาร • เส้นทาง • ตารางงาน
              </p>
            </div>

            <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
              <ArrowRight size={18} />
            </div>
          </div>
        </button>

        {/* Hint */}
        <p className="text-center text-[11px] text-blue-900/70 font-medium mt-2 mb-3">
          ลองถาม เช่น “วันนี้มีอะไรน่าสนใจบ้าง?”
        </p>

        {/* SECONDARY BUTTONS */}
        <div className="grid grid-cols-2 gap-3">
          {/* REGISTER */}
          <button
            onClick={onRegisterRace}
            className="
              py-3.5
              rounded-full
              font-bold
              text-sm
              text-blue-900
              shadow-lg
              border-2 border-white
              active:scale-[0.97]
              transition-transform
            "
            style={{
              background:
                "linear-gradient(180deg,#FFE273 0%,#FFAE1A 100%)",
            }}
          >
            🏃 สมัครวิ่ง
          </button>

          {/* LOGIN */}
          <button
            onClick={onLogin}
            className="
              py-3.5
              rounded-full
              font-bold
              text-sm
              text-blue-700
              bg-white/90
              border-2 border-white
              shadow-lg
              active:scale-[0.97]
              transition-transform
              backdrop-blur-sm
            "
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>

      {/* ================= POSTER POPUP ================= */}
      {showPoster && (
        <div className="absolute inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="relative w-full max-w-[360px]">
            <img
              src={posterRegister}
              alt="Run for Peace Run for Freedom"
              className="w-full max-h-[85dvh] object-contain rounded-2xl shadow-2xl"
            />

            <button
              onClick={() => setShowPoster(false)}
              className="
                absolute -top-3 -right-3
                w-10 h-10
                rounded-full
                bg-white
                text-slate-800
                shadow-lg
                flex items-center justify-center
                active:scale-95
              "
              aria-label="ปิดโปสเตอร์"
            >
              <X size={22} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
/* ============================================================
REGISTRATION / RACE PACKAGE
============================================================ */
function RegisterForm({ type, onBack, onDone }) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState("5 KM City");
  const [step, setStep] = useState("select");

  const isLogin = type === "login";
  const packages = {
  "3.5 KM Freedom": {
    short: "3.5 KM",
    route: "FREEDOM ROUTE",
    price: 700,
    image: package35,
    backgroundImage: race35bg,
    gradient:
      "linear-gradient(135deg,#008C8C 0%,#50C7A5 45%,#F4C542 100%)",
  },

  "5 KM City": {
    short: "5 KM",
    route: "CITY ROUTE",
    price: 900,
    image: package5,
    backgroundImage: race5bg,
    gradient:
      "linear-gradient(135deg,#F04418 0%,#FF7A1A 52%,#FFC83D 100%)",
  },

  "10 KM Heritage": {
    short: "10 KM",
    route: "HERITAGE ROUTE",
    price: 1200,
    image: package10,
    backgroundImage: race10bg,
    gradient:
      "linear-gradient(135deg,#0B3A82 0%,#1D63C9 52%,#58CBB7 100%)",
  },
};

  const currentPackage = packages[selectedDistance];

  /* ================= LOGIN ================= */
  if (isLogin) {
    if (submitted) {
      return (
        <div
          className="h-full flex flex-col items-center justify-center px-8 text-center text-white"
          style={{ background: heroGradient }}
        >
          <PoonpoonMascot size={170} />

          <h2 className="text-2xl font-extrabold mt-4">
            เข้าสู่ระบบสำเร็จ!
          </h2>

          <p className="text-sm text-white/80 mt-2">
            ยินดีต้อนรับกลับสู่ POONPOON KANCHANABURI
          </p>

          <button
            onClick={onDone}
            className="mt-8 px-8 py-3.5 rounded-full font-bold text-sm text-blue-900 shadow-lg"
            style={{
              background: "linear-gradient(180deg,#FFDE7A,#F5A623)",
            }}
          >
            เข้าสู่แอป POONPOON
          </button>
        </div>
      );
    }

    return (
      <div className="h-full flex flex-col bg-slate-50">
        <ScreenHeader
          title="เข้าสู่ระบบ"
          subtitle="POONPOON KANCHANABURI"
          onBack={onBack}
        />

        <div className="flex-1 px-5 pt-10">
          <div className="flex justify-center mb-8">
            <PoonpoonMascot size={170} />
          </div>

          <div className="space-y-4">
            <Field
              label="เบอร์โทรศัพท์ หรือ อีเมล"
              placeholder="08X-XXX-XXXX / you@email.com"
            />

            <Field
              label="รหัสผ่าน"
              placeholder="กรอกรหัสผ่าน"
              type="password"
            />
          </div>
        </div>

        <div className="px-5 pb-7">
          <button
            onClick={() => setSubmitted(true)}
            className="w-full py-3.5 rounded-full font-bold text-sm text-white shadow-md"
            style={{
              background: "linear-gradient(90deg,#1D63C9,#2FB6D9)",
            }}
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    );
  }

  /* ================= SUCCESS ================= */
  if (submitted) {
    return (
      <div
        className="h-full flex flex-col items-center justify-center px-8 text-center text-white"
        style={{ background: heroGradient }}
      >
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
          <Check size={38} />
        </div>

        <h2 className="text-2xl font-extrabold mt-5">
          ลงทะเบียนสำเร็จ!
        </h2>

        <p className="text-sm text-white/80 mt-2">
          {currentPackage.short} {currentPackage.route}
        </p>

        <p className="text-3xl font-extrabold mt-4">
          {currentPackage.price.toLocaleString()} บาท
        </p>

        <button
          onClick={onDone}
          className="mt-8 px-8 py-3.5 rounded-full font-bold text-sm text-blue-900 shadow-lg"
          style={{
            background: "linear-gradient(180deg,#FFDE7A,#F5A623)",
          }}
        >
          เข้าสู่แอป POONPOON
        </button>
      </div>
    );
  }

  /* ================= SELECT ================= */
  if (step === "select") {
    return (
      <div className="h-full flex flex-col bg-slate-50">
        <ScreenHeader
          title="เลือกระยะการแข่งขัน"
          subtitle="เลือกระยะที่ใช่สำหรับคุณ"
          onBack={onBack}
        />

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-8 space-y-4">
          {Object.entries(packages).map(([key, item]) => (
            <button
  key={key}
  onClick={() => {
    setSelectedDistance(key);
    setStep("detail");
  }}
  className="
    w-full
    h-[190px]
    rounded-[26px]
    overflow-hidden
    text-left
    shadow-md
    active:scale-[0.98]
    transition-transform
    relative
  "
  style={{
    backgroundImage: `url(${item.backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  {/* overlay ทำให้ตัวหนังสืออ่านง่าย */}
  <div
    className="absolute inset-0"
    style={{
      background:
        "linear-gradient(90deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.12) 60%, rgba(0,0,0,0.08) 100%)",
    }}
  />

  <div className="relative z-10 h-full p-5 text-white flex flex-col justify-between">
                <p className="text-[10px] font-bold text-white/75">
                  RACE PACKAGE
                </p>

                <div className="flex items-end justify-between mt-2">
                  <div>
                    <h2 className="text-[38px] font-black leading-none">
                      {item.short}
                    </h2>

                    <p className="text-sm font-extrabold mt-2">
                      {item.route}
                    </p>

                    <p className="text-[10px] text-white/75 mt-5">
                      ค่าสมัคร
                    </p>

                    <p className="text-2xl font-black">
                      {item.price.toLocaleString()}
                      <span className="text-xs ml-1">บาท</span>
                    </p>
                  </div>

                  <ChevronRight size={26} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  /* ================= DETAIL ================= */
if (step === "detail") {
  const packageDetails = {
    "3.5 KM Freedom": {
      includes: [
        {
          icon: Shirt,
          title: "Finisher T-Shirt",
          desc: "เสื้อวิ่ง Finisher T-Shirt ลาย Freedom Route",
        },
        {
          icon: Star,
          title: "Finisher Medal",
          desc: "เหรียญที่ระลึกสำหรับผู้เข้าเส้นชัย",
        },
        {
          icon: QrCode,
          title: "Race BIB",
          desc: "หมายเลขการแข่งขันสำหรับระยะ 3.5 KM",
        },
        {
          icon: Flag,
          title: "Bandana",
          desc: "Bandana รุ่นพิเศษ RUN FOR PEACE • RUN FOR FREEDOM",
        },
        {
          icon: Sparkles,
          title: "Neon Wristband",
          desc: "สายรัดข้อมือสำหรับใช้ร่วมกิจกรรมภายใน Festival",
        },
      ],

      extraTitle: null,
      extras: [],
    },

    "5 KM City": {
      includes: [
        {
          icon: Shirt,
          title: "Finisher T-Shirt",
          desc: "เสื้อวิ่ง Finisher T-Shirt ลาย City Route",
        },
        {
          icon: Star,
          title: "Finisher Medal",
          desc: "เหรียญที่ระลึกสำหรับผู้เข้าเส้นชัย",
        },
        {
          icon: QrCode,
          title: "Race BIB",
          desc: "หมายเลขการแข่งขันสำหรับระยะ 5 KM",
        },
        {
          icon: Flag,
          title: "Bandana",
          desc: "Bandana รุ่นพิเศษ RUN FOR PEACE • RUN FOR FREEDOM",
        },
        {
          icon: Sparkles,
          title: "Neon Wristband",
          desc: "สายรัดข้อมือสำหรับใช้ร่วมกิจกรรมภายใน Festival",
        },
      ],

      extraTitle: "สิทธิพิเศษเพิ่มเติมสำหรับ 5 KM",
      extras: [
        {
          icon: Check,
          title: "Running Socks",
          desc: "ถุงเท้าวิ่ง POONPOON รุ่นพิเศษ",
        },
        {
          icon: Check,
          title: "Finisher Bag",
          desc: "กระเป๋า Finisher Bag สำหรับนักวิ่ง 5 KM",
        },
      ],
    },

    "10 KM Heritage": {
      includes: [
        {
          icon: Shirt,
          title: "Finisher T-Shirt",
          desc: "เสื้อวิ่ง Finisher T-Shirt ลาย Heritage Route",
        },
        {
          icon: Star,
          title: "Finisher Medal",
          desc: "เหรียญที่ระลึกสำหรับผู้เข้าเส้นชัย",
        },
        {
          icon: QrCode,
          title: "Race BIB",
          desc: "หมายเลขการแข่งขันสำหรับระยะ 10 KM",
        },
        {
          icon: Flag,
          title: "Bandana",
          desc: "Bandana รุ่นพิเศษ RUN FOR PEACE • RUN FOR FREEDOM",
        },
        {
          icon: Sparkles,
          title: "Neon Wristband",
          desc: "สายรัดข้อมือสำหรับใช้ร่วมกิจกรรมภายใน Festival",
        },
      ],

      extraTitle: "สิทธิพิเศษเพิ่มเติมสำหรับ 10 KM",
      extras: [
        {
          icon: Check,
          title: "Running Socks",
          desc: "ถุงเท้าวิ่ง POONPOON รุ่นพิเศษ",
        },
        {
          icon: Check,
          title: "Finisher Bag",
          desc: "กระเป๋า Finisher Bag สำหรับนักวิ่ง 10 KM",
        },
        {
          icon: Check,
          title: "Limited Edition Tumbler",
          desc: "แก้ว Limited Edition เฉพาะนักวิ่ง 10 KM",
        },
        {
          icon: Check,
          title: "Finisher Towel",
          desc: "ผ้าขนหนู Finisher รุ่น Heritage Route",
        },
        {
          icon: Check,
          title: "10K Exclusive Finisher Pin",
          desc: "เข็มกลัด Exclusive สำหรับผู้เข้าเส้นชัย 10 KM",
        },
      ],
    },
  };

  const detail = packageDetails[selectedDistance];

  return (
    <div className="h-full flex flex-col bg-slate-50 relative">

      <ScreenHeader
        title="Package Detail"
        subtitle="รายละเอียดแพ็กเกจการแข่งขัน"
        onBack={() => setStep("select")}
      />

      <div className="flex-1 overflow-y-auto pb-32">

        {/* ================= PACKAGE ARTWORK ================= */}
        <img
          src={currentPackage.image}
          alt={`${currentPackage.short} ${currentPackage.route}`}
          className="w-full h-auto block"
        />

        {/* ================= PACKAGE INFO ================= */}
        <div className="px-5 pt-5">

          <div className="flex items-center gap-2 mb-3">
            <Sparkles
              size={16}
              className="text-blue-600"
            />

            <h3 className="text-[14px] font-extrabold text-slate-800">
              สิ่งที่ได้รับในแพ็กเกจ
            </h3>
          </div>

          <div className="bg-white rounded-[22px] border border-slate-100 shadow-sm overflow-hidden">

            {detail.includes.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`
                    flex items-center gap-3
                    px-4 py-3.5
                    ${
                      index < detail.includes.length - 1
                        ? "border-b border-slate-100"
                        : ""
                    }
                  `}
                >

                  <div
                    className="
                      w-9 h-9
                      rounded-xl
                      bg-blue-50
                      text-blue-600
                      flex items-center justify-center
                      shrink-0
                    "
                  >
                    <Icon size={17} />
                  </div>

                  <div className="flex-1 min-w-0">

                    <p className="text-[12px] font-extrabold text-slate-800">
                      {item.title}
                    </p>

                    <p className="text-[10px] leading-relaxed text-slate-400 mt-0.5">
                      {item.desc}
                    </p>

                  </div>

                  <Check
                    size={16}
                    className="text-emerald-500 shrink-0"
                  />

                </div>
              );
            })}

          </div>
        </div>


        {/* ================= EXTRA BENEFITS ================= */}
        {detail.extras.length > 0 && (
          <div className="px-5 mt-5">

            <div className="flex items-center gap-2 mb-3">

              <Plus
                size={16}
                className={
                  selectedDistance === "5 KM City"
                    ? "text-orange-500"
                    : "text-blue-600"
                }
              />

              <h3 className="text-[14px] font-extrabold text-slate-800">
                {detail.extraTitle}
              </h3>

            </div>

            <div
              className="
                bg-white
                rounded-[22px]
                border border-slate-100
                shadow-sm
                overflow-hidden
              "
            >

              {detail.extras.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className={`
                      flex items-center gap-3
                      px-4 py-3.5
                      ${
                        index < detail.extras.length - 1
                          ? "border-b border-slate-100"
                          : ""
                      }
                    `}
                  >

                    <div
                      className="
                        w-9 h-9
                        rounded-xl
                        flex items-center justify-center
                        text-white
                        shrink-0
                      "
                      style={{
                        background: currentPackage.gradient,
                      }}
                    >
                      <Icon size={16} />
                    </div>

                    <div className="flex-1 min-w-0">

                      <p className="text-[12px] font-extrabold text-slate-800">
                        {item.title}
                      </p>

                      <p className="text-[10px] leading-relaxed text-slate-400 mt-0.5">
                        {item.desc}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>
          </div>
        )}


        {/* ================= FESTIVAL ACCESS ================= */}
        <div className="px-5 mt-5 mb-5">

          <div className="bg-white rounded-[22px] border border-slate-100 shadow-sm p-4">

            <div className="flex items-center justify-center gap-2">

              <PartyPopper
                size={16}
                className="text-emerald-500"
              />

              <p className="text-[12px] font-extrabold text-slate-800">
                Festival Access Included
              </p>

            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">

              <div className="flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Volume2 size={17} />
                </div>

                <p className="text-[10px] font-bold text-slate-600 mt-1.5">
                  Concert
                </p>
              </div>


              <div className="flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <Sparkles size={17} />
                </div>

                <p className="text-[10px] font-bold text-slate-600 mt-1.5">
                  Drone Show
                </p>
              </div>


              <div className="flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                  <Sun size={17} />
                </div>

                <p className="text-[10px] font-bold text-slate-600 mt-1.5">
                  Lighting Show
                </p>
              </div>

            </div>

          </div>
        </div>


        {/* ================= SUMMARY ================= */}
        <div className="px-5 mb-6">

          <div
            className="rounded-[20px] p-[1px]"
            style={{
              background: currentPackage.gradient,
            }}
          >

            <div className="bg-white rounded-[19px] px-4 py-3">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-[10px] text-slate-400">
                    ระยะที่เลือก
                  </p>

                  <p className="text-[13px] font-extrabold text-slate-800">
                    {currentPackage.short} · {currentPackage.route}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-slate-400">
                    ค่าสมัคร
                  </p>

                  <p className="text-lg font-black text-slate-800">
                    {currentPackage.price.toLocaleString()}
                    <span className="text-[10px] ml-1">
                      บาท
                    </span>
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>


      {/* ================= STICKY CTA ================= */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-100 px-5 py-4">

        <div className="flex items-center gap-4">

          <div className="shrink-0">

            <p className="text-[10px] text-slate-400">
              ค่าสมัคร
            </p>

            <p className="text-xl font-black text-slate-800">
              {currentPackage.price.toLocaleString()}

              <span className="text-xs ml-1 font-medium">
                บาท
              </span>
            </p>

          </div>


          <button
            onClick={() => setStep("confirm")}
            className="
              flex-1
              py-3.5
              rounded-full
              text-white
              font-extrabold
              text-sm
              shadow-lg
              active:scale-[0.98]
              transition-transform
            "
            style={{
              background: currentPackage.gradient,
            }}
          >
            สมัครเลย
          </button>

        </div>

      </div>

    </div>
  );
}
  /* ================= CONFIRM ================= */
  if (step === "confirm") {
    return (
      <div className="h-full flex flex-col bg-slate-50 relative">
        <ScreenHeader
          title="ยืนยันการสมัคร"
          subtitle="ตรวจสอบข้อมูลและชำระเงิน"
          onBack={() => setStep("detail")}
        />

        <div className="flex-1 overflow-y-auto px-5 py-5 pb-28">
          <div
            className="rounded-[24px] p-5 text-white shadow-md"
            style={{ background: currentPackage.gradient }}
          >
            <p className="text-3xl font-black">
              {currentPackage.short}
            </p>

            <p className="text-sm font-extrabold">
              {currentPackage.route}
            </p>

            <p className="text-2xl font-black mt-4">
              {currentPackage.price.toLocaleString()} บาท
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <Field
              label="ชื่อ - นามสกุล"
              placeholder="กรอกชื่อและนามสกุล"
            />

            <Field
              label="เบอร์โทรศัพท์"
              placeholder="08X-XXX-XXXX"
            />

            <Field
              label="อีเมล"
              placeholder="you@email.com"
              type="email"
            />

            <Field
              label="ไซซ์เสื้อ"
              placeholder="S / M / L / XL"
            />
          </div>

          <div className="mt-6 bg-white rounded-2xl border-2 border-blue-500 p-4 flex items-center gap-3">
            <QrCode size={22} className="text-blue-600" />

            <div>
              <p className="text-sm font-bold text-slate-800">
                QR Code / PromptPay
              </p>

              <p className="text-[10px] text-slate-400">
                ชำระผ่าน Mobile Banking
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-5 py-4">
          <button
            onClick={() => setSubmitted(true)}
            className="w-full py-3.5 rounded-full text-white font-extrabold shadow-md"
            style={{
              background: currentPackage.gradient,
            }}
          >
            ดำเนินการต่อ
          </button>
        </div>
      </div>
    );
  }

  return null;
}


/* ============================================================
FIELD
============================================================ */
function Field({ label, placeholder, type = "text" }) {
  return (
    <label className="block">
      <p className="text-xs font-semibold text-slate-500 mb-1.5">
        {label}
      </p>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400"
      />
    </label>
  );
}
/* ============================================================
HOME SCREEN
============================================================ */
function HomeScreen({ onNavigate, onOpenMarker, onOpenFoodList, onBack }) {
  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-hidden">

      {/* ================= COMPACT HERO ================= */}
      <div
        className="relative shrink-0 px-5 pt-5 pb-4 text-white rounded-b-[28px] overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg,#123E8C 0%,#1D63C9 55%,#2FB6D9 100%)",
        }}
      >
        {/* BACK */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center active:bg-white/20"
            aria-label="ย้อนกลับ"
          >
            <ChevronLeft size={19} className="text-white" />
          </button>
        )}

        {/* GREETING + MASCOT */}
        <div className="flex items-start justify-between pl-8 min-h-[78px]">
          <div className="pt-1">
            <p className="text-[17px] font-extrabold leading-tight">
              สวัสดี 👋
            </p>

            <p className="text-[14px] text-white/90 leading-snug mt-1.5 max-w-[190px]">
              วันนี้อยากให้ POONPOON พาไปไหน?
            </p>
          </div>

          {/* เล็กลง และไม่กินพื้นที่ header */}
          <div className="relative w-[88px] h-[78px] shrink-0">
            <PoonpoonMascot
              size={120}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none"
            />
          </div>
        </div>

        {/* SEARCH */}
        <button
          onClick={() => onNavigate("ai")}
          className="mt-3 w-full h-[46px] px-4 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-sm flex items-center gap-3 text-left active:bg-white/20"
        >
          <Search size={18} className="text-white/90 shrink-0" />

          <span className="text-[13px] text-white/85 truncate">
            ถาม POONPOON เช่น "หิวแล้ว กินอะไรดี?"
          </span>
        </button>
      </div>

      {/* ================= SCROLL CONTENT ================= */}
      <div className="flex-1 overflow-y-auto pb-24">

        {/* FEATURE GRID */}
        <div className="px-5 pt-5 grid grid-cols-2 gap-3">
          <FeatureCard
            icon={Aperture}
            titleEn="Another Lens"
            titleTh="ภารกิจมองกาญอีกมุม"
            hue="from-cyan-500 to-blue-500"
            onClick={() => onNavigate("anotherLens")}
          />

          <FeatureCard
            icon={ImageIcon}
            titleEn="MABOKKAN"
            titleTh="เรื่องราวจากทุกคน"
            hue="from-fuchsia-500 to-pink-500"
            onClick={() => onNavigate("mabokkan")}
          />

          <FeatureCard
            icon={Compass}
            titleEn="Explore Map"
            titleTh="แผนที่กิจกรรม"
            hue="from-emerald-500 to-teal-500"
            onClick={() => onNavigate("exploreMap")}
          />

          <FeatureCard
            icon={MessageCircle}
            titleEn="POONPOON AI"
            titleTh="ถาม POONPOON"
            hue="from-amber-500 to-orange-500"
            onClick={() => onNavigate("ai")}
          />
        </div>

        {/* ================= NEARBY ================= */}
        <div className="mt-6">
          <div className="px-5 mb-3">
            <h2 className="text-[15px] font-extrabold text-slate-800">
              กิจกรรมใกล้คุณ
            </h2>
          </div>

          <div className="flex gap-3 px-5 overflow-x-auto pb-2">
            <ActivityCard
              title="RelaxKAN"
              subtitle="Wellness & Recovery"
              hue="from-teal-400 to-cyan-300"
              icon={Waves}
              onClick={() => onOpenMarker("relaxkan")}
            />

            <ActivityCard
              title="SUP Experience"
              subtitle="Outdoor Activity"
              hue="from-blue-400 to-indigo-300"
              icon={Navigation}
              onClick={() => onOpenMarker("sup")}
            />

            <ActivityCard
              title="อร่อยเมืองกาญ"
              subtitle="Local Food"
              hue="from-orange-400 to-amber-300"
              icon={UtensilsCrossed}
              onClick={onOpenFoodList}
            />
          </div>
        </div>

        {/* ================= TODAY SCHEDULE ================= */}
        <div className="mt-6 px-5">
          <h2 className="text-[15px] font-extrabold text-slate-800 mb-3">
            วันนี้ในงาน
          </h2>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100">
            {SCHEDULE.map((s) => (
              <div
                key={s.time}
                className="flex items-center gap-3 px-4 py-3"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <s.icon size={16} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 font-medium leading-tight">
                    {s.title}
                  </p>
                </div>

                <span className="text-xs font-semibold text-slate-400 shrink-0">
                  {s.time}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
/* ============================================================
   ANOTHER LENS
   ============================================================ */
function AnotherLensScreen({ missions, onBack, onOpenMission }) {
  return (
    <div className="h-full overflow-y-auto pb-24 bg-slate-50">
      <ScreenHeader title="Another Lens" subtitle="ค้นพบกาญจนบุรีผ่านมุมมองของคุณเอง" onBack={onBack} />
      <div className="px-5 pt-2">
        <div className="rounded-3xl p-5 text-white relative overflow-hidden mb-5" style={{ background: "linear-gradient(120deg,#123E8C,#2FB6D9)" }}>
          <Aperture size={26} className="mb-2 opacity-90" />
          <p className="font-bold text-base leading-snug">"ค้นพบกาญจนบุรี<br/>ผ่านมุมมองของคุณเอง"</p>
          <p className="text-xs text-white/80 mt-2">ทำภารกิจให้ครบเพื่อปลดล็อกเรื่องราวใหม่ และร่วมแชร์สู่ MABOKKAN</p>
        </div>
        <div className="space-y-3">
          {missions.map((m) => (
            <MissionCard key={m.id} mission={m} onClick={onOpenMission} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MissionFlow({ mission, onClose, onComplete }) {
  const [step, setStep] = useState("intro"); // intro, caption, success
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
      setStep("caption");
    };
    reader.readAsDataURL(file);
  };

  const Icon = mission.icon;

  return (
    <div className="absolute inset-0 z-40 bg-white flex flex-col">
      <ScreenHeader title={`ภารกิจที่ ${String(mission.id).padStart(2, "0")}`} onBack={onClose} />
      <div className="flex-1 overflow-y-auto px-5 pb-6">
        {step === "intro" && (
          <div className="pt-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white flex items-center justify-center mb-4">
              <Icon size={26} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 leading-snug">"{mission.title}"</h2>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed">{mission.description}</p>

            <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

            <div className="mt-8 space-y-3">
              <button onClick={() => cameraInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm text-white shadow-md" style={{ background: "linear-gradient(90deg,#1D63C9,#2FB6D9)" }}>
                <Camera size={17} /> ถ่ายภาพ
              </button>
              <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm text-blue-600 border-2 border-blue-200">
                <Upload size={17} /> เลือกรูปจากเครื่อง
              </button>
            </div>
          </div>
        )}

        {step === "caption" && (
          <div className="pt-2">
            <ImagePlaceholder src={photo} className="w-full aspect-[4/3]" hue="from-cyan-400 to-blue-400" />
            <p className="text-sm font-semibold text-slate-700 mt-4 mb-2">สำหรับคุณ ท้องฟ้าวันนี้เป็นอย่างไร?</p>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="เล่าความรู้สึกของคุณสั้น ๆ..."
              rows={4}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-400 resize-none"
            />
          </div>
        )}

        {step === "success" && (
          <div className="pt-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
              <Check size={38} className="text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Mission Complete!</h2>
            <p className="text-sm text-slate-500 mt-2 max-w-[240px]">คุณได้บันทึกอีกหนึ่งมุมของกาญจนบุรีแล้ว</p>
          </div>
        )}
      </div>

      <div className="px-5 pb-6 pt-3 border-t border-slate-100">
        {step === "caption" && (
          <button
            disabled={!caption.trim()}
            onClick={() => setStep("success")}
            className="w-full py-3.5 rounded-full font-bold text-sm text-white shadow-md disabled:opacity-40"
            style={{ background: "linear-gradient(90deg,#1D63C9,#2FB6D9)" }}
          >
            ส่งภารกิจ
          </button>
        )}
        {step === "success" && (
          <button
            onClick={() => onComplete({ mission, photo, caption })}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-sm text-blue-900 shadow-md"
            style={{ background: "linear-gradient(180deg,#FFDE7A,#F5A623)" }}
          >
            แชร์ไปยัง MABOKKAN <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   MABOKKAN
   ============================================================ */
function MabokkanScreen({ gallery, onBack, onOpenPost, filter, setFilter }) {
  const filtered = filter === "all" ? gallery : gallery.filter((g) => g.category === filter);
  return (
    <div className="h-full overflow-y-auto pb-24 bg-slate-50">
      <ScreenHeader title="MABOKKAN" subtitle="“มาบอกกาญ”" onBack={onBack} />
      <div className="flex gap-2 px-5 pb-3 overflow-x-auto">
        {GALLERY_FILTERS.map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border ${filter === f.id ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-500 border-slate-200"}`}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 px-5">
        {filtered.map((post) => (
          <GalleryCard key={post.id} post={post} onClick={onOpenPost} />
        ))}
      </div>
      <p className="text-[11px] text-slate-400 text-center px-10 mt-6 leading-relaxed">
        เรื่องราวจาก MABOKKAN จะถูกรวบรวมเพื่อจัดแสดงผ่านเว็บไซต์ จอ LED และ Interactive Gallery ภายในงาน
      </p>
    </div>
  );
}

function GalleryDetailSheet({ post, onClose }) {
  return (
    <BottomSheet open={!!post} onClose={onClose}>
      {post && (
        <div>
          <ImagePlaceholder hue={post.hue} icon={ImageIcon} className="w-full aspect-[4/3]" />
          <p className="text-sm text-slate-700 mt-4 leading-relaxed">"{post.caption}"</p>
          <div className="flex items-center gap-3 mt-3 text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{post.name}</span>
            <span className="flex items-center gap-1"><MapPin size={12} />{post.location}</span>
          </div>
          <span className="inline-block mt-2 text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">#{post.tag}</span>
          <div className="flex gap-2 mt-5">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold">
              <Heart size={16} /> ชอบ
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-blue-600 text-white text-sm font-semibold">
              <Share2 size={16} /> แชร์
            </button>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}

/* ============================================================
   EXPLORE MAP
   ============================================================ */
function ExploreMapScreen({ onBack, mapFilter, setMapFilter, onMarkerClick }) {
  const markers = mapFilter === "all" ? MAP_MARKERS : MAP_MARKERS.filter((m) => m.type === mapFilter);
  return (
    <div className="h-full flex flex-col bg-slate-50">
      <ScreenHeader title="Explore Kanchanaburi" subtitle="ค้นหากิจกรรมและประสบการณ์รอบตัวคุณ" onBack={onBack} />
      <div className="flex gap-2 px-5 pb-3 overflow-x-auto">
        {MAP_FILTERS.map((f) => (
          <button key={f.id} onClick={() => setMapFilter(f.id)} className={`shrink-0 flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-semibold border ${mapFilter === f.id ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-500 border-slate-200"}`}>
            {f.id === "all" && <Filter size={11} />} {f.label}
          </button>
        ))}
      </div>
      <div
        className="flex-1 relative mx-5 mb-5 rounded-3xl overflow-hidden border border-slate-200"
        style={
          IMAGES.map.base
? {
    backgroundImage: `url(${IMAGES.map.base})`,
    backgroundSize: "100% auto",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#eef8f5"
  }
            : { background: "linear-gradient(135deg,#E6F4EA 0%,#DCEFFB 45%,#EAF7F5 100%)" }
        }
      >
        {!IMAGES.map.base && (
          <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0 65 Q 30 55 45 70 T 100 60" stroke="#7FD1E8" strokeWidth="6" fill="none" />
            <path d="M0 20 Q40 10 60 25 T100 15" stroke="#B7E4B0" strokeWidth="10" fill="none" opacity="0.6" />
          </svg>
        )}
        {markers.map((m) => (
          <button
            key={m.id}
            onClick={() => onMarkerClick(m)}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center active:scale-95 transition-transform"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white ${markerColor(m.type)}`}>
              <m.icon size={16} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function markerColor(type) {
  switch (type) {
    case "wellness": return "bg-teal-500";
    case "activity": return "bg-blue-500";
    case "food": return "bg-orange-500";
    case "service": return "bg-slate-500";
    default: return "bg-blue-500";
  }
}

function MarkerSheet({ marker, onClose, onOpenRestaurant, onOpenFoodList, savedIds, onToggleSave }) {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => setExpanded(false), [marker]);
  if (!marker) return null;

  if (marker.type === "food" && marker.restaurant) {
    return (
      <BottomSheet open={!!marker} onClose={onClose}>
        <RestaurantDetail r={marker.restaurant} saved={savedIds.includes(marker.restaurant.id)} onToggleSave={onToggleSave} />
      </BottomSheet>
    );
  }

  if (marker.id === "relaxkan") {
    return (
      <BottomSheet open={!!marker} onClose={onClose} title="RelaxKAN">
        <ImagePlaceholder hue="from-teal-400 to-cyan-300" icon={Waves} className="w-full h-32 mb-3" />
        <p className="text-xs font-semibold text-teal-600 uppercase tracking-wide">Wellness & Recovery Zone</p>
        <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">พื้นที่ฟื้นฟูร่างกายและผ่อนคลายหลังการวิ่ง ร่วมกับพันธมิตรด้านสุขภาพและเวลเนส</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {["Massage", "Stretching", "Yoga", "Ice Bath", "Recovery Session"].map((a) => (
            <span key={a} className="text-[11px] font-medium bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full">{a}</span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-3">
          <Clock size={13} /> เปิดวันนี้ 09:00 – 20:00
        </div>
        <div className="flex gap-2 mt-5">
          <button className="flex-1 py-3 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold">ดูกิจกรรม</button>
          <button className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-full bg-teal-500 text-white text-sm font-semibold">
            <Navigation size={15} /> นำทางไป RelaxKAN
          </button>
        </div>
      </BottomSheet>
    );
  }

  if (marker.id === "sup") {
    return (
      <BottomSheet open={!!marker} onClose={onClose} title="SUP Experience">
        <ImagePlaceholder hue="from-blue-400 to-indigo-300" icon={Navigation} className="w-full h-32 mb-3" />
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">ริมน้ำ · Outdoor Activity</p>
        <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">สัมผัสกาญจนบุรีจากอีกมุม ผ่านกิจกรรม Stand Up Paddle Board</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {["Beginner Friendly", "มีอุปกรณ์ให้", "มีเจ้าหน้าที่ดูแล"].map((a) => (
            <span key={a} className="text-[11px] font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{a}</span>
          ))}
        </div>
        <p className="text-xs font-semibold text-slate-500 mt-4 mb-2">รอบกิจกรรมวันนี้</p>
        <div className="flex gap-2">
          {SUP_SLOTS.map((s) => (
            <span key={s} className="flex-1 text-center text-sm font-semibold text-blue-700 bg-blue-50 py-2 rounded-xl">{s}</span>
          ))}
        </div>
        <div className="flex gap-2 mt-5">
          <button className="flex-1 py-3 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold">นำทางไปจุด SUP</button>
          <button onClick={() => setExpanded(true)} className="flex-1 py-3 rounded-full bg-blue-600 text-white text-sm font-semibold">
            {expanded ? "จองรอบสำเร็จ ✓" : "จองรอบ"}
          </button>
        </div>
      </BottomSheet>
    );
  }

  const info = {
    stage: { title: "Main Stage", desc: "เวทีหลักของงาน จัดการแสดงดนตรีสดและพิธีมอบรางวัลตลอดวัน", icon: PartyPopper, hue: "from-fuchsia-400 to-pink-300" },
    medical: { title: "Medical", desc: "จุดปฐมพยาบาลและทีมแพทย์ประจำงาน พร้อมช่วยเหลือตลอดกิจกรรม", icon: ShieldPlus, hue: "from-red-400 to-rose-300" },
    toilet: { title: "Toilet", desc: "จุดห้องน้ำใกล้ที่สุดจากตำแหน่งปัจจุบันของคุณ", icon: DoorOpen, hue: "from-slate-400 to-slate-300" },
    shuttle: { title: "Shuttle", desc: "จุดขึ้นรถรับส่งภายในงานและไปยังสะพานข้ามแม่น้ำแคว", icon: Bus, hue: "from-amber-400 to-yellow-300" },
    info: { title: "Information", desc: "จุดประชาสัมพันธ์และสอบถามข้อมูลทั่วไปของงาน", icon: Info, hue: "from-cyan-400 to-blue-300" },
  }[marker.id];

  if (!info) return null;
  return (
    <BottomSheet open={!!marker} onClose={onClose} title={info.title}>
      <ImagePlaceholder hue={info.hue} icon={info.icon} className="w-full h-28 mb-3" />
      <p className="text-sm text-slate-600 leading-relaxed">{info.desc}</p>
      <button className="w-full flex items-center justify-center gap-1.5 py-3 rounded-full bg-blue-600 text-white text-sm font-semibold mt-5">
        <Navigation size={15} /> นำทางไปจุดนี้
      </button>
    </BottomSheet>
  );
}

function RestaurantDetail({ r, saved, onToggleSave }) {
  return (
    <div>
      <ImagePlaceholder hue={r.hue} icon={UtensilsCrossed} className="w-full h-32 mb-3" />
      <div className="flex items-center gap-2">
        <h3 className="text-base font-bold text-slate-800">{r.name}</h3>
        <Star size={14} className="fill-amber-400 text-amber-400" />
      </div>
      {r.badge && <span className="inline-block mt-1.5 text-[11px] font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">{r.badge}</span>}
      <div className="mt-3 space-y-1.5 text-sm text-slate-600">
        <p><span className="text-slate-400">ประเภท:</span> {r.category}</p>
        <p><span className="text-slate-400">เมนูแนะนำ:</span> {r.menu}</p>
        <p><span className="text-slate-400">ระยะทาง:</span> {r.distance}</p>
        <p><span className="text-slate-400">เปิดถึง:</span> {r.closes}</p>
      </div>
      <div className="flex gap-2 mt-5">
        <button className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-full bg-blue-600 text-white text-sm font-semibold">
          <Navigation size={15} /> นำทาง
        </button>
        <button className="flex-1 py-3 rounded-full bg-slate-100 text-slate-600 text-sm font-semibold">ดูรายละเอียด</button>
        <button onClick={() => onToggleSave(r.id)} className="w-12 flex items-center justify-center rounded-full bg-slate-100">
          <Bookmark size={17} className={saved ? "fill-amber-400 text-amber-400" : "text-slate-400"} />
        </button>
      </div>
    </div>
  );
}

function FoodListSheet({ open, onClose, onSelect, savedIds, onToggleSave }) {
  const [filter, setFilter] = useState("all");
  const filtered = RESTAURANTS.filter((r) => {
    if (filter === "all") return true;
    if (filter === "local") return r.category === "อาหารท้องถิ่น";
    if (filter === "cafe") return r.category === "คาเฟ่";
    if (filter === "dessert") return r.category === "ของหวาน";
    if (filter === "near") return true;
    return true;
  });
  return (
    <BottomSheet open={open} onClose={onClose} title="อร่อยเมืองกาญ">
      <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1">
        {FOOD_FILTERS.map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${filter === f.id ? "bg-orange-500 text-white border-orange-500" : "bg-white text-slate-500 border-slate-200"}`}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="space-y-2.5">
        {filtered.map((r) => (
          <RestaurantCard key={r.id} r={r} onClick={() => onSelect(r)} saved={savedIds.includes(r.id)} onToggleSave={onToggleSave} />
        ))}
      </div>
    </BottomSheet>
  );
}

/* ============================================================
   POONPOON AI
   ============================================================ */
function AIScreen({
  onNavigateMarker,
  onNavigateFoodList,
  onNavigateHome,
  onBack
}) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "สวัสดี! ปูนปูนพร้อมพาคุณเที่ยวกาญจนบุรีวันนี้แล้ว ถามมาได้เลยนะ 🐣"
    },
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, typing]);

  const send = (text) => {
    if (!text.trim()) return;

    setMessages((m) => [
      ...m,
      { sender: "user", text }
    ]);

    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = botReply(text);

      setMessages((m) => [
        ...m,
        { sender: "bot", ...reply }
      ]);

      setTyping(false);
    }, 700);
  };

  const handleCta = (action) => {
    if (!action) return;

    if (action.type === "marker") {
      onNavigateMarker(action.id);
    }

    if (action.type === "foodList") {
      onNavigateFoodList();
    }

    if (action.type === "home") {
      onNavigateHome();
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">

      {/* ================= HEADER ================= */}
      <div
        className="relative shrink-0 text-white"
        style={{
          background:
            "linear-gradient(145deg,#123E8C 0%,#1D63C9 55%,#2FB6D9 100%)",
        }}
      >
        <div className="relative h-[128px] flex items-center px-5">

          {/* BACK BUTTON */}
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="
                relative z-50
                w-10 h-10
                flex items-center justify-center
                rounded-full
                bg-white/10
                hover:bg-white/20
                active:bg-white/30
                active:scale-95
                transition
                cursor-pointer
                shrink-0
              "
              style={{ pointerEvents: "auto" }}
              aria-label="ย้อนกลับ"
            >
              <ChevronLeft
                size={24}
                className="text-white pointer-events-none"
              />
            </button>
          )}

          {/* MASCOT */}
          <div className="relative w-[105px] h-[105px] shrink-0 ml-1">
            <PoonpoonMascot
              size={150}
              className="
                absolute
                left-1/2 top-1/2
                -translate-x-1/2 -translate-y-1/2
                max-w-none
                pointer-events-none
              "
            />
          </div>

          {/* TITLE */}
          <div className="min-w-0 -ml-1">
            <p className="font-extrabold text-[18px] leading-tight">
              POONPOON AI
            </p>

            <p className="text-[11px] text-white/85 mt-1 leading-snug">
              “ถามมาได้เลย เดี๋ยวปูนปูนช่วยเอง!”
            </p>
          </div>

        </div>
      </div>


      {/* ================= CHAT AREA ================= */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`
                max-w-[80%]
                rounded-2xl
                px-4 py-2.5
                text-sm
                leading-relaxed
                ${
                  m.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-white text-slate-700 shadow-sm border border-slate-100 rounded-bl-md"
                }
              `}
            >
              <p>{m.text}</p>

              {/* RESTAURANT CARDS */}
              {m.restaurantCards && (
                <div className="mt-2.5 space-y-2">
                  {m.restaurantCards.map((r) => (
                    <div
                      key={r.id}
                      className="flex gap-2 bg-slate-50 rounded-xl p-2"
                    >
                      <ImagePlaceholder
                        hue={r.hue}
                        icon={UtensilsCrossed}
                        className="w-14 h-14 shrink-0"
                      />

                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {r.name}
                        </p>

                        <p className="text-[10px] text-slate-400">
                          {r.category} · {r.distance}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA */}
              {m.cta && (
                <button
                  type="button"
                  onClick={() => handleCta(m.cta.action)}
                  className="mt-2.5 flex items-center gap-1 text-xs font-bold text-blue-600"
                >
                  {m.cta.label}
                  <ArrowRight size={13} />
                </button>
              )}
            </div>
          </div>
        ))}

        {/* TYPING */}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-white shadow-sm border border-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
              <Loader2
                size={14}
                className="animate-spin text-slate-400"
              />
            </div>
          </div>
        )}
      </div>


      {/* ================= QUICK QUESTIONS ================= */}
      <div className="px-4 pb-2 flex gap-2 overflow-x-auto bg-white">
        {AI_QUICK_QUESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => send(q)}
            className="
              shrink-0
              text-xs
              font-medium
              text-blue-600
              bg-blue-50
              px-3 py-1.5
              rounded-full
            "
          >
            {q}
          </button>
        ))}
      </div>


      {/* ================= INPUT ================= */}
      <div className="px-4 pb-20 pt-2 flex items-center gap-2 border-t border-slate-100 bg-white">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              send(input);
            }
          }}
          placeholder="พิมพ์คำถามถึงปูนปูน..."
          className="
            flex-1
            bg-slate-100
            rounded-full
            px-4 py-2.5
            text-sm
            outline-none
          "
        />

        <button
          type="button"
          onClick={() => send(input)}
          className="
            w-10 h-10
            rounded-full
            bg-blue-600
            text-white
            flex items-center justify-center
            shrink-0
            active:scale-95
          "
        >
          <Send size={16} />
        </button>

      </div>
    </div>
  );
}
/* ============================================================
   PROFILE
   ============================================================ */
function ProfileScreen({ missions, savedIds }) {
  const [notif, setNotif] = useState(true);
  const completedCount = missions.filter((m) => m.status === "completed").length;
  const savedRestaurants = RESTAURANTS.filter((r) => savedIds.includes(r.id));

  return (
    <div className="h-full overflow-y-auto pb-24 bg-slate-50">
      <div className="px-5 pt-6 pb-8 text-white rounded-b-[32px]" style={{ background: heroGradient }}>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/40">
            <User size={26} />
          </div>
          <div>
            <p className="font-bold text-base">คุณนักวิ่ง POONPOON</p>
            <p className="text-xs text-white/80 mt-0.5">Digital Pass</p>
          </div>
        </div>
        <div className="mt-5 bg-white rounded-2xl p-4 flex items-center gap-4">
          <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
            <QrCode size={34} className="text-slate-700" />
          </div>
          <div className="text-slate-700">
            <p className="text-xs text-slate-400">Race</p>
            <p className="text-sm font-bold">10 KM Heritage</p>
            <p className="text-xs text-slate-400 mt-1.5">BIB</p>
            <p className="text-sm font-bold">KCN-1027</p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5">
        <h2 className="text-sm font-bold text-slate-800 mb-2">My Activities</h2>
        <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100 shadow-sm">
          <div className="flex items-center gap-3 px-4 py-3">
            <Navigation size={17} className="text-blue-500" />
            <p className="text-sm text-slate-700 flex-1">SUP Experience</p>
            <span className="text-xs text-slate-400">16:00</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <Waves size={17} className="text-teal-500" />
            <p className="text-sm text-slate-700 flex-1">RelaxKAN – Recovery Session</p>
          </div>
        </div>
      </div>

      <div className="px-5 mt-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-bold text-slate-800">Another Lens Progress</h2>
          <span className="text-xs font-semibold text-blue-600">{completedCount} / 4 Missions</span>
        </div>
        <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: `${(completedCount / 4) * 100}%` }} />
        </div>
      </div>

      <div className="px-5 mt-5">
        <h2 className="text-sm font-bold text-slate-800 mb-2">Saved Restaurants</h2>
        {savedRestaurants.length === 0 ? (
          <p className="text-xs text-slate-400 bg-white rounded-2xl border border-slate-100 px-4 py-5 text-center">ยังไม่มีร้านที่บันทึกไว้</p>
        ) : (
          <div className="space-y-2.5">
            {savedRestaurants.map((r) => (
              <RestaurantCard key={r.id} r={r} onClick={() => {}} saved={true} />
            ))}
          </div>
        )}
      </div>

      <div className="px-5 mt-5">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-3.5 flex items-center gap-3">
          <Bell size={17} className="text-slate-500" />
          <p className="text-sm text-slate-700 flex-1">การแจ้งเตือน</p>
          <button onClick={() => setNotif((v) => !v)} className={`w-11 h-6 rounded-full p-0.5 transition-colors ${notif ? "bg-blue-600" : "bg-slate-200"}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${notif ? "translate-x-5" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ROOT APP
   ============================================================ */
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [showPoster, setShowPoster] = useState(true);
  const [prevMainScreen, setPrevMainScreen] = useState("home");
  const [missions, setMissions] = useState(MISSIONS);
  const [activeMission, setActiveMission] = useState(null);
  const [gallery, setGallery] = useState(INITIAL_GALLERY);
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [galleryPost, setGalleryPost] = useState(null);
  const [mapFilter, setMapFilter] = useState("all");
  const [activeMarker, setActiveMarker] = useState(null);
  const [foodListOpen, setFoodListOpen] = useState(false);
  const [savedIds, setSavedIds] = useState([]);
  const [toast, setToast] = useState(null);
  const [aiFromLanding, setAiFromLanding] = useState(false);
  

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const mainScreens = ["home", "anotherLens", "mabokkan", "exploreMap", "ai", "profile"];
  const showNav = mainScreens.includes(screen);

  const navigate = (target) => {
    setScreen(target);
    if (mainScreens.includes(target)) setPrevMainScreen(target);
    if (target !== "ai") setAiFromLanding(false);
  };

  const openMarkerById = (id) => {
    const m = MAP_MARKERS.find((mk) => mk.id === id);
    setScreen("exploreMap");
    setTimeout(() => setActiveMarker(m), 50);
  };

  const openFoodList = () => {
    setScreen("exploreMap");
    setTimeout(() => setFoodListOpen(true), 50);
  };

  const toggleSave = (id) => {
    setSavedIds((ids) => (ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]));
    showToast(savedIds.includes(id) ? "ลบร้านออกจากรายการบันทึกแล้ว" : "บันทึกร้านเรียบร้อย");
  };

  const completeMission = ({ mission, photo, caption }) => {
    setMissions((ms) =>
      ms.map((m, i) => {
        if (m.id === mission.id) return { ...m, status: "completed" };
        if (m.id === mission.id + 1 && m.status === "locked") return { ...m, status: "available" };
        return m;
      })
    );
    const hues = ["from-blue-400 to-cyan-300", "from-amber-400 to-orange-300", "from-emerald-400 to-lime-300", "from-fuchsia-400 to-pink-300"];
    setGallery((g) => [
      {
        id: Date.now(),
        caption: caption || "โมเมนต์นี้ของฉันในกาญจนบุรี",
        name: "คุณ",
        location: "กาญจนบุรี",
        tag: `AnotherLens${String(mission.id).padStart(2, "0")}`,
        category: mission.tag,
        hue: hues[(mission.id - 1) % hues.length],
        photo,
      },
      ...g,
    ]);
    setActiveMission(null);
    setScreen("mabokkan");
    showToast("แชร์ไปยัง MABOKKAN สำเร็จ!");
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-900" style={{ minHeight: "100dvh" }}>
      <div className="relative w-full bg-white overflow-hidden shadow-2xl" style={{ maxWidth: 420, height: "100dvh", maxHeight: 880 }}>
        <Toast message={toast} />

        {screen === "landing" && (
          <LandingScreen
  showPoster={showPoster}
  setShowPoster={setShowPoster}

  onRegisterRace={() => {
    setShowPoster(false);
    setScreen("registerRace");
  }}

  onAsk={() => {
    setShowPoster(false);
    setAiFromLanding(true);
    setScreen("ai");
  }}

  onLogin={() => {
    setShowPoster(false);
    setScreen("login");
  }}
/>
        )}

        {screen === "registerRace" && <RegisterForm type="race" onBack={() => setScreen("landing")} onDone={() => navigate("home")} />}
        {screen === "login" && <RegisterForm type="login" onBack={() => setScreen("landing")} onDone={() => navigate("home")} />}

        {screen === "home" && (
  <HomeScreen
    onNavigate={navigate}
    onOpenMarker={openMarkerById}
    onOpenFoodList={openFoodList}
    onBack={() => setScreen("landing")}
  />
        )}

        {screen === "anotherLens" && (
          <AnotherLensScreen
            missions={missions}
            onBack={() => navigate("home")}
            onOpenMission={(m) => setActiveMission(m)}
          />
        )}

        {screen === "mabokkan" && (
          <MabokkanScreen gallery={gallery} onBack={() => navigate("home")} onOpenPost={setGalleryPost} filter={galleryFilter} setFilter={setGalleryFilter} />
        )}

        {screen === "exploreMap" && (
          <ExploreMapScreen
            onBack={() => navigate("home")}
            mapFilter={mapFilter}
            setMapFilter={setMapFilter}
            onMarkerClick={setActiveMarker}
          />
        )}

        {screen === "ai" && (
  <AIScreen
    onNavigateMarker={openMarkerById}
    onNavigateFoodList={openFoodList}
    onNavigateHome={() => navigate("home")}
    onBack={() => {
      if (aiFromLanding) {
        setAiFromLanding(false);
        setScreen("landing");
      } else {
        setScreen("home");
      }
    }}
  />
)}
        {screen === "profile" && <ProfileScreen missions={missions} savedIds={savedIds} />}

        {activeMission && <MissionFlow mission={activeMission} onClose={() => setActiveMission(null)} onComplete={completeMission} />}

        <GalleryDetailSheet post={galleryPost} onClose={() => setGalleryPost(null)} />

        <MarkerSheet
          marker={activeMarker}
          onClose={() => setActiveMarker(null)}
          savedIds={savedIds}
          onToggleSave={toggleSave}
        />

        <FoodListSheet
          open={foodListOpen}
          onClose={() => setFoodListOpen(false)}
          onSelect={(r) => {
            setFoodListOpen(false);
            setTimeout(() => setActiveMarker({ id: `food-${r.id}`, type: "food", restaurant: r }), 200);
          }}
          savedIds={savedIds}
          onToggleSave={toggleSave}
        />

        {showNav && <NavigationBar screen={screen} onNavigate={navigate} />}
      </div>
    </div>
  );
}
