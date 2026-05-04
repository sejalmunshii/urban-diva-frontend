import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader">

      {/* Falling Petals */}
      <div className="petals">
        {[...Array(6)].map((_, i) => (
          <div className="petal" key={i} />
        ))}
      </div>

      {/* Logo */}
      <div className="logo-box">
        <div className="logo-img-wrap">
          <img src="/img/Diva-logo.png" alt="Urban Diva Logo" />
        </div>
        <div className="brand-name">URBAN <em>Diva</em></div>
        <div className="tagline">Curated Women's Fashion</div>
      </div>

      {/* Bouncing Dots */}
      <div className="dots-wrap">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>

      {/* Progress Bar */}
      <div className="progress-wrap">
        <div className="progress-fill" />
      </div>

    </div>
  );
}

export default Preloader;