'use client';

const ScreenshotGallery = () => (
  <section id="features-section" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-medium mb-4">Powerful Features in Action</h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        View what Starry can do in your favorite games
      </p>
    </div>
    <div className="space-y-16">
    
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-sm shadow-xl group">
    
        <div className="absolute -inset-1 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
        
        <div className="relative flex flex-col lg:flex-row gap-8 items-center p-6">
          <div className="w-full lg:w-2/3">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <div
                className="w-full h-[250px] md:h-[300px] lg:h-[400px] bg-cover bg-center transform group-hover:scale-[1.02] transition-all duration-300"
                style={{ backgroundImage: `url(/images/screenshots/temp_screenshot.png)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
            </div>
          </div>
          <div className="w-full lg:w-1/3 space-y-4">
            <div className="flex items-center gap-2 text-sm text-emerald-400 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Active Development
            </div>
            <h3 className="text-2xl font-medium text-white/90">Why Use Starry?</h3>
            <p className="text-gray-400">
              Starry includes many insanely overpowered features for a high variety of games we think you&apos;d love. Enjoy game breaking modules, available for the low price of <b>$5.49</b>, or use our powerful project <b>entirely for free</b> today!
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Includes a high variety of games
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Quick and heavy releases
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Efficient and helpful support
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                & so much more, available <b>for free</b>!
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-sm shadow-xl group">
       
        <div className="absolute -inset-1 bg-orange-800/20 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
        
        <div className="relative flex flex-col lg:flex-row-reverse gap-8 items-center p-6">
          <div className="w-full lg:w-2/3">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <div
                className="w-full h-[250px] md:h-[300px] lg:h-[400px] bg-cover bg-center transform group-hover:scale-[1.02] transition-all duration-300"
                style={{ backgroundImage: `url(/images/screenshots/temp_screenshot2.png)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
            </div>
          </div>
          <div className="w-full lg:w-1/3 space-y-4">
            <div className="flex items-center gap-2 text-sm text-blue-400 mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Stable Release
            </div>
            <h3 className="text-2xl font-medium text-white/90">Good Performance & Reliability</h3>
            <p className="text-gray-400">
              Another broken script? Not anymore. With Starry, we ensure you&apos;re able to ruin another iPad kid&apos;s day using our high-performant project!
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Instant execution
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Seamless Key System usage
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Quick and reliable
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ScreenshotGallery;