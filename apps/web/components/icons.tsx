import {
  ChevronLeft,
  ChevronRight,
  ConciergeBell,
  File,
  FileText,
  Github,
  Image,
  Loader2,
  Rocket,
  Settings,
  User,
  X,
} from "lucide-react";
import type { Icon as LucideIcon } from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  logo: Rocket,
  close: X,
  bell: ConciergeBell,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  github: Github,
  spinner: Loader2,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  user: User,
};
