"use client";

import { useState } from "react";
import styles from "./proposal.module.css";

const answers = ["yes 💖", "yes, obviously 🙄💕"] as const;
const notes = [
  "Somehow, the smallest moments with you stay with me the longest.",
  "My favourite notification? Honestly… yours. 🤭",
  "I was going to play it cool. Then I made you an entire webpage.",
  "Of all the things I could wish for, more moments with you is my favourite.",
];

export default function Proposal() {
  const [opened, setOpened] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [note, setNote] = useState(0);
  const email = `mailto:kelvinkwasikyere5@gmail.com?subject=${encodeURIComponent("Regina has an answer 💌")}&body=${encodeURIComponent(`Hey Kelvin,\n\nMy answer is: ${answer ?? "yes 💖"}\n\nI'd love to be your girl. 💕\n\nRegina`)}`;

  return (
    <main className={styles.page}>
      <div className={styles.background} aria-hidden="true"><span>♡</span><span>✧</span><span>♡</span><span>✧</span></div>
      <header className={styles.header}><span>Ｋ + Ｒ</span><span>SEALED WITH A LITTLE LOVE <span aria-hidden="true">↗</span></span></header>
      <div className={styles.content}>
        <div className={styles.eyebrow}><span /> ONE PAGE. ONE SPECIAL GIRL.</div>
        {!opened ? (
          <div className={styles.intro}>
            <h1>Hey, Regina<span className={styles.accent}>.</span></h1>
            <p>Some feelings deserve a love letter.<br />This one has your name on it.</p>
            <button className={styles.envelopeButton} onClick={() => setOpened(true)} aria-label="Open your letter from Kelvin">
              <span className={styles.letterPeek}>for my favourite person ♡</span>
              <span className={styles.envelope}><span className={styles.seal}>♥</span></span>
              <span className={styles.tap}>tap to open your letter <span aria-hidden="true">↗</span></span>
            </button>
            <span className={styles.handwritten}>a tiny bit nervous, a lot bit into you</span>
          </div>
        ) : answer ? (
          <div className={styles.card}>
            <div className={styles.confetti} aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <span key={i} style={{ left: `${(i * 17) % 100}%`, animationDelay: `${(i % 5) * .18}s` }}>{i % 2 ? "♥" : "✦"}</span>)}</div>
            <div className={styles.sticker} aria-hidden="true">🌹</div>
            <div className={styles.eyebrow}>PLOT TWIST: I AM NOT PLAYING IT COOL</div>
            <h1>You + me?<br /><em>My favourite yes.</em></h1>
            <p>Regina, you just made a certain someone<br />ridiculously happy. It’s me. I’m someone.</p>
            <div className={styles.receipt}><span>YOUR VERY EXCELLENT ANSWER</span><strong>{answer}</strong></div>
            <a className={styles.primary} href={email}>Tell Kelvin the good news 💌</a>
            <p className={styles.small}>Opens your email with your answer ready.<br />Tap send there so it reaches me.</p>
            <button className={styles.textButton} onClick={() => setAnswer(null)}>Back to the little question</button>
          </div>
        ) : (
          <div className={styles.card}>
            <div className={styles.cardTop}><span>DEAR REGINA,</span><span aria-hidden="true">♡</span></div>
            <p>I have a confession.</p>
            <h1>I like you.<br /><em>Like, like you.</em></h1>
            <p>The smiling-at-my-phone kind.<br />The “oh, this song reminds me of her” kind.</p>
            <button className={styles.note} onClick={() => setNote((note + 1) % notes.length)} aria-label="Read another little confession">
              <span aria-live="polite">{notes[note]}</span><small>little confession {note + 1}/{notes.length} · tap for another ♡</small>
            </button>
            <h2>Will you be my girl?</h2>
            <p className={styles.subtitle}>I promise the boyfriend will be less cheesy.<br />(Actually, no promises.)</p>
            <div className={styles.buttons}>{answers.map((choice, index) => <button key={choice} className={index === 0 ? styles.primary : styles.secondary} onClick={() => setAnswer(choice)}>{choice}</button>)}</div>
            <p className={styles.small}>Two yeses because I’m optimistic 🤭<br />No rush, though. Only if you mean it.</p>
            <div className={styles.signature}>With all my heart,<span>Kelvin ♡</span></div>
          </div>
        )}
      </div>
      <footer className={styles.footer}>MADE WITH COURAGE, A LITTLE CODE & A LOT OF ♡<span>exclusively for Regina</span></footer>
    </main>
  );
}
