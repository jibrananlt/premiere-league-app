export default function About() {
  return (
    <div className="min-h-screen bg-pl-dark pt-24 md:pt-32 pb-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        
        {/* Header Section */}
        <div className="text-center mb-12">
           <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4">
             About <span className="text-transparent bg-clip-text bg-gradient-to-r from-pl-cyan to-pl-pink">Me</span>
           </h1>
        </div>

        {/* Simple Card */}
        <div className="bg-[#2c0030] rounded-3xl border border-white/10 shadow-2xl p-8 md:p-12 text-center">
           
           <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Jibran Analta Putra</h2>
              
              <div className="space-y-6 text-lg">
                 <div>
                    <p className="text-pl-gray mb-1">NIM</p>
                    <p className="text-white font-bold text-2xl">21120123140170</p>
                 </div>
                 
                 <div>
                    <p className="text-pl-gray mb-1">Favorite Club</p>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-pl-cyan to-pl-pink font-black text-2xl">
                      Manchester United
                    </p>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}