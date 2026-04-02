import { EMOJI_OPTIONS } from "../../constant/subscription.constant";
import { cn } from "../../utils/cn";

const EmojiPicker = ({ value, onChange }: any) => {
    return (
        <div className="flex flex-wrap gap-1.5">
            {EMOJI_OPTIONS?.map((emoji) => (
                <button
                    key={emoji}
                    type="button"
                    onClick={() => onChange(emoji)}
                    className={cn(
                        "w-8 h-8 cursor-pointer border-(--color-border-dashed) border-dashed rounded-lg border",
                        value === emoji ? "bg-transparent" : "bg-(--color-surface-2)"
                    )}
                >
                    {emoji}
                </button>
            ))}
        </div>
    );
};

export default EmojiPicker;