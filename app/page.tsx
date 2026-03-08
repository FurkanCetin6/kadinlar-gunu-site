"use client";

import { useEffect, useMemo, useState } from "react";

type Heart = {
  id: number;
  x: number;
  y: number;
  size: number;
};

type Petal = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  scale: number;
};

export default function HomePage() {
  const [opened, setOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [hearts, setHearts] = useState<Heart[]>([]);

  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 8,
        scale: 0.7 + Math.random() * 0.9,
      })),
    []
  );

  useEffect(() => {
    if (!opened) return;

    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 900);

    return () => clearTimeout(timer);
  }, [opened]);

  const createHeartBurst = () => {
    const burst = Array.from({ length: 14 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 260 - 130,
      y: -(Math.random() * 220 + 40),
      size: 14 + Math.random() * 18,
    }));

    setHearts((prev) => [...prev, ...burst]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((heart) => !burst.some((b) => b.id === heart.id)));
    }, 1600);
  };

  const handleOpen = () => {
    if (opened) {
      createHeartBurst();
      return;
    }

    setOpened(true);
    createHeartBurst();
  };

  return (
    <main className="page">
      <div className="bg-glow bg-glow-1" />
      <div className="bg-glow bg-glow-2" />

      <div className="petal-layer" aria-hidden="true">
        {petals.map((petal) => (
          <span
            key={petal.id}
            className="petal"
            style={
              {
                left: `${petal.left}%`,
                animationDelay: `${petal.delay}s`,
                animationDuration: `${petal.duration}s`,
                transform: `scale(${petal.scale})`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <section className="hero">
        <p className="top-text">8 Mart Dünya Kadınlar Günü</p>

        <h1 className="title">
          Benim en güzel
          <br />
          kadınıma 🌸
        </h1>

        <p className="subtitle">
          Hayatıma güzellik, zarafet ve neşe kattığın için teşekkür ederim.
          İyi ki varsın, iyi ki benimlesin.
        </p>

        <div className="flower-wrap">
          <button
            type="button"
            className={`flower-card ${opened ? "opened" : ""}`}
            onClick={handleOpen}
          >
            <div className="flower-center" />

            <span className="petal-shape petal-top" />
            <span className="petal-shape petal-right" />
            <span className="petal-shape petal-bottom" />
            <span className="petal-shape petal-left" />
            <span className="petal-shape petal-top-left" />
            <span className="petal-shape petal-top-right" />
            <span className="petal-shape petal-bottom-left" />
            <span className="petal-shape petal-bottom-right" />

            <span className="stem" />
            <span className="leaf leaf-left" />
            <span className="leaf leaf-right" />

            {hearts.map((heart) => (
              <span
                key={heart.id}
                className="burst-heart"
                style={
                  {
                    "--x": `${heart.x}px`,
                    "--y": `${heart.y}px`,
                    width: `${heart.size}px`,
                    height: `${heart.size}px`,
                  } as React.CSSProperties
                }
              />
            ))}
          </button>
        </div>

        <div className={`message-card ${showMessage ? "show" : ""}`}>
          <p className="message-title">Kadınlar Günün Kutlu Olsun Aşkım 💖</p>
          <p className="message-text">
            Sen sadece sevgilim değil, aynı zamanda hayatımın en güzel çiçeğisin.
            Gülüşün içimi bahar yapıyor, varlığın her günü güzelleştiriyor.
            Hep mutlu ol, hep gül, çünkü sana en çok gülmek yakışıyor.
          </p>
          <p className="signature">Seni çok seven birinden 🤍</p>
        </div>
      </section>
    </main>
  );
}