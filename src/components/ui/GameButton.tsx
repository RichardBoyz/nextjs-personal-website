interface GameButtonProps {
  label: string;
  onClick?: () => void;
}

export const GameButton = ({ label, onClick }: GameButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex cursor-pointer items-center justify-center overflow-hidden px-6 py-3 font-semibold text-white transition-all duration-300 max-md:text-sm"
    >
      {/* 文字 */}
      <div className="relative flex w-fit transition-transform duration-300 group-hover:scale-110">
        {/* 左箭頭 */}
        <div className="group-hover:animate-shake absolute -left-5 top-1/2 opacity-0 group-hover:opacity-100">
          &gt;
        </div>
        <span>{label}</span>

        {/* 右箭頭 */}
        <div className="group-hover:animate-shake-reverse absolute -right-5 top-1/2 opacity-0 group-hover:opacity-100">
          &lt;
        </div>
      </div>
    </div>
  );
};
