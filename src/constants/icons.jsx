import {
  LinkIcon as HeroLinkIcon,
  CogIcon,
  ShareIcon as HeroShareIcon,
  BoltIcon,
  CheckIcon as HeroCheckIcon,
  DocumentTextIcon,
  ClockIcon,
  ShareIcon as HeroShareAltIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export const LinkIcon = () => (
  <HeroLinkIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white" />
);

export const ProcessingIcon = () => (
  <CogIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white processing-icon" />
);

export const ShareIcon = () => (
  <HeroShareIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white" />
);

export const LightningIcon = () => (
  <BoltIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-white" />
);

export const CheckIcon = () => (
  <HeroCheckIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600" />
);

// Feature icons
export const ArticleIcon = () => (
  <DocumentTextIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
);

export const SpeedIcon = () => (
  <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
);

export const ShareAltIcon = () => (
  <HeroShareAltIcon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
);

export const DeleteIcon = () => <TrashIcon className="w-4 h-4" />;
