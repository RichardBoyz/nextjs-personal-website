import { Link } from "@/i18n/navigation";
import { LanguageIcon } from "@heroicons/react/24/outline";

const LinkContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex aspect-square h-full shrink-0 cursor-pointer items-center justify-center gap-2 hover:animate-pulse hover:bg-gray-500 dark:hover:bg-gray-700">
      {children}
    </div>
  );
};

export const LangSwitcher = () => {
  return (
    <div className="absolute left-10 top-0 z-20 flex h-10 w-10 items-center overflow-hidden rounded-br-md bg-black text-white transition-all duration-200 hover:w-[7.5rem]">
      <div className="flex aspect-square h-full cursor-pointer items-center justify-center hover:bg-gray-500 dark:hover:bg-gray-700">
        <LanguageIcon className="h-6 w-6 shrink-0" />
      </div>
      <LinkContainer>
        <Link href="/" locale="en">
          Eng
        </Link>
      </LinkContainer>

      <LinkContainer>
        <Link href="/" locale="zh">
          中文
        </Link>
      </LinkContainer>
    </div>
  );
};
