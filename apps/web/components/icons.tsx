import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ConciergeBell,
  File,
  FileText,
  FolderTree,
  Github,
  Image,
  Loader2,
  MoreVertical,
  Plus,
  Rocket,
  Settings,
  Trash,
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
  add: Plus,
  warning: AlertTriangle,
  ellipsis: MoreVertical,
  trash: Trash,
  tree: FolderTree,
};
