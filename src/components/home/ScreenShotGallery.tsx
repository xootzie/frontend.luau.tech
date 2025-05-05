'use client';

const ScreenshotGallery = () => (
  <section id="features-section" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
    <div className="text-center mb-16">
     
      <h2 className="text-4xl font-semibold mb-4 bg-gradient-to-r from-white via-[#fb97c6] to-[#d671a0] bg-clip-text text-transparent">Powerful Features in Action</h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Explore what Starlight can do in your favorite games
      </p>
    </div>
    
    <div className="space-y-16">
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-[#fb97c6]/20 hover:border-[#fb97c6]/40 transition-all duration-300 backdrop-blur-sm shadow-xl group">
        <div className="absolute -inset-1 bg-[#fb97c6]/20 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
        
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
            <div className="flex items-center gap-2 text-sm text-[#fb97c6] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#fb97c6] animate-pulse" />
              Premium Experience
            </div>
            <h3 className="text-2xl font-medium text-white/90">Why Choose Starlight?</h3>
            <p className="text-gray-400">
              Starlight includes numerous powerful premium features across a variety of games. Enjoy exclusive game-enhancing modules, all available for just <b className="text-[#fb97c6]">$4.99/month</b> with our premium subscription.
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fb97c6]" />
                Access to a growing library of premium game modules
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fb97c6]" />
                Regular updates and new game additions
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fb97c6]" />
                Priority customer support 
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fb97c6]" />
                <b className="text-white">Premium-only</b> exclusive features
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 border border-[#fb97c6]/20 hover:border-[#fb97c6]/40 transition-all duration-300 backdrop-blur-sm shadow-xl group">
       
        <div className="absolute -inset-1 bg-[#fb97c6]/20 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
        
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
            <div className="flex items-center gap-2 text-sm text-[#fb97c6] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#fb97c6] animate-pulse" />
              Stable Release
            </div>
            <h3 className="text-2xl font-medium text-white/90">Superior Performance & Reliability</h3>
            <p className="text-gray-400">
              Experience a new level of reliability with Starlight. Our optimized code ensures smooth performance and a frustration-free experience.
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fb97c6]" />
                Lightning-fast execution
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fb97c6]" />
                Seamless authentication system
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fb97c6]" />
                Secure, reliable connectivity
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fb97c6]" />
                Ongoing technical support
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
  </section>
);

export default ScreenshotGallery;