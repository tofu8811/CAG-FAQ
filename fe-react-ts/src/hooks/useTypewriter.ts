import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  typeSpeed?: number;
  deleteSpeed?: number;
  holdDelay?: number;
  phraseDelay?: number;
}

export function useTypewriter(
  phrases: string[],
  {
    typeSpeed = 80,
    deleteSpeed = 40,
    holdDelay = 2200,
    phraseDelay = 400
  }: UseTypewriterOptions = {}
) {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (phrases.length === 0) return;

    let activePhraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timerId: number | null = null;

    const tick = () => {
      const currentPhrase = phrases[activePhraseIndex];
      if (isDeleting) {
        setTypedText(currentPhrase.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypedText(currentPhrase.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        speed = holdDelay;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        activePhraseIndex = (activePhraseIndex + 1) % phrases.length;
        speed = phraseDelay;
      }

      timerId = window.setTimeout(tick, speed);
    };

    timerId = window.setTimeout(tick, 200);
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [deleteSpeed, holdDelay, phraseDelay, phrases, typeSpeed]);

  return typedText;
}
