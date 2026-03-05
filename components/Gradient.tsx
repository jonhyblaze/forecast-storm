const Gradient = () => {
  // 1. SVG string
  const newSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200">
        <filter id="noise-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch"></feTurbulence>
            <feColorMatrix type="saturate" values="0"></feColorMatrix>
            <feComponentTransfer>
                <feFuncR type="linear" slope="0.46"></feFuncR>
                <feFuncG type="linear" slope="0.46"></feFuncG>
                <feFuncB type="linear" slope="0.46"></feFuncB>
                <feFuncA type="linear" slope="0.56"></feFuncA>
            </feComponentTransfer>
            <feComponentTransfer>
                <feFuncR type="linear" slope="1.47" intercept="-0.23"/>
                <feFuncG type="linear" slope="1.47" intercept="-0.23"/>
                <feFuncB type="linear" slope="1.47" intercept="-0.23"/>
            </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)"></rect>
    </svg>`


  // 2. Encode it for CSS
  const newSvgDataUrl = `url("data:image/svg+xml;base64,${btoa(newSvg)}")`

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-teal-900/20 dark:bg-background">

      {/* Glows */}
      <div className="absolute top-[0%] left-[0%] w-full h-full opacity-50 dark:opacity-100">
        <div className="absolute inset-0 rounded  bg-sky-400/25 dark:bg-sky-500/40 blur-[100px]" />
      </div>

      <div className="-z-20 absolute top-[9%] left-[11%] w-[88%] h-[49%] opacity-100">
        <div className="absolute inset-0 rounded-3xl  bg-teal-800/20 dark:bg-teal-200/15 blur-3xl" />
      </div>

      {/* New Noise Overlay */}
      <div
        className="absolute inset-0 pointer-events-none contrast-150 brightness-100"
        style={{
          backgroundImage: newSvgDataUrl,
          backgroundRepeat: "repeat",
          scale: 1,
          mixBlendMode: "difference", // or 'soft-light' / 'screen'
          opacity: 0.3 // Adjust this! Too high will look "dirty"
        }}
      />
    </div>
  )
}

export default Gradient
