import { WhatsAppIcon } from "@/components/brand-icons"
import { SpinningText } from "@/components/motion-primitives/spinning-text"

const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=94725724738&text=Hello%2C+I+would+like+to+inquire+about+your+products.&type=phone_number&app_absent=0"

/**
 * Rotating "shop local" seal pinned to the bottom-right of the viewport
 * with a clickable WhatsApp chat icon right in the center.
 */
export function SpinningBadge() {
  return (
    <aside
      aria-label="Direct WhatsApp chat"
      className="fixed right-4 bottom-20 z-40 block md:right-6 md:bottom-6"
    >
      <div className="relative grid size-20 place-items-center sm:size-24">
        {/* Rotating text ring */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
          <SpinningText
            radius={8.5}
            fontSize={0.48}
            duration={16}
            className="font-heading font-semibold tracking-[0.14em] text-primary uppercase"
          >
            {"shop local • kegalle • store no. 8 • "}
          </SpinningText>
        </div>

        {/* Interactive WhatsApp Button in the center */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Store No. 8 on WhatsApp"
          className="group relative z-10 grid size-10 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:bg-[#20ba59] hover:shadow-xl hover:shadow-[#25D366]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:size-12"
        >
          <WhatsAppIcon className="size-5 transition-transform duration-300 group-hover:scale-110 sm:size-6" />
        </a>
      </div>
    </aside>
  )
}
