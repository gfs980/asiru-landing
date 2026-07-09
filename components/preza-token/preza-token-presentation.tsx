"use client";

import type { PrezaTokenDictionary } from "@/lib/preza-token/types";
import {
  PrezaTokenFooter,
  PrezaTokenHeader,
  PrezaTokenProgress,
  PrezaTokenRail,
} from "./preza-token-chrome";
import { PrezaTokenProvider } from "./preza-token-context";
import { PrezaTokenSlideFrame } from "./preza-token-slide-frame";

type PrezaTokenPresentationProps = {
  dict: PrezaTokenDictionary;
};

export function PrezaTokenPresentation({ dict }: PrezaTokenPresentationProps) {
  return (
    <PrezaTokenProvider dict={dict}>
      <div className="preza-deck">
        <PrezaTokenHeader />
        <PrezaTokenProgress />
        <PrezaTokenRail />

        <main className="preza-main">
          {dict.slides.map((slide, index) => (
            <PrezaTokenSlideFrame key={slide.id} index={index} slide={slide} />
          ))}
        </main>

        <PrezaTokenFooter />
      </div>
    </PrezaTokenProvider>
  );
}
