import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {
  const init = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      init={init}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        particles: {
          number: { value: 30 }, // Fewer particles for visibility
          color: { value: "#ff0000" }, // Bright red for debugging
          move: { enable: true, speed: 1 },
          size: { value: 5 } // Larger particles
        }
      }}
    />
  );
}